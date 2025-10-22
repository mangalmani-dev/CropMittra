import React from 'react';

const Hero = () => {
  return (
    <section 
  className="relative h-[85vh] flex items-center justify-start pt-24 bg-cover bg-center"
  style={{ backgroundImage: "url('/field-hero.jpg')" }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Hero Content */}
  <div className="relative max-w-4xl px-8 lg:px-20 text-white text-left z-10">
    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-4">
      CONNECT YOUR CROPS TO NEW MARKETS
    </h1>
    <p className="text-xl md:text-2xl font-light mb-8">
      Sell crops efficiently, streamline logistics, and secure better pricing from verified distributors nationwide.
    </p>
    <a href="#contact" className="btn btn-warning btn-lg text-green-800 font-bold hover:bg-amber-400 transition duration-300">
      Start Selling Today
    </a>
  </div>
</section>
  );
};

export default Hero;