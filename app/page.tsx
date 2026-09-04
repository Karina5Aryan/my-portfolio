"use client";

import { useEffect, useState } from "react";
import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

// ---------- content ----------

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const STACK = [
  "React.js",
  "React Native",
  "Next.js",
  "Node.js",
  "Express",
  "GraphQL",
  "MongoDB",
  "Redux",
  "Tailwind CSS",
  "TypeScript",
];

const SKILL_GROUPS = [
  {
    title: "Frontend",
    tags: [
      "React.js",
      "React Native",
      "Next.js",
      "HTML & CSS",
      "JavaScript",
      "Redux",
      "Tailwind CSS",
      "MUI",
    ],
  },
  {
    title: "Backend",
    tags: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "MySQL",
      "GraphQL",
      "RESTful APIs",
    ],
  },
  {
    title: "Tooling & Practice",
    tags: [
      "Git & GitHub",
      "GitLab",
      "Source Tree",
      "Data Structures",
      "Problem Solving",
      "Agile",
    ],
  },
];

const EXPERIENCE = [
  {
    role: "Freelance",
    tag: "React & Node.js",
    date: "Jun 2026 — Present",
    org: "Ahmedabad",
    desc: "Building a full-scale e-commerce platform for retail and wholesale clients, including a dedicated admin panel for products, orders, customers and inventory.",
    current: true,
  },
  {
    role: "React/Next Developer",
    tag: "Samcom Technobrains",
    date: "Mar 2026 — Jun 2026",
    org: "Ahmedabad",
    desc: "Developed and maintained enterprise web applications with React.js, Next.js, Tailwind CSS, Zustand and GraphQL — building responsive interfaces, integrating APIs, and working closely with clients in an Agile environment.",
    current: false,
  },
  {
    role: "Lead Developer",
    tag: "Tristate Technology LLP",
    date: "Jan 2023 — Mar 2026",
    org: "Ahmedabad",
    desc: "Led development of apps and web apps using React, React Native, TypeScript and Redux. Built reusable components, managed state at scale, and optimized performance across a growing product suite.",
    current: false,
  },
  {
    role: "Web Development",
    tag: "Internship",
    date: "Jun 2022 — Aug 2022",
    org: "Ahmedabad",
    desc: "First hands-on project work with HTML, CSS, JavaScript and PHP basics — built a website from scratch and focused on responsive layout and UI polish.",
    current: false,
  },
];

const PROJECTS = [
  {
    stack: "NEXT.JS · GEMINI API · ELEVENLABS API",
    title: "AI Chatbot with a 3D Avatar",
    desc: "A conversational chatbot with real-time voice responses, paired with a 3D avatar that syncs speech and animation to AI-generated replies.",
    wide: true,
  },
  {
    stack: "NEXT.JS · SSR",
    title: "Rebaja",
    desc: "A loan and property management platform built with server-side rendering, reusable accessible components, and daily client collaboration on scope.",
  },
  {
    stack: "REACT NATIVE · FIREBASE",
    title: "Travel Bee",
    desc: "A trip-planning app — add travel plans, drop map markers for places to visit, and reserve dates, backed by Firebase.",
  },
  {
    stack: "REACT NATIVE",
    title: "Canadian Migraine Tracker",
    desc: "Lets users log past preventative trials and generates a dedicated report, with finer control over which acute medications appear in the summary.",
  },
  {
    stack: "NEXT.JS · TAILWIND · STRIPE",
    title: "Connecta Solutions",
    desc: "A server-rendered marketing site with a responsive Tailwind build and Stripe wired in on the backend.",
  },
  {
    stack: "NEXT.JS · STRIPE",
    title: "Closswap",
    desc: "A web app for browsing event details and locations and joining events, with Stripe handling payment at checkout.",
  },
  {
    stack: "REACT NATIVE · REACT.JS",
    title: "Eolas Flexicollect",
    desc: "Owned the full lifecycle of a mobile app, web page and admin panel — from feature design to a polished, efficient React.js admin experience.",
  },
];

const EDUCATION = [
  {
    school: "GEC Modasa",
    degree: "Bachelor of Engineering · Modasa, India",
    date: "2019 — 2023",
  },
  {
    school: "Uma Vidhyalaya",
    degree: "Higher Secondary · Himmatnagar, India",
    date: "Apr 2018 — Mar 2019",
  },
];

