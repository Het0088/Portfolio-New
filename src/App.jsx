import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useDeviceTier } from './hooks/useDeviceTier';

import SmoothScroller from './components/layout/SmoothScroller';
import ThreeCanvas from './components/layout/ThreeCanvas';
import Preloader from './components/layout/Preloader';
import Navbar from './components/layout/Navbar';
import CustomCursor from './components/layout/CustomCursor';
import NoiseOverlay from './components/layout/NoiseOverlay';
import MobileBackground from './components/layout/MobileBackground';

import HeroScene from './components/three/HeroScene';
import ParticleField from './components/three/ParticleField';
import SkillSphere from './components/three/SkillSphere';

import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Education from './components/sections/Education';
import Projects from './components/sections/Projects';
import Achievements from './components/sections/Achievements';
import GitHubStats from './components/sections/GitHubStats';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const tier = useDeviceTier();
  const isHigh = tier === 'high';

  const ScrollWrapper = isHigh ? SmoothScroller : ({ children }) => <>{children}</>;

  return (
    <>
      <Preloader onComplete={() => setPreloaderDone(true)} />
      {isHigh && <CustomCursor />}
      {isHigh && <NoiseOverlay />}
      {!isHigh && <MobileBackground />}

      <ScrollWrapper>
        {preloaderDone && <Navbar />}

        {isHigh && (
          <ThreeCanvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <HeroScene />
            <SkillSphere />
            <ParticleField count={600} />
          </ThreeCanvas>
        )}

        <main style={{ position: 'relative', zIndex: 2 }}>
          <Hero />
          <About />
          <Skills />
          <Education />
          <Projects />
          <Achievements />
          <GitHubStats />
          <Contact />
          <Footer />
        </main>
      </ScrollWrapper>
    </>
  );
}
