"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
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
  {
    stack: "NEXT.JS 16 · REACT 19 · TAILWIND 4",
    title: "Nei by Espresso Martini",
    desc: "A marketing landing site for a specialty coffee café and South Indian restaurant, featuring a single-page experience with the menu, brand story, reviews, and contact information.",
    url: "https://nei-expresso.vercel.app/",
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

// custom property helper for staggered reveals
const revealDelay = (ms: number) =>
  ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("about");
  const [showTop, setShowTop] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loaderDone, setLoaderDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // ---------- intro page loader (0 → 100%) ----------
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const duration = 1500;
    const start = performance.now();
    let raf = 0;
    let timer = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timer = window.setTimeout(() => {
          setLoaderDone(true);
          window.setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = "";
          }, 600);
        }, 150);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  // ---------- scroll progress marker ----------
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setScrollProgress(
        max > 0 ? Math.min((window.scrollY / max) * 100, 100) : 0,
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // ---------- active nav section ----------
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

  // ---------- back-to-top visibility ----------
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ---------- custom cursor (fine pointers only) ----------
  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const mouse = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let rafDot = 0;
    let rafRing = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!rafDot) {
        rafDot = requestAnimationFrame(() => {
          dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`;
          rafDot = 0;
        });
      }
    };

    const tick = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.16;
      ringPos.y += (mouse.y - ringPos.y) * 0.16;
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
      rafRing = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        "a, button, [data-cursor], input, textarea, select, [role='button']",
      );
      ring.classList.toggle("cursor-ring--hover", Boolean(target));
    };

    const onDown = () => ring.classList.add("cursor-ring--pressed");
    const onUp = () => ring.classList.remove("cursor-ring--pressed");
    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    rafRing = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRing);
      if (rafDot) cancelAnimationFrame(rafDot);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  // ---------- scroll-triggered reveals ----------
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  // ---------- magnetic hover ----------
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-magnetic]");
    const moves = new Map<HTMLElement, (e: MouseEvent) => void>();

    els.forEach((el) => {
      const strength = Number(el.dataset.magnetic ?? 0.28);
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      };
      const onLeave = () => {
        el.style.transform = "";
      };
      el.addEventListener("mousemove", onMove, { passive: true });
      el.addEventListener("mouseleave", onLeave, { passive: true });
      moves.set(el, onMove);
    });

    return () => {
      els.forEach((el) => {
        el.removeEventListener("mouseleave", () => {});
        const onMove = moves.get(el);
        if (onMove) el.removeEventListener("mousemove", onMove);
        el.style.transform = "";
      });
    };
  }, []);

  return (
    <div
      className={`${spaceGrotesk.variable} ${inter.variable} ${FONT_BODY} text-[#201017] bg-white overflow-x-hidden selection:bg-[#e31c79] selection:text-white`}
    >
      {/* intro page loader */}
      {loading && (
        <div
          className={`fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-white transition-opacity duration-[600ms] ease-out ${
            loaderDone ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden="true"
        >
          {/* small centered square box */}
          <div className="relative w-[110px] h-[110px]">
            <div
              className="absolute inset-0 rounded-[16px]"
              style={{
                background: `conic-gradient(from 0deg, #e31c79 ${progress * 3.6}deg, #f6b8d3 0deg)`,
              }}
            />
            <div className="absolute inset-[4px] rounded-[13px] bg-white flex items-center justify-center">
              <span className={`${FONT_DISPLAY} text-[22px] font-bold text-[#e31c79]`}>
                {progress}<span className="text-[14px] text-[#a743c8]">%</span>
              </span>
            </div>
          </div>
          <div className={`${FONT_DISPLAY} mt-6 text-center`}>
            <div className="text-[16px] font-bold text-[#201017] tracking-[0.02em]">
              Karina&nbsp;Aryan
            </div>
            <div className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#a4808f] mt-1">
              Software&nbsp;developer
            </div>
          </div>
        </div>
      )}

      {/* scroll progress marker */}
      <div className="fixed top-[3px] left-0 right-0 z-[200] h-[3px] bg-[#f0cede]/70">
        <div
          className="h-full rounded-r-full bg-gradient-to-r from-[#e31c79] via-[#a743c8] to-[#f6b8d3] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* subtle fixed grid backdrop */}
      <div className="page-plain-grid fixed inset-0 z-0" aria-hidden="true" />

      {/* custom cursor */}
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />

      <div className="relative z-10">
        {/* ---------- NAV ---------- */}
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/[.82] backdrop-blur-md border-b border-[#f0cede]">
          <div className="h-[3px] bg-gradient-to-r from-[#e31c79] via-[#f6b8d3] to-[#e31c79] bg-[length:200%_100%] animate-gradient-x" />
          <div className="max-w-[920px] mx-auto px-8 py-[18px] flex items-center justify-between">
            <div className={`${FONT_DISPLAY} font-bold text-[19px]`}>
              Portfolio<span className="text-[#e31c79]">.</span>
            </div>

            <ul
              className={`flex flex-col gap-0 fixed top-[78px] left-0 right-0 bg-white border-b border-[#f0cede] px-8 pt-2 pb-5 transition-all duration-300
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
              className="md:hidden bg-transparent border-none cursor-none"
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
        <header className="relative pt-[128px] pb-[100px] overflow-hidden">
          {/* dot grid backdrop */}
          <div
            className="page-pop-grid absolute inset-0 z-0"
            aria-hidden="true"
          />
          {/* animated blobs */}
          <div
            className="absolute rounded-full blur-[60px] opacity-[.55] z-0 w-[420px] h-[420px] bg-[#f6b8d3] -top-[140px] -right-[120px] animate-[drift_22s_ease-in-out_infinite] animate-hue-pulse motion-reduce:animate-none"
            aria-hidden="true"
          />
          <div
            className="absolute rounded-full blur-[60px] opacity-[.55] z-0 w-[320px] h-[320px] bg-[#fcedf3] -bottom-[100px] -left-[80px] animate-[drift_22s_ease-in-out_infinite] [animation-delay:-9s] motion-reduce:animate-none"
            aria-hidden="true"
          />
          {/* decorative spinning ring */}
          <div
            className="absolute top-[120px] right-[14%] z-0 w-[150px] h-[150px] rounded-full border-[1.5px] border-dashed border-[#f6b8d3] animate-[spin_40s_linear_infinite] motion-reduce:animate-none"
            aria-hidden="true"
          />
          {/* floating sparkle */}
          <div
            className="absolute top-[260px] left-[7%] z-0 text-[26px] text-[#e31c79]/70 animate-wiggle motion-reduce:animate-none"
            aria-hidden="true"
          >
            ✦
          </div>
          {/* floating mini orb */}
          <div
            className="absolute bottom-[120px] right-[9%] z-0 w-[38px] h-[38px] rounded-full bg-[#f6b8d3]/60 animate-float motion-reduce:animate-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-[920px] mx-auto px-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#7a0e45] mb-[18px]">
              <span className="w-2 h-2 rounded-full bg-[#e31c79] shadow-[0_0_0_4px_rgba(227,28,121,0.18)] animate-[pulseDot_2s_infinite]" />
              Available for new opportunities
            </div>

            <h1
              className={`${FONT_DISPLAY} font-bold text-[clamp(48px,8vw,96px)] leading-[0.98]`}
            >
              <div className="overflow-hidden">
                <span className="animate-rise">Karina Aryan —</span>
              </div>
              <div className="overflow-hidden">
                <span
                  style={{ animationDelay: ".1s" }}
                  className="animate-rise gradient-text"
                >
                  building
                </span>
              </div>
              <div className="overflow-hidden">
                <span
                  style={{ animationDelay: ".2s" }}
                  className="animate-rise"
                >
                  interfaces that
                </span>
              </div>
              <div className="overflow-hidden">
                <span
                  style={{ animationDelay: ".3s" }}
                  className="animate-rise"
                >
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
                data-magnetic="0.22"
                className="inline-flex items-center gap-2 px-[26px] py-[14px] rounded-full font-semibold text-[15px] bg-[#e31c79] text-white transition-all duration-300 hover:shadow-[0_10px_24px_rgba(227,28,121,0.35)]"
              >
                Get in touch
              </a>
              <a
                href="/Karina_aryan_CV_2026.pdf"
                download="Karina_Aryan_Resume.pdf"
                data-magnetic="0.22"
                className="inline-flex items-center gap-2 px-[26px] py-[14px] rounded-full font-semibold text-[15px] bg-white border-[1.5px] border-[#e31c79] text-[#e31c79] transition-all duration-300 hover:bg-[#e31c79] hover:text-white"
              >
                Download Resume
              </a>
              <a
                href="https://github.com/Karina5Aryan"
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic="0.22"
                className="inline-flex items-center gap-2 px-[26px] py-[14px] rounded-full font-semibold text-[15px] border-[1.5px] border-[#f6b8d3] text-[#7a0e45] transition-all duration-300 hover:bg-[#fff6fa]"
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
                  16+
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
        <div className="relative group border-t border-b border-[#f0cede] bg-[#fff6fa] py-[22px] overflow-hidden">
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
          <section id="about" className="relative py-[50px] md:py-[72px]">
            <div className="max-w-[920px] mx-auto px-8">
              <div className="relative">
                <div
                  className="section-dots absolute -top-10 -right-4 md:-right-20 w-[220px] h-[140px] z-0"
                  aria-hidden="true"
                />
                <div className="reveal mb-14 relative z-10">
                  <div
                    className={`${FONT_DISPLAY} text-sm text-[#e31c79] font-semibold uppercase tracking-[0.08em]`}
                  >
                    About
                  </div>
                  <h2
                    className={`${FONT_DISPLAY} text-[clamp(30px,4vw,42px)] font-bold mt-2`}
                  >
                    Where I&apos;ve landed so far
                  </h2>
                  <div className="mt-4 w-14 h-[3px] rounded-full bg-gradient-to-r from-[#e31c79] to-[#f6b8d3] animate-gradient-x bg-[length:200%_100%]" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-9 md:gap-[60px]">
                  <div>
                    <div
                      className="reveal"
                      style={revealDelay(60)}
                    >
                      <p className="text-[17px] leading-[1.75] text-[#3d2c34] mb-[18px]">
                        I started out with plain HTML, CSS and PHP during an
                        internship in 2022, and spent the years since going
                        deeper into the React ecosystem — first as a developer,
                        then leading the app and web workstreams at Tristate
                        Technology.
                      </p>
                    </div>
                    <div
                      className="reveal"
                      style={revealDelay(140)}
                    >
                      <p className="text-[17px] leading-[1.75] text-[#3d2c34]">
                        Today I move comfortably across the stack: React and
                        Next.js on the front end, React Native for mobile, and
                        Node, Express and MongoDB when the product needs a
                        backend built to match. I care most about the parts
                        users actually feel — responsiveness, state that behaves
                        predictably, and interfaces that don&apos;t get in the
                        way.
                      </p>
                    </div>
                  </div>
                  <div
                    className="reveal"
                    style={revealDelay(220)}
                  >
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
              </div>
            </div>
          </section>

          {/* ---------- SKILLS ---------- */}
          <section id="skills" className="relative py-[50px] md:py-[72px]">
            <div className="max-w-[920px] mx-auto px-8">
              <div className="mb-14">
                <div
                  className={`${FONT_DISPLAY} text-sm text-[#e31c79] font-semibold uppercase tracking-[0.08em]`}
                >
                  Skills
                </div>
                <h2
                  className={`${FONT_DISPLAY} text-[clamp(30px,4vw,42px)] font-bold mt-2`}
                >
                  Tools I reach for
                </h2>
                <div className="mt-4 w-14 h-[3px] rounded-full bg-gradient-to-r from-[#e31c79] to-[#f6b8d3] animate-gradient-x bg-[length:200%_100%]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                {SKILL_GROUPS.map((group, gi) => (
                  <div
                    key={group.title}
                    className="reveal"
                    style={revealDelay(gi * 130)}
                  >
                    <div className="group relative h-full bg-[#fff6fa] border border-[#f0cede] rounded-[18px] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(227,28,121,0.12)] hover:border-[#f6b8d3]">
                      <div className="flex items-baseline justify-between">
                        <h3
                          className={`${FONT_DISPLAY} text-base font-semibold text-[#7a0e45]`}
                        >
                          {group.title}
                        </h3>
                        <span className="text-[12px] font-semibold text-[#f6b8d3]">
                          0{gi + 1}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {group.tags.map((tag) => (
                          <span
                            key={tag}
                            data-cursor
                            className="bg-white border border-[#f6b8d3] px-[14px] py-[7px] rounded-full text-[13.5px] font-medium transition-all duration-200 hover:bg-[#e31c79] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(227,28,121,0.25)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ---------- EXPERIENCE ---------- */}
          <section id="experience" className="relative py-[50px] md:py-[72px]">
            <div className="max-w-[920px] mx-auto px-8">
              <div className="mb-14">
                <div
                  className={`${FONT_DISPLAY} text-sm text-[#e31c79] font-semibold uppercase tracking-[0.08em]`}
                >
                  Experience
                </div>
                <h2
                  className={`${FONT_DISPLAY} text-[clamp(30px,4vw,42px)] font-bold mt-2`}
                >
                  How I got here
                </h2>
                <div className="mt-4 w-14 h-[3px] rounded-full bg-gradient-to-r from-[#e31c79] to-[#f6b8d3] animate-gradient-x bg-[length:200%_100%]" />
              </div>
              <div className="relative pl-9 before:content-[''] before:absolute before:left-[6px] before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-gradient-to-b before:from-[#e31c79] before:to-[#f6b8d3]">
                {EXPERIENCE.map((item, i) => (
                  <div
                    key={item.role + item.date}
                    className={`reveal ${i === EXPERIENCE.length - 1 ? "pb-0" : "pb-[52px]"}`}
                    style={revealDelay(i * 120)}
                  >
                    <div className="group relative -ml-1">
                      <div
                        className={`absolute -left-9 top-1 w-[14px] h-[14px] rounded-full bg-white border-[3px] border-[#e31c79] transition-transform duration-300 group-hover:scale-125 ${
                          item.current
                            ? "shadow-[0_0_0_5px_rgba(227,28,121,0.16)] animate-[pulseDot_2s_infinite]"
                            : ""
                        }`}
                      />
                      <div className="transition-all duration-300 rounded-[14px] group-hover:bg-[#fff6fa] group-hover:px-5 group-hover:py-3 group-hover:-translate-x-5 group-hover:shadow-[0_10px_30px_rgba(227,28,121,0.08)]">
                        <div className="flex justify-between flex-wrap gap-x-4 gap-y-1.5 items-baseline">
                          <div className={`${FONT_DISPLAY} text-xl font-bold`}>
                            {item.role}{" "}
                            <span className="text-[#e31c79]">
                              · {item.tag}
                            </span>
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ---------- PROJECTS ---------- */}
          <section id="projects" className="relative py-[50px] md:py-[72px]">
            <div className="max-w-[920px] mx-auto px-8">
              <div className="mb-14">
                <div
                  className={`${FONT_DISPLAY} text-sm text-[#e31c79] font-semibold uppercase tracking-[0.08em]`}
                >
                  Projects
                </div>
                <h2
                  className={`${FONT_DISPLAY} text-[clamp(30px,4vw,42px)] font-bold mt-2`}
                >
                  Things I&apos;ve built
                </h2>
                <div className="mt-4 w-14 h-[3px] rounded-full bg-gradient-to-r from-[#e31c79] to-[#f6b8d3] animate-gradient-x bg-[length:200%_100%]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
                {PROJECTS.map((project, pi) => (
                  <div
                    key={project.title}
                    className={`reveal ${project.wide ? "md:col-span-2" : ""}`}
                    style={revealDelay((pi % 2) * 130)}
                  >
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor
                      className={`group relative block bg-white rounded-[18px] p-[26px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(227,28,121,0.16)] card-sheen ${
                        project.wide
                          ? "gradient-border md:col-span-2"
                          : "border border-[#f0cede] hover:border-[#f6b8d3]"
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
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ---------- EDUCATION ---------- */}
          <section id="education" className="relative py-[50px] md:py-[72px]">
            <div className="max-w-[920px] mx-auto px-8">
              <div className="mb-14">
                <div
                  className={`${FONT_DISPLAY} text-sm text-[#e31c79] font-semibold uppercase tracking-[0.08em]`}
                >
                  Education
                </div>
                <h2
                  className={`${FONT_DISPLAY} text-[clamp(30px,4vw,42px)] font-bold mt-2`}
                >
                  Background
                </h2>
                <div className="mt-4 w-14 h-[3px] rounded-full bg-gradient-to-r from-[#e31c79] to-[#f6b8d3] animate-gradient-x bg-[length:200%_100%]" />
              </div>
              <div>
                {EDUCATION.map((edu, i) => (
                  <div
                    key={edu.school}
                    className={`reveal flex justify-between flex-wrap gap-x-5 gap-y-2 py-[22px] border-b border-[#f0cede] transition-colors duration-300 hover:bg-[#fff6fa] hover:px-4 ${i === 0 ? "border-t" : ""}`}
                    style={revealDelay(i * 150)}
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
          <section id="contact" className="relative py-[50px] md:py-[72px]">
            <div className="max-w-[920px] mx-auto px-8">
              <div className="reveal">
                <div className="relative bg-[#201017] text-white rounded-[28px] px-6 py-14 md:px-10 md:py-[72px] text-center overflow-hidden">
                  {/* animated glow + decorations */}
                  <div
                    className="absolute w-[500px] h-[500px] rounded-full bg-[#e31c79] opacity-25 blur-[90px] -top-[200px] left-1/2 -translate-x-1/2 animate-hue-pulse motion-reduce:animate-none"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute top-6 left-8 w-[90px] h-[90px] rounded-full border-[1.5px] border-dashed border-white/20 animate-[spin_36s_linear_infinite] motion-reduce:animate-none"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute bottom-6 right-8 text-[22px] text-white/25 animate-wiggle motion-reduce:animate-none"
                    aria-hidden="true"
                  >
                    ✦
                  </div>

                  <div className="relative z-10">
                    <h2
                      className={`${FONT_DISPLAY} text-[clamp(30px,5vw,48px)] font-bold max-w-[600px] mx-auto mb-[18px]`}
                    >
                      Let&apos;s build something worth shipping.
                    </h2>
                    <p className="text-[#e8c9d8] text-base max-w-[460px] mx-auto mb-[34px]">
                      Open to full-time roles, freelance projects, and anything
                      in between. Reach out — I reply fast.
                    </p>
                    <div className="flex justify-center gap-3.5 flex-wrap">
                      <a
                        href="mailto:karinaaryan5@gmail.com"
                        data-magnetic="0.3"
                        className="inline-flex items-center gap-2 bg-white/[.08] border border-white/[.18] px-[22px] py-3 rounded-full text-[14.5px] font-medium transition-all duration-300 hover:bg-[#e31c79] hover:border-[#e31c79] hover:shadow-[0_10px_24px_rgba(227,28,121,0.4)]"
                      >
                        ✉ karinaaryan5@gmail.com
                      </a>
                      <a
                        href="tel:+919499660032"
                        data-magnetic="0.3"
                        className="inline-flex items-center gap-2 bg-white/[.08] border border-white/[.18] px-[22px] py-3 rounded-full text-[14.5px] font-medium transition-all duration-300 hover:bg-[#e31c79] hover:border-[#e31c79] hover:shadow-[0_10px_24px_rgba(227,28,121,0.4)]"
                      >
                        ☎ +91 94996 60032
                      </a>
                      <a
                        href="https://github.com/Karina5Aryan"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-magnetic="0.3"
                        className="inline-flex items-center gap-2 bg-white/[.08] border border-white/[.18] px-[22px] py-3 rounded-full text-[14.5px] font-medium transition-all duration-300 hover:bg-[#e31c79] hover:border-[#e31c79] hover:shadow-[0_10px_24px_rgba(227,28,121,0.4)]"
                      >
                        GitHub ↗
                      </a>
                      <a
                        href="https://www.linkedin.com/in/karina-aryan/"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-magnetic="0.3"
                        className="inline-flex items-center gap-2 bg-white/[.08] border border-white/[.18] px-[22px] py-3 rounded-full text-[14.5px] font-medium transition-all duration-300 hover:bg-[#e31c79] hover:border-[#e31c79] hover:shadow-[0_10px_24px_rgba(227,28,121,0.4)]"
                      >
                        LinkedIn ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="text-center py-10 px-8 text-[13px] text-[#a4808f]">
          © 2026 Karina Aryan. Built with Next, for people who read to the
          bottom.
        </footer>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          data-magnetic="0.4"
          className={`fixed bottom-6 right-6 z-[100] w-[46px] h-[46px] rounded-full bg-[#e31c79] text-white text-lg shadow-[0_8px_20px_rgba(227,28,121,0.35)] transition-all duration-300 ${
            showTop
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          ↑
        </button>
      </div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}