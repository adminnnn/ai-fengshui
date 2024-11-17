'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Line, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadarController,
  ChartOptions,
  Scale,
  ScriptableContext
} from 'chart.js';

// 注册 Chart.js 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadarController
);

// 为折线图定义选项类型
const lineChartOptions: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '运势走向分析'
    }
  },
  scales: {
    y: {
      min: 0,
      max: 100,
      ticks: {
        callback: function(this: Scale, tickValue: number | string) {
          return tickValue + '%';
        }
      }
    }
  }
};

// 为雷达图定义选项类型
const radarChartOptions: ChartOptions<'radar'> = {
  scales: {
    r: {
      angleLines: {
        display: true
      },
      suggestedMin: 0,
      suggestedMax: 100,
      ticks: {
        stepSize: 20,
        callback: function(this: Scale, tickValue: number | string) {
          return tickValue + '%';
        }
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
};

export default function FortuneResult() {
  // 模拟测算结果数据
  const resultData = {
    basicInfo: {
      name: "张三",
      gender: "男",
      birthDate: "1990年8月15日",
      birthTime: "子时",
      eightCharacters: "庚午 丙申 丁酉 壬子",
    },
    analysis: {
      destiny: {
        title: "命格解析",
        content: "您命中天干偏印配七杀，八字中火土较旺，具有较强的领导能力和创造力。性格坚韧不拔，意志力强，但需注意过于刚强可能带来的人际关系问题。",
      },
      career: {
        title: "事业运势",
        content: "2024年事业运势向上，适合开拓新的领域。上半年会遇到贵人相助，下半年适合稳扎稳打。建议在6月前把握机会，积极进取。有望在专业领域获得重要突破。",
      },
      wealth: {
        title: "财运分析",
        content: "今年财运起伏较大，但整体向上。3月、7月、11月是财运高峰期，适合投资和理财。需要注意的是9月可能有破财风险，应当谨慎处理财务。适合发展副业或投资理财。",
      },
      debt: {
        title: "负债分析",
        content: "今年债务压力相对较轻，但仍需谨慎处理借贷关系。建议在7月前处理完历史债务，下半年避免新增大额负债。理财时需要控制风险，避免激进投资。",
      },
      marriage: {
        title: "婚恋运势",
        content: "感情方面今年桃花运旺盛，特别是在春季和秋季。已婚者夫妻关系和睦，未婚者容易遇到心仪的对象。需要注意的是感情不宜过于急进，应当循序渐进。",
      },
      truelove: {
        title: "正缘分析",
        content: "您的正缘桃花在东南方向最旺，适合通过工作或社交活动结识对象。最佳缘分出现时间在7-9月间，对方可能从事教育或艺术相关工作。",
      },
      health: {
        title: "健康运势",
        content: "需要特别注意消化系统和呼吸系统的保养。建议保持规律作息，适当运动，注意饮食调理。今年春季和冬季是健康的关键时期，应做好保健工作。",
      },
      education: {
        title: "学业运势",
        content: "学习运势佳，特别适合参加考试和进修。建议在5-8月间参加重要考试或认证。专注力和记忆力都处于较好状态，可以尝试突破自己的知识瓶颈。",
      },
      children: {
        title: "子女缘分",
        content: "子女缘分较好，若有生育计划，今年是较为理想的时机。子女与您的缘分深厚，将来在事业上能得到子女的帮助。教育方面需要注意因材施教。",
      },
      yearly: {
        title: "大运流年",
        content: "目前正值上升运势，未来十年整体运势走高。2024-2026年是事业上升期，2027-2029年适合稳固发展，2030年后将迎来人生新高峰。",
      },
      name: {
        title: "姓名解析",
        content: "您的姓名五行属木，与命局形成相生之势。姓名对事业有积极影响，有助于提升个人威望和领导能力。建议在重要场合使用完整姓名，以彰显个人魅力。",
      }
    },
    suggestions: {
      lucky: {
        colors: ["红色", "紫色", "金色"],
        numbers: ["1", "6", "8", "9"],
        directions: ["东南", "南", "东"],
        elements: ["火", "土"],
      },
      timing: {
        goodMonths: ["3月", "7月", "11月", "12月"],
        cautionMonths: ["4月", "9月"],
        goodHours: ["午时", "巳时", "寅时"],
      },
      solutions: [
        "佩戴紫水晶可增强运势",
        "在办公室东南方位放置绿植",
        "适合在早上7-9点处理重要事务",
        "建议在春季开展新项目",
        "选择红色或紫色为主色调的服装",
        "佩戴五行属火的饰品可助运",
      ],
      yearly_advice: [
        "今年适积极进取，开拓事业新方向",
        "感情方面应保持开放和真诚的态度",
        "投资理财宜稳健为主，避免激进",
        "注意保持作息规律，适度运动",
        "可考虑参加进修或考试",
      ],
    },
  };

  // 运势走向数据
  const fortuneChartData = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    datasets: [
      {
        label: '综合运势',
        data: [70, 75, 85, 65, 75, 80, 90, 85, 70, 80, 85, 90],
        borderColor: 'rgb(124, 58, 237)',
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: '事业运',
        data: [65, 70, 80, 75, 85, 80, 85, 90, 75, 80, 85, 95],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: '财运',
        data: [75, 80, 90, 60, 70, 85, 95, 80, 65, 85, 90, 85],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // 添加雷达图数据
  const radarData = {
    labels: ['事业运', '财运', '感情运', '健康运', '学业运', '人际运'],
    datasets: [{
      label: '运势分析',
      data: [85, 80, 75, 90, 70, 85],
      backgroundColor: 'rgba(124, 58, 237, 0.2)',
      borderColor: 'rgb(124, 58, 237)',
      pointBackgroundColor: 'rgb(124, 58, 237)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(124, 58, 237)',
    }]
  };

  // 添加分析项的图标映射
  const analysisIcons: { [key: string]: string } = {
    destiny: "🎯", // 命格
    career: "💼", // 事业
    wealth: "💰", // 财运
    debt: "📊", // 负债
    marriage: "💑", // 婚恋
    truelove: "❤️", // 正缘
    health: "💪", // 健康
    education: "📚", // 学业
    children: "👶", // 子女缘
    yearly: "🌟", // 大运流年
    name: "✍️", // 姓名解析
  };

  // 在 basicInfo 后添加评分数据
  const scoreData = {
    total: 94,  // 综合评分
    aspects: [
      { name: "事业运", score: 95 },
      { name: "财运", score: 92 },
      { name: "健康运", score: 96 },
      { name: "感情运", score: 93 },
    ]
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* 基本信息卡片 */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-pink-600">
              八字命理分析结果
            </h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-primary-50 rounded-lg">
                <div className="text-sm text-gray-600">姓名</div>
                <div className="font-medium">{resultData.basicInfo.name}</div>
              </div>
              <div className="text-center p-4 bg-primary-50 rounded-lg">
                <div className="text-sm text-gray-600">性别</div>
                <div className="font-medium">{resultData.basicInfo.gender}</div>
              </div>
              <div className="text-center p-4 bg-primary-50 rounded-lg">
                <div className="text-sm text-gray-600">出生日期</div>
                <div className="font-medium">{resultData.basicInfo.birthDate}</div>
              </div>
              <div className="text-center p-4 bg-primary-50 rounded-lg">
                <div className="text-sm text-gray-600">出生时辰</div>
                <div className="font-medium">{resultData.basicInfo.birthTime}</div>
              </div>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-primary-100 to-pink-100 rounded-lg mb-6">
              <div className="text-sm text-gray-600 mb-2">八字</div>
              <div className="text-xl font-medium">{resultData.basicInfo.eightCharacters}</div>
            </div>

            {/* 修改评分区域的样式 */}
            <div className="mt-8 p-6 bg-gradient-to-br from-primary-50 via-white to-pink-50 rounded-xl border border-primary-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {/* 左侧：总评分 */}
                <div className="text-center md:border-r border-primary-100 pr-8">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">命盘综合评分</h3>
                  <div className="relative inline-block">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-600 to-pink-600 p-1"
                    >
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-center"
                        >
                          <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary-600 to-pink-600">
                            {scoreData.total}
                          </span>
                          <span className="text-sm text-gray-500 block">分</span>
                        </motion.div>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-sm px-3 py-1 rounded-full shadow-lg"
                    >
                      优秀
                    </motion.div>
                  </div>
                </div>

                {/* 中间：评分说明 */}
                <div className="text-center md:text-left space-y-2">
                  <h4 className="font-medium text-gray-700">评分说明</h4>
                  <p className="text-sm text-gray-600">
                    根据八字命盘分析，您的命格属于上等，具有以下特点：
                  </p>
                  <ul className="text-sm text-gray-600 list-disc list-inside">
                    <li>五行搭配协调</li>
                    <li>贵人运势旺盛</li>
                    <li>财运发展稳健</li>
                  </ul>
                </div>

                {/* 右侧：分项评分 */}
                <div className="grid grid-cols-2 gap-4">
                  {scoreData.aspects.map((aspect, index) => (
                    <motion.div
                      key={aspect.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 * index }}
                      className="relative"
                    >
                      <div className="text-center">
                        <div className="relative inline-block">
                          <svg className="w-16 h-16" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="#e2e8f0"
                              strokeWidth="8"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="url(#gradient)"
                              strokeWidth="8"
                              strokeDasharray={`${2 * Math.PI * 45 * aspect.score / 100} ${2 * Math.PI * 45}`}
                              strokeDashoffset={2 * Math.PI * 45 * 0.25}
                              className="transform -rotate-90 origin-center"
                            />
                            <defs>
                              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#7c3aed" />
                                <stop offset="100%" stopColor="#ec4899" />
                              </linearGradient>
                            </defs>
                            <text
                              x="50"
                              y="50"
                              textAnchor="middle"
                              dy="0.3em"
                              className="text-xl font-bold fill-gray-700"
                            >
                              {aspect.score}
                            </text>
                          </svg>
                        </div>
                        <div className="text-sm font-medium text-gray-600 mt-1">{aspect.name}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 text-center text-sm text-gray-500 border-t border-primary-100 pt-4"
              >
                * 评分基于八字命盘分析，结合多个维度综合评定，分数区间：90-100分为优秀
              </motion.div>
            </div>
          </div>

          {/* 详细分析部分 */}
          {Object.entries(resultData.analysis).map(([key, section], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{analysisIcons[key]}</span>
                <h2 className="text-xl font-semibold text-primary-600">
                  {section.title}
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed pl-11">
                {section.content}
              </p>
            </motion.div>
          ))}

          {/* 吉运建议 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🎊</span>
              <h2 className="text-xl font-semibold text-primary-600">开运建议</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <span className="text-xl">🎯</span>
                    吉祥物
                  </h3>
                  <div className="space-y-2 pl-8">
                    <div className="flex gap-2">
                      <span className="text-gray-600">吉祥颜色：</span>
                      <span>🎨 {resultData.suggestions.lucky.colors.join('、')}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600">吉祥数字：</span>
                      <span>🔢 {resultData.suggestions.lucky.numbers.join('、')}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600">吉祥方位：</span>
                      <span>🧭 {resultData.suggestions.lucky.directions.join('、')}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600">有利五行：</span>
                      <span>🌍 {resultData.suggestions.lucky.elements.join('、')}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <span className="text-xl">⏰</span>
                    时间选择
                  </h3>
                  <div className="space-y-2 pl-8">
                    <div className="flex gap-2">
                      <span className="text-gray-600">吉利月份：</span>
                      <span>📅 {resultData.suggestions.timing.goodMonths.join('、')}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600">谨慎月份：</span>
                      <span>⚠️ {resultData.suggestions.timing.cautionMonths.join('、')}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600">吉利时辰：</span>
                      <span>🕐 {resultData.suggestions.timing.goodHours.join('、')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <span className="text-xl">💫</span>
                    化解方案
                  </h3>
                  <ul className="list-none space-y-2 text-gray-600 pl-8">
                    {resultData.suggestions.solutions.map((solution, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-primary-500">✨</span>
                        {solution}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <span className="text-xl">📋</span>
                    年度建议
                  </h3>
                  <ul className="list-none space-y-2 text-gray-600 pl-8">
                    {resultData.suggestions.yearly_advice.map((advice, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-primary-500">📌</span>
                        {advice}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 运势走向图表 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">📈</span>
              <h2 className="text-xl font-semibold text-primary-600">运势走向预测</h2>
            </div>
            <div className="aspect-[16/9] w-full">
              <Line data={fortuneChartData} options={lineChartOptions} />
            </div>
            <div className="mt-4 text-sm text-gray-500">
              * 图表显示未来一年的运势变化趋势，包括综合运势、事业运和财运三个维度
            </div>
          </motion.div>

          {/* 运势分析图表 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">📊</span>
              <h2 className="text-xl font-semibold text-primary-600">运势分析雷达图</h2>
            </div>
            <div className="aspect-[16/9] w-full">
              <Radar data={radarData} options={radarChartOptions} />
            </div>
            <div className="mt-4 text-sm text-gray-500">
              * 雷达图展示各个生活领域的运势强弱分布
            </div>
          </motion.div>

          {/* 按钮区域 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/fortune"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-600 bg-white border-2 border-primary-600 rounded-full hover:bg-primary-50 transition-all duration-200"
            >
              重新测算
            </Link>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-primary-600 to-pink-600 rounded-full hover:opacity-90 transition-all duration-200"
            >
              保存结果
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 