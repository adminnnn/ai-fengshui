'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Features() {
  const features = [
    {
      title: "命格测算",
      description: "全面解读您的八字命盘，分析性格特征与人生走向",
      icon: "🔮",
    },
    {
      title: "事业运势",
      description: "预测事业发展机遇，指导职业规划方向",
      icon: "💼",
    },
    {
      title: "财运分析",
      description: "详解财运走势，提供理财投资建议",
      icon: "💰",
    },
    {
      title: "负债化解",
      description: "分析债务风险，提供化解方案建议",
      icon: "📊",
    },
    {
      title: "婚恋姻缘",
      description: "预测婚恋时机，解析感情运势走向",
      icon: "💑",
    },
    {
      title: "正缘鉴定",
      description: "识别真爱良缘，避开情感陷阱",
      icon: "❤️",
    },
    {
      title: "健康预测",
      description: "分析健康隐患，提供养生保健建议",
      icon: "💪",
    },
    {
      title: "学业前程",
      description: "预测学习机遇，指导升学规划",
      icon: "📚",
    },
    {
      title: "子女缘分",
      description: "分析子女缘分，助您了解后代运势",
      icon: "👶",
    },
    {
      title: "大运流年",
      description: "精准预测十年大运与年度运程变化",
      icon: "🌟",
    },
    {
      title: "姓名解析",
      description: "剖析姓名五行，测算姓名对运势的影响",
      icon: "✍️",
    },
    {
      title: "化解方案",
      description: "提供个性化的运势化解方案与开运建议",
      icon: "🎯",
    }
  ];

  return (
    <section id="features" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-pink-600 mb-6">
            全方位命理解析
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            结合传统命理与AI技术，为您提供精准的人生指引
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
            >
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-3 text-primary-600">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link 
            href="/fortune"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-primary-600 to-pink-600 rounded-full hover:opacity-90 transition-all duration-200 transform hover:scale-105"
          >
            立即测算
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 