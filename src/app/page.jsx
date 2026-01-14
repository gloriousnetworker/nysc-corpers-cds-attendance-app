'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const attendanceRef = useRef(null);
  const contactRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const initAnimations = () => {
      gsap.utils.toArray('.animate-on-scroll').forEach(element => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });
    };

    initAnimations();

    return () => {
      ScrollTrigger.getAll().forEach(instance => instance.kill());
    };
  }, []);

  return (
    <div className="bg-white text-gray-800 font-sans">
      <Navbar />
      
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#008753] to-[#ffffff] opacity-30"></div>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/nysc-hero.mp4" type="video/mp4" />
          </video>
        </div>
        
        <div className="container mx-auto px-6 z-10 text-center max-w-6xl">
          <div className="mb-8">
            <img 
              src="/images/nysc-logo.png" 
              alt="NYSC Logo" 
              className="h-32 mx-auto mb-6"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            National Youth Service Corps
          </h1>
          
          <p className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto">
            Service and Humility - Building a United Nigeria
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => router.push('/login')}
              className="bg-white text-[#008753] font-bold px-12 py-4 rounded-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-lg text-lg"
            >
              Check Attendance
            </button>
            <button 
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-transparent border-2 border-white text-white font-bold px-12 py-4 rounded-lg hover:bg-white hover:text-[#008753] transition transform hover:scale-105 text-lg"
            >
              Learn More
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <section ref={aboutRef} id="about" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-[#008753] mb-6">About NYSC</h2>
            <p className="text-xl text-gray-700">
              The National Youth Service Corps was established in 1973 to promote national unity and development. 
              Corps members are deployed to states other than their state of origin to experience Nigeria's diversity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-on-scroll">
            <div className="bg-white p-8 shadow-lg rounded-lg border-t-4 border-[#008753]">
              <div className="text-4xl mb-4">🇳🇬</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">National Unity</h3>
              <p className="text-gray-600">Promoting unity and integration among Nigerian youth</p>
            </div>
            <div className="bg-white p-8 shadow-lg rounded-lg border-t-4 border-[#008753]">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Community Service</h3>
              <p className="text-gray-600">Contributing to community development nationwide</p>
            </div>
            <div className="bg-white p-8 shadow-lg rounded-lg border-t-4 border-[#008753]">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Youth Empowerment</h3>
              <p className="text-gray-600">Developing skills and leadership qualities</p>
            </div>
          </div>
        </div>
      </section>

      <section ref={servicesRef} id="cds" className="py-24 relative">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#008753]/10 to-white"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#008753] mb-6">Community Development Service</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              CDS groups engage in various community development activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-on-scroll">
            <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition">
              <div className="text-[#008753] text-3xl mb-4">🏥</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Health & Medical</h3>
              <p className="text-gray-600">Medical outreach and health awareness programs</p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition">
              <div className="text-[#008753] text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Education</h3>
              <p className="text-gray-600">Teaching and educational support services</p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition">
              <div className="text-[#008753] text-3xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Environment</h3>
              <p className="text-gray-600">Environmental sanitation and tree planting</p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition">
              <div className="text-[#008753] text-3xl mb-4">⚽</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Sports</h3>
              <p className="text-gray-600">Sports development and youth engagement</p>
            </div>
          </div>
        </div>
      </section>

      <section ref={attendanceRef} id="attendance" className="py-24 bg-[#008753] text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Digital Attendance System</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Track your CDS attendance seamlessly with our digital platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 animate-on-scroll">
            <div className="bg-white bg-opacity-20 p-8 backdrop-blur-sm rounded-lg border border-white border-opacity-30">
              <div className="text-4xl font-bold mb-4 text-white">✓</div>
              <h3 className="text-2xl font-semibold mb-4">Real-time Tracking</h3>
              <p className="text-lg">
                Monitor your attendance status instantly
              </p>
            </div>
            <div className="bg-white bg-opacity-20 p-8 backdrop-blur-sm rounded-lg border border-white border-opacity-30">
              <div className="text-4xl font-bold mb-4 text-white">📱</div>
              <h3 className="text-2xl font-semibold mb-4">Mobile Access</h3>
              <p className="text-lg">
                Access your records from any device
              </p>
            </div>
            <div className="bg-white bg-opacity-20 p-8 backdrop-blur-sm rounded-lg border border-white border-opacity-30">
              <div className="text-4xl font-bold mb-4 text-white">📊</div>
              <h3 className="text-2xl font-semibold mb-4">Monthly Reports</h3>
              <p className="text-lg">
                Generate comprehensive attendance reports
              </p>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <button 
              onClick={() => router.push('/login')}
              className="bg-white text-[#008753] font-bold px-12 py-4 rounded-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-lg text-lg"
            >
              Login to Check Attendance
            </button>
          </div>
        </div>
      </section>

      <section ref={contactRef} id="contact" className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Need Assistance?</h2>
          <p className="text-2xl mb-10 max-w-3xl mx-auto">
            Contact your CDS Coordinator or NYSC State Secretariat
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={() => window.location.href = 'mailto:support@nysc.gov.ng'}
              className="bg-[#008753] text-white font-bold px-12 py-4 rounded-lg hover:bg-[#006b42] transition transform hover:scale-105 shadow-lg"
            >
              Email Support
            </button>
            <button 
              onClick={() => window.open('https://www.nysc.gov.ng', '_blank')}
              className="bg-transparent border-2 border-white text-white font-bold px-12 py-4 rounded-lg hover:bg-white hover:text-gray-900 transition transform hover:scale-105"
            >
              Visit Portal
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}