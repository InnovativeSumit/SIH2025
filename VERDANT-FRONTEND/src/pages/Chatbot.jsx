
import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Bot, User, Languages, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your AI plant care assistant. I can help you in English, Hindi, Bengali, and other Indian languages. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const [isTTSEnabled, setIsTTSEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const messagesEndRef = useRef(null);
  const { toast } = useToast();

  const languages = [
    { code: 'en-US', name: 'English', flag: '🇺🇸' },
    { code: 'hi-IN', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'bn-IN', name: 'বাংলা', flag: '🇮🇳' },
    { code: 'ta-IN', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te-IN', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'mr-IN', name: 'मराठी', flag: '🇮🇳' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (messageContent) => {
    const content = (messageContent || inputMessage).trim();
    if (!content) return;

    const userMessage = { id: Date.now(), type: 'user', content, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    if (!messageContent) setInputMessage('');

    setTimeout(() => {
      const botResponseContent = getBotResponse(content, selectedLanguage.split('-')[0]);
      const botResponse = { id: Date.now() + 1, type: 'bot', content: botResponseContent, timestamp: new Date() };
      setMessages(prev => [...prev, botResponse]);
      if (isTTSEnabled) speakMessage(botResponseContent);
    }, 1000);
  };
  
  const getBotResponse = (message, language) => {
    const lowerMessage = message.toLowerCase();
    const responses = {
      en: {
        watering: "For most houseplants, water when the top inch of soil is dry. Overwatering is more harmful than underwatering!",
        sunlight: "Most plants need bright, indirect light. Direct sunlight can burn leaves, while too little light causes leggy growth.",
        fertilizer: "Feed your plants monthly during growing season (spring/summer) with a balanced liquid fertilizer.",
        shop: "That's a great question! For that, you might want to check out our Smart Plant Monitor. You can find it and other amazing tools in our shop!",
        default: "I'd be happy to help with your plant care questions! Ask me about watering, sunlight, fertilizing, or any plant problems."
      },
      hi: {
        watering: "अधिकांश घरेलू पौधों के लिए, जब मिट्टी का ऊपरी हिस्सा सूखा लगे तो पानी दें। अधिक पानी देना कम पानी देने से ज्यादा हानिकारक है!",
        sunlight: "अधिकांश पौधों को तेज, अप्रत्यक्ष प्रकाश की आवश्यकता होती है। सीधी धूप पत्तियों को जला सकती है।",
        fertilizer: "बढ़ते मौसम (वसंत/गर्मी) के दौरान महीने में एक बार संतुलित तरल उर्वरक दें।",
        shop: "यह एक अच्छा सवाल है! उसके लिए, आप हमारे स्मार्ट प्लांट मॉनिटर को देखना चाहेंगे। आप इसे और अन्य अद्भुत उपकरण हमारी दुकान में पा सकते हैं!",
        default: "मैं आपके पौधों की देखभाल के सवालों में खुशी से मदद करूंगा! पानी, धूप, खाद या किसी भी पौधे की समस्या के बारे में पूछें।"
      },
      bn: {
        watering: "বেশিরভাগ ঘরোয়া গাছের জন্য, মাটির উপরের অংশ শুকনো মনে হলে পানি দিন। বেশি পানি দেওয়া কম পানি দেওয়ার চেয়ে বেশি ক্ষতিকর!",
        sunlight: "বেশিরভাগ গাছের উজ্জ্বল, পরোক্ষ আলোর প্রয়োজন। সরাসরি সূর্যালোক পাতা পুড়িয়ে দিতে পারে।",
        fertilizer: "বৃদ্ধির মৌসুমে (বসন্ত/গ্রীষ্ম) মাসে একবার সুষম তরল সার দিন।",
        shop: "এটি একটি দুর্দান্ত প্রশ্ন! এর জন্য, আপনি আমাদের স্মার্ট প্ল্যান্ট মনিটরটি দেখতে চাইতে পারেন। আপনি এটি এবং অন্যান্য আশ্চর্যজনক সরঞ্জাম আমাদের দোকানে খুঁজে পেতে পারেন!",
        default: "আমি আপনার গাছের যত্নের প্রশ্নে সাহায্য করতে খুশি! পানি, সূর্যালোক, সার বা যেকোনো গাছের সমস্যা সম্পর্কে জিজ্ঞাসা করুন।"
      }
    };

    const langResponses = responses[language] || responses.en;
    
    if (lowerMessage.includes('water')) return langResponses.watering;
    if (lowerMessage.includes('sun') || lowerMessage.includes('light')) return langResponses.sunlight;
    if (lowerMessage.includes('fertilizer') || lowerMessage.includes('feed')) return langResponses.fertilizer;
    if (lowerMessage.includes('shop') || lowerMessage.includes('buy') || lowerMessage.includes('product')) return langResponses.shop;
    
    return langResponses.default;
  };

  const speakMessage = (text) => {
    if (!('speechSynthesis' in window)) {
      toast({ title: "TTS Not Supported", description: "Your browser does not support text-to-speech.", variant: "destructive" });
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLanguage;
    utterance.onstart = () => setIsBotSpeaking(true);
    utterance.onend = () => setIsBotSpeaking(false);
    utterance.onerror = () => setIsBotSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };
  
  const toggleTTS = () => {
    setIsTTSEnabled(!isTTSEnabled);
    if (isTTSEnabled && isBotSpeaking) {
      window.speechSynthesis.cancel();
      setIsBotSpeaking(false);
    }
    toast({ title: `Text-to-Speech ${!isTTSEnabled ? "Enabled" : "Disabled"}` });
  };

  const handleVoiceInput = () => {
    if (!recognition) {
      toast({ title: "Voice Recognition Not Supported", description: "Please use a browser like Chrome or Firefox.", variant: "destructive" });
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      return;
    }

    recognition.lang = selectedLanguage;
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => {
      let errorMessage = "An unknown error occurred.";
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        errorMessage = "Microphone access denied. Please allow microphone access in your browser settings.";
      } else if (event.error === 'no-speech') {
        errorMessage = "No speech was detected. Please try again.";
      } else if (event.error === 'network') {
        errorMessage = "A network error occurred. Please check your connection.";
      }
      toast({ title: "Voice Input Error", description: errorMessage, variant: "destructive" });
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      
      setInputMessage(transcript);

      if (event.results[0].isFinal) {
        handleSendMessage(transcript);
      }
    };

    recognition.start();
  };
  
  return (
    <>
      <Helmet>
        <title>AI Plant Care Chatbot - Multilingual Voice Support | Verdant.AI</title>
        <meta name="description" content="Chat with our AI plant care assistant using your voice in multiple languages. Get expert advice, and personalized plant care guidance." />
      </Helmet>
      <div className="min-h-screen pt-20 pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Plant Care <span className="gradient-text">Assistant</span></h1>
            <p className="text-lg text-gray-600">Get expert plant care advice in your preferred language with voice support</p>
          </motion.div>
          <div className="bg-white rounded-2xl shadow-xl border border-green-100 h-[600px] flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Languages className="h-5 w-5 text-green-600" />
                <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent">
                  {languages.map((lang) => <option key={lang.code} value={lang.code}>{lang.flag} {lang.name}</option>)}
                </select>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleTTS} className="text-gray-600 hover:text-green-600">
                {isTTSEnabled ? <Volume2 className="h-5 w-5"/> : <VolumeX className="h-5 w-5" />}
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div key={message.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-green-600' : 'bg-gray-600'}`}>
                      {message.type === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
                    </div>
                    <div className={`rounded-2xl px-4 py-3 ${message.type === 'user' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                      <p className="text-sm">
                        {message.content.includes("shop") && message.type === 'bot' ? (
                          <>
                            That's a great question! For that, you might want to check out our Smart Plant Monitor. You can find it and other amazing tools in our <Link to="/shop" className="text-blue-600 underline">shop!</Link>
                          </>
                        ) : message.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <AnimatePresence>
              {isListening && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-center p-2 text-green-700 bg-green-50">
                  Listening... Say something.
                </motion.div>
              )}
            </AnimatePresence>
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Ask me about plant care..." className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 pr-12" />
                  <Button variant="ghost" size="sm" onClick={handleVoiceInput} className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400">
                    <Mic className={`h-5 w-5 ${isListening ? 'text-red-600 mic-pulse-animation' : 'text-gray-600'}`} />
                  </Button>
                </div>
                <Button onClick={() => handleSendMessage()} disabled={!inputMessage.trim() && !isListening} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-6">
            <p className="text-sm text-gray-600 mb-3">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {['How often should I water my plants?', 'Best light for houseplants?', 'When to fertilize?', 'Suggest a product for me'].map((question) => (
                <Button key={question} variant="outline" size="sm" onClick={() => handleSendMessage(question)} className="text-xs border-green-300 text-green-700 hover:bg-green-50">
                  {question}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
