'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Testimonials() {
  const testimonials = [
    {
      content: "作为一名企业管理者，我深知决策的重要性。AI系统对我八字的分析非常准确，尤其是在事业方向的指导上。它预测我在科技领域会有突破，果然去年我们公司在AI领域的投资取得了显著成果。",
      author: "张先生",
      title: "科技公司CEO",
      company: "某知名互联网企业",
      avatar: "👨‍💼",
      rating: 5
    },
    {
      content: "身为设计师，我一直在寻找灵感和方向。通过八字分析，不仅帮我找到了最适合的设计领域，还预测到我在国际设计大赛中会有突破。现在我的作品已经获得了红点设计奖，非常感谢这个平台！",
      author: "李女士",
      title: "创意总监",
      company: "国际知名设计工作室",
      avatar: "👩‍🎨",
      rating: 5
    },
    {
      content: "平台对我婚姻和感情的分析特别准确。它预测我会在38岁遇到人生伴侣，且对方是医疗行业的专业人士。现在我们已经结婚一年了，她真的是一名心理医生，这种准确度让我震惊。",
      author: "王先生",
      title: "高级教师",
      company: "重点中学",
      avatar: "👨‍🏫",
      rating: 5
    },
    {
      content: "分析报告指出我最适合在餐饮行业发展，且建议我在2023年下半年扩展业务。按照建议行事后，我的连锁餐厅从2家发展到了8家，营业额提升了300%。真的非常感谢这个平台的指引！",
      author: "刘女士",
      title: "连锁餐厅创始人",
      company: "某知名餐饮品牌",
      avatar: "👩‍💼",
      rating: 5
    },
    {
      content: "作为一名医生，我最初是抱着怀疑的态度来尝试的。但系统对我的健康预警非常准确，提醒我注意肝胆问题。通过体检果然发现了早期症状，现在已经调理好了。这个平台确实有其独到之处。",
      author: "陈医生",
      title: "主任医师",
      company: "三甲医院消化科",
      avatar: "👨‍⚕️",
      rating: 5
    },
    {
      content: "系统分析指出我2023年第四季度会有重大投资机会，建议关注新能源领域。我采纳这个建议后，投资组合收益率达到了35%。对金融市场走势的把握确实很到位，给我的投资事业带来了很大帮助。",
      author: "赵先生",
      title: "资深投资顾问",
      company: "某大型资产管理公司",
      avatar: "👨‍💻",
      rating: 5
    },
    {
      content: "高考前我很迷茫，不知道该选择什么专业。平台分析说我适合医学领域，且在手术方面会有特殊天赋。现在我已经是医学院的高材生，在外科实习时表现确实比同学们要好，觉得找到了人生的方向。",
      author: "林同学",
      title: "医学院学生",
      company: "某知名医科大学",
      avatar: "👨‍🎓",
      rating: 5
    },
    {
      content: "去年面临职业转型，平台分析指出我在人力资源领域会有重大突破。按照建议转行后，短短8个月就得到了跨国公司的高级职位，年薪翻了一倍。对职业发展路径的分析非常专业和准确。",
      author: "黄女士",
      title: "人力资源总监",
      company: "世界500强企业",
      avatar: "👩‍💼",
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-pink-600 mb-4">
          用户反馈
          </h2>
          <p className="text-xl text-gray-600">
            来自各行各业用户的真实评价
          </p>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="testimonials-swiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-8 h-full hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <div className="text-4xl mb-4">{testimonial.avatar}</div>
                    <p className="text-gray-600 italic mb-4 testimonial-content">
                      "{testimonial.content}"
                    </p>
                    <div className="text-yellow-400 mb-4">
                      {'⭐'.repeat(testimonial.rating)}
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <div className="font-semibold text-primary-600">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.title}</div>
                    <div className="text-sm text-gray-400">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .testimonials-swiper {
          padding-bottom: 50px !important;
        }
        .testimonials-swiper .swiper-pagination-bullet {
          background: theme('colors.primary.600');
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          background: theme('colors.primary.600');
        }
        .testimonial-content {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 4.5rem;
        }
      `}</style>
    </section>
  );
} 