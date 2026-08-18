import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiUser, FiCalendar, FiShare2, FiArrowLeft, FiTag } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { getPost } from '../api/client';
import { getPostBySlug } from '../data/blogPosts';

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(() => getPostBySlug(slug));

  useEffect(() => {
    getPost(slug)
      .then((data) => setPost(data.post))
      .catch(() => setPost(getPostBySlug(slug)));
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-secondary-600 mb-4">This article is not available.</p>
          <Link to="/blog" className="btn">Back to insights</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="relative h-[400px]">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl text-white"
            >
              <Link to="/blog" className="inline-flex items-center text-white mb-6 hover:text-primary-300">
                <FiArrowLeft className="mr-2" />
                Back to blog
              </Link>
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center text-secondary-200 space-x-6">
                <div className="flex items-center">
                  <FiUser className="mr-2" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <FiCalendar className="mr-2" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <FiClock className="mr-2" />
                  {post.readTime}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-md p-8">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FiShare2 className="mr-2" />
                  Share
                </h3>
                <div className="flex space-x-4">
                  <span className="p-2 rounded-full bg-blue-100 text-blue-600">
                    <FaFacebook size={20} />
                  </span>
                  <span className="p-2 rounded-full bg-sky-100 text-sky-500">
                    <FaTwitter size={20} />
                  </span>
                  <span className="p-2 rounded-full bg-blue-100 text-blue-700">
                    <FaLinkedin size={20} />
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FiTag className="mr-2" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-secondary-100 text-secondary-600 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
