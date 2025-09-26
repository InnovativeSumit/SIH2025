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
  Linking,
  Share,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

interface FarmingResource {
  id: string;
  name: string;
  description: string;
  image: { uri: string };
  category: string;
  content: string;
  tips: string[];
  externalLink?: string;
}

// Mock Data for Farming Resources with URL images
const allResources: FarmingResource[] = [
  {
    id: "r1",
    name: "Soil Health Management",
    description: "Complete guide to maintaining and improving soil health for better crop yields.",
    image: { uri: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400" },
    category: "soil",
    content: `Soil health is the foundation of successful farming. Healthy soil provides essential nutrients, proper drainage, and a suitable environment for plant growth.

Key Components:
• Organic Matter: Improves soil structure and nutrient retention
• pH Balance: Affects nutrient availability (ideal range 6.0-7.0)
• Soil Structure: Determines water infiltration and root penetration
• Microbial Activity: Essential for nutrient cycling

Testing Your Soil:
Regular soil testing helps determine nutrient levels, pH, and organic matter content. Test every 2-3 years or when changing crops.

Improving Soil Health:
1. Add organic matter through compost or manure
2. Practice crop rotation to prevent nutrient depletion
3. Use cover crops to protect and enrich soil
4. Minimize tillage to preserve soil structure
5. Apply lime to correct acidic soils`,
    tips: [
      "Test soil pH annually using a digital pH meter",
      "Add 2-3 inches of compost annually to improve organic matter",
      "Plant legumes to naturally fix nitrogen in soil",
      "Avoid working wet soil to prevent compaction"
    ],
    externalLink: "https://www.nrcs.usda.gov/conservation/soil-health"
  },
  {
    id: "r2",
    name: "Water Management & Irrigation",
    description: "Efficient water management techniques for sustainable farming.",
    image: { uri: "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deae?w=400" },
    category: "water",
    content: `Water is a critical resource in agriculture. Proper water management ensures optimal crop growth while conserving this precious resource.

Irrigation Methods:
• Drip Irrigation: Most efficient, delivers water directly to roots
• Sprinkler Systems: Good for large areas, mimics natural rainfall
• Furrow Irrigation: Traditional method, suitable for row crops
• Micro-sprinklers: Ideal for orchards and vineyards

Water Conservation Strategies:
1. Install moisture sensors to monitor soil water content
2. Use mulching to reduce evaporation
3. Collect and store rainwater for dry periods
4. Choose drought-resistant crop varieties
5. Schedule irrigation during cooler hours`,
    tips: [
      "Water early morning (5-8 AM) to minimize evaporation",
      "Check soil moisture 6 inches deep before irrigating",
      "Use rain gauges to track natural precipitation",
      "Install timers for consistent irrigation schedules"
    ],
    externalLink: "https://www.irrigation.org/"
  },
  {
    id: "r3",
    name: "Integrated Pest Management",
    description: "Sustainable pest control strategies to protect crops while maintaining ecological balance.",
    image: { uri: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400" },
    category: "pest",
    content: `Integrated Pest Management (IPM) combines multiple strategies to control pests effectively while minimizing environmental impact.

IPM Principles:
1. Prevention: Use resistant varieties and proper sanitation
2. Monitoring: Regular scouting to identify pest problems early
3. Identification: Correctly identify pests and beneficial insects
4. Treatment: Use targeted, least-toxic control methods

Biological Control:
• Encourage beneficial insects like ladybugs and parasitic wasps
• Use bacterial insecticides (Bt) for specific pests
• Introduce predatory mites for spider mite control
• Plant companion crops that repel pests

Cultural Controls:
• Crop rotation to break pest life cycles
• Proper spacing for air circulation
• Timely planting to avoid peak pest periods
• Sanitation to remove pest breeding sites`,
    tips: [
      "Scout fields weekly during growing season",
      "Keep records of pest problems and treatments",
      "Learn to identify beneficial insects",
      "Use pheromone traps for monitoring"
    ],
    externalLink: "https://www.epa.gov/ipm"
  },
  {
    id: "r4",
    name: "Crop Rotation Planning",
    description: "Strategic crop rotation for improved soil health and pest management.",
    image: { uri: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400" },
    category: "crop",
    content: `Crop rotation is the practice of growing different crops in the same field across seasons or years. This ancient technique provides numerous benefits for sustainable farming.

Benefits of Crop Rotation:
• Breaks pest and disease cycles
• Improves soil fertility naturally
• Reduces weed pressure
• Enhances soil structure
• Increases biodiversity

Planning Your Rotation:
1. Group crops by families (avoid planting related crops consecutively)
2. Include nitrogen-fixing legumes
3. Alternate deep and shallow-rooted crops
4. Consider market demands and profitability
5. Plan for 3-4 year cycles minimum

Sample 4-Year Rotation:
Year 1: Corn (heavy nitrogen feeder)
Year 2: Soybeans (nitrogen fixer)
Year 3: Wheat (different family, winter crop)
Year 4: Clover/Pasture (soil building)`,
    tips: [
      "Keep detailed records of what was planted where",
      "Include cover crops in rotation plans",
      "Consider cash crops and soil-building crops",
      "Plan rotations 3-5 years in advance"
    ],
    externalLink: "https://www.sare.org/publications/crop-rotation/"
  },
  {
    id: "r5",
    name: "Modern Farm Technology",
    description: "Leveraging technology for precision agriculture and improved efficiency.",
    image: { uri: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400" },
    category: "technology",
    content: `Modern technology is revolutionizing agriculture, making farming more precise, efficient, and sustainable.

Precision Agriculture Tools:
• GPS-guided tractors for accurate field operations
• Drones for crop monitoring and spraying
• Soil sensors for real-time monitoring
• Variable rate technology for precise input application
• Satellite imagery for field analysis

Farm Management Software:
• Record keeping and compliance tracking
• Financial management and budgeting
• Crop planning and rotation scheduling
• Weather monitoring and forecasting
• Market price tracking

IoT and Smart Farming:
• Automated irrigation systems
• Livestock monitoring devices
• Environmental sensors
• Remote equipment monitoring
• Predictive analytics for decision making`,
    tips: [
      "Start with simple technologies and gradually upgrade",
      "Invest in training to maximize technology benefits",
      "Choose compatible systems that work together",
      "Regular maintenance keeps technology reliable"
    ],
    externalLink: "https://www.precisionag.com/"
  },
  {
    id: "r6",
    name: "Agricultural Finance & Budgeting",
    description: "Financial planning and management strategies for successful farm operations.",
    image: { uri: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400" },
    category: "finance",
    content: `Effective financial management is crucial for farm success. Proper budgeting and financial planning help ensure profitability and sustainability.

Farm Budgeting Basics:
• Enterprise budgets for each crop/livestock
• Cash flow projections for seasonal planning
• Capital budgets for equipment and infrastructure
• Risk management and insurance planning
• Tax planning and record keeping

Key Financial Metrics:
• Gross margin per acre/animal
• Return on investment (ROI)
• Debt-to-asset ratio
• Working capital requirements
• Break-even analysis

Cost Management:
1. Track all input costs accurately
2. Negotiate better prices for bulk purchases
3. Maintain equipment to reduce repair costs
4. Optimize labor efficiency
5. Monitor fuel and energy consumption`,
    tips: [
      "Keep detailed records of all income and expenses",
      "Review and update budgets regularly",
      "Build emergency funds for unexpected costs",
      "Compare actual vs. budgeted performance"
    ],
    externalLink: "https://www.extension.org/farm-financial-management/"
  }
];

const dropdownOptions = [
  { label: "All Resources", value: "all" },
  { label: "Soil Health", value: "soil" },
  { label: "Water Management", value: "water" },
  { label: "Pest Control", value: "pest" },
  { label: "Crop Management", value: "crop" },
  { label: "Technology", value: "technology" },
  { label: "Finance", value: "finance" },
];

// Resource Card Component
type ResourceItem = {
  id: string;
  name: string;
  description: string;
  image: { uri: string };
  category: string;
  content: string;
  tips: string[];
  externalLink?: string;
};

const ResourceCard = ({ item }: { item: ResourceItem }) => {
  const handleReadNow = () => {
    Alert.alert(
      item.name,
      item.content,
      [
        { text: "Close", style: "cancel" },
        { 
          text: "Share", 
          onPress: () => {
            Share.share({
              message: `${item.name}\n\n${item.content}\n\nTips:\n${item.tips.map(tip => `• ${tip}`).join('\n')}`,
              title: item.name,
            });
          }
        },
        ...(item.externalLink ? [{
          text: "Learn More",
          onPress: () => Linking.openURL(item.externalLink!)
        }] : [])
      ]
    );
  };

  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardName}>{item.name}</Text>
      <Text style={styles.cardDescription} numberOfLines={3}>{item.description}</Text>
      <TouchableOpacity style={styles.cardButton} onPress={handleReadNow}>
        <Text style={styles.cardButtonText}>READ NOW</Text>
      </TouchableOpacity>
    </View>
  );
};

// Main Resources Screen
export default function ResourcesScreen() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredResources = selectedCategory === "all" 
    ? allResources 
    : allResources.filter(resource => resource.category === selectedCategory);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#2e7d32", "#43a047"]} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome5 name="chevron-left" size={22} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Farming Resources</Text>
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

      {/* Resources Grid */}
      <FlatList
        data={filteredResources}
        renderItem={({ item }) => <ResourceCard item={item} />}
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
  safeArea: { flex: 1, backgroundColor: "#f0f0f0" },
  header: { 
    height: 90, 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    paddingHorizontal: 20 ,
    paddingTop:20,
  },
  backButton: { padding: 10 },
  headerTitle: { color: "white", fontSize: 22, fontWeight: "bold" },
  
  // Filter Styles
  filterContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginRight: 15,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
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
    height: 60, // Fixed height to align buttons
    lineHeight: 18,
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
