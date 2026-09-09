import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiClock, FiSearch, FiUser } from "react-icons/fi";
import { getPosts } from "../api/client";
import { blogCategories as localCategories, blogPosts as localPosts } from "../data/blogPosts";

function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
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
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="px-4 py-6 sm:px-6">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Editorial</p>
      <h1 className="mb-6 text-2xl font-semibold">Insights</h1>

      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-white/5 bg-ink-800 p-4 md:flex-row">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            className="input pl-10"
            placeholder="Search articles"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="input md:w-56" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {blogCategories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filteredPosts.map((post) => (
          <Link key={post.id} to={`/blog/${post.slug}`} className="card">
            <div className="relative h-44">
              <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
              <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs">
                {blogCategories.find((c) => c.id === post.category)?.name}
              </span>
            </div>
            <div className="p-4">
              <h2 className="mb-2 font-semibold">{post.title}</h2>
              <p className="mb-4 line-clamp-2 text-sm text-zinc-500">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-zinc-500">
                <span className="inline-flex items-center"><FiUser className="mr-1" />{post.author}</span>
                <span className="inline-flex items-center"><FiClock className="mr-1" />{post.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Blog;
