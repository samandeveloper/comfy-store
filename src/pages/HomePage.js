import React from "react";
import { FeaturedProducts, Hero, Services, Contact } from "../components"; //these are the sections of the homepage
const HomePage = () => {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
    </main>
  );
};

export default HomePage;
