import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

function FAQ() {
  const [openSections, setOpenSections] = useState({});

  const faqSections = [
    {
      title: 'Platform',
      questions: [
        {
          question: 'What is Viresta?',
          answer: 'Viresta is an immersive real-estate visualization platform. It turns properties into 3D, AR, VR, and interactive digital experiences so buyers, agents, and developers can explore a home before visiting it.',
        },
        {
          question: 'Who can use it?',
          answer: 'Anyone evaluating or presenting property: home buyers, international clients, agents, developers, architects, and interior designers.',
        },
        {
          question: 'Do I need a headset?',
          answer: 'No. 3D tours run in the browser. AR is available on supported phones. VR is optional when a WebXR headset is connected.',
        },
        {
          question: 'How accurate are the models?',
          answer: 'Models are built from architectural drawings, scans, or approved developer assets so rooms, measurements, and circulation stay consistent with the real property.',
        },
      ],
    },
    {
      title: 'Tours and viewing',
      questions: [
        {
          question: 'What is a 3D walkthrough?',
          answer: 'A first-person or orbit view of the digital property. You can move between rooms, inspect finishes, and open the matching floor plan.',
        },
        {
          question: 'What does AR add?',
          answer: 'AR places the home or selected interiors in your real surroundings so you can judge scale, furniture, and orientation on site or at a desk.',
        },
        {
          question: 'Can I share a tour with a client?',
          answer: 'Yes. Each listing has a shareable experience so an agent and a remote buyer look at the same space.',
        },
        {
          question: 'Can I still book a physical visit?',
          answer: 'Yes. Digital tours are meant to help you shortlist. When a property fits, you can contact the listing agent to schedule a visit.',
        },
      ],
    },
    {
      title: 'For agents and developers',
      questions: [
        {
          question: 'What assets can I upload?',
          answer: 'GLB and GLTF models, textures, 360 images, floor plans, and supporting photography. The asset service prepares them for the web viewer.',
        },
        {
          question: 'Can one development have several configurations?',
          answer: 'Yes. You can present multiple layouts, finishes, or buildings from the same project page.',
        },
        {
          question: 'Does Viresta replace listing photos?',
          answer: 'No. Photos remain useful. The platform adds interactive environments so people understand space that photos cannot show.',
        },
      ],
    },
  ];

  const toggleSection = (sectionTitle, questionIndex) => {
    setOpenSections((prev) => ({
      ...prev,
      [`${sectionTitle}-${questionIndex}`]: !prev[`${sectionTitle}-${questionIndex}`],
    }));
  };

  return (
    <div className="min-h-screen bg-secondary-50 py-16">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Frequently asked questions</h1>
          <p className="text-secondary-600 text-center mb-12">
            How immersive viewing works on Viresta
          </p>

          <div className="space-y-8">
            {faqSections.map((section) => (
              <div key={section.title} className="bg-white rounded-lg shadow-md overflow-hidden">
                <h2 className="text-xl font-semibold p-6 bg-secondary-50">{section.title}</h2>
                <div className="divide-y divide-secondary-100">
                  {section.questions.map((item, questionIndex) => (
                    <div key={item.question} className="p-6">
                      <button
                        className="w-full flex justify-between items-center text-left"
                        onClick={() => toggleSection(section.title, questionIndex)}
                      >
                        <span className="font-medium">{item.question}</span>
                        {openSections[`${section.title}-${questionIndex}`] ? (
                          <FiChevronUp className="flex-shrink-0 ml-4" />
                        ) : (
                          <FiChevronDown className="flex-shrink-0 ml-4" />
                        )}
                      </button>
                      <AnimatePresence>
                        {openSections[`${section.title}-${questionIndex}`] && (
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
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default FAQ;
