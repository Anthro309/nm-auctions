import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, spacing, radius } from '../theme';
import { MY_BIDS } from '../data/mockData';
import BidCard from '../components/BidCard';

const TABS = ['All', 'Winning', 'Outbid'];

export default function MyBidsScreen() {
  const [tab, setTab] = useState('All');

  const counts = {
    All:     MY_BIDS.length,
    Winning: MY_BIDS.filter((b) => b.status === 'winning').length,
    Outbid:  MY_BIDS.filter((b) => b.status === 'outbid').length,
  };

  const filtered =
    tab === 'All'    ? MY_BIDS :
    tab === 'Winning'? MY_BIDS.filter((b) => b.status === 'winning') :
                       MY_BIDS.filter((b) => b.status === 'outbid');

  return (
    <View style={styles.flex}>
      <SafeAreaView edges={['top']} style={styles.headerSafe}>
        <View style={styles.header}>
          <Text style={styles.tag}>NM Auctions</Text>
          <Text style={styles.title}>My Bids</Text>
        </View>
        <View style={styles.tabRow}>
          {TABS.map((t) => (
            <TouchableOpacity
              key={t} onPress={() => setTab(t)}
              style={[styles.pill, tab === t && styles.pillOn]}
              activeOpacity={0.8}
            >
              <Text style={[styles.pillText, tab === t && styles.pillTextOn]}>{t}</Text>
              <View style={[styles.badge, tab === t && styles.badgeOn]}>
                <Text style={[styles.badgeText, tab === t && styles.badgeTextOn]}>
                  {counts[t]}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <BidCard
            bid={item}
            onIncreaseBid={() =>
              Alert.alert(
                'Increase Bid',
                `Current bid is $${item.currentBid.toFixed(2)}. Navigate to the lot to place a higher bid.`
              )
            }
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>📭</Text>
            <Text style={styles.emptyTitle}>No bids here yet</Text>
            <Text style={styles.emptySub}>Browse active auctions and start bidding!</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.bg },
  headerSafe: { backgroundColor: colors.primary },
  header: { paddingHorizontal: spacing.xl, paddingTop: spacing.md },
  tag: {
    color: colors.accent, fontSize: 10,
    fontFamily: fonts.body.bold, textTransform: 'uppercase', letterSpacing: 0.8,
  },
  title: { color: 'white', fontSize: 26, fontFamily: fonts.display.bold, marginTop: 1 },
  tabRow: {
    flexDirection: 'row', gap: 8,
    paddingHorizontal: spacing.xl, paddingTop: 12, paddingBottom: spacing.lg,
  },
  pill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: radius.full, paddingHorizontal: 14, paddingVertical: 7,
  },
  pillOn: { backgroundColor: colors.accent },
  pillText:   { color: 'white', fontFamily: fonts.body.bold, fontSize: 13 },
  pillTextOn: { color: 'white' },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: radius.full, paddingHorizontal: 6, paddingVertical: 1,
  },
  badgeOn: { backgroundColor: 'rgba(255,255,255,0.35)' },
  badgeText:   { color: 'white', fontSize: 11, fontFamily: fonts.body.bold },
  badgeTextOn: { color: 'white' },
  list: { padding: spacing.xl, paddingBottom: 36 },
  empty: { alignItems: 'center', paddingVertical: 64 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 17, fontFamily: fonts.display.semiBold, color: colors.text },
  emptySub:   { fontSize: 13, color: colors.text3, fontFamily: fonts.body.regular, marginTop: 4 },
});
