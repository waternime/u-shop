import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useShop } from './context';

export function ProductCard({ product }) {
  const { addToCart, addToWishlist, colors } = useShop();

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
        {product.name}
      </Text>
      <Text style={[styles.price, { color: colors.subText }]}>Rp{product.price.toLocaleString('id-ID')}</Text>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => addToWishlist(product)}>
          <Ionicons name="star" size={24} color="#f7c600" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => addToCart(product)}>
          <Ionicons name="add-circle" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '30.5%',
    borderRadius: 18,
    padding: 10,
    marginBottom: 14,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 78,
    borderRadius: 12,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
  },
  price: {
    fontSize: 11,
    marginTop: 2,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});