import { motion } from 'framer-motion';
import { FiUsers, FiGlobe, FiShield, FiBriefcase, FiAward, FiBox } from 'react-icons/fi';
import { FaHandshake } from 'react-icons/fa';
import MehdiRezakhani_Pic from '../assets/MehdiRezakhani2.jpeg';

function About() {
  const stats = [
    { value: '120+', label: 'Digital properties', icon: FiBox },
    { value: '15,000+', label: 'Remote viewings', icon: FiUsers },
    { value: '45+', label: 'Cities covered', icon: FiGlobe },
    { value: '3D · AR · VR', label: 'Experience modes', icon: FiShield },
  ];

  const team = [
    {
      name: 'Alessandro Santos Alves',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      bio: 'Leads Viresta’s product vision for immersive property experiences.',
    },
    {
      name: 'Roman Cole',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
      bio: 'Builds the 3D engine, WebXR pipeline, and asset delivery stack.',
    },
    {
      name: 'Mehdi Rezakhani',
      role: 'Web & Mobile Developer',
      image: MehdiRezakhani_Pic,
      bio: 'Designs the web and mobile interfaces buyers and agents use every day.',
    },
    {
      name: 'Elena Ward',
      role: 'Spatial Designer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
      bio: 'Turns architectural models into walkable, accurate digital environments.',
    },
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      <section className="relative bg-secondary-900 text-white py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Immersive real estate, reimagined
            </h1>
            <p className="text-xl text-secondary-200">
              Viresta helps buyers, agents, and developers experience properties through 3D, AR, VR, and interactive digital tours — instead of photographs and floor plans alone.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 text-center shadow-md"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary-600" />
                <div className="text-3xl font-bold text-secondary-900 mb-2">{stat.value}</div>
                <div className="text-secondary-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Our mission</h2>
            <p className="text-lg text-secondary-600">
              Let people understand a property before they visit it. Accurate digital spaces should feel as tangible as walking the real rooms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
              <div className="bg-primary-50 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <FaHandshake className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Clarity</h3>
              <p className="text-secondary-600">
                Interactive models and floor plans that communicate scale, flow, and finish without guesswork.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-center">
              <div className="bg-primary-50 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <FiShield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Accuracy</h3>
              <p className="text-secondary-600">
                Digital environments built from architectural data so remote viewers can trust what they see.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-center">
              <div className="bg-primary-50 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <FiGlobe className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Access</h3>
              <p className="text-secondary-600">
                International buyers and local clients can tour the same property from any device.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">The team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-4">{member.role}</p>
                  <p className="text-secondary-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-secondary-50 p-6 rounded-lg text-center">
              <FiAward className="w-12 h-12 mx-auto mb-4 text-primary-600" />
              <h3 className="text-xl font-semibold mb-2">Best immersive listing</h3>
              <p className="text-secondary-600">PropTech Experience Awards 2024</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-secondary-50 p-6 rounded-lg text-center">
              <FiBriefcase className="w-12 h-12 mx-auto mb-4 text-primary-600" />
              <h3 className="text-xl font-semibold mb-2">Visualization platform of the year</h3>
              <p className="text-secondary-600">Real Estate Design Forum 2024</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="bg-secondary-50 p-6 rounded-lg text-center">
              <FiBox className="w-12 h-12 mx-auto mb-4 text-primary-600" />
              <h3 className="text-xl font-semibold mb-2">Outstanding 3D pipeline</h3>
              <p className="text-secondary-600">Architecture Media Awards 2024</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
