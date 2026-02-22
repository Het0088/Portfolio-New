import { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import SmoothScroller from './components/layout/SmoothScroller';
import ThreeCanvas from './components/layout/ThreeCanvas';
import Preloader from './components/layout/Preloader';
import Navbar from './components/layout/Navbar';
import CustomCursor from './components/layout/CustomCursor';
import NoiseOverlay from './components/layout/NoiseOverlay';

import HeroScene from './components/three/HeroScene';
import ParticleField from './components/three/ParticleField';
import SkillSphere from './components/three/SkillSphere';

import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Skills from './components/sections/Skills';
import Education from './components/sections/Education';
import Projects from './components/sections/Projects';
import Achievements from './components/sections/Achievements';
import GitHubStats from './components/sections/GitHubStats';
import Testimonials from './components/sections/Testimonials';
import FunFacts from './components/sections/FunFacts';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setPreloaderDone(true)} />
      <CustomCursor />
      <NoiseOverlay />

      <SmoothScroller>
        {preloaderDone && <Navbar />}

        <ThreeCanvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <HeroScene />
          <SkillSphere />
          <ParticleField count={isMobile ? 250 : 600} />
        </ThreeCanvas>

        <main style={{ position: 'relative', zIndex: 2 }}>
          <Hero />
          <About />
          <Services />
          <Skills />
          <Education />
          <Projects />
          <Achievements />
          <GitHubStats />
          <Testimonials />
          <FunFacts />
          <Contact />
          <Footer />
        </main>
      </SmoothScroller>
    </>
  );
}
