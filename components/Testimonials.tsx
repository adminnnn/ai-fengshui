export default function Testimonials() {
  const testimonials = [
    {
      content: "AI分析非常准确，给了我很多人生的启发。",
      author: "张先生",
      title: "企业家",
    },
    {
      content: "专业的分析报告，帮助我更好地规划未来。",
      author: "李女士",
      title: "设计师",
    },
    {
      content: "分析结果令人信服，推荐给身边的朋友使用。",
      author: "王先生",
      title: "教师",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          用户反馈
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-white shadow-lg"
            >
              <p className="text-gray-600 mb-4">{testimonial.content}</p>
              <div className="font-semibold">{testimonial.author}</div>
              <div className="text-sm text-gray-500">{testimonial.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 