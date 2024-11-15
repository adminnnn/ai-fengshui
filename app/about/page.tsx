export default function About() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-pink-600">
          关于我们
        </h1>
        <div className="prose prose-lg mx-auto">
          <p>
            我们是一个结合传统命理学与现代人工智能技术的专业八字算命平台。
            通过深度学习算法，我们能够为您提供准确的命理分析和人生指导。
          </p>
          {/* 更多内容... */}
        </div>
      </div>
    </div>
  );
} 