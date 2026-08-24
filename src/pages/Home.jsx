import { Hero } from '../components/Hero/Hero';
import { WhoWeAre } from '../components/WhoWeAre/WhoWeAre';
import { Services } from '../components/Services/Services';
import { Process } from '../components/Process/Process';
import { Portfolio } from '../components/Portfolio/Portfolio';
import { Testimonial } from '../components/Testimonial/Testimonial';
import { Contact } from '../components/Contact/Contact';

export function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <Services />
      <Process />
      <Portfolio />
      <Testimonial />
      <Contact />
    </>
  );
}

export default Home;
