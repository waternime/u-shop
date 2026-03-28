import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useShop } from './context';

export default function HistoryScreen({ navigation }) {
  const { history, colors } = useShop();
  const [query, setQuery] = useState('');
  const [ascending, setAscending] = useState(true);

  const filteredHistory = useMemo(() => {
    const filtered = history.filter((item) =>
      item.id.toLowerCase().includes(query.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      if (ascending) return a.id.localeCompare(b.id);
      return b.id.localeCompare(a.id);
    });
  }, [history, query, ascending]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.filterRow}>
        <TextInput
          placeholder="Filter ID..."
          placeholderTextColor="#777"
          value={query}
          onChangeText={setQuery}
          style={[styles.filterInput, { backgroundColor: colors.input }]}
        />

        <TouchableOpacity style={styles.sortButton} onPress={() => setAscending((prev) => !prev)}>
          <Text style={styles.sortText}>{ascending ? 'A-Z' : 'Z-A'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.code, { color: colors.text }]}>Code: {item.id}</Text>
            <Text style={[styles.total, { color: colors.text }]}>
              Total : Rp{item.total.toLocaleString('id-ID')}
            </Text>

            <TouchableOpacity
              style={[styles.detailButton, { backgroundColor: colors.accent }]}
              onPress={() => navigation.navigate('HistoryDetail', { transaction: item })}
            >
              <Text style={styles.detailText}>Detail</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.text }]}>Belum ada history</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  filterInput: {
    flex: 1,
    height: 42,
    borderRadius: 20,
    paddingHorizontal: 14,
    marginRight: 10,
  },
  sortButton: {
    backgroundColor: '#b8c8b2',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 18,
  },
  sortText: {
    fontWeight: '700',
  },
  card: {
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    elevation: 4,
  },
  code: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  total: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  detailButton: {
    alignSelf: 'center',
    paddingHorizontal: 34,
    paddingVertical: 12,
    borderRadius: 20,
  },
  detailText: {
    color: 'white',
    fontWeight: '700',
  },
  empty: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
});