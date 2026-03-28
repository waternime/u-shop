import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { useShop } from './context';
import { ProductCard } from './components';

export default function HomeScreen() {
  const { products, colors } = useShop();

  const featured = products.filter((item) => item.featured).slice(0, 5);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.sliderContainer, { backgroundColor: colors.background }]}>
        <Swiper
          autoplay
          autoplayTimeout={3}
          height={250}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          removeClippedSubviews={false}
        >
          {featured.map((item) => (
            <View key={item.id} style={styles.slide}>
              <Image
                source={{ uri: item.image }}
                style={styles.slideImage}
                resizeMode="cover"
              />
              <Text style={styles.slideTitle} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.slideSub}>50% Off</Text>
            </View>
          ))}
        </Swiper>
      </View>

      <View style={[styles.panelSection, { backgroundColor: colors.panel }]}>
        <FlatList
          data={products.slice(0, 6)}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => <ProductCard product={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  sliderContainer: {
    height: 255,
    justifyContent: 'center',
  },

  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 8,
  },

  slideImage: {
    width: '78%',
    height: 165,
    borderRadius: 20,
  },

  slideTitle: {
    width: '78%',
    marginTop: 10,
    fontSize: 17,
    fontWeight: '700',
    color: 'black',
    textAlign: 'left',
  },

  slideSub: {
    width: '78%',
    marginTop: 2,
    fontSize: 12,
    fontWeight: '700',
    color: 'black',
    textAlign: 'left',
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f1f0f0',
    marginBottom: -10,
  },

  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#5b6b6d',
    marginBottom: -10,
  },

  panelSection: {
    flex: 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },

  row: {
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  listContent: {
    paddingHorizontal: 14,
    paddingTop: 18,
    paddingBottom: 40,
  },
});