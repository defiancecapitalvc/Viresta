import { motion } from 'framer-motion';

function Privacy() {
  const sections = [
    {
      title: 'Introduction',
      content: `This Privacy Policy explains how Viresta collects, uses, and protects personal information when you use our immersive property platform.`,
    },
    {
      title: 'Information we collect',
      content: `We collect information you provide directly, including:

• Name, email address, and phone number
• Messages you send to listing agents
• Saved properties and tour activity

We also collect basic device and usage data such as IP address, browser type, and pages viewed so the 3D viewer can load correctly.`,
    },
    {
      title: 'How we use information',
      content: `We use this information to:

• Deliver 3D, AR, and VR property experiences
• Connect you with listing agents
• Improve performance of models and tours
• Send service updates you request

We do not sell personal information.`,
    },
    {
      title: 'Data security',
      content: `We use encryption in transit, access controls, and regular reviews of our systems. No internet service is perfectly secure, and you should only share information you are comfortable providing.`,
    },
    {
      title: 'Information sharing',
      content: `We may share information with:

• Listing agents when you request contact
• Service providers that host assets and the website
• Authorities when the law requires it`,
    },
    {
      title: 'Your rights',
      content: `You may ask to access, correct, or delete your information, and you can opt out of marketing email. Contact privacy@viresta.com to make a request.`,
    },
    {
      title: 'Contact',
      content: `Email: privacy@viresta.com
Address: 210 Visualization Way, Miami, FL`,
    },
  ];

  return (
    <div className="min-h-screen bg-secondary-50 py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center mb-4">Privacy policy</h1>
          <p className="text-secondary-600 text-center mb-12">Last updated: March 15, 2024</p>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                  <div className="text-secondary-600 whitespace-pre-line">{section.content}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Privacy;
