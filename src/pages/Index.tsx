import React from 'react';
import { Helmet } from "react-helmet";
import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Pricing from '@/components/landing/Pricing';
import Testimonials from '@/components/landing/Testimonials';
import FAQ from '@/components/landing/FAQ';
import { Link } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';

const Index = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Easy Win | Learning Made Easy</title>
      </Helmet>
      
      {/* Quiz Button - Adding a prominent button at the top */}
      <div className="container mx-auto px-4 py-4">
        <Link to="/quiz" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all">
          <BrainCircuit className="h-5 w-5" />
          <span className="font-bold">Take Interactive Quiz</span>
        </Link>
      </div>
      
      <Features />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Hero />
    </MainLayout>
  );
};

export default Index;
