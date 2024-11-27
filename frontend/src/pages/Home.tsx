import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      navigate('/editor', { state: { prompt } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-[gradient_8s_ease_infinite]" />
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full relative"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 blur-xl bg-blue-500/20 rounded-full" />
            <Sparkles className="w-16 h-16 text-blue-400 mx-auto mb-6 relative" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          >
            Website Builder AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-400"
          >
            Transform your ideas into beautiful websites with AI
          </motion.p>
        </div>
        
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="relative group">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your dream website..."
              className="w-full h-40 px-6 py-4 bg-gray-800/50 text-white rounded-xl border border-gray-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none resize-none backdrop-blur-xl transition-all duration-200 text-lg"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
          <button
            type="submit"
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group"
          >
            <span>Generate Website</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </motion.form>
      </motion.div>
    </div>
  );
};