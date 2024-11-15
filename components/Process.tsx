'use client';

import { motion } from 'framer-motion';

export default function Process() {
  const steps = [
    {
      number: "01",
      title: "输入生辰",
      description: "填写您的出生年月日时信息",
    },
    {
      number: "02",
      title: "AI分析",
      description: "系统快速生成专业的八字分析",
    },
    {
      number: "03",
      title: "查看解读",
      description: "获取详细的命理分析报告",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-pink-600">
            简单三步，获取命理解读
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
              className="text-center relative"
            >
              <div className="text-6xl font-bold text-primary-200 mb-6">
                {step.number}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-primary-600">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 