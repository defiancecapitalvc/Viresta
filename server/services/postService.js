const { read } = require("../store/jsonStore");

function list({ search, category } = {}) {
  let posts = [...read().posts];
  if (category && category !== "all") {
    posts = posts.filter((post) => post.category === category);
  }
  if (search) {
    const term = search.toLowerCase();
    posts = posts.filter(
      (post) => post.title.toLowerCase().includes(term) || post.excerpt.toLowerCase().includes(term)
    );
  }
  return posts;
}

function getBySlug(slug) {
  return read().posts.find((post) => post.slug === slug) || null;
}

function categories() {
  return [
    { id: "all", name: "All Posts" },
    { id: "3d", name: "3D Visualization" },
    { id: "ar-vr", name: "AR & VR" },
    { id: "property", name: "Property" },
    { id: "technology", name: "Technology" },
  ];
}

module.exports = { list, getBySlug, categories };
