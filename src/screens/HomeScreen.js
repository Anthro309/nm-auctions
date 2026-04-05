import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, spacing, radius } from '../theme';
import { AUCTIONS, CATEGORIES } from '../data/mockData';
import AuctionCard from '../components/AuctionCard';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [activeCat, setActiveCat] = useState(null);

  const filtered = activeCat
    ? AUCTIONS.filter((a) => a.category === activeCat)
    : AUCTIONS;

  return (
    <View style={styles.flex}>
      <SafeAreaView edges={['top']} style={styles.headerSafe}>
        <View style={styles.headerRow}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.notifBtn}>
            <Text style={styles.notifText}>🔔  3</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.searchBar} activeOpacity={0.75}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchHint}>Search auctions, lots & items…</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Category strip */}
        <Text style={styles.sectionLabel}>Browse by Category</Text>
        <ScrollView
          horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catRow}
        >
          {CATEGORIES.map((cat) => {
            const active = activeCat === cat.filter;
            return (
              <TouchableOpacity
                key={cat.label} activeOpacity={0.8}
                onPress={() => setActiveCat(active ? null : cat.filter)}
                style={[styles.catPill, active && styles.catPillActive]}
              >
                <Text style={styles.catEmoji}>{cat.emoji}</Text>
                <Text style={[styles.catLabel, active && styles.catLabelActive]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Promo banner */}
        <LinearGradient
          colors={[colors.primary, colors.primaryLight]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          style={styles.banner}
        >
          <View style={styles.bannerAccent} />
          <Text style={styles.bannerEmoji}>🏷️</Text>
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>All Items Start at 99¢</Text>
            <Text style={styles.bannerSub}>
              Weekly auctions  ·  Pickup Sat & Sun, 9 am – 1 pm
            </Text>
          </View>
        </LinearGradient>

        {/* Auctions */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionLabel}>
            {activeCat ?? 'Active Auctions'}
          </Text>
          <Text style={styles.sectionCount}>({filtered.length})</Text>
        </View>

        {filtered.length > 0
          ? filtered.map((a) => (
              <AuctionCard
                key={a.id} auction={a}
                onPress={() => navigation.navigate('AuctionDetail', { auction: a })}
              />
            ))
          : (
            <View style={styles.empty}>
              <Text style={styles.emptyEmoji}>🔍</Text>
              <Text style={styles.emptyText}>No auctions in this category</Text>
            </View>
          )
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.bg },
  headerSafe: { backgroundColor: colors.primary },
  headerRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl, paddingTop: spacing.sm,
  },
  logo: {
    width: 200,
    height: 68,
  },
  notifBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: radius.full,
    paddingHorizontal: 13, paddingVertical: 7, marginTop: 8,
  },
  notifText: { color: 'white', fontSize: 13, fontFamily: fonts.body.bold },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: 'rgba(255,255,255,0.13)', borderRadius: radius.md,
    marginHorizontal: spacing.xl, marginTop: 14, marginBottom: spacing.lg,
    paddingHorizontal: 14, paddingVertical: 11,
  },
  searchIcon: { fontSize: 15 },
  searchHint: {
    color: 'rgba(255,255,255,0.6)', fontSize: 13,
    fontFamily: fonts.body.regular,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 36 },
  sectionLabel: {
    fontSize: 14, fontFamily: fonts.body.bold, color: colors.text,
    paddingHorizontal: spacing.xl, marginTop: spacing.lg,
  },
  sectionRow: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: spacing.xl, marginTop: spacing.lg, marginBottom: 10,
  },
  sectionCount: { fontSize: 12, color: colors.text3, fontFamily: fonts.body.regular },
  catRow: { paddingHorizontal: spacing.xl, paddingVertical: 10, gap: 8 },
  catPill: {
    alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10,
    borderRadius: radius.md, backgroundColor: colors.surface,
    borderWidth: 1.5, borderColor: colors.border, minWidth: 68,
  },
  catPillActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  catEmoji: { fontSize: 22 },
  catLabel: {
    fontSize: 10, fontFamily: fonts.body.bold, color: colors.text2, marginTop: 3,
  },
  catLabelActive: { color: 'white' },
  banner: {
    marginHorizontal: spacing.xl, marginTop: spacing.lg,
    borderRadius: radius.lg, padding: 14,
    flexDirection: 'row', alignItems: 'center', gap: 12,
    overflow: 'hidden',
  },
  bannerAccent: {
    position: 'absolute', left: 0, top: 0, bottom: 0,
    width: 4, backgroundColor: colors.accent,
  },
  bannerEmoji: { fontSize: 32 },
  bannerText: { flex: 1 },
  bannerTitle: { color: 'white', fontFamily: fonts.body.extraBold, fontSize: 14 },
  bannerSub: {
    color: 'rgba(255,255,255,0.75)', fontSize: 11,
    fontFamily: fonts.body.regular, marginTop: 3,
  },
  empty: { alignItems: 'center', paddingVertical: 52 },
  emptyEmoji: { fontSize: 44, marginBottom: 10 },
  emptyText: { fontSize: 14, fontFamily: fonts.body.semiBold, color: colors.text3 },
});
