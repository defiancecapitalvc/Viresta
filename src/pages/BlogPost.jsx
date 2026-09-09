import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiClock, FiShare2, FiTag, FiUser } from "react-icons/fi";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { getPost } from "../api/client";
import { getPostBySlug } from "../data/blogPosts";

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
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-zinc-400">This article is not available.</p>
          <Link to="/blog" className="btn">Back to insights</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative h-[340px]">
        <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-black/50 to-black/30" />
        <div className="absolute inset-0 flex items-end px-4 pb-8 sm:px-6">
          <div className="max-w-3xl">
            <Link to="/blog" className="mb-4 inline-flex items-center text-sm text-zinc-300 hover:text-white">
              <FiArrowLeft className="mr-2" /> Back to insights
            </Link>
            <h1 className="text-3xl font-semibold">{post.title}</h1>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-zinc-300">
              <span className="inline-flex items-center"><FiUser className="mr-2" />{post.author}</span>
              <span className="inline-flex items-center"><FiCalendar className="mr-2" />{post.date}</span>
              <span className="inline-flex items-center"><FiClock className="mr-2" />{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 px-4 py-8 sm:px-6 lg:grid-cols-3">
        <div className="surface p-6 lg:col-span-2">
          <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-zinc-300" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        <div className="space-y-4">
          <div className="surface p-5">
            <h3 className="mb-3 flex items-center font-semibold"><FiShare2 className="mr-2" /> Share</h3>
            <div className="flex gap-3 text-zinc-400">
              <FaFacebook /><FaTwitter /><FaLinkedin />
            </div>
          </div>
          <div className="surface p-5">
            <h3 className="mb-3 flex items-center font-semibold"><FiTag className="mr-2" /> Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="chip">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
