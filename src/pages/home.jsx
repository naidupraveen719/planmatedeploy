import React from "react";

import Hero from "../homecomponents/Hero";
import Navbar from "../homecomponents/Navbar";
import Diversity from "../homecomponents/Diversity";
import Offer from "../homecomponents/Offer";
import Services from "../homecomponents/Services";
import Testimonial from "../homecomponents/Testimonial";


export default function Home() {
  return (
    <div>
     
      <Navbar />
      <Hero />
      <Services />
      <Diversity />
      <Offer/>
      <Testimonial/>
    </div>
  );
}