import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useShop } from './context';

export default function DetailScreen({ route }) {
  const { transaction } = route.params;
  const { colors } = useShop();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{ padding: 18 }}>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.code, { color: colors.text }]}>Code: {transaction.id}</Text>
        <Text style={[styles.label, { color: colors.text }]}>Products:</Text>

        {transaction.items.map((item, index) => (
          <Text key={item.id} style={[styles.item, { color: colors.text }]}>
            {index + 1}. {item.name} ({item.quantity}x) = Rp{(item.price * item.quantity).toLocaleString('id-ID')}
          </Text>
        ))}

        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <Text style={[styles.total, { color: colors.text }]}>Total : Rp{transaction.total.toLocaleString('id-ID')}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    marginTop: 30,
    borderRadius: 20,
    padding: 22,
    elevation: 5,
  },
  code: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  total: {
    fontSize: 20,
    fontWeight: '700',
  },
});