import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, Stack } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

interface Product {
  id: string;
  name: string;
  description: string;
  image: { uri: string };
  category: string;
  price: string;
  rating: number;
}

// FIX: Using URI-based images instead of require() for better compatibility
const allProducts: Product[] = [
  { 
    id: "f1", 
    name: "Urea Fertilizer", 
    description: "High-nitrogen fertilizer for enhanced crop growth and yield.", 
    image: { uri: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400" }, 
    category: "fertilizer",
    price: "₹450/bag",
    rating: 4.5
  },
  { 
    id: "f2", 
    name: "Phosphate Rock", 
    description: "Essential phosphorus source for strong root development.", 
    image: { uri: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400" }, 
    category: "fertilizer",
    price: "₹380/bag",
    rating: 4.3
  },
  { 
    id: "f3", 
    name: "Potash Fertilizer", 
    description: "Potassium-rich fertilizer for improved fruit quality.", 
    image: { uri: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400" }, 
    category: "fertilizer",
    price: "₹520/bag",
    rating: 4.6
  },
  { 
    id: "p1", 
    name: "Neem Oil", 
    description: "Organic pest control solution safe for crops and environment.", 
    image: { uri: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400" }, 
    category: "pesticide",
    price: "₹280/liter",
    rating: 4.4
  },
  { 
    id: "p2", 
    name: "Insecticidal Soap", 
    description: "Effective against soft-bodied insects and pests.", 
    image: { uri: "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deae?w=400" }, 
    category: "pesticide",
    price: "₹320/liter",
    rating: 4.2
  },
  { 
    id: "p3", 
    name: "Fungicide Spray", 
    description: "Prevents and treats fungal diseases in crops.", 
    image: { uri: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400" }, 
    category: "pesticide",
    price: "₹420/liter",
    rating: 4.5
  },
  { 
    id: "t1", 
    name: "Hand Trowel", 
    description: "Durable steel trowel for planting and soil work.", 
    image: { uri: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400" }, 
    category: "tool",
    price: "₹150/piece",
    rating: 4.1
  },
  { 
    id: "t2", 
    name: "Pruning Shears", 
    description: "Sharp and reliable shears for plant maintenance.", 
    image: { uri: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400" }, 
    category: "tool",
    price: "₹280/piece",
    rating: 4.3
  },
  { 
    id: "t3", 
    name: "Watering Can", 
    description: "Large capacity watering can for garden irrigation.", 
    image: { uri: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400" }, 
    category: "tool",
    price: "₹220/piece",
    rating: 4.0
  },
];

const dropdownOptions = [
  { label: "All Products", value: "all" },
  { label: "Fertilizers", value: "fertilizer" },
  { label: "Pesticides", value: "pesticide" },
  { label: "Tools", value: "tool" },
];

// Product Card Component
type ProductItem = {
  id: string;
  name: string;
  description: string;
  image: { uri: string };
  category: string;
  price: string;
  rating: number;
};

const ProductCard = ({ item }: { item: ProductItem }) => {
  const handleOrderNow = () => {
    Alert.alert(
      "Order Product",
      `Would you like to order ${item.name}?\n\nPrice: ${item.price}\nRating: ${item.rating}/5`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Add to Cart", onPress: () => Alert.alert("Success", "Product added to cart!") },
        { text: "Buy Now", onPress: () => Alert.alert("Success", "Redirecting to payment...") },
      ]
    );
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesome5
          key={i}
          name="star"
          size={12}
          color={i <= rating ? "#FFD700" : "#ddd"}
          solid={i <= rating}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardName}>{item.name}</Text>
      <Text style={styles.cardDescription} numberOfLines={3}>{item.description}</Text>
      <View style={styles.cardRating}>
        {renderStars(item.rating)}
        <Text style={styles.ratingText}>({item.rating})</Text>
      </View>
      <Text style={styles.cardPrice}>{item.price}</Text>
      <TouchableOpacity style={styles.cardButton} onPress={handleOrderNow}>
        <Text style={styles.cardButtonText}>ORDER NOW</Text>
      </TouchableOpacity>
    </View>
  );
};

// Main Products Screen
export default function ProductsScreen() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = selectedCategory === "all" 
    ? allProducts 
    : allProducts.filter(product => product.category === selectedCategory);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#2e7d32", "#43a047"]} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome5 name="chevron-left" size={22} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Products</Text>
        <View style={{width: 40}} />
      </LinearGradient>

      {/* Category Filter Dropdown */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Category:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          >
            {dropdownOptions.map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Products Grid */}
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ffffffff" },
  header: { 
    height: 100, 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    paddingHorizontal: 20,
    paddingTop:20
     
  },
  backButton: { padding: 20 },
  headerTitle: { color: "white", fontSize: 22, fontWeight: "bold" },
  
  // Filter Styles
  filterContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#ebebebff",
  },
  filterLabel: {
    fontSize: 19,
    fontWeight: "600",
    color: "#333",
    marginRight: 15,
  },
  pickerContainer: {
     flex:1,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 10,
    
    backgroundColor: "#ffffffff",
  },
  picker: {
    height: 40,
    color: "#333",
  },
  
  // Grid and Card Styles
  grid: { padding: 15 },
  card: {
    width: '48%',
    backgroundColor: "white",
    borderRadius: 16,
    padding: 12,
    marginBottom: 15,
    alignItems: "center",
    elevation: 3,
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 5,
    borderWidth: 2,
    borderColor: '#1c1c1c'
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#1c1c1c'
  },
  cardName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginVertical: 5,
    height: 50, // Fixed height to align buttons
    lineHeight: 16,
  },
  cardRating: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  ratingText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2e7d32",
    marginVertical: 5,
  },
  cardButton: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#1c1c1c'
  },
  cardButtonText: {
    color: "#1c1c1c",
    fontWeight: "bold",
    fontSize: 14,
  },
});
