export const blogCategories = [
  { id: "all", name: "All Posts" },
  { id: "3d", name: "3D Visualization" },
  { id: "ar-vr", name: "AR & VR" },
  { id: "property", name: "Property" },
  { id: "technology", name: "Technology" },
];

export const blogPosts = [
  {
    id: 1,
    title: "Why 3D Walkthroughs Change How Buyers Choose Homes",
    slug: "3d-walkthroughs-change-home-buying",
    excerpt: "Interactive 3D tours help buyers understand space, light, and flow before they ever set foot on the property.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    category: "3d",
    author: "Sarah Johnson",
    date: "2024-03-15",
    readTime: "5 min read",
    tags: ["3D", "Virtual Tours", "Buyers"],
    content: `
      <p class="mb-4">Photographs and floor plans still matter, but they cannot show how a home actually feels. A 3D walkthrough lets buyers move through rooms, check sight lines, and compare layouts from anywhere.</p>
      <h2 class="text-2xl font-semibold mt-8 mb-4">What buyers notice first</h2>
      <ul class="list-disc pl-6 mb-4">
        <li class="mb-2">How rooms connect</li>
        <li class="mb-2">Natural light throughout the day</li>
        <li class="mb-2">True scale of kitchens, bedrooms, and outdoor areas</li>
      </ul>
      <h2 class="text-2xl font-semibold mt-8 mb-4">Why agents use it</h2>
      <p class="mb-4">Remote buyers can shortlist properties faster. Agents spend less time on mismatched showings and more time with people who already understand the space.</p>
    `,
  },
  {
    id: 2,
    title: "AR Property Previews: Placing Architecture in the Real World",
    slug: "ar-property-previews",
    excerpt: "Augmented reality lets clients preview scale, interiors, and unbuilt developments against their actual surroundings.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    category: "ar-vr",
    author: "Michael Chen",
    date: "2024-03-12",
    readTime: "7 min read",
    tags: ["AR", "Architecture", "Mobile"],
    content: `
      <p class="mb-4">AR is most useful when a property is not finished yet, or when a buyer needs to understand size. Clients can place a model on a table, walk around it, and compare it with nearby buildings.</p>
      <h2 class="text-2xl font-semibold mt-8 mb-4">Common uses</h2>
      <ul class="list-disc pl-6 mb-4">
        <li class="mb-2">Furniture and interior placement</li>
        <li class="mb-2">Development previews for off-plan homes</li>
        <li class="mb-2">Scale-aware visualization on site</li>
      </ul>
    `,
  },
  {
    id: 3,
    title: "Designing Floor Plans That Connect to 3D Environments",
    slug: "interactive-floor-plans-3d",
    excerpt: "Clickable rooms and measured plans become far clearer when they open directly into a 3D scene.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    category: "property",
    author: "David Rodriguez",
    date: "2024-03-10",
    readTime: "6 min read",
    tags: ["Floor Plans", "3D", "UX"],
    content: `
      <p class="mb-4">A static PDF plan still leaves people guessing. Interactive plans let users tap a room and drop into that space, with measurements that stay consistent between 2D and 3D.</p>
      <p class="mb-4">Viresta treats the floor plan as a map of the same digital property, not a separate document.</p>
    `,
  },
];

export function getPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug) || blogPosts[0];
}
