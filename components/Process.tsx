'use client';

import { motion } from 'framer-motion';

export default function Process() {
  const steps = [
    {
      number: "01",
      title: "输入生辰",
      description: "填写您的出生年月日时信息",
      icon: "📝",
      color: "from-blue-500 to-purple-500"
    },
    {
      number: "02", 
      title: "AI分析",
      description: "系统快速生成专业的八字分析",
      icon: "🤖",
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "03",
      title: "查看解读",
      description: "获取详细的命理分析报告",
      icon: "📊",
      color: "from-pink-500 to-red-500"
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-pink-600 mb-4">
            ✨ 简单三步，获取命理解读 ✨
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <div className="text-center">
                  {/* 图标和数字组合 */}
                  <div className="relative inline-block mb-6">
                    <div className={`text-6xl mb-4 transform group-hover:scale-110 transition-transform`}>
                      {step.icon}
                    </div>
                    <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-sm font-bold`}>
                      {step.number}
                    </div>
                  </div>
                  
                  {/* 标题和描述 */}
                  <h3 className="text-2xl font-semibold text-primary-600 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 