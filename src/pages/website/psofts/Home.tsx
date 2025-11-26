import { useState } from "react";
import {
  QrCode,
  GraduationCap,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const cards = [
  {
    id: 1,
    title: "QR Code Generator",
    description: "Create dynamic QR codes for any purpose",
    icon: QrCode,
    bgGradient: "from-purple-600 via-blue-600 to-cyan-500",
    tags: ["AI Powered", "Free Tool"],
    url: "/qr-code-generator"
  },
  {
    id: 3,
    title: "Online Exam Software",
    description: "Complete exam management platform",
    icon: GraduationCap,
    bgGradient: "from-green-600 via-emerald-600 to-teal-500",
    tags: ["AI Powered", "Secure"],
    url: "https://onlinetestpanel.com"
  }
];

export default function CardThumbnails() {
  
  type CardId = typeof cards[number]["id"];
  const [hoveredCard, setHoveredCard] = useState<CardId | null>(null);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Our Digital Tools
          </h1>
          <p className="text-xl text-slate-400">
            Professional solutions for modern needs
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            const isHovered = hoveredCard === card.id;

        
            const Wrapper = card.url.startsWith("http")
			  ? (props: React.HTMLAttributes<HTMLAnchorElement>) => (
			      <a href={card.url} target="_blank" rel="noopener noreferrer" {...props} />
			    )
			  : (props: React.HTMLAttributes<HTMLAnchorElement>) => (
			      <Link to={card.url} {...props} />
			    );


            return (
              <Wrapper
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative block"
              >
                <div
                  className={`relative h-96 bg-gradient-to-br ${card.bgGradient} rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 ${
                    isHovered ? "scale-105 shadow-3xl" : "scale-100"
                  }`}
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: "30px 30px"
                      }}
                    />
                  </div>

                  {/* Glowing Orb */}
                  <div
                    className={`absolute top-0 right-0 w-48 h-48 bg-white rounded-full blur-3xl opacity-20 transition-all duration-500 ${
                      isHovered ? "scale-150" : "scale-100"
                    }`}
                  />

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-between p-8">
                    {/* Icon Row */}
                    <div className="flex justify-between items-start">
                      <div
                        className={`w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center transform transition-all duration-300 ${
                          isHovered ? "scale-110 rotate-6" : "scale-100"
                        }`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      <div className="flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                        <Sparkles className="w-3 h-3 text-white" />
                        <span className="text-xs text-white font-medium">
                          NEW
                        </span>
                      </div>
                    </div>

                    {/* Center Icon */}
                    <div className="flex-1 flex items-center justify-center my-6">
                      <div
                        className={`w-32 h-32 bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 flex items-center justify-center transform transition-all duration-500 ${
                          isHovered ? "rotate-12 scale-110" : "rotate-0 scale-100"
                        }`}
                      >
                        <Icon className="w-16 h-16 text-white" />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {card.title}
                      </h3>

                      <p className="text-white/80 text-sm">{card.description}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {card.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Button */}
                      <button className="w-full py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center gap-2 text-white font-semibold transition-all duration-300">
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Hover Border */}
                  <div
                    className={`absolute inset-0 border-2 border-white/0 rounded-2xl transition-all duration-300 ${
                      isHovered ? "border-white/30" : ""
                    }`}
                  />
                </div>
              </Wrapper>
            );
          })}
        </div>

        {/* Footer Button */}
        <div className="mt-8 flex justify-center">
          <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl border border-white/20 text-white font-semibold transition-all duration-300 flex items-center gap-2 group">
            <span>View All Tools</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
