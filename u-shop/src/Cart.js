import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useShop } from './context';

export default function CartScreen() {
  const { cart, increaseQty, decreaseQty, totalPrice, checkout, colors } = useShop();

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Info', 'Cart masih kosong');
      return;
    }

    checkout();
    Alert.alert('Berhasil', 'Checkout sukses, transaksi masuk ke history');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.row, { borderBottomColor: colors.border }]}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={{ flex: 1 }}>
              <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
              <Text style={[styles.price, { color: colors.subText }]}>
                Rp{item.price.toLocaleString('id-ID')}
              </Text>
            </View>

            <View style={styles.qtyBox}>
              <TouchableOpacity onPress={() => decreaseQty(item.id)}>
                <Text style={styles.qtyBtn}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => increaseQty(item.id)}>
                <Text style={styles.qtyBtn}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.text }]}>Cart masih kosong</Text>
        }
        ListFooterComponent={
          cart.length > 0 ? (
            <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
              {cart.map((item) => (
                <View key={item.id} style={styles.summaryRow}>
                  <Text style={{ color: colors.text }}>
                    {item.name} ({item.quantity}x)
                  </Text>
                  <Text style={{ color: colors.text }}>
                    Rp{(item.price * item.quantity).toLocaleString('id-ID')}
                  </Text>
                </View>
              ))}

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              <Text style={[styles.totalText, { color: colors.text }]}>
                Total : Rp{totalPrice.toLocaleString('id-ID')}
              </Text>

              <TouchableOpacity
                style={[styles.checkoutButton, { backgroundColor: colors.accent }]}
                onPress={handleCheckout}
              >
                <Text style={styles.checkoutText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          ) : null
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
  qtyBox: {
    width: 90,
    height: 38,
    backgroundColor: 'white',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  qtyBtn: {
    fontSize: 20,
    fontWeight: '800',
  },
  qtyValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  summaryCard: {
    margin: 20,
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  totalText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 18,
  },
  checkoutButton: {
    alignSelf: 'center',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 26,
  },
  checkoutText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  empty: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
});