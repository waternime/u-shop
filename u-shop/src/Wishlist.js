import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useShop } from './context';

export default function WishlistScreen() {
  const { wishlist, removeFromWishlist, moveWishlistToCart, colors } = useShop();

  const renderLeftActions = (item) => (
    <TouchableOpacity
      style={[styles.swipeAction, { backgroundColor: 'red' }]}
      onPress={() => removeFromWishlist(item.id)}
    >
      <Ionicons name="trash" size={28} color="black" />
    </TouchableOpacity>
  );

  const renderRightActions = (item) => (
    <TouchableOpacity
      style={[styles.swipeAction, { backgroundColor: '#19ff22' }]}
      onPress={() => moveWishlistToCart(item)}
    >
      <Ionicons name="cart" size={28} color="black" />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Swipeable
            renderLeftActions={() => renderLeftActions(item)}
            renderRightActions={() => renderRightActions(item)}
          >
            <View style={[styles.row, { borderBottomColor: colors.border }]}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View>
                <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
                <Text style={[styles.price, { color: colors.subText }]}>
                  Rp{item.price.toLocaleString('id-ID')}
                </Text>
              </View>
            </View>
          </Swipeable>
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.text }]}>
            Wishlist masih kosong
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 10,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
  },
  price: {
    fontSize: 14,
    marginTop: 4,
  },
  swipeAction: {
    width: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
});