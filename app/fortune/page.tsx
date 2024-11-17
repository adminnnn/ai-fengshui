'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { zhCN } from 'date-fns/locale';

// 注册中文语言包
registerLocale('zh-CN', zhCN);

interface TimeRange {
  start: string;
  end: string;
  name: string;
  description: string;
}

export default function Fortune() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '男',
    timeRange: '',
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const timeRanges: TimeRange[] = [
    {
      start: "23:00",
      end: "01:00",
      name: "子时",
      description: "夜半，人定、万籁俱寂之时",
    },
    {
      start: "01:00",
      end: "03:00",
      name: "丑时",
      description: "鸡鸣、人醒觉之时",
    },
    {
      start: "03:00",
      end: "05:00",
      name: "寅时",
      description: "卯始、日光微现之时",
    },
    {
      start: "05:00",
      end: "07:00",
      name: "卯时",
      description: "日出、万物始生之时",
    },
    {
      start: "07:00",
      end: "09:00",
      name: "辰时",
      description: "食时、人起而趋市之时",
    },
    {
      start: "09:00",
      end: "11:00",
      name: "巳时",
      description: "隅中、日照当空之时",
    },
    {
      start: "11:00",
      end: "13:00",
      name: "午时",
      description: "日中、阳气极盛之时",
    },
    {
      start: "13:00",
      end: "15:00",
      name: "未时",
      description: "日跌、阳气始衰之时",
    },
    {
      start: "15:00",
      end: "17:00",
      name: "申时",
      description: "哺时、人将息之时",
    },
    {
      start: "17:00",
      end: "19:00",
      name: "酉时",
      description: "日入、天色将暗之时",
    },
    {
      start: "19:00",
      end: "21:00",
      name: "戌时",
      description: "黄昏、夜幕降临之时",
    },
    {
      start: "21:00",
      end: "23:00",
      name: "亥时",
      description: "人定、夜深人静之时",
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/fortune/result';
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-pink-600">
            八字命理测算
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 姓名和性别 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span className="text-primary-500">👤</span>
                  姓名
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="请输入您的姓名"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span className="text-primary-500">👥</span>
                  性别
                </label>
                <div className="flex gap-4">
                  {['男', '女'].map((gender) => (
                    <div
                      key={gender}
                      onClick={() => setFormData({ ...formData, gender })}
                      className={`flex-1 py-2 px-4 rounded-lg cursor-pointer text-center transition-all duration-200 ${
                        formData.gender === gender
                          ? 'bg-primary-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {gender}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 出生日期 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <span className="text-primary-500">📅</span>
                出生日期（公历）
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                locale="zh-CN"
                dateFormat="yyyy年MM月dd日"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                placeholderText="请选择出生日期"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                maxDate={new Date()}
                minDate={new Date('1900-01-01')}
                required
                yearDropdownItemNumber={100}
                scrollableYearDropdown
                showMonthYearPicker={false}
                isClearable
                customInput={
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                }
              />
            </div>

            {/* 出生时辰 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <span className="text-primary-500">⏰</span>
                出生时辰
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {timeRanges.map((time) => (
                  <div
                    key={time.name}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 ${
                      formData.timeRange === time.name
                        ? 'border-primary-500 bg-primary-50 shadow-lg'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                    onClick={() => setFormData({ ...formData, timeRange: time.name })}
                  >
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{time.name}</div>
                      <div className="text-sm text-gray-500">
                        {time.start}-{time.end}
                      </div>
                      <div className="text-xs text-gray-400">{time.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 提交按钮 */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-8 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-lg shadow-lg"
            >
              开始测算
            </motion.button>

            {/* 隐私提示 */}
            <p className="text-center text-sm text-gray-500 mt-4">
              您的个人信息将受到严格保护，仅用于八字测算
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 