// shared bits so Tailwind strings stay readable
const FONT_DISPLAY = "[font-family:var(--font-display)]";
const FONT_BODY = "[font-family:var(--font-body)]";
const navLinkAfter =
  "relative after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:bg-[#e31c79] after:transition-all after:duration-300";

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("about");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`${spaceGrotesk.variable} ${inter.variable} ${FONT_BODY} text-[#201017] bg-white overflow-x-hidden selection:bg-[#e31c79] selection:text-white`}
    >
      {/* ---------- NAV ---------- */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/[.82] backdrop-blur-md border-b border-[#f0cede]">
        <div className="max-w-[920px] mx-auto px-8 py-[18px] flex items-center justify-between">
          <div className={`${FONT_DISPLAY} font-bold text-[19px]`}>
            Portfolio<span className="text-[#e31c79]">.</span>
          </div>

          <ul
            className={`flex flex-col gap-0 fixed top-[60px] left-0 right-0 bg-white border-b border-[#f0cede] px-8 pt-2 pb-5 transition-all duration-300
              md:static md:flex-row md:gap-[30px] md:bg-transparent md:border-none md:p-0 md:opacity-100 md:translate-y-0 md:pointer-events-auto
              ${menuOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-[120%] opacity-0 pointer-events-none"}`}
          >
            {NAV_LINKS.map((link) => (
              <li
                key={link.id}
                className="md:border-none border-b border-[#f0cede]"
              >
                <a
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-3 md:py-1 text-sm font-medium ${navLinkAfter} ${
                    activeId === link.id
                      ? "text-[#e31c79] after:w-full"
                      : "text-[#201017] after:w-0 hover:after:w-full"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden bg-transparent border-none cursor-pointer"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#201017"
              strokeWidth={2}
              strokeLinecap="round"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ---------- HERO ---------- */}
      <header className="relative pt-[120px] pb-[100px] overflow-hidden">
        <div className="absolute rounded-full blur-[60px] opacity-[.55] z-0 w-[420px] h-[420px] bg-[#f6b8d3] -top-[140px] -right-[120px] animate-[drift_22s_ease-in-out_infinite] motion-reduce:animate-none" />
        <div className="absolute rounded-full blur-[60px] opacity-[.55] z-0 w-[320px] h-[320px] bg-[#fcedf3] -bottom-[100px] -left-[80px] animate-[drift_22s_ease-in-out_infinite] [animation-delay:-9s] motion-reduce:animate-none" />

        <div className="relative z-10 max-w-[920px] mx-auto px-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#7a0e45] mb-[18px]">
            <span className="w-2 h-2 rounded-full bg-[#e31c79] shadow-[0_0_0_4px_rgba(227,28,121,0.18)] animate-[pulseDot_2s_infinite]" />
            Available for new opportunities
          </div>

          <h1
            className={`${FONT_DISPLAY} font-bold text-[clamp(48px,8vw,96px)] leading-[0.98]`}
          >
            <div className=" overflow-hidden">
              <span className=" animate-rise">Karina Aryan —</span>
            </div>
            <div className=" overflow-hidden">
              <span
                style={{ animationDelay: ".1s" }}
                className=" animate-rise text-[#e31c79]"
              >
                building
              </span>
            </div>
            <div className=" overflow-hidden">
              <span style={{ animationDelay: ".2s" }} className=" animate-rise">
                interfaces that
              </span>
            </div>
            <div className=" overflow-hidden">
              <span style={{ animationDelay: ".3s" }} className=" animate-rise">
                work &amp; feel right.
              </span>
            </div>
          </h1>

          <p className="max-w-[540px] inline-block mt-[26px] text-[19px] leading-[1.6] text-[#4a3540] animate-fadein [animation-delay:.9s]">
            Full-stack developer from Ahmedabad specializing in React, React
            Native and Next.js — I design the front end and build the systems
            behind it, from admin panels to real-time APIs.
          </p>

          <div className="mt-[38px] flex gap-4 flex-wrap animate-fadein [animation-delay:1.1s]">
            <a
              href="mailto:karinaaryan5@gmail.com"
              className="inline-flex items-center gap-2 px-[26px] py-[14px] rounded-full font-semibold text-[15px] bg-[#e31c79] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(227,28,121,0.35)]"
            >
              Get in touch
            </a>
            <a
              href="/Karina_aryan_CV_2026.pdf"
              download="Karina_Aryan_Resume.pdf"
              className="inline-flex items-center gap-2 px-[26px] py-[14px] rounded-full font-semibold text-[15px] bg-white border-[1.5px] border-[#e31c79] text-[#e31c79] transition-all duration-300 hover:bg-[#e31c79] hover:text-white hover:-translate-y-0.5"
            >
              Download Resume
            </a>
            <a
              href="https://github.com/Karina5Aryan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-[26px] py-[14px] rounded-full font-semibold text-[15px] border-[1.5px] border-[#f6b8d3] text-[#7a0e45] transition-all duration-300 hover:bg-[#fff6fa] hover:-translate-y-0.5"
            >
              View GitHub
            </a>
          </div>

          <div className="mt-14 flex gap-8 flex-wrap animate-fadein [animation-delay:1.3s]">
            <div className="text-sm text-[#7a6570]">
              <b
                className={`${FONT_DISPLAY} block text-[26px] text-[#201017] font-bold`}
              >
                3+ yrs
              </b>
              professional experience
            </div>
            <div className="text-sm text-[#7a6570]">
              <b
                className={`${FONT_DISPLAY} block text-[26px] text-[#201017] font-bold`}
              >
                7
              </b>
              shipped products
            </div>
            <div className="text-sm text-[#7a6570]">
              <b
                className={`${FONT_DISPLAY} block text-[26px] text-[#201017] font-bold`}
              >
                2
              </b>
              platforms — web &amp; native
            </div>
          </div>
        </div>
      </header>

      {/* ---------- MARQUEE ---------- */}
      <div className="group border-t border-b border-[#f0cede] bg-[#fff6fa] py-[22px] overflow-hidden">
        <div className="flex w-max animate-[scroll_28s_linear_infinite] group-hover:[animation-play-state:paused]">
          {[...STACK, ...STACK].map((item, i) => (
            <div
              key={i}
              className={`${FONT_DISPLAY} flex items-center gap-[10px] px-7 font-medium text-base text-[#7a0e45] whitespace-nowrap after:content-['✦'] after:text-[#f6b8d3] after:ml-7`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <main>
        {/* ---------- ABOUT ---------- */}
        <section id="about" className="py-[50px] md:py-[72px]">
          <div className="max-w-[920px] mx-auto px-8">
            <div className="mb-14">
              <div
                className={`${FONT_DISPLAY} text-sm text-[#e31c79] font-semibold`}
              >
                About
              </div>
              <h2
                className={`${FONT_DISPLAY} text-[clamp(30px,4vw,42px)] font-bold mt-2`}
              >
                Where I&apos;ve landed so far
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-9 md:gap-[60px]">
              <div>
                <p className="text-[17px] leading-[1.75] text-[#3d2c34] mb-[18px]">
                  I started out with plain HTML, CSS and PHP during an
                  internship in 2022, and spent the years since going deeper
                  into the React ecosystem — first as a developer, then leading
                  the app and web workstreams at Tristate Technology.
                </p>
                <p className="text-[17px] leading-[1.75] text-[#3d2c34]">
                  Today I move comfortably across the stack: React and Next.js
                  on the front end, React Native for mobile, and Node, Express
                  and MongoDB when the product needs a backend built to match. I
                  care most about the parts users actually feel —
                  responsiveness, state that behaves predictably, and interfaces
                  that don&apos;t get in the way.
                </p>
              </div>
              <div className="border-l-2 border-[#f6b8d3] pl-7 flex flex-col gap-[22px]">
                <div>
                  <div className="text-[13px] text-[#a4808f] uppercase tracking-[0.06em]">
                    Based in
                  </div>
                  <div
                    className={`${FONT_DISPLAY} text-lg font-semibold mt-[3px]`}
                  >
                    Ahmedabad, India
                  </div>
                </div>
                <div>
                  <div className="text-[13px] text-[#a4808f] uppercase tracking-[0.06em]">
                    Currently
                  </div>
                  <div
                    className={`${FONT_DISPLAY} text-lg font-semibold mt-[3px]`}
                  >
                    Freelance · E-commerce platform
                  </div>
                </div>
                <div>
                  <div className="text-[13px] text-[#a4808f] uppercase tracking-[0.06em]">
                    Education
                  </div>
                  <div
                    className={`${FONT_DISPLAY} text-lg font-semibold mt-[3px]`}
                  >
                    B.E., GEC Modasa
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- SKILLS ---------- */}
        <section id="skills" className="py-[50px] md:py-[72px]">
          <div className="max-w-[920px] mx-auto px-8">
            <div className="mb-14">
              <div
                className={`${FONT_DISPLAY} text-sm text-[#e31c79] font-semibold`}
              >
                Skills
              </div>
              <h2
                className={`${FONT_DISPLAY} text-[clamp(30px,4vw,42px)] font-bold mt-2`}
              >
                Tools I reach for
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {SKILL_GROUPS.map((group) => (
                <div
                  key={group.title}
                  className="bg-[#fff6fa] border border-[#f0cede] rounded-[18px] p-7"
                >
                  <h3
                    className={`${FONT_DISPLAY} text-base font-semibold mb-4 text-[#7a0e45]`}
                  >
                    {group.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white border border-[#f6b8d3] px-[14px] py-[7px] rounded-full text-[13.5px] font-medium transition-all duration-200 hover:bg-[#e31c79] hover:text-white hover:-translate-y-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- EXPERIENCE ---------- */}
        <section id="experience" className="py-[50px] md:py-[72px]">
          <div className="max-w-[920px] mx-auto px-8">
            <div className="mb-14">
              <div
                className={`${FONT_DISPLAY} text-sm text-[#e31c79] font-semibold`}
              >
                Experience
              </div>
              <h2
                className={`${FONT_DISPLAY} text-[clamp(30px,4vw,42px)] font-bold mt-2`}
              >
                How I got here
              </h2>
            </div>
            <div className="relative pl-9 before:content-[''] before:absolute before:left-[6px] before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-gradient-to-b before:from-[#e31c79] before:to-[#f6b8d3]">
              {EXPERIENCE.map((item, i) => (
                <div
                  key={item.role + item.date}
                  className={`relative ${i === EXPERIENCE.length - 1 ? "pb-0" : "pb-[52px]"}`}
                >
                  <div
                    className={`absolute -left-9 top-1 w-[14px] h-[14px] rounded-full bg-white border-[3px] border-[#e31c79] ${
                      item.current
                        ? "shadow-[0_0_0_5px_rgba(227,28,121,0.16)] animate-[pulseDot_2s_infinite]"
                        : ""
                    }`}
                  />
                  <div className="flex justify-between flex-wrap gap-x-4 gap-y-1.5 items-baseline">
                    <div className={`${FONT_DISPLAY} text-xl font-bold`}>
                      {item.role}{" "}
                      <span className="text-[#e31c79]">· {item.tag}</span>
                    </div>
                    <div className="text-[13.5px] text-[#a4808f] font-medium whitespace-nowrap">
                      {item.date}
                    </div>
                  </div>
                  <div className="text-[14.5px] text-[#7a0e45] font-semibold mt-0.5">
                    {item.org}
                  </div>
                  <p className="text-[15.5px] leading-[1.7] text-[#4a3540] mt-3 max-w-[640px]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- PROJECTS ---------- */}
        <section id="projects" className="py-[50px] md:py-[72px]">
          <div className="max-w-[920px] mx-auto px-8">
            <div className="mb-14">
              <div
                className={`${FONT_DISPLAY} text-sm text-[#e31c79] font-semibold`}
              >
                Projects
              </div>
              <h2
                className={`${FONT_DISPLAY} text-[clamp(30px,4vw,42px)] font-bold mt-2`}
              >
                Things I&apos;ve built
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
              {PROJECTS.map((project) => (
                <div
                  key={project.title}
                  className={`relative bg-white border border-[#f0cede] rounded-[18px] p-[26px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(227,28,121,0.14)] hover:border-[#f6b8d3] ${
                    project.wide ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="text-[12.5px] text-[#e31c79] font-semibold tracking-[0.02em] mb-[10px]">
                    {project.stack}
                  </div>
                  <div
                    className={`${FONT_DISPLAY} text-[19px] font-bold mb-[10px]`}
                  >
                    {project.title}
                  </div>
                  <p className="text-[14.5px] leading-[1.65] text-[#4a3540]">
                    {project.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- EDUCATION ---------- */}
        <section id="education" className="py-[50px] md:py-[72px]">
          <div className="max-w-[920px] mx-auto px-8">
            <div className="mb-14">
              <div
                className={`${FONT_DISPLAY} text-sm text-[#e31c79] font-semibold`}
              >
                Education
              </div>
              <h2
                className={`${FONT_DISPLAY} text-[clamp(30px,4vw,42px)] font-bold mt-2`}
              >
                Background
              </h2>
            </div>
            <div>
              {EDUCATION.map((edu, i) => (
                <div
                  key={edu.school}
                  className={`flex justify-between flex-wrap gap-x-5 gap-y-2 py-[22px] border-b border-[#f0cede] ${i === 0 ? "border-t" : ""}`}
                >
                  <div>
                    <div className={`${FONT_DISPLAY} font-bold text-[17px]`}>
                      {edu.school}
                    </div>
                    <div className="text-sm text-[#7a6570] mt-[3px]">
                      {edu.degree}
                    </div>
                  </div>
                  <div className="text-[13.5px] text-[#a4808f] font-medium self-center">
                    {edu.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CONTACT ---------- */}
        <section id="contact" className="py-[50px] md:py-[72px]">
          <div className="max-w-[920px] mx-auto px-8">
            <div className="bg-[#201017] text-white rounded-[28px] px-6 py-14 md:px-10 md:py-[72px] text-center relative overflow-hidden before:content-[''] before:absolute before:w-[500px] before:h-[500px] before:rounded-full before:bg-[#e31c79] before:opacity-25 before:blur-[90px] before:-top-[200px] before:left-1/2 before:-translate-x-1/2">
              <div className="relative z-10">
                <h2
                  className={`${FONT_DISPLAY} text-[clamp(30px,5vw,48px)] font-bold max-w-[600px] mx-auto mb-[18px]`}
                >
                  Let&apos;s build something worth shipping.
                </h2>
                <p className="text-[#e8c9d8] text-base max-w-[460px] mx-auto mb-[34px]">
                  Open to full-time roles, freelance projects, and anything in
                  between. Reach out — I reply fast.
                </p>
                <div className="flex justify-center gap-3.5 flex-wrap">
                  <a
                    href="mailto:karinaaryan5@gmail.com"
                    className="inline-flex items-center gap-2 bg-white/[.08] border border-white/[.18] px-[22px] py-3 rounded-full text-[14.5px] font-medium transition-all duration-300 hover:bg-[#e31c79] hover:-translate-y-0.5 hover:border-[#e31c79]"
                  >
                    ✉ karinaaryan5@gmail.com
                  </a>
                  <a
                    href="tel:+919499660032"
                    className="inline-flex items-center gap-2 bg-white/[.08] border border-white/[.18] px-[22px] py-3 rounded-full text-[14.5px] font-medium transition-all duration-300 hover:bg-[#e31c79] hover:-translate-y-0.5 hover:border-[#e31c79]"
                  >
                    ☎ +91 94996 60032
                  </a>
                  <a
                    href="https://github.com/Karina5Aryan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/[.08] border border-white/[.18] px-[22px] py-3 rounded-full text-[14.5px] font-medium transition-all duration-300 hover:bg-[#e31c79] hover:-translate-y-0.5 hover:border-[#e31c79]"
                  >
                    GitHub ↗
                  </a>
                  {/* TODO: replace # with your LinkedIn URL */}
                  <a
                    href="https://www.linkedin.com/in/karina-aryan-7ba08627a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/[.08] border border-white/[.18] px-[22px] py-3 rounded-full text-[14.5px] font-medium transition-all duration-300 hover:bg-[#e31c79] hover:-translate-y-0.5 hover:border-[#e31c79]"
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="text-center py-10 px-8 text-[13px] text-[#a4808f]">
        © 2026 Karina Aryan. Built with Next, for people who read to the bottom.
      </footer>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-[100] w-[46px] h-[46px] rounded-full bg-[#e31c79] text-white text-lg shadow-[0_8px_20px_rgba(227,28,121,0.35)] transition-all duration-300 hover:-translate-y-1 ${
          showTop
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        ↑
      </button>

      {/* Only the keyframes live here — Tailwind's arbitrary animate-[...] values still need
          the @keyframes defined somewhere. Everything else above is plain Tailwind utilities. */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes drift {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-30px, 40px) scale(1.12);
          }
        }
        @keyframes pulseDot {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
