import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useShop } from './context';

export default function ProfileScreen() {
  const { colors } = useShop();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Image
          source={{ uri: 'https://lh3.googleusercontent.com/a/ACg8ocIHikOi9kCiqbTEuJaiaI41nLIVh5mQ2GICKCqPZBfSNbidQpo=s360-c-no' }}
          style={styles.image}
        />
        <Text style={[styles.name, { color: colors.text }]}>Hadi Kurniawan</Text>
        <Text style={[styles.nim, { color: colors.text }]}>00000064107</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  card: {
    width: '78%',
    marginTop: 80,
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    elevation: 5,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 14,
  },
  nim: {
    fontSize: 20,
    fontWeight: '700',
  },
});