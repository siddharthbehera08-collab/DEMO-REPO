import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Instagram, Linkedin } from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const LiquidBlob = () => (
  <div className="liquid-blob-container">
    <div className="liquid-blob"></div>
  </div>
);

const Header = () => (
  <header className="header">
    <div className="header-logo">MIRAJ PATRA</div>
    <nav className="header-nav">
      <a href="#hero">Hero</a>
      <a href="#projects">Projects</a>
      <a href="#skills">Skills</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
);

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    // Shaky/jitter scroll effect across hero
    const jitterAnim = gsap.to(heroRef.current, {
      x: "random(-0.3, 0.3, 0.06)",
      y: "random(-0.3, 0.3, 0.06)",
      rotation: "random(-0.06, 0.06)",
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      duration: 0.15,
      paused: true
    });

    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        // Trigger short jitter when actively scrolling
        if (self.getVelocity() !== 0) {
          jitterAnim.play();
          clearTimeout(heroRef.current.jitterTimeout);
          heroRef.current.jitterTimeout = setTimeout(() => jitterAnim.pause(), 40);
        }
      }
    });

    // We can also animate the 3 cinematic states based on scroll position within the hero
    // For simplicity, we create a timeline that pins the hero and morphs it
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-pin-wrapper",
        start: "top top",
        end: "+=1200", // compress scroll to roughly ~150vh instead of 2000px+
        scrub: 1,
        pin: true
      }
    });

    // State 1 to State 2
    tl.to(".state-1", { opacity: 0, scale: 0.95, duration: 1 })
      .to(".state-2", { opacity: 1, scale: 1, display: 'flex', duration: 1 }, "-=0.5")
      // State 2 to State 3
      .to(".state-2", { opacity: 0, scale: 0.95, duration: 1 })
      .to(".state-3", { opacity: 1, scale: 1, display: 'flex', duration: 1 }, "-=0.5");

  }, []);

  return (
    <div className="hero-pin-wrapper">
      <section className="hero" ref={heroRef} id="hero">

        {/* STATE 1: Load / Top */}
        <div className="hero-state state-1">
          <div className="hero-left">
            <LiquidBlob />
            <img src="/proj1.jpeg" alt="Hero Subject" className="hero-image-placeholder" style={{ background: 'transparent', border: 'none', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
          </div>
          <div className="hero-right">
            <h1 className="blend-text">MIRAJ PATRA</h1>
            <h2 className="role-descriptor">Creative Freak.</h2>
            <p className="role-line">Video Editor · Designer · Motion Graphics.</p>
            <div className="location-tag">India, 20 yrs.</div>
          </div>
        </div>

        {/* STATE 2: Scroll Down - Mid hero */}
        <div className="hero-state state-2" style={{ opacity: 0, display: 'none' }}>
          <img src="/proj2.jpeg" alt="Hero 2" className="hero-image-placeholder large-format" style={{ background: 'transparent', border: 'none', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
          <h2 className="mid-hero-text">"I make things move."</h2>
        </div>

        {/* STATE 3: Scroll Down Further - Bottom of hero */}
        <div className="hero-state state-3" style={{ opacity: 0, display: 'none' }}>
          <img src="/proj1.jpeg" alt="Hero 3" className="hero-image-placeholder intimate-format" style={{ background: 'transparent', border: 'none', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
          <p className="bio-snippet">Editing is storytelling in the fourth dimension.</p>
        </div>

      </section>
    </div>
  );
};

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-left">
        <h2 className="vertical-title">ABOUT</h2>
      </div>
      <div className="about-right">
        <p className="about-text">
          I'm Miraj Patra, a 20-year-old creative from India. I live inside timelines, keyframes, and render queues.
          I do video editing, motion graphics, and design — freelancing for clients who want their visuals to actually mean something.
        </p>
        <div className="tools-block acrylic-card">
          <span className="tool-badge">DaVinci Resolve Studio</span>
          <span className="tool-badge">After Effects</span>
          <span className="tool-badge">Higgsfield AI</span>
          <span className="tool-badge">Nanobana AI</span>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ title, desc, tag, image }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max tilt
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.5
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
      duration: 0.5
    });
  };

  return (
    <div
      className="project-card acrylic-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-thumbnail" style={{ padding: 0 }}>
        {image ? <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} /> : "Thumb Placeholder"}
      </div>
      <div className="project-content">
        <h3>{title}</h3>
        <p>{desc}</p>
        <span className="project-tag">{tag}</span>
      </div>
      <div className="project-glow"></div>
    </div>
  );
};

const Projects = () => {
  const projects = [
    { title: "Brand Reel — Motion Edit", desc: "Dynamic motion graphics for social brand awareness.", tag: "After Effects", image: "/proj1.jpeg" },
    { title: "Social Content Pack", desc: "Short-form video editing customized for engagement.", tag: "DaVinci Resolve", image: "/proj2.jpeg" }
  ];

  return (
    <section className="projects-section" id="projects">
      <h2 className="section-title">WORK</h2>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <ProjectCard key={i} title={p.title} desc={p.desc} tag={p.tag} image={p.image} />
        ))}
      </div>
    </section>
  );
};

const Skills = () => {
  const skills = [
    { name: "Video Editing", level: "90%" },
    { name: "Motion Graphics", level: "85%" },
    { name: "Color Grading", level: "80%" },
    { name: "Visual Design", level: "75%" },
    { name: "After Effects", level: "95%" },
    { name: "DaVinci Resolve", level: "90%" },
    { name: "AI Tools", level: "80%" },
    { name: "Freelancing", level: "85%" }
  ];

  useEffect(() => {
    gsap.utils.toArray('.skill-fill').forEach((bar) => {
      ScrollTrigger.create({
        trigger: bar,
        start: "top 85%",
        onEnter: () => gsap.to(bar, { width: bar.dataset.targetWidth, duration: 1.5, ease: "power3.out" }),
        once: true
      });
    });
  }, []);

  return (
    <section className="skills-section" id="skills">
      <h2 className="section-title">SKILLS</h2>
      <div className="skills-list">
        {skills.map((skill, i) => (
          <div className="skill-item" key={i}>
            <div className="skill-name">{skill.name}</div>
            <div className="skill-bar-track">
              <div className="skill-fill" data-target-width={skill.level} style={{ width: 0 }}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <h2 className="contact-heading">LET'S MAKE SOMETHING.</h2>
      <p className="contact-sub">Available for freelance projects. Reach out.</p>

      <div className="contact-form-wrapper acrylic-card">
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Message" rows="4" required></textarea>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>

      <a href="mailto:mirajpatra@gmail.com" className="email-link">mirajpatra@gmail.com</a>
    </section>
  );
};

const Footer = () => (
  <footer className="footer">
    <div className="footer-left">MIRAJ PATRA</div>
    <div className="footer-right">
      <a href="https://www.instagram.com/mirage_2006_/" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
      <a href="https://www.linkedin.com/in/mirajpatra/" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a>
      <span>© 2026</span>
    </div>
  </footer>
);

function App() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Custom cursor code
    const cursor = cursorRef.current;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'a' || e.target.tagName.toLowerCase() === 'button') {
        gsap.to(cursor, { scale: 2, duration: 0.2 });
      } else {
        gsap.to(cursor, { scale: 1, duration: 0.2 });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    // Fade up sections on scroll
    gsap.utils.toArray('section').forEach((sec) => {
      gsap.fromTo(sec,
        { autoAlpha: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: sec,
            start: "top 80%",
            toggleActions: "play none none none"
          },
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        }
      );
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="app-container">
      <div className="custom-cursor" ref={cursorRef}></div>
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
