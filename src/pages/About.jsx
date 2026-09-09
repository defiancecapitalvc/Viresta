import { FiBox, FiBriefcase, FiGlobe, FiShield, FiUsers } from "react-icons/fi";

const stats = [
  { value: "120+", label: "Digital properties" },
  { value: "15,000+", label: "Remote viewings" },
  { value: "45+", label: "Cities covered" },
  { value: "3D · AR · VR", label: "Experience modes" },
];

const team = [
  {
    name: "Alessandro Santos Alves",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "Leads Viresta’s product vision for immersive property experiences.",
  },
  {
    name: "Roman Cole",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "Builds the 3D engine, WebXR pipeline, and asset delivery stack.",
  },
  {
    name: "Mehdi Rezakhani",
    role: "Web & Mobile Developer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    bio: "Designs the web and mobile interfaces buyers and agents use every day.",
  },
  {
    name: "Elena Ward",
    role: "Spatial Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    bio: "Turns architectural models into walkable, accurate digital environments.",
  },
];

function About() {
  return (
    <div className="px-4 py-8 sm:px-6">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Protocol</p>
      <h1 className="mt-2 max-w-2xl text-3xl font-semibold">Immersive real estate, built like a marketplace</h1>
      <p className="mt-4 max-w-2xl text-zinc-400">
        Viresta helps buyers, agents, and developers experience properties through 3D, AR, VR, and interactive digital tours — instead of photographs and floor plans alone.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="surface p-5">
            <p className="text-2xl font-semibold">{stat.value}</p>
            <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-3 md:grid-cols-3">
        {[
          { icon: FiUsers, title: "Clarity", text: "Interactive models that communicate scale, flow, and finish." },
          { icon: FiShield, title: "Accuracy", text: "Digital rooms built from architectural data, not guesswork." },
          { icon: FiGlobe, title: "Access", text: "The same tour for a local client and an overseas buyer." },
        ].map((item) => (
          <div key={item.title} className="surface p-5">
            <item.icon className="mb-3 text-primary-400" />
            <h2 className="font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-zinc-500">{item.text}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-4 mt-10 text-lg font-semibold">The team</h2>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {team.map((member) => (
          <div key={member.name} className="card">
            <img src={member.image} alt={member.name} className="h-52 w-full object-cover" />
            <div className="p-4">
              <p className="font-semibold">{member.name}</p>
              <p className="text-sm text-primary-300">{member.role}</p>
              <p className="mt-2 text-sm text-zinc-500">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mb-4 mt-10 text-lg font-semibold">Recognition</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {[
          { icon: FiBox, title: "Best immersive listing", text: "PropTech Experience Awards 2024" },
          { icon: FiBriefcase, title: "Visualization platform of the year", text: "Real Estate Design Forum 2024" },
          { icon: FiGlobe, title: "Outstanding 3D pipeline", text: "Architecture Media Awards 2024" },
        ].map((item) => (
          <div key={item.title} className="surface p-5">
            <item.icon className="mb-3 text-primary-400" />
            <p className="font-semibold">{item.title}</p>
            <p className="mt-1 text-sm text-zinc-500">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
