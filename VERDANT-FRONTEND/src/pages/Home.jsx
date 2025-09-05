
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Camera, MessageCircle, ShoppingBag, Sparkles, Users, Award, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  const features = [
    {
      icon: Camera,
      title: 'AI Plant Detection',
      description: 'Upload a photo and instantly identify any plant with our advanced AI technology.',
      link: '/plant-detection'
    },
    {
      icon: MessageCircle,
      title: 'Multilingual Chatbot',
      description: 'Get plant care advice in English, Hindi, Bengali, and more Indian languages.',
      link: '/chatbot'
    },
    {
      icon: ShoppingBag,
      title: 'Smart Garden Shop',
      description: 'Discover smart gardening tools, sensors, and premium plant care products.',
      link: '/shop'
    }
  ];

  const stats = [
    { icon: Users, number: '50K+', label: 'Happy Gardeners' },
    { icon: Leaf, number: '10K+', label: 'Plants Identified' },
    { icon: Award, number: '95%', label: 'Accuracy Rate' },
    { icon: Globe, number: '12+', label: 'Languages Supported' }
  ];

  return (
    <>
      <Helmet>
        <title>Verdant.AI - Smart Plant Care with AI Technology</title>
        <meta name="description" content="Revolutionary AI-powered plant care platform. Identify plants, get expert advice, and shop smart gardening products. Your intelligent gardening companion." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 overflow-hidden leaf-pattern">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center space-x-2 text-green-600"
                  >
                    <Sparkles className="h-5 w-5" />
                    <span className="font-medium">AI-Powered Plant Care</span>
                  </motion.div>
                  
                  <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                    Meet Your
                    <span className="gradient-text block">Smart Garden</span>
                    Assistant
                  </h1>
                  
                  <p className="text-xl text-gray-600 max-w-lg">
                    Transform your gardening experience with AI-powered plant identification, 
                    multilingual support, and smart care recommendations.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                    <Link to="/plant-detection">
                      <Camera className="mr-2 h-5 w-5" />
                      Try Plant Detection
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 text-lg">
                    <Link to="/chatbot">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Chat with AI
                    </Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="floating-animation">
                  <img  
                    className="w-full h-auto rounded-2xl shadow-2xl"
                    alt="AI plant identification technology in action"
                   src="https://images.unsplash.com/photo-1626364131837-89a92c9a84d4" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full pulse-green"></div>
                    <span className="text-sm font-medium text-gray-700">AI Active</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Powerful Features for <span className="gradient-text">Smart Gardening</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the future of plant care with our AI-powered tools designed for gardeners of all levels.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Link to={feature.link} className="block">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 h-full border border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-xl">
                      <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center text-white"
                >
                  <div className="flex justify-center mb-4">
                    <stat.icon className="h-12 w-12" />
                  </div>
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-green-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-bold text-gray-900">
                Ready to Transform Your <span className="gradient-text">Garden?</span>
              </h2>
              <p className="text-xl text-gray-600">
                Join thousands of gardeners who are already using AI to grow healthier, happier plants.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                  <Link to="/plant-detection">
                    Get Started Free
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 text-lg">
                  <Link to="/about">
                    Learn More
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
