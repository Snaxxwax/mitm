import React, { useState } from 'react';
import { Shield, Lock, Terminal, BookOpen, Tool, AlertTriangle, Mail, Github, Twitter, ChevronRight, Award, Users } from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    setEmail('');
  };

  const featuredArticles = [
    {
      title: "Zero-Day Vulnerability Analysis: Log4Shell Deep Dive",
      category: "Threat Analysis",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400",
      description: "Technical analysis of the Log4j vulnerability and its implications for enterprise security."
    },
    {
      title: "Building a Modern SOC: Tools and Techniques",
      category: "Tutorials",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=400",
      description: "Step-by-step guide to establishing an effective Security Operations Center."
    },
    {
      title: "Advanced Threat Hunting with Sigma Rules",
      category: "Tools & Reviews",
      image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=400",
      description: "Leveraging Sigma rules for effective threat detection and response."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navigation */}
      <nav className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold">MITM.LIFE</span>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                {['Latest Posts', 'Tutorials', 'Tools & Reviews', 'Threat Analysis'].map((item) => (
                  <a key={item} href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTR2LTJoLTJ2Mmgyem0wLTR2LTJoLTJ2MmgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-6">
              Cybersecurity Insights & Analysis
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-400">
              Expert analysis on the latest threats, defensive strategies, and security tools from industry professionals.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-400">
                <Users className="w-5 h-5" />
                <span>10,000+ Monthly Readers</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Award className="w-5 h-5" />
                <span>CISSP Certified Authors</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Articles */}
      <section className="py-16 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => (
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-colors">
                <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="text-blue-500 text-sm mb-2">{article.category}</div>
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-400 text-sm">{article.description}</p>
                  <button className="mt-4 flex items-center text-blue-500 hover:text-blue-400">
                    Read More <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800 rounded-2xl p-8 md:p-12 border border-gray-700">
            <div className="max-w-2xl mx-auto text-center">
              <Mail className="w-12 h-12 text-blue-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Stay Informed, Stay Secure</h2>
              <p className="text-gray-400 mb-8">
                Get the latest security insights delivered to your inbox. No spam, unsubscribe anytime.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors"
                >
                  Subscribe
                </button>
              </form>
              <div className="mt-4 text-sm text-gray-500">
                Protected by industry-standard encryption. View our Privacy Policy.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <Lock className="w-8 h-8 text-blue-500 mx-auto mb-4" />
              <div className="font-semibold">SSL Secured</div>
              <div className="text-sm text-gray-400">256-bit encryption</div>
            </div>
            <div>
              <Terminal className="w-8 h-8 text-blue-500 mx-auto mb-4" />
              <div className="font-semibold">Expert Authors</div>
              <div className="text-sm text-gray-400">Industry veterans</div>
            </div>
            <div>
              <AlertTriangle className="w-8 h-8 text-blue-500 mx-auto mb-4" />
              <div className="font-semibold">Threat Intelligence</div>
              <div className="text-sm text-gray-400">Real-time updates</div>
            </div>
            <div>
              <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-4" />
              <div className="font-semibold">500+ Articles</div>
              <div className="text-sm text-gray-400">In-depth content</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-blue-500" />
              <span className="font-bold">MITM.LIFE</span>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} MITM.LIFE. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;