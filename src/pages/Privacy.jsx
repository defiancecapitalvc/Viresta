function Privacy() {
  const sections = [
    {
      title: "Introduction",
      content: "This Privacy Policy explains how Viresta collects, uses, and protects personal information when you use our immersive property platform.",
    },
    {
      title: "Information we collect",
      content: "We collect information you provide directly, including name, email, phone, messages to listing agents, saved properties, and tour activity. We also collect basic device and usage data so the 3D viewer can load correctly.",
    },
    {
      title: "How we use information",
      content: "We use this information to deliver 3D, AR, and VR property experiences, connect you with listing agents, improve performance of models and tours, and send service updates you request. We do not sell personal information.",
    },
    {
      title: "Data security",
      content: "We use encryption in transit, access controls, and regular reviews of our systems. No internet service is perfectly secure, and you should only share information you are comfortable providing.",
    },
    {
      title: "Information sharing",
      content: "We may share information with listing agents when you request contact, service providers that host assets and the website, and authorities when the law requires it.",
    },
    {
      title: "Your rights",
      content: "You may ask to access, correct, or delete your information, and you can opt out of marketing email. Contact privacy@viresta.com to make a request.",
    },
    {
      title: "Contact",
      content: "Email: privacy@viresta.com. Address: 210 Visualization Way, Miami, FL.",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Legal</p>
      <h1 className="text-2xl font-semibold">Privacy policy</h1>
      <p className="mb-6 text-sm text-zinc-500">Last updated: March 15, 2024</p>
      <div className="surface divide-y divide-white/5">
        {sections.map((section) => (
          <section key={section.title} className="p-5">
            <h2 className="mb-2 font-semibold">{section.title}</h2>
            <p className="text-sm leading-6 text-zinc-400">{section.content}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Privacy;
