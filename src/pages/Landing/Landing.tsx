import React from 'react';
import { Welcome } from './Introduction/Introduction';
import { Team } from './Team/Team';
import { About } from './About/About';
import { Faq } from './Faq/Faq';
import Footer from './Footer/Footer';

const Landing: React.FC = () => {
  return (
    <>
      <Welcome />
      <About />
      <Team />
      <Faq />
      <Footer />
    </>
  );
};

export { Landing };
