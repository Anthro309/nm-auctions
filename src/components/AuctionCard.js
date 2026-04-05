import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, radius, shadow } from '../theme';
import { useCountdown, formatCountdown } from '../hooks/useCountdown';

export default function AuctionCard({ auction, onPress }) {
  const remaining = useCountdown(auction.ends);
  const urgent = remaining > 0 && remaining < 3600000;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.88} style={[styles.card, shadow.md]}>
      <LinearGradient colors={auction.gradientColors} style={styles.gradient}>
        {/* Gold top bar accent */}
        <View style={styles.goldBar} />

        <View style={styles.gradientTop}>
          <Text style={styles.emoji}>{auction.emoji}</Text>
          <View style={styles.topRight}>
            {auction.featured && (
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredText}>★ FEATURED</Text>
              </View>
            )}
            <View style={[styles.timerBadge, urgent && styles.timerUrgent]}>
              <Text style={styles.timerText}>⏱ {formatCountdown(remaining)}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.category}>{auction.category}</Text>
        <Text style={styles.title}>{auction.title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{auction.subtitle}</Text>
      </LinearGradient>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Active Lots</Text>
          <Text style={styles.footerValue}>{auction.lots}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.footerCenter}>
          <Text style={styles.footerLabel}>Starts At</Text>
          <Text style={[styles.footerValue, { color: colors.success }]}>$0.99</Text>
        </View>
        <View style={styles.browseBtn}>
          <Text style={styles.browseBtnText}>Browse →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: colors.surface,
  },
  gradient: { padding: 18, paddingBottom: 16 },
  goldBar: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: 3, backgroundColor: colors.accent,
  },
  gradientTop: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 10, marginTop: 6,
  },
  emoji: { fontSize: 44 },
  topRight: { alignItems: 'flex-end', gap: 6 },
  featuredBadge: {
    backgroundColor: colors.accent, borderRadius: radius.full,
    paddingHorizontal: 10, paddingVertical: 3,
  },
  featuredText: {
    color: '#fff', fontSize: 9,
    fontFamily: fonts.body.extraBold, letterSpacing: 0.8,
  },
  timerBadge: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: radius.full, paddingHorizontal: 11, paddingVertical: 4,
  },
  timerUrgent: { backgroundColor: 'rgba(183,28,28,0.85)' },
  timerText: { color: 'white', fontSize: 11, fontFamily: fonts.body.bold },
  category: {
    color: 'rgba(255,255,255,0.6)', fontSize: 10,
    fontFamily: fonts.body.semiBold, textTransform: 'uppercase', letterSpacing: 0.6,
    marginBottom: 3,
  },
  title: {
    color: 'white', fontSize: 18,
    fontFamily: fonts.display.bold, lineHeight: 24,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.65)', fontSize: 12,
    fontFamily: fonts.body.regular, marginTop: 3,
  },
  footer: {
    backgroundColor: colors.surface,
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12, gap: 12,
  },
  footerLabel: { fontSize: 10, fontFamily: fonts.body.regular, color: colors.text3 },
  footerValue: {
    fontSize: 17, fontFamily: fonts.body.extraBold,
    color: colors.text, marginTop: 1,
  },
  divider: { width: 1, height: 30, backgroundColor: colors.border },
  footerCenter: { flex: 1, paddingLeft: 4 },
  browseBtn: {
    backgroundColor: colors.primary, borderRadius: radius.full,
    paddingHorizontal: 18, paddingVertical: 9,
  },
  browseBtnText: { color: 'white', fontSize: 13, fontFamily: fonts.body.bold },
});
