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
import { useEffect, useState, useLayoutEffect } from 'react';
import { LuckyItem } from '@/types/dataoke';

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

// 为折线图定义选项型
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
  // 1. 将所有 useState 声明移到组件顶部
  const [resultData, setResultData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [luckyItems, setLuckyItems] = useState<LuckyItem[]>([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [itemsPerRow, setItemsPerRow] = useState(5);

  // 2. 定义常量和静态数据
  const analysisIcons: { [key: string]: string } = {
    destiny: "🎯",
    career: "💼",
    wealth: "💰",
    debt: "📊",
    marriage: "💑",
    truelove: "❤️",
    health: "💪",
    education: "📚",
    children: "👶",
    yearly: "🌟",
    name: "✍️",
  };

  // 3. useEffect hooks
  useEffect(() => {
    // 从 localStorage 获取分析结果
    const savedResult = localStorage.getItem('fortuneResult');
    if (savedResult) {
      try {
        const parsedResult = JSON.parse(savedResult);
        setResultData(parsedResult);
      } catch (err) {
        setError('无法加载分析结果');
      }
    } else {
      setError('未找到分析结果');
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const fetchLuckyItems = async () => {
      try {
        setError(null);
        const response = await fetch('/api/lucky-items');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.code === 0 && data.data?.list) {
          setLuckyItems(data.data.list);
        } else {
          throw new Error(data.msg || '获取商品数据失败');
        }
      } catch (error) {
        console.error('Error fetching lucky items:', error);
        setError(error instanceof Error ? error.message : '获取商品数据失败');
      }
    };

    fetchLuckyItems();
  }, []);

  useLayoutEffect(() => {
    function updateSize() {
      const width = window.innerWidth;
      let newItemsPerRow;
      
      if (width >= 1536) {
        newItemsPerRow = 5;
      } else if (width >= 1280) {
        newItemsPerRow = 4;
      } else if (width >= 1024) {
        newItemsPerRow = 3;
      } else if (width >= 768) {
        newItemsPerRow = 2;
      } else {
        newItemsPerRow = 2;
      }
      
      setItemsPerRow(newItemsPerRow);
      setDisplayCount(newItemsPerRow * 2);
    }

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // 从 resultData 中获取所需数据
  const { scoreData, fortuneChartData, radarData } = resultData || {};

  // 4. 加载状态检查
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
    </div>;
  }

  // 5. 错误状态检查
  if (error || !resultData) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 mb-4">{error || '加载失败'}</p>
        <Link href="/fortune" className="text-primary-600 hover:underline">
          返回重新测算
        </Link>
      </div>
    </div>;
  }

  // 6. 准备默认图表数据
  const defaultChartData = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    datasets: [
      {
        label: '综合运势',
        data: Array(12).fill(75),
        borderColor: 'rgb(124, 58, 237)',
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ],
  };

  const defaultRadarData = {
    labels: ['事业运', '财运', '感情运', '健康运', '学业运', '人际运'],
    datasets: [{
      label: '运势分析',
      data: [75, 75, 75, 75, 75, 75],
      backgroundColor: 'rgba(124, 58, 237, 0.2)',
      borderColor: 'rgb(124, 58, 237)',
      pointBackgroundColor: 'rgb(124, 58, 237)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(124, 58, 237)',
    }]
  };

  // 7. 渲染组件
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
                            {scoreData?.total || 0}
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
                  {scoreData?.aspects.map((aspect, index) => (
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
                * 评分基于八字命盘分析结合多个维度综合评定，分数区间：90-100分为优秀
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
              </div>

              <div className="space-y-6">
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
                    <div className="flex gap-2">
                      <span className="text-gray-600">谨慎时辰：</span>
                      <span>⚠️ {resultData.suggestions.timing.cautionHours.join('、')}</span>
                    </div>
                  </div>
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

          {/* 开运吉物 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🎁</span>
              <h2 className="text-xl font-semibold text-primary-600">开运吉物</h2>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-40 text-red-500">
                <span className="text-3xl mb-2">⚠️</span>
                <p className="text-center">{error}</p>
                <button 
                  onClick={retryFetch}
                  className="mt-4 px-4 py-2 text-sm text-white bg-primary-600 rounded-full hover:bg-primary-700"
                >
                  重试
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                  {luckyItems.slice(0, displayCount).map((item) => (
                    <motion.a
                      key={item.goodsId}
                      href={item.shortUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ 
                        y: -5,
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                      className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 
                        hover:shadow-lg transition-all duration-300
                        ${!item.shortUrl ? 'cursor-not-allowed opacity-60' : ''}`}
                    >
                      {/* 商品图片 */}
                      <div className="relative pt-[100%] overflow-hidden group">
                        <img
                          src={item.mainPic}
                          alt={item.title}
                          className="absolute top-0 left-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* 销量标签 */}
                        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
                          月销 {item.monthSales.toLocaleString()}
                        </div>
                      </div>
                      
                      {/* 商品信息 */}
                      <div className="p-3">
                        {/* 商品标题 */}
                        <h3 className="text-sm font-medium text-gray-900 min-h-[2.5rem] line-clamp-2 mb-2">
                          {item.dtitle || item.title}
                        </h3>
                        
                        {/* 价格区域 */}
                        <div className="flex items-baseline">
                          <span className="text-xs text-primary-600">¥</span>
                          <span className="text-lg font-bold text-primary-600">{item.actualPrice}</span>
                          {item.originalPrice > item.actualPrice && (
                            <span className="ml-2 text-xs text-gray-400 line-through">
                              ¥{item.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
                
                {/* 底部说明文字 */}
                <div className="mt-6 text-sm text-gray-500 text-center">
                  * 以上商品根据您的最终分析，适合作为开运吉物使用。如果您喜欢本站，请购买支持，谢谢！
                </div>
              </>
            )}
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
              <Line data={fortuneChartData || defaultChartData} options={lineChartOptions} />
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
              <Radar data={radarData || defaultRadarData} options={radarChartOptions} />
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