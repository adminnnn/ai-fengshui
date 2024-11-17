'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const contactInfo = [
    { id: 'phone', icon: '📱', info: '联系电话: 123-456-7890', href: '#' },
    { id: 'wechat', icon: '💬', info: '微信号: AI-BaZi', href: '#' },
    { id: 'email', icon: '✉️', info: '邮箱: contact@aibazi.com', href: '#' }
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* 品牌区域 */}
        <div className="flex flex-col items-center space-y-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🔮</span>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-pink-600">
              AI 八字算命
            </span>
          </Link>
          <p className="text-gray-500 text-sm text-center">
            融合传统命理与人工智能，为您提供专业的人生指引。
          </p>
          <div className="flex space-x-6">
            {contactInfo.map(({ id, icon, info, href }) => (
              <div key={id} className="relative">
                <motion.a
                  href={href}
                  onMouseEnter={() => setActiveTooltip(id)}
                  onMouseLeave={() => setActiveTooltip(null)}
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 hover:text-primary-600 inline-block"
                >
                  <span className="text-2xl">{icon}</span>
                </motion.a>
                {activeTooltip === id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 whitespace-nowrap">
                    <p className="text-sm text-gray-600">{info}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 底部版权信息 */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-center text-gray-400 text-sm">
            © {currentYear} AI 八字算命. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 