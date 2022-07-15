import React from 'react';
import { Introduction } from './Introduction/Introduction';
import { Team } from './Team/Team';
import { About } from './About/About';
import { Faq } from './Faq/Faq';
import Footer from './Footer/Footer';

const Landing: React.FC = () => {
  return (
    <>
      <Introduction />
      <About />
      <Team />
      <Faq />
      <Footer />
    </>
  );
};

export { Landing };
