import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts, spacing } from '../theme';
import { AUCTIONS } from '../data/mockData';
import AuctionCard from '../components/AuctionCard';

export default function AuctionsScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.flex}>
      <SafeAreaView edges={['top']} style={styles.headerSafe}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>All Auctions</Text>
          <Text style={styles.sub}>This week's active sales</Text>
        </View>
      </SafeAreaView>
      <FlatList
        data={AUCTIONS}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <AuctionCard
            auction={item}
            onPress={() => navigation.navigate('AuctionDetail', { auction: item })}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.bg },
  headerSafe: { backgroundColor: colors.primary },
  header: { paddingHorizontal: spacing.xl, paddingTop: spacing.sm, paddingBottom: spacing.lg },
  logo: { width: 190, height: 64, marginBottom: 4 },
  tag: {
    color: colors.accent, fontSize: 10,
    fontFamily: fonts.body.bold, textTransform: 'uppercase', letterSpacing: 0.8,
  },
  title: { color: 'white', fontSize: 26, fontFamily: fonts.display.bold, marginTop: 1 },
  sub: { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontFamily: fonts.body.regular, marginTop: 4 },
  list: { paddingTop: spacing.lg, paddingBottom: 32 },
});
