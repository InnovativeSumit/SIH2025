
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Camera, Upload, Loader2, CheckCircle, Droplets, Sun, Thermometer, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const PlantDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    if (!selectedImage) {
      toast({
        title: "No Image Selected",
        description: "Please upload an image first to analyze.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setResult({
        name: "Monstera Deliciosa",
        commonName: "Swiss Cheese Plant",
        confidence: 94,
        care: {
          watering: "Water when top inch of soil is dry (every 1-2 weeks)",
          sunlight: "Bright, indirect light",
          temperature: "65-80°F (18-27°C)",
          fertilizer: "Monthly during growing season",
          humidity: "40-60% humidity preferred"
        },
        tips: [
          "Wipe leaves regularly to remove dust",
          "Provide a moss pole for climbing support",
          "Watch for yellowing leaves (overwatering sign)",
          "Rotate plant weekly for even growth"
        ]
      });
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete!",
        description: "Your plant has been successfully identified.",
      });
    }, 3000);
  };

  const mockAnalyze = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      description: "AI plant detection will be available soon.",
    });
  };

  return (
    <>
      <Helmet>
        <title>AI Plant Detection - Identify Plants Instantly | Verdant.AI</title>
        <meta name="description" content="Upload a photo and instantly identify any plant with our advanced AI technology. Get detailed care instructions and expert tips." />
      </Helmet>

      <div className="min-h-screen pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              AI Plant <span className="gradient-text">Detection</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Upload a photo of any plant and get instant identification with detailed care instructions powered by advanced AI technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-green-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Camera className="mr-3 h-6 w-6 text-green-600" />
                  Upload Plant Image
                </h2>

                <div className="space-y-6">
                  {/* Image Upload Area */}
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="block w-full h-64 border-2 border-dashed border-green-300 rounded-xl cursor-pointer hover:border-green-500 transition-colors bg-green-50 hover:bg-green-100"
                    >
                      {selectedImage ? (
                        <img
                          src={selectedImage}
                          alt="Selected plant"
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-green-600">
                          <Upload className="h-12 w-12 mb-4" />
                          <p className="text-lg font-medium">Click to upload image</p>
                          <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                        </div>
                      )}
                    </label>
                  </div>

                  {/* Analyze Button */}
                  <Button
                    onClick={selectedImage ? analyzeImage : mockAnalyze}
                    disabled={isAnalyzing}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
                    size="lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing Plant...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Identify Plant
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Sample Images */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Try Sample Images</h3>
                <div className="grid grid-cols-3 gap-3">
                  <img  
                    className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    alt="Monstera plant sample"
                   src="https://images.unsplash.com/photo-1677464255482-7a645f540798" />
                  <img  
                    className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    alt="Snake plant sample"
                   src="https://images.unsplash.com/photo-1593482892511-b454d94d6576" />
                  <img  
                    className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    alt="Fiddle leaf fig sample"
                   src="https://images.unsplash.com/photo-1518130242561-edb760734bee" />
                </div>
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {result ? (
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-green-100">
                  <div className="flex items-center mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{result.name}</h2>
                      <p className="text-gray-600">{result.commonName}</p>
                      <p className="text-sm text-green-600 font-medium">{result.confidence}% confidence</p>
                    </div>
                  </div>

                  {/* Care Instructions */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">Care Instructions</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                        <Droplets className="h-5 w-5 text-blue-600 mt-1" />
                        <div>
                          <p className="font-medium text-gray-900">Watering</p>
                          <p className="text-sm text-gray-600">{result.care.watering}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
                        <Sun className="h-5 w-5 text-yellow-600 mt-1" />
                        <div>
                          <p className="font-medium text-gray-900">Sunlight</p>
                          <p className="text-sm text-gray-600">{result.care.sunlight}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
                        <Thermometer className="h-5 w-5 text-red-600 mt-1" />
                        <div>
                          <p className="font-medium text-gray-900">Temperature</p>
                          <p className="text-sm text-gray-600">{result.care.temperature}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-green-600 mt-1" />
                        <div>
                          <p className="font-medium text-gray-900">Fertilizer</p>
                          <p className="text-sm text-gray-600">{result.care.fertilizer}</p>
                        </div>
                      </div>
                    </div>

                    {/* Expert Tips */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Expert Tips</h4>
                      <ul className="space-y-2">
                        {result.tips.map((tip, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                            <p className="text-gray-600">{tip}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-green-100 text-center">
                  <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload an Image to Start</h3>
                  <p className="text-gray-600">
                    Select a clear photo of your plant and our AI will identify it instantly with detailed care instructions.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlantDetection;
