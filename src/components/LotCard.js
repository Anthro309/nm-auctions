import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fonts, radius, shadow } from '../theme';
import { useCountdown, formatCountdown } from '../hooks/useCountdown';

export default function LotCard({ lot, onPress }) {
  const remaining = useCountdown(lot.ends);
  const urgent = remaining > 0 && remaining < 1800000;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={[styles.card, shadow.sm]}>
      <View style={styles.emojiBox}>
        <Text style={styles.emoji}>{lot.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.number}>{lot.number}</Text>
        <Text style={styles.title} numberOfLines={2}>{lot.title}</Text>
        <View style={styles.row}>
          <View>
            <Text style={styles.bidLabel}>Current Bid</Text>
            <Text style={styles.bid}>${lot.currentBid.toFixed(2)}</Text>
            <Text style={styles.bidCount}>{lot.bids} bids</Text>
          </View>
          <View style={[styles.timerPill, urgent && styles.timerPillUrgent]}>
            <Text style={[styles.timerText, urgent && styles.timerTextUrgent]}>
              ⏱ {formatCountdown(remaining)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg, marginBottom: 9,
    padding: 14, flexDirection: 'row', gap: 12,
    borderWidth: 1, borderColor: colors.border,
  },
  emojiBox: {
    width: 52, height: 52, borderRadius: radius.md,
    backgroundColor: colors.surface2,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  emoji: { fontSize: 26 },
  info: { flex: 1 },
  number: {
    fontSize: 9, fontFamily: fonts.body.bold, color: colors.text3,
    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2,
  },
  title: {
    fontSize: 13, fontFamily: fonts.body.bold,
    color: colors.text, lineHeight: 18,
  },
  row: {
    flexDirection: 'row', alignItems: 'flex-end',
    justifyContent: 'space-between', marginTop: 7,
  },
  bidLabel: { fontSize: 9, color: colors.text3, fontFamily: fonts.body.regular },
  bid: { fontSize: 16, fontFamily: fonts.body.extraBold, color: colors.primary },
  bidCount: { fontSize: 10, color: colors.text3, fontFamily: fonts.body.regular },
  timerPill: {
    backgroundColor: colors.surface2, borderRadius: radius.full,
    paddingHorizontal: 9, paddingVertical: 4,
  },
  timerPillUrgent: { backgroundColor: colors.dangerBg },
  timerText: { fontSize: 10, fontFamily: fonts.body.bold, color: colors.text2 },
  timerTextUrgent: { color: colors.danger },
});
