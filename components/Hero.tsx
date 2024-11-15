'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-50 to-white">
      {/* 装饰性背景元素 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-pink-600">
              AI 智能八字算命
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            融合传统命理与现代科技，为您提供专业的人生指引
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/fortune"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-primary-600 to-pink-600 rounded-full hover:opacity-90 transition-all duration-200 transform hover:scale-105"
            >
              开始测算
            </Link>
            <Link 
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-600 bg-white border-2 border-primary-600 rounded-full hover:bg-primary-50 transition-all duration-200"
            >
              了解更多
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
} 