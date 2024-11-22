import { NextResponse } from 'next/server';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// 生成八字分析提示词
function generatePrompt(userData: any) {
  return `你现在是一位经验丰富的中国八字算命大师。请根据以下信息进行八字分析，并以JSON格式返回分析结果。每项分析至少300字，避免重复提及用户姓名，注重分析的专业性和实用性。

用户信息：
姓名：${userData.name}
性别：${userData.gender}
出生日期：${userData.birthDate}
出生时辰：${userData.timeRange}

请按照以下JSON格式返回分析结果：
{
  "basicInfo": {
    "name": "用户姓名",
    "gender": "性别",
    "birthDate": "出生日期",
    "birthTime": "出生时辰",
    "eightCharacters": "八字"
  },
  "analysis": {
    "destiny": { "title": "命格总论", "content": "详细内容" },
    "career": { "title": "事业发展", "content": "详细内容" },
    "wealth": { "title": "财运分析", "content": "详细内容" },
    "debt": { "title": "负债风险", "content": "详细内容" },
    "marriage": { "title": "婚恋感情", "content": "详细内容" },
    "truelove": { "title": "正缘鉴定", "content": "详细内容" },
    "health": { "title": "健康状况", "content": "详细内容" },
    "education": { "title": "学业前程", "content": "详细内容" },
    "children": { "title": "子女缘分", "content": "详细内容" },
    "yearly": { "title": "大运流年", "content": "详细内容" },
    "name": { "title": "姓名解析", "content": "详细内容" }
  },
  "suggestions": {
    "lucky": {
      "colors": ["吉祥颜色1", "吉祥颜色2"],
      "numbers": ["吉祥数字1", "吉祥数字2"],
      "directions": ["吉祥方位1", "吉祥方位2"],
      "elements": ["有利五行1", "有利五行2"],
    },
    "timing": {
      "goodMonths": ["宜月份1", "宜月份2"],
      "cautionMonths": ["忌月份1", "忌月份2"],
      "goodHours": ["宜时辰1", "宜时辰2"],
      "cautionHours": ["忌时辰1", "忌时辰2"]
    },
    "solutions": ["化解方案1", "化解方案2", "化解方案3", "化解方案4", "化解方案5"],
    "yearly_advice": ["年度建议1", "年度建议2", "年度建议3", "年度建议4", "年度建议5"]
  }
}

请确保分析内容专业、详实，符合中国传统命理学理论。每个分析点需要至少200字的详细阐述，并在建议部分提供具体的开运物品和配饰推荐。不要重复的堆砌内容，要有所侧重。另外再结果中不要直呼用户姓名`;
}

export async function POST(request: Request) {
  try {
    const userData = await request.json();
    
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: generatePrompt(userData)
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    const aiResult = JSON.parse(data.choices[0].message.content);

    // 合并 AI 结果和额外数据
    const result = {
      ...aiResult,
      // 添加评分数据
      scoreData: {
        total: 94,
        aspects: [
          { name: "事业运", score: 95 },
          { name: "财运", score: 92 },
          { name: "健康运", score: 96 },
          { name: "感情运", score: 93 }
        ]
      },
      // 添加运势图表数据
      fortuneChartData: {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        datasets: [
          {
            label: '综合运势',
            data: generateRandomData(),
            borderColor: 'rgb(124, 58, 237)',
            backgroundColor: 'rgba(124, 58, 237, 0.1)',
            tension: 0.4,
            fill: true,
          },
          {
            label: '事业运',
            data: generateRandomData(),
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4,
            fill: true,
          },
          {
            label: '财运',
            data: generateRandomData(),
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            tension: 0.4,
            fill: true,
          },
        ],
      },
      // 添加雷达图数据
      radarData: {
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
      }
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Fortune analysis error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate fortune analysis' },
      { status: 500 }
    );
  }
}

// 生成随机数据的辅助函数
function generateRandomData() {
  return Array.from({ length: 12 }, () => Math.floor(Math.random() * (95 - 65 + 1)) + 65);
} 