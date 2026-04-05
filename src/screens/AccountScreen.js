import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Linking, Alert, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius, shadow } from '../theme';

const MENU = [
  { icon: 'receipt-outline',            label: 'My Invoices',              badge: '2' },
  { icon: 'heart-outline',              label: 'Watchlist',                badge: '7' },
  { icon: 'card-outline',               label: 'Payment Methods' },
  { icon: 'calendar-outline',           label: 'Schedule Pickup' },
  { icon: 'notifications-outline',      label: 'Notifications',            badge: '3' },
  { icon: 'location-outline',           label: 'Pickup Instructions' },
  { icon: 'briefcase-outline',          label: 'Consign With Us' },
  { icon: 'help-circle-outline',        label: 'How Proxy Bidding Works' },
  { icon: 'information-circle-outline', label: 'About NM Auctions' },
];

const STATS = [
  { value: '12',     label: 'Auctions\nWon' },
  { value: '3',      label: 'Active\nBids' },
  { value: '$2,340', label: 'Total\nSpent' },
];

export default function AccountScreen() {
  const go = (url) => Linking.openURL(url).catch(() => {});
  const alert = (label) =>
    Alert.alert(label, 'This feature connects to the live NM Auctions backend once integrated.');

  return (
    <View style={styles.flex}>
      <SafeAreaView edges={['top']} style={styles.headerSafe}>
        {/* Gold accent bar */}
        <View style={styles.goldBar} />
        <View style={styles.profileRow}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.statsRow}>
          {STATS.map(({ value, label }) => (
            <View key={label} style={styles.statBox}>
              <Text style={styles.statValue}>{value}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Pickup reminder */}
        <View style={[styles.pickupCard, shadow.sm]}>
          <View style={styles.pickupAccent} />
          <Text style={styles.pickupEmoji}>📅</Text>
          <View style={styles.pickupText}>
            <Text style={styles.pickupTitle}>Pickup This Weekend</Text>
            <Text style={styles.pickupSub}>Saturday & Sunday  ·  9:00 AM – 1:00 PM</Text>
            <Text style={styles.pickupAddr}>210 S Nevarez St, Las Cruces, NM</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={[styles.menuCard, shadow.sm]}>
          {MENU.map(({ icon, label, badge }, i) => (
            <React.Fragment key={label}>
              <TouchableOpacity
                onPress={() => alert(label)}
                style={styles.menuRow}
                activeOpacity={0.7}
              >
                <View style={styles.menuLeft}>
                  <View style={styles.iconBox}>
                    <Ionicons name={icon} size={19} color={colors.primary} />
                  </View>
                  <Text style={styles.menuLabel}>{label}</Text>
                </View>
                <View style={styles.menuRight}>
                  {badge && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{badge}</Text>
                    </View>
                  )}
                  <Ionicons name="chevron-forward" size={15} color={colors.text3} />
                </View>
              </TouchableOpacity>
              {i < MENU.length - 1 && <View style={styles.menuDivider} />}
            </React.Fragment>
          ))}
        </View>

        {/* Contact */}
        <View style={[styles.contactCard, shadow.sm]}>
          <Text style={styles.contactTitle}>NM Auctions</Text>
          <Text style={styles.contactSub}>
            Innovative Auction, Liquidation & Estate Sales{'\n'}
            Mesilla Valley Estate Sales, LLC
          </Text>
          {[
            { icon: 'call-outline',    text: '(575) 639-0213',              action: () => go('tel:5756390213') },
            { icon: 'mail-outline',    text: 'admin@nmestateauctions.com',  action: () => go('mailto:admin@nmestateauctions.com') },
            { icon: 'globe-outline',   text: 'nmestateauctions.com',        action: () => go('https://nmestateauctions.com') },
            { icon: 'location-outline',text: '210 S Nevarez St\nLas Cruces, NM 88001', action: null },
          ].map(({ icon, text, action }) => (
            <TouchableOpacity
              key={text} onPress={action ?? undefined}
              style={styles.contactRow} activeOpacity={action ? 0.7 : 1}
            >
              <Ionicons name={icon} size={16} color={colors.accent} />
              <Text style={[styles.contactText, action && styles.contactLink]}>
                {text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign out */}
        <TouchableOpacity
          style={[styles.signOutBtn, shadow.sm]}
          activeOpacity={0.8}
          onPress={() => Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Sign Out', style: 'destructive' },
          ])}
        >
          <Ionicons name="log-out-outline" size={18} color={colors.danger} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.bg },
  headerSafe: { backgroundColor: colors.primary, paddingHorizontal: spacing.xl, paddingBottom: spacing.lg },
  goldBar: { height: 3, backgroundColor: colors.accent, marginBottom: 14 },
  profileRow: { alignItems: 'flex-start' },
  logo: { width: 210, height: 70 },
  avatar: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 2.5, borderColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 28 },
  tag: {
    color: colors.accent, fontSize: 9,
    fontFamily: fonts.body.bold, textTransform: 'uppercase', letterSpacing: 0.8,
  },
  welcome:  { color: 'white', fontSize: 20, fontFamily: fonts.display.bold, marginTop: 1 },
  location: { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontFamily: fonts.body.regular, marginTop: 1 },
  statsRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  statBox: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: radius.md, paddingVertical: 11, alignItems: 'center',
  },
  statValue: { color: 'white', fontFamily: fonts.body.extraBold, fontSize: 17 },
  statLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontFamily: fonts.body.regular, textAlign: 'center', marginTop: 2 },

  scroll: { flex: 1 },
  scrollContent: { padding: spacing.xl, paddingBottom: 44, gap: spacing.md },

  pickupCard: {
    backgroundColor: colors.surface, borderRadius: radius.lg,
    padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12,
    borderWidth: 1, borderColor: colors.border, overflow: 'hidden',
  },
  pickupAccent: {
    position: 'absolute', left: 0, top: 0, bottom: 0,
    width: 4, backgroundColor: colors.accent,
  },
  pickupEmoji: { fontSize: 30, marginLeft: 4 },
  pickupText: { flex: 1 },
  pickupTitle: { fontFamily: fonts.body.bold, fontSize: 14, color: colors.text },
  pickupSub:   { fontFamily: fonts.body.regular, fontSize: 12, color: colors.text2, marginTop: 2 },
  pickupAddr:  { fontFamily: fonts.body.regular, fontSize: 11, color: colors.text3, marginTop: 1 },

  menuCard: { backgroundColor: colors.surface, borderRadius: radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  menuRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: {
    width: 36, height: 36, borderRadius: radius.sm,
    backgroundColor: colors.primary + '12',
    alignItems: 'center', justifyContent: 'center',
  },
  menuLabel: { fontSize: 14, fontFamily: fonts.body.semiBold, color: colors.text },
  menuRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  menuDivider: { height: 1, backgroundColor: colors.border, marginLeft: 64 },
  badge: {
    backgroundColor: colors.primary, borderRadius: radius.full,
    paddingHorizontal: 8, paddingVertical: 2,
  },
  badgeText: { color: 'white', fontSize: 11, fontFamily: fonts.body.bold },

  contactCard: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  contactTitle: { fontSize: 15, fontFamily: fonts.body.extraBold, color: colors.text },
  contactSub:   { fontSize: 11, color: colors.text3, fontFamily: fonts.body.regular, marginTop: 2, marginBottom: 12, lineHeight: 17 },
  contactRow:   { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
  contactText:  { flex: 1, fontSize: 13, color: colors.text2, fontFamily: fonts.body.regular, lineHeight: 18 },
  contactLink:  { color: colors.teal, fontFamily: fonts.body.semiBold },

  signOutBtn: {
    backgroundColor: colors.surface, borderRadius: radius.lg,
    borderWidth: 1.5, borderColor: colors.dangerBg,
    padding: 14, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  signOutText: { color: colors.danger, fontFamily: fonts.body.bold, fontSize: 14 },
});
