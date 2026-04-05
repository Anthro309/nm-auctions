import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fonts, radius, shadow } from '../theme';
import { useCountdown, formatCountdown } from '../hooks/useCountdown';

export default function BidCard({ bid, onIncreaseBid }) {
  const remaining = useCountdown(bid.ends);
  const winning   = bid.status === 'winning';

  return (
    <View style={[styles.card, winning ? styles.winBorder : styles.outBorder, shadow.sm]}>
      <View style={styles.row}>
        <View style={[styles.iconBox, { backgroundColor: winning ? colors.successBg : colors.dangerBg }]}>
          <Text style={styles.emoji}>{bid.emoji}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>{bid.title}</Text>
          <Text style={styles.auctionName}>{bid.auction}</Text>
          <View style={styles.statsRow}>
            <View>
              <Text style={styles.statLabel}>Your max</Text>
              <Text style={styles.statValue}>${bid.yourBid.toFixed(2)}</Text>
            </View>
            <View>
              <Text style={styles.statLabel}>Current bid</Text>
              <Text style={styles.statValue}>${bid.currentBid.toFixed(2)}</Text>
            </View>
            <View style={styles.statusCol}>
              <View style={[styles.statusBadge, winning ? styles.winBadge : styles.outBadge]}>
                <Text style={[styles.statusText, winning ? styles.winText : styles.outText]}>
                  {winning ? '✓ Winning' : '⚠ Outbid'}
                </Text>
              </View>
              <Text style={styles.timer}>{formatCountdown(remaining)}</Text>
            </View>
          </View>
        </View>
      </View>
      {!winning && (
        <TouchableOpacity onPress={onIncreaseBid} activeOpacity={0.82} style={styles.increaseBtn}>
          <Text style={styles.increaseBtnText}>Increase Bid →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface, borderRadius: radius.lg,
    marginBottom: 10, padding: 16, borderWidth: 2,
  },
  winBorder: { borderColor: '#A5D6A7' },
  outBorder: { borderColor: '#FFCDD2' },
  row: { flexDirection: 'row', gap: 12 },
  iconBox: {
    width: 50, height: 50, borderRadius: radius.md,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  emoji: { fontSize: 24 },
  info: { flex: 1 },
  title: { fontSize: 12, fontFamily: fonts.body.bold, color: colors.text, lineHeight: 17 },
  auctionName: { fontSize: 10, color: colors.text3, fontFamily: fonts.body.regular, marginTop: 2 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 8 },
  statLabel: { fontSize: 9, color: colors.text3, fontFamily: fonts.body.regular },
  statValue: { fontSize: 14, fontFamily: fonts.body.extraBold, color: colors.text2, marginTop: 1 },
  statusCol: { alignItems: 'flex-end' },
  statusBadge: { borderRadius: radius.full, paddingHorizontal: 10, paddingVertical: 3 },
  winBadge: { backgroundColor: colors.successBg },
  outBadge: { backgroundColor: colors.dangerBg },
  statusText: { fontSize: 11, fontFamily: fonts.body.bold },
  winText: { color: colors.success },
  outText: { color: colors.danger },
  timer: { fontSize: 9, color: colors.text3, fontFamily: fonts.body.regular, marginTop: 3 },
  increaseBtn: {
    marginTop: 12, backgroundColor: colors.primary,
    borderRadius: radius.sm, paddingVertical: 9, alignItems: 'center',
  },
  increaseBtnText: { color: 'white', fontFamily: fonts.body.extraBold, fontSize: 12 },
});
