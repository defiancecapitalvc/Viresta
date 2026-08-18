import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiUser, FiClock, FiChevronDown, FiChevronUp, FiBox, FiEye, FiSmartphone, FiGlobe } from 'react-icons/fi';
import { getProperties as fetchProperties, getPosts } from '../api/client';
import { getProperties as localProperties } from '../data/properties';
import { blogPosts as localPosts, blogCategories as localCategories } from '../data/blogPosts';

function Home() {
  const [openSections, setOpenSections] = useState({});
  const [featuredProperties, setFeaturedProperties] = useState(localProperties());
  const [blogPosts, setBlogPosts] = useState(localPosts);
  const [blogCategories, setBlogCategories] = useState(localCategories);

  useEffect(() => {
    fetchProperties()
      .then((data) => setFeaturedProperties(data.properties || []))
      .catch(() => {});
    getPosts()
      .then((data) => {
        setBlogPosts(data.posts || []);
        if (data.categories) setBlogCategories(data.categories);
      })
      .catch(() => {});
  }, []);

  const advantages = [
    {
      icon: FiBox,
      title: 'True-to-scale 3D',
      description: 'Explore interiors and exteriors in interactive models that communicate space, light, and layout.'
    },
    {
      icon: FiEye,
      title: 'Virtual walkthroughs',
      description: 'Move room to room in first person without booking a site visit or flying across the country.'
    },
    {
      icon: FiSmartphone,
      title: 'AR on site',
      description: 'Preview furniture, finishes, and unbuilt architecture in the real world from a phone.'
    },
    {
      icon: FiGlobe,
      title: 'Remote viewing',
      description: 'Buyers, agents, and developers can evaluate the same property from anywhere.'
    }
  ];

  const experienceSteps = [
    {
      icon: FiGlobe,
      title: 'Browse listings',
      description: 'Find homes, developments, and showrooms with ready 3D, AR, and VR experiences.'
    },
    {
      icon: FiBox,
      title: 'Enter the property',
      description: 'Walk through rooms, inspect floor plans, and understand spatial layouts in 3D.'
    },
    {
      icon: FiSmartphone,
      title: 'Try AR or VR',
      description: 'Place the home in your environment or put on a headset for a full walkthrough.'
    },
    {
      icon: FiUser,
      title: 'Talk to an agent',
      description: 'Share the same digital tour with your advisor and book a visit only if it fits.'
    }
  ];

  const faqQuestions = [
    {
      question: 'What is Viresta?',
      answer: 'Viresta is an immersive real-estate visualization platform. It brings properties to life through 3D, AR, VR, and interactive digital experiences so people can understand a home before they visit it.'
    },
    {
      question: 'Do I need special hardware?',
      answer: '3D tours work in a modern web browser. AR is designed for mobile devices. VR walkthroughs use WebXR when a headset is available.'
    },
    {
      question: 'Who is the platform for?',
      answer: 'Buyers, agents, developers, architects, and international clients who need to present or evaluate properties remotely.'
    },
    {
      question: 'Can I share a tour with a client?',
      answer: 'Yes. Every listing has a shareable 3D experience so an agent and a remote buyer can look at the same space.'
    }
  ];

  const toggleSection = (questionIndex) => {
    setOpenSections((prev) => ({
      ...prev,
      [questionIndex]: !prev[questionIndex]
    }));
  };

  return (
    <div className="space-y-16">
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
            alt="Interior of a modern home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>

        <div className="relative container text-center text-white space-y-8">
          <motion.h1
            className="text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Experience the property before you visit it
          </motion.h1>
          <motion.p
            className="text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Viresta brings homes to life through 3D, AR, VR, and interactive digital tours — from anywhere in the world.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <Link to="/properties" className="btn bg-white text-primary-600 hover:bg-primary-50">
              Browse properties
            </Link>
            <Link to="/properties/1/3d" className="btn bg-primary-600 hover:bg-primary-700">
              Start a 3D tour
            </Link>
            <Link to="/properties/1/ar" className="btn bg-primary-800 hover:bg-primary-900">
              AR Preview
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How a digital viewing works</h2>
          <p className="text-secondary-600">Four steps from listing to a confident decision</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experienceSteps.map((step, index) => (
            <motion.div
              key={step.title}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <div className="bg-white p-6 rounded-lg shadow-md text-center h-full">
                <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="text-2xl text-primary-600" />
                </div>
                <div className="text-primary-600 text-2xl font-bold mb-4">Step {index + 1}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-secondary-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-secondary-900 text-white py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Built for immersive real estate</h2>
            <p className="text-secondary-300">3D models, walkthroughs, floor plans, and spatial previews in one place</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-secondary-800 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">{item.title}</h3>
                <p className="text-secondary-300 text-center">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured properties</h2>
          <p className="text-secondary-600">Homes you can tour in 3D, AR, and VR today</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              className="card group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <div className="relative h-48">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-primary-600 font-semibold">
                  {property.status}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                <p className="text-secondary-600 mb-4">{property.location}</p>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-secondary-500">Listed at</p>
                    <p className="font-semibold">${property.price.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-secondary-500">Spaces</p>
                    <p className="font-semibold">{property.beds} bed · {property.baths} bath</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {property.experiences.map((experience) => (
                    <span key={experience} className="px-2 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-700">
                      {experience}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/properties/${property.id}`}
                  className="btn w-full flex items-center justify-center"
                >
                  View experience
                  <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="bg-primary-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to walk a home from your desk?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Open a 3D tour, inspect the floor plan, and invite your agent into the same digital property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/properties" className="btn bg-white text-primary-600 hover:bg-primary-50">
              Browse properties
            </Link>
            <Link to="/properties/1/3d" className="btn bg-primary-700 hover:bg-primary-800">
              Launch 3D viewer
            </Link>
            <Link to="/properties/1/ar" className="btn bg-primary-800 hover:bg-primary-900">
              Try AR Preview
            </Link>
          </div>
        </div>
      </section>

      <div className="container bg-white py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Latest insights</h2>
          <p className="text-secondary-600">
            Notes on 3D visualization, AR previews, and remote property viewing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
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
                  <h3 className="text-xl font-semibold mb-3 hover:text-primary-600 transition-colors">
                    {post.title}
                  </h3>
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

      <section className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently asked questions</h2>
            <p className="text-secondary-600">Common questions about immersive property viewing</p>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden divide-y divide-secondary-100">
            {faqQuestions.map((item, questionIndex) => (
              <div key={item.question} className="p-6">
                <button
                  className="w-full flex justify-between items-center text-left"
                  onClick={() => toggleSection(questionIndex)}
                >
                  <span className="font-medium">{item.question}</span>
                  {openSections[questionIndex] ? (
                    <FiChevronUp className="flex-shrink-0 ml-4" />
                  ) : (
                    <FiChevronDown className="flex-shrink-0 ml-4" />
                  )}
                </button>
                <AnimatePresence>
                  {openSections[questionIndex] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-secondary-600">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;
