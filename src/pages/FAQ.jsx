import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

function FAQ() {
  const [open, setOpen] = useState("");

  const faqSections = [
    {
      title: "Platform",
      questions: [
        {
          question: "What is Viresta?",
          answer: "Viresta is an immersive real-estate visualization platform. It turns properties into 3D, AR, VR, and interactive digital experiences so buyers, agents, and developers can explore a home before visiting it.",
        },
        {
          question: "Who can use it?",
          answer: "Anyone evaluating or presenting property: home buyers, international clients, agents, developers, architects, and interior designers.",
        },
        {
          question: "Do I need a headset?",
          answer: "No. 3D tours run in the browser. AR is available on supported phones. VR is optional when a WebXR headset is connected.",
        },
      ],
    },
    {
      title: "Tours and viewing",
      questions: [
        {
          question: "What is a 3D walkthrough?",
          answer: "A first-person or orbit view of the digital property. You can move between rooms, inspect finishes, and open the matching floor plan.",
        },
        {
          question: "What does AR add?",
          answer: "AR places the home or selected interiors in your real surroundings so you can judge scale, furniture, and orientation on site or at a desk.",
        },
        {
          question: "Can I share a tour with a client?",
          answer: "Yes. Each listing has a shareable experience so an agent and a remote buyer look at the same space.",
        },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Help</p>
      <h1 className="mb-6 text-2xl font-semibold">Frequently asked questions</h1>
      <div className="space-y-4">
        {faqSections.map((section) => (
          <div key={section.title} className="surface overflow-hidden">
            <h2 className="border-b border-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">
              {section.title}
            </h2>
            {section.questions.map((item) => {
              const key = `${section.title}-${item.question}`;
              const isOpen = open === key;
              return (
                <div key={item.question} className="border-b border-white/5 last:border-0">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                    onClick={() => setOpen(isOpen ? "" : key)}
                  >
                    <span className="pr-4 font-medium">{item.question}</span>
                    <FiChevronDown className={`shrink-0 transition ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && <p className="px-5 pb-4 text-sm leading-6 text-zinc-400">{item.answer}</p>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
