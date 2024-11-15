'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Fortune() {
  const [birthData, setBirthData] = useState({
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: '',
    gender: '男',
  });

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-pink-600">
            八字算命
          </h1>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  出生年份
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="例如：1990"
                  value={birthData.year}
                  onChange={(e) => setBirthData({ ...birthData, year: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  出生月份
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="例如：1"
                  value={birthData.month}
                  onChange={(e) => setBirthData({ ...birthData, month: e.target.value })}
                />
              </div>
              {/* 更多输入字段... */}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              开始测算
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 