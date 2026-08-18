import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiClock, FiUser } from 'react-icons/fi';
import { getPosts } from '../api/client';
import { blogCategories as localCategories, blogPosts as localPosts } from '../data/blogPosts';

function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [blogPosts, setBlogPosts] = useState(localPosts);
  const [blogCategories, setBlogCategories] = useState(localCategories);

  useEffect(() => {
    getPosts({ search: searchTerm, category: selectedCategory })
      .then((data) => {
        setBlogPosts(data.posts || []);
        if (data.categories) setBlogCategories(data.categories);
      })
      .catch(() => {});
  }, [searchTerm, selectedCategory]);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-secondary-50 py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Insights</h1>
          <p className="text-secondary-600">
            3D visualization, AR and VR tours, and remote property viewing
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="input pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <select
                  className="input"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {blogCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Link to={`/blog/${post.slug}`}>
                <div className="relative h-48">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-primary-600">
                    {blogCategories.find((c) => c.id === post.category)?.name}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-3 hover:text-primary-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-secondary-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-secondary-500">
                    <FiUser className="mr-2" />
                    <span className="mr-4">{post.author}</span>
                    <FiClock className="mr-2" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
