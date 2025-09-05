
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, Filter, ShoppingCart, Star, Heart, Zap, Droplets, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const { toast } = useToast();

  const categories = [
    { id: 'all', name: 'All Products', icon: '🌿' },
    { id: 'sensors', name: 'Smart Sensors', icon: '📡' },
    { id: 'pots', name: 'Smart Pots', icon: '🪴' },
    { id: 'tools', name: 'Garden Tools', icon: '🛠️' },
    { id: 'seeds', name: 'Seeds & Plants', icon: '🌱' },
    { id: 'soil', name: 'Soil & Fertilizer', icon: '🌍' }
  ];

  const products = [
    {
      id: 1,
      name: 'Smart Plant Monitor',
      category: 'sensors',
      price: 49.99,
      rating: 4.8,
      reviews: 124,
      image: 'Smart plant monitoring device with sensors in white pot',
      description: 'Monitor soil moisture, light, and temperature with real-time alerts',
      features: ['Bluetooth connectivity', 'Mobile app', 'Long battery life'],
      badge: 'Best Seller'
    },
    {
      id: 2,
      name: 'Self-Watering Planter',
      category: 'pots',
      price: 34.99,
      rating: 4.6,
      reviews: 89,
      image: 'Modern self-watering planter with water level indicator',
      description: 'Automatic watering system keeps plants perfectly hydrated',
      features: ['2-week water reservoir', 'Overflow protection', 'Modern design'],
      badge: 'New'
    },
    {
      id: 3,
      name: 'LED Grow Light',
      category: 'tools',
      price: 79.99,
      rating: 4.9,
      reviews: 156,
      image: 'Full spectrum LED grow light panel for indoor plants',
      description: 'Full spectrum LED light for optimal plant growth',
      features: ['Full spectrum', 'Timer function', 'Energy efficient'],
      badge: 'Premium'
    },
    {
      id: 4,
      name: 'Herb Garden Starter Kit',
      category: 'seeds',
      price: 24.99,
      rating: 4.7,
      reviews: 203,
      image: 'Complete herb garden starter kit with seeds and pots',
      description: 'Everything you need to start your indoor herb garden',
      features: ['5 herb varieties', 'Biodegradable pots', 'Growing guide'],
      badge: 'Popular'
    },
    {
      id: 5,
      name: 'Premium Potting Mix',
      category: 'soil',
      price: 19.99,
      rating: 4.5,
      reviews: 78,
      image: 'Organic premium potting soil mix bag',
      description: 'Nutrient-rich organic potting mix for healthy plant growth',
      features: ['Organic ingredients', 'Slow-release fertilizer', '20L bag'],
      badge: 'Organic'
    },
    {
      id: 6,
      name: 'Smart Irrigation System',
      category: 'sensors',
      price: 129.99,
      rating: 4.8,
      reviews: 67,
      image: 'Automated smart irrigation system with multiple plant connections',
      description: 'Automated watering system for multiple plants',
      features: ['WiFi enabled', 'App control', 'Weather integration'],
      badge: 'Smart'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const toggleWishlist = (productId) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      description: "Wishlist functionality will be available soon.",
    });
  };

  const getBadgeColor = (badge) => {
    const colors = {
      'Best Seller': 'bg-green-500',
      'New': 'bg-blue-500',
      'Premium': 'bg-purple-500',
      'Popular': 'bg-orange-500',
      'Organic': 'bg-emerald-500',
      'Smart': 'bg-indigo-500'
    };
    return colors[badge] || 'bg-gray-500';
  };

  return (
    <>
      <Helmet>
        <title>Smart Garden Shop - Premium Plant Care Products | Verdant.AI</title>
        <meta name="description" content="Shop smart gardening products, sensors, tools, and premium plant care items. Everything you need for a thriving garden." />
      </Helmet>

      <div className="min-h-screen pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Smart Garden <span className="gradient-text">Shop</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover premium smart gardening products, sensors, and tools to transform your plant care experience.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Cart */}
              <div className="flex items-center space-x-4">
                <Button variant="outline" className="relative">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart ({cart.length})
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${
                    selectedCategory === category.id
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'border-green-300 text-green-700 hover:bg-green-50'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative">
                  <img  
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={product.name}
                   src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className={`absolute top-3 left-3 ${getBadgeColor(product.badge)} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                      {product.badge}
                    </div>
                  )}
                  
                  {/* Wishlist */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-600 hover:text-red-500"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  
                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {product.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Price and Add to Cart */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">
                      ${product.price}
                    </span>
                    <Button
                      onClick={() => addToCart(product)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Products Found */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;
