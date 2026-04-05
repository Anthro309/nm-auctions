import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../theme';
import { LOTS } from '../data/mockData';
import LotCard from '../components/LotCard';
import { useCountdown, formatCountdown } from '../hooks/useCountdown';

export default function AuctionDetailScreen() {
  const navigation = useNavigation();
  const { auction } = useRoute().params;
  const remaining   = useCountdown(auction.ends);
  const [search, setSearch] = useState('');

  const lots = useMemo(() => {
    const base = LOTS.filter((l) => l.auctionId === auction.id);
    const src  = base.length > 0 ? base : LOTS;
    if (!search.trim()) return src;
    const q = search.toLowerCase();
    return src.filter((l) =>
      l.title.toLowerCase().includes(q) || l.number.toLowerCase().includes(q)
    );
  }, [auction.id, search]);

  return (
    <View style={styles.flex}>
      <LinearGradient colors={auction.gradientColors} style={styles.gradient}>
        <SafeAreaView edges={['top']}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn} activeOpacity={0.75}
          >
            <Ionicons name="arrow-back" size={17} color="white" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.goldBar} />
          <Text style={styles.category}>{auction.category}</Text>
          <Text style={styles.auctionTitle}>{auction.title}</Text>
          <View style={styles.statsRow}>
            {[
              ['Lots',        String(auction.lots)],
              ['Closes In',   formatCountdown(remaining)],
              ['Starts At',   '$0.99'],
            ].map(([label, value]) => (
              <View key={label}>
                <Text style={styles.statLabel}>{label}</Text>
                <Text style={styles.statValue}>{value}</Text>
              </View>
            ))}
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Search bar */}
      <View style={styles.searchWrap}>
        <Ionicons name="search" size={15} color={colors.text3} />
        <TextInput
          value={search} onChangeText={setSearch}
          placeholder={`Search lots…`}
          placeholderTextColor={colors.text3}
          style={styles.searchInput}
          clearButtonMode="while-editing"
        />
      </View>

      <FlatList
        data={lots}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <LotCard
            lot={item}
            onPress={() => navigation.navigate('LotDetail', { lot: item, auction })}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>No lots match your search</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.bg },
  gradient: { paddingHorizontal: spacing.xl, paddingBottom: spacing.lg },
  goldBar: { height: 3, backgroundColor: colors.accent, marginBottom: 12 },
  backBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: radius.sm,
    paddingHorizontal: 12, paddingVertical: 7,
    marginTop: spacing.md, marginBottom: spacing.md,
  },
  backText: { color: 'white', fontFamily: fonts.body.bold, fontSize: 14 },
  category: {
    color: 'rgba(255,255,255,0.6)', fontSize: 10,
    fontFamily: fonts.body.semiBold, textTransform: 'uppercase', letterSpacing: 0.6,
  },
  auctionTitle: {
    color: 'white', fontSize: 20,
    fontFamily: fonts.display.bold, lineHeight: 26, marginTop: 2,
  },
  statsRow: { flexDirection: 'row', gap: 28, marginTop: 12 },
  statLabel: { color: 'rgba(255,255,255,0.55)', fontSize: 10, fontFamily: fonts.body.regular },
  statValue: { color: 'white', fontFamily: fonts.body.extraBold, fontSize: 15, marginTop: 1 },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.surface, borderRadius: radius.md,
    marginHorizontal: spacing.xl, marginVertical: spacing.md,
    borderWidth: 1.5, borderColor: colors.border,
    paddingHorizontal: 12, paddingVertical: 9,
  },
  searchInput: { flex: 1, fontSize: 13, fontFamily: fonts.body.regular, color: colors.text },
  list: { paddingHorizontal: spacing.xl, paddingBottom: 32 },
  empty: { alignItems: 'center', paddingVertical: 52 },
  emptyEmoji: { fontSize: 40, marginBottom: 8 },
  emptyText: { fontSize: 14, fontFamily: fonts.body.semiBold, color: colors.text3 },
});
