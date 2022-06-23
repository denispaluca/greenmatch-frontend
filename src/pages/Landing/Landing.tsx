import React from 'react';
import { Welcome } from './Introduction/Introduction';
import { Team } from './Team/Team';
import { About } from './About/About';
import Footer from './Footer/Footer';

const Landing: React.FC = () => {
  return (
    <>
      <Welcome />
      <About />
      <Team />
      <Footer />
    </>
  );
};

export { Landing };
