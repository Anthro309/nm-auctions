import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  TextInput, StyleSheet, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius, shadow } from '../theme';
import { useCountdown, formatCountdown } from '../hooks/useCountdown';

const COND_COLOR = {
  'Excellent': colors.success,
  'Like New':  colors.teal,
  'Good':      colors.primary,
  'Fair':      colors.warning,
};

export default function LotDetailScreen() {
  const navigation = useNavigation();
  const { lot, auction } = useRoute().params;

  const remaining = useCountdown(lot.ends);
  const urgent    = remaining > 0 && remaining < 3600000;

  const [mode,     setMode]     = useState('standard'); // standard | proxy
  const [amount,   setAmount]   = useState('');
  const [proxyMax, setProxyMax] = useState('');
  const [bidState, setBidState] = useState('idle');     // idle | loading | success

  const minBid = (lot.currentBid + 2.0).toFixed(2);
  const condColor = COND_COLOR[lot.condition] ?? colors.text3;
  const inputVal  = mode === 'proxy' ? proxyMax : amount;
  const setInputVal = mode === 'proxy' ? setProxyMax : setAmount;

  const handleBid = () => {
    const val = parseFloat(inputVal);
    if (!val || val < parseFloat(minBid)) return;
    setBidState('loading');
    setTimeout(() => setBidState('success'), 1600);
  };

  return (
    <View style={styles.flex}>
      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.headerSafe}>
        <View style={styles.headerInner}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.75}>
            <Ionicons name="arrow-back" size={17} color="white" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.auctionLabel} numberOfLines={1}>{auction.title}</Text>
        </View>
        <View style={styles.goldBar} />
        <Text style={styles.lotNum}>{lot.number}</Text>
        <Text style={styles.lotTitle}>{lot.title}</Text>
      </SafeAreaView>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>{lot.emoji}</Text>
        </View>

        {/* Bid status */}
        <View style={[styles.card, shadow.sm]}>
          <View style={styles.bidRow}>
            <View>
              <Text style={styles.cardLabel}>Current Bid</Text>
              <Text style={styles.bidAmount}>${lot.currentBid.toFixed(2)}</Text>
              <Text style={styles.bidCount}>{lot.bids} bids placed</Text>
            </View>
            <View style={styles.bidRight}>
              <Text style={styles.cardLabel}>Closes In</Text>
              <Text style={[styles.closesIn, urgent && styles.closesUrgent]}>
                {formatCountdown(remaining)}
              </Text>
              <View style={[styles.condPill, { backgroundColor: condColor + '20', borderColor: condColor + '55' }]}>
                <Text style={[styles.condText, { color: condColor }]}>{lot.condition}</Text>
              </View>
            </View>
          </View>
          <View style={styles.divider} />
          <Text style={styles.pickupLine}>
            📍 Pickup: 210 S Nevarez St, Las Cruces, NM  ·  Sat–Sun 9 am–1 pm
          </Text>
        </View>

        {/* Mode toggle */}
        <View style={[styles.modeRow, shadow.sm]}>
          {[
            { id: 'standard', label: '🔨  Place Bid' },
            { id: 'proxy',    label: '🤖  Proxy Bid' },
          ].map(({ id, label }) => (
            <TouchableOpacity
              key={id} onPress={() => setMode(id)}
              style={[styles.modeBtn, mode === id && styles.modeBtnOn]}
              activeOpacity={0.8}
            >
              <Text style={[styles.modeBtnText, mode === id && styles.modeBtnTextOn]}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bid input / success */}
        {bidState === 'success' ? (
          <View style={[styles.successCard, shadow.sm]}>
            <Text style={styles.successEmoji}>🎉</Text>
            <Text style={styles.successTitle}>Bid Placed!</Text>
            <Text style={styles.successSub}>
              We'll email you if someone outbids you.
            </Text>
          </View>
        ) : (
          <View style={[styles.card, shadow.sm]}>
            {mode === 'proxy' && (
              <View style={styles.proxyHint}>
                <Text style={styles.proxyHintText}>
                  🤖  Enter your maximum — we bid incrementally on your behalf, keeping you in the lead up to your limit without you having to watch.
                </Text>
              </View>
            )}
            <Text style={styles.cardLabel}>
              {mode === 'proxy' ? 'Your Maximum Bid' : 'Your Bid'}
              {'  '}
              <Text style={styles.minLabel}>(min ${minBid})</Text>
            </Text>
            <View style={styles.inputRow}>
              <View style={styles.inputBox}>
                <Text style={styles.dollar}>$</Text>
                <TextInput
                  value={inputVal} onChangeText={setInputVal}
                  placeholder={minBid} placeholderTextColor={colors.text3}
                  keyboardType="decimal-pad"
                  style={styles.input}
                />
              </View>
              <TouchableOpacity
                onPress={handleBid}
                disabled={bidState === 'loading'}
                style={[styles.bidBtn, bidState === 'loading' && styles.bidBtnLoading]}
                activeOpacity={0.82}
              >
                {bidState === 'loading'
                  ? <ActivityIndicator color="white" size="small" />
                  : <Text style={styles.bidBtnText}>BID</Text>
                }
              </TouchableOpacity>
            </View>
            <Text style={styles.legalNote}>
              ⚠️  A bid is a legally binding commitment to purchase.
            </Text>
          </View>
        )}

        {/* Description */}
        <View style={[styles.card, shadow.sm]}>
          <Text style={styles.cardHeading}>Item Description</Text>
          <Text style={styles.descText}>{lot.desc}</Text>
          <View style={styles.divider} />
          <Text style={[styles.cardLabel, { textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }]}>
            Payment & Pickup
          </Text>
          {[
            ['📍', '210 S Nevarez St, Las Cruces, NM 88001\nEnter via Nevarez St — exit onto E. Bowman Ave'],
            ['⏰', 'Saturday & Sunday, 9:00 AM – 1:00 PM'],
            ['💳', 'Card on file auto-charged at close, or pay cash at pickup'],
            ['🚛', 'Local furniture delivery available — contact for a quote'],
            ['📦', 'Shipping via FedEx / UPS — call (575) 639-0213'],
          ].map(([ic, t]) => (
            <View key={t} style={styles.pickupRow}>
              <Text style={styles.pickupIcon}>{ic}</Text>
              <Text style={styles.pickupText}>{t}</Text>
            </View>
          ))}
        </View>

        {/* Proxy explainer */}
        <View style={[styles.card, styles.infoCard, shadow.sm]}>
          <Text style={styles.cardHeading}>How Proxy Bidding Works</Text>
          <Text style={styles.infoText}>
            When you set a proxy bid, NM Auctions automatically bids in small increments on your behalf — only enough to keep you ahead — up to your stated maximum. If someone exceeds your max, you'll receive an email so you can decide whether to raise your limit.
          </Text>
          <Text style={[styles.infoText, { marginTop: 8 }]}>
            Auctions close 2 items per minute. Any bid placed in the final 2 minutes extends that lot by 2 more minutes, preventing last-second sniping and giving every bidder a fair shot.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.bg },
  headerSafe: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl, paddingBottom: spacing.lg,
  },
  headerInner: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    marginTop: spacing.md, marginBottom: 10,
  },
  backBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: radius.sm,
    paddingHorizontal: 12, paddingVertical: 7,
  },
  backText: { color: 'white', fontFamily: fonts.body.bold, fontSize: 14 },
  auctionLabel: {
    flex: 1, color: 'rgba(255,255,255,0.6)',
    fontSize: 11, fontFamily: fonts.body.semiBold,
  },
  goldBar: { height: 3, backgroundColor: colors.accent, marginBottom: 10 },
  lotNum: {
    color: 'rgba(255,255,255,0.5)', fontSize: 10,
    fontFamily: fonts.body.bold, textTransform: 'uppercase', letterSpacing: 0.5,
  },
  lotTitle: {
    color: 'white', fontSize: 19,
    fontFamily: fonts.display.bold, lineHeight: 25, marginTop: 2,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 44 },
  hero: {
    backgroundColor: colors.surface2, height: 180,
    alignItems: 'center', justifyContent: 'center',
  },
  heroEmoji: { fontSize: 90 },
  card: {
    backgroundColor: colors.surface, borderRadius: radius.lg,
    marginHorizontal: spacing.xl, marginTop: spacing.md,
    padding: spacing.lg, borderWidth: 1, borderColor: colors.border,
  },
  bidRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardLabel: { fontSize: 10, color: colors.text3, fontFamily: fonts.body.regular },
  bidAmount: {
    fontSize: 34, fontFamily: fonts.body.extraBold,
    color: colors.primary, lineHeight: 40,
  },
  bidCount: { fontSize: 11, color: colors.text3, fontFamily: fonts.body.regular, marginTop: 1 },
  bidRight: { alignItems: 'flex-end' },
  closesIn: { fontSize: 20, fontFamily: fonts.body.extraBold, color: colors.text },
  closesUrgent: { color: colors.danger },
  condPill: {
    marginTop: 6, borderRadius: radius.full, borderWidth: 1,
    paddingHorizontal: 10, paddingVertical: 3,
  },
  condText: { fontSize: 10, fontFamily: fonts.body.bold },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 12 },
  pickupLine: { fontSize: 11, color: colors.text3, fontFamily: fonts.body.regular, lineHeight: 16 },
  modeRow: {
    flexDirection: 'row', backgroundColor: colors.surface,
    borderRadius: radius.md, marginHorizontal: spacing.xl, marginTop: spacing.md,
    overflow: 'hidden', borderWidth: 1, borderColor: colors.border,
  },
  modeBtn: { flex: 1, paddingVertical: 11, alignItems: 'center' },
  modeBtnOn: { backgroundColor: colors.primary },
  modeBtnText: { fontSize: 13, fontFamily: fonts.body.bold, color: colors.text2 },
  modeBtnTextOn: { color: 'white' },
  proxyHint: {
    backgroundColor: colors.surface2, borderRadius: radius.sm,
    padding: 10, marginBottom: 12,
  },
  proxyHintText: {
    fontSize: 12, color: colors.text2,
    fontFamily: fonts.body.regular, lineHeight: 18,
  },
  minLabel: { fontFamily: fonts.body.regular, color: colors.text3 },
  inputRow: { flexDirection: 'row', gap: 8, marginTop: 6 },
  inputBox: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    borderWidth: 2, borderColor: colors.primary,
    borderRadius: radius.md, paddingHorizontal: 12,
  },
  dollar: { fontSize: 18, fontFamily: fonts.body.extraBold, color: colors.text3, marginRight: 4 },
  input: {
    flex: 1, fontSize: 22, fontFamily: fonts.body.extraBold,
    color: colors.text, paddingVertical: 11,
  },
  bidBtn: {
    backgroundColor: colors.primary, borderRadius: radius.md,
    paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', minWidth: 74,
  },
  bidBtnLoading: { backgroundColor: colors.text3 },
  bidBtnText: { color: 'white', fontSize: 15, fontFamily: fonts.body.extraBold },
  legalNote: { fontSize: 11, color: colors.text3, fontFamily: fonts.body.regular, marginTop: 10 },
  successCard: {
    backgroundColor: colors.successBg, borderRadius: radius.lg,
    marginHorizontal: spacing.xl, marginTop: spacing.md,
    padding: spacing.xl, alignItems: 'center',
    borderWidth: 2, borderColor: colors.success,
  },
  successEmoji: { fontSize: 50 },
  successTitle: {
    fontSize: 19, fontFamily: fonts.display.bold,
    color: colors.success, marginTop: 8,
  },
  successSub: {
    fontSize: 13, color: colors.text2,
    fontFamily: fonts.body.regular, marginTop: 5, textAlign: 'center',
  },
  cardHeading: { fontSize: 14, fontFamily: fonts.body.bold, color: colors.text, marginBottom: 8 },
  descText: { fontSize: 13, color: colors.text2, fontFamily: fonts.body.regular, lineHeight: 21 },
  pickupRow: { flexDirection: 'row', gap: 9, marginBottom: 8, alignItems: 'flex-start' },
  pickupIcon: { fontSize: 13, marginTop: 2 },
  pickupText: { flex: 1, fontSize: 12, color: colors.text2, fontFamily: fonts.body.regular, lineHeight: 18 },
  infoCard: { backgroundColor: colors.surface2 },
  infoText: { fontSize: 12, color: colors.text2, fontFamily: fonts.body.regular, lineHeight: 19 },
});
