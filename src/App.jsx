import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import SmoothScroll from './components/SmoothScroll.jsx';
import FloatingChatWidget from './components/FloatingChatWidget.jsx';
import CursorGlow from './components/CursorGlow.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Career from './sections/Career.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import Contact from './sections/Contact.jsx';

export default function App() {
  return (
    <SmoothScroll>
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Career />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <FloatingChatWidget />
    </SmoothScroll>
  );
}
