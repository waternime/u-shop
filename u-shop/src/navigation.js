import React from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchScreen from './Search';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useShop } from './context';
import HomeScreen from './Home';
import WishlistScreen from './Wishlist';
import CartScreen from './Cart';
import HistoryScreen from './History';
import DetailScreen from './Detail';
import ProfileScreen from './Profile';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function CustomDrawerContent(props) {
  const { navigation } = props;
  const { isDark, toggleTheme } = useShop();
  const insets = useSafeAreaInsets();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        backgroundColor: '#6f7880',
        paddingTop: 0,
      }}
    >
      <View style={[styles.drawerHeader, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.drawerTitle}>U-Shop</Text>
      </View>

      <View style={styles.drawerBody}>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.drawerText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Wishlist')}
        >
          <Text style={styles.drawerText}>Wishlist</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.drawerText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.drawerText}>Profile</Text>
        </TouchableOpacity>

        <View style={[styles.drawerItem, styles.switchRow]}>
          <Text style={styles.drawerText}>Dark Theme</Text>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

function HeaderLeft({ navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 12 }}>
      <Ionicons name="menu" size={24} color="white" />
    </TouchableOpacity>
  );
}

function HeaderRight({ navigation, cartCount }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 14 }}>
      <TouchableOpacity onPress={() => navigation.navigate('Search')} style={{ marginRight: 16 }}>
        <Ionicons name="search" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Ionicons name="cart-outline" size={28} color="black" />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartCount}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

function MainDrawer() {
  const { colors, cartCount } = useShop();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: colors.topBar },
        headerTitle: 'U-Shop',
        headerTitleStyle: { color: 'white', fontWeight: '700' },
        headerTintColor: 'white',
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerRight: () => <HeaderRight navigation={navigation} cartCount={cartCount} />,
      })}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Wishlist" component={WishlistScreen} />
      <Drawer.Screen name="History" component={HistoryScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  const { colors } = useShop();

  return (
    <SafeAreaProvider>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: colors.background,
          },
        }}
      >
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={MainDrawer}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{
              headerStyle: { backgroundColor: colors.topBar },
              headerTintColor: 'white',
              title: 'Search',
            }}
          />

          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{
              headerStyle: { backgroundColor: colors.topBar },
              headerTintColor: 'white',
              title: 'Cart',
            }}
          />

          <Stack.Screen
            name="HistoryDetail"
            component={DetailScreen}
            options={{
              headerStyle: { backgroundColor: colors.topBar },
              headerTintColor: 'white',
              title: 'History Detail',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  drawerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
  },
  drawerBody: {
    backgroundColor: '#2f3941',
    flex: 1,
  },
  drawerItem: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#7d7d7d',
  },
  drawerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
  },
});