
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-800 to-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold">Verdant.AI</span>
            </div>
            <p className="text-green-100">
              Revolutionizing plant care with AI technology. Your smart gardening companion for a greener future.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-green-300 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-green-300 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-green-300 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-green-300 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-green-300">Quick Links</span>
            <div className="space-y-2">
              <Link to="/" className="block text-green-100 hover:text-white transition-colors">Home</Link>
              <Link to="/plant-detection" className="block text-green-100 hover:text-white transition-colors">Plant Detection</Link>
              <Link to="/chatbot" className="block text-green-100 hover:text-white transition-colors">AI Chatbot</Link>
              <Link to="/shop" className="block text-green-100 hover:text-white transition-colors">Shop</Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-green-300">Services</span>
            <div className="space-y-2">
              <p className="text-green-100">Plant Identification</p>
              <p className="text-green-100">Care Recommendations</p>
              <p className="text-green-100">Smart Gardening Tools</p>
              <p className="text-green-100">Voice Assistant</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-green-300">Contact Us</span>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-400" />
                <span className="text-green-100">hello@verdant.ai</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-400" />
                <span className="text-green-100">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-400" />
                <span className="text-green-100">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 text-center">
          <p className="text-green-200">
            © 2024 Verdant.AI. All rights reserved. Made with 💚 for plant lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
