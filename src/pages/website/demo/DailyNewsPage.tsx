import  { useState } from 'react';
import { TrendingUp, Clock, Bookmark, Share2, Search, Menu, X, ChevronRight, Eye, MessageCircle } from 'lucide-react';

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime?: string;
  views: string;
  comments?: number;
}

interface TrendingTopic {
  name: string;
  count: string;
}

export default function DailyNewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<number[]>([]);

  const categories = ['All', 'Technology', 'Business', 'Sports', 'Entertainment', 'Science', 'Politics'];

  const featuredNews: NewsArticle = {
    id: 1,
    title: "Revolutionary AI Breakthrough Transforms Medical Diagnostics",
    excerpt: "New artificial intelligence system achieves 99% accuracy in early cancer detection, potentially saving millions of lives worldwide.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
    category: "Technology",
    author: "Dr. Sarah Chen",
    date: "2 hours ago",
    readTime: "5 min read",
    views: "12.5K",
  };

  const newsArticles: NewsArticle[] = [
    {
      id: 2,
      title: "Global Markets Rally as Economic Indicators Show Strong Growth",
      excerpt: "Stock markets worldwide experience significant gains…",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop",
      category: "Business",
      author: "Michael Roberts",
      date: "3 hours ago",
      readTime: "4 min read",
      views: "8.2K",
      comments: 156
    },
    {
      id: 3,
      title: "Championship Finals: Underdog Team Claims Historic Victory",
      excerpt: "In a stunning upset, the newcomers defeat…",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop",
      category: "Sports",
      author: "James Wilson",
      date: "5 hours ago",
      readTime: "3 min read",
      views: "15.3K",
      comments: 284
    },
    {
      id: 4,
      title: "New Streaming Series Breaks All-Time Viewership Records",
      excerpt: "Fantasy epic surpasses expectations…",
      image: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&h=300&fit=crop",
      category: "Entertainment",
      author: "Emma Thompson",
      date: "6 hours ago",
      readTime: "4 min read",
      views: "9.7K",
      comments: 421
    },
    {
      id: 5,
      title: "Scientists Discover Promising Solution to Plastic Pollution",
      excerpt: "Revolutionary enzyme breaks down plastic…",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
      category: "Science",
      author: "Dr. Rachel Green",
      date: "8 hours ago",
      readTime: "6 min read",
      views: "11.4K",
      comments: 198
    },
    {
      id: 6,
      title: "Tech Giant Unveils Next-Generation Quantum Computer",
      excerpt: "New quantum processor achieves computational speeds…",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
      category: "Technology",
      author: "Alex Kumar",
      date: "10 hours ago",
      readTime: "5 min read",
      views: "13.8K",
      comments: 267
    }
  ];

  const trendingTopics: TrendingTopic[] = [
    { name: "AI Innovation", count: "2.3K articles" },
    { name: "Climate Action", count: "1.8K articles" },
    { name: "Space Exploration", count: "1.5K articles" },
    { name: "Electric Vehicles", count: "1.2K articles" }
  ];

  const toggleBookmark = (id: number) => {
    setBookmarked(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredNews = selectedCategory === "all"
    ? newsArticles
    : newsArticles.filter(article =>
        article.category.toLowerCase() === selectedCategory
      );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ---------- HEADER ---------- */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          
          {/* Mobile menu button */}
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600">NewsDaily</h1>
          </div>

          {/* Desktop search */}
          <div className="hidden md:flex items-center gap-6">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search news..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 w-64"
              />
            </div>
            <div className="text-sm text-gray-600 flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              Nov 15, 2025
            </div>
          </div>
        </div>

        {/* ---------- CATEGORIES ---------- */}
        <div className="border-t border-gray-200 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2">
            {categories.map(cat => {
              const id = cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(id)}
                  className={`px-4 py-2 rounded-full font-medium ${
                    selectedCategory === id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ---------- MAIN CONTENT ---------- */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ---------- LEFT CONTENT ---------- */}
        <div className="lg:col-span-2 space-y-8">

          {/* FEATURED */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer">
            <div className="relative h-64 md:h-96">
              <img
                src={featuredNews.image}
                alt={featuredNews.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                FEATURED
              </span>

              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => toggleBookmark(featuredNews.id)}
                  className={`p-2 rounded-full ${
                    bookmarked.includes(featuredNews.id)
                      ? "bg-blue-600 text-white"
                      : "bg-white/80 text-gray-700"
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                </button>
                <button className="p-2 bg-white/80 rounded-full text-gray-700">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  {featuredNews.category}
                </span>
                <span className="text-sm text-gray-500">{featuredNews.date}</span>
                {featuredNews.readTime && (
                  <span className="text-sm text-gray-500">• {featuredNews.readTime}</span>
                )}
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition">
                {featuredNews.title}
              </h2>

              <p className="text-gray-600 mb-4">{featuredNews.excerpt}</p>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>By {featuredNews.author}</span>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  {featuredNews.views}
                </div>
              </div>
            </div>
          </div>

          {/* LATEST NEWS */}
          <h3 className="text-2xl font-bold text-gray-800">Latest News</h3>

          <div className="space-y-6">
            {filteredNews.map(article => (
              <div
                key={article.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row">

                  <div className="sm:w-64 h-48 sm:h-auto overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="p-5 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-sm text-gray-500">{article.date}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-3">{article.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">By {article.author}</span>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {article.views}
                        </span>
                        {article.comments && (
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {article.comments}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => toggleBookmark(article.id)}
                        className={`p-2 rounded-lg ${
                          bookmarked.includes(article.id)
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>

                      <button className="p-2 bg-gray-100 text-gray-700 rounded-lg">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- SIDEBAR ---------- */}
        <div className="space-y-6">

          {/* TRENDING TOPICS */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-800">Trending Topics</h3>
            </div>

            <div className="space-y-3">
              {trendingTopics.map((topic, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 cursor-pointer"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{topic.name}</p>
                    <p className="text-sm text-gray-500">{topic.count}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          {/* NEWSLETTER */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-md p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Daily Newsletter</h3>
            <p className="text-blue-100 text-sm mb-4">
              Get the top stories delivered to your inbox every morning
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg mb-3 text-gray-800 focus:ring-blue-300"
            />

            <button className="w-full bg-white text-blue-600 font-semibold py-2 rounded-lg">
              Subscribe Now
            </button>
          </div>

          {/* AD */}
          <div className="bg-gray-200 rounded-xl shadow-md p-6 text-center">
            <p className="text-gray-500 mb-2">Advertisement</p>
            <div className="h-64 bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-600">Ad Space</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
