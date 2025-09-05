
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Leaf, Users, Award, Globe, Target, Heart, Zap, Shield } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'We believe in creating a greener future through technology and education.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Cutting-edge AI technology to revolutionize plant care and gardening.'
    },
    {
      icon: Heart,
      title: 'Accessibility',
      description: 'Making plant care knowledge accessible to everyone, regardless of experience.'
    },
    {
      icon: Shield,
      title: 'Reliability',
      description: 'Trusted AI recommendations backed by horticultural expertise.'
    }
  ];

  const team = [
    {
      name: 'Anubhab Kundu',
      role: 'Team Lead',
      image: 'Professional woman in lab coat examining plants with AI technology',
      bio: 'PhD in Plant Biology with 10+ years in AI research'
    },
    {
      name: 'Sumit Pal',
      role: 'Lead Developer',
      image: 'Software developer working on plant identification app',
      bio: 'Full-stack developer passionate about sustainable technology'
    },
    {
      name: 'Supriyo Paramanik',
      role: 'AI Developer',
      image: 'Indian botanist in greenhouse with various plants',
      bio: 'Master Gardener with expertise in tropical and indoor plants'
    },
    {
      name: 'Debasish Das',
      role: 'Backend Devloper',
      image: 'Indian botanist in greenhouse with various plants',
      bio: 'Master Gardener with expertise in tropical and indoor plants'
    },
    {
      name: 'Arpita Singh',
      role: 'UI-UX Deginer',
      image: 'Indian botanist in greenhouse with various plants',
      bio: 'Master Gardener with expertise in tropical and indoor plants'
    },
    {
      name: 'Arijita Paria',
      role: 'Frontend Devloper',
      image: 'UX designer sketching plant care app interface',
      bio: 'Creating intuitive experiences for plant lovers worldwide'
    }
  ];

  const stats = [
    { icon: Users, number: '50,000+', label: 'Active Users' },
    { icon: Leaf, number: '10,000+', label: 'Plants Identified' },
    { icon: Globe, number: '12+', label: 'Languages' },
    { icon: Award, number: '95%', label: 'Accuracy Rate' }
  ];

  return (
    <>
      <Helmet>
        <title>About Verdant.AI - Our Mission & Team | Smart Plant Care</title>
        <meta name="description" content="Learn about Verdant.AI's mission to revolutionize plant care with AI technology. Meet our team of experts dedicated to making gardening accessible to everyone." />
      </Helmet>

      <div className="min-h-screen pt-20 pb-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                About <span className="gradient-text">Verdant.AI</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                We're on a mission to democratize plant care through artificial intelligence, 
                making it possible for anyone to become a successful gardener regardless of their experience level.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Target className="h-8 w-8 text-green-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  At Verdant.AI, we believe that everyone deserves to experience the joy and benefits of 
                  successful plant care. Our advanced AI technology breaks down the barriers that have 
                  traditionally made gardening intimidating for beginners.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  By combining cutting-edge machine learning with expert horticultural knowledge, 
                  we provide personalized, accurate, and accessible plant care guidance that adapts 
                  to your unique environment and experience level.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="text-center p-4 bg-green-50 rounded-xl"
                    >
                      <stat.icon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <img  
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  alt="Team working on AI plant care technology"
                 src="https://images.unsplash.com/photo-1690292885661-3818e5fe9067" />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-medium text-gray-700">AI Learning 24/7</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do at Verdant.AI
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 text-center hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Passionate experts combining AI, horticulture, and design to revolutionize plant care
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-green-100 hover:shadow-xl transition-shadow"
                >
                  <img  
                    className="w-full h-48 object-cover"
                    alt={`${member.name} - ${member.role}`}
                   src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-green-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-bold text-white">
                Join the Plant Care Revolution
              </h2>
              <p className="text-xl text-green-100">
                Be part of a community that's transforming how we care for plants with AI technology
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/plant-detection"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  Try Plant Detection
                </motion.a>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-colors"
                >
                  Get in Touch
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
