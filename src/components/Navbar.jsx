'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'CDS', href: '#cds' },
    { name: 'Attendance', href: '#attendance' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className="fixed w-full z-50 bg-white py-4 shadow-md border-b border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mr-3 overflow-hidden">
                <Image 
                  src="/images/nysc-logo.png" 
                  alt="NYSC Logo" 
                  width={48} 
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-bold text-xl text-[#008753]">NYSC</div>
                <div className="text-xs text-gray-600">Attendance Portal</div>
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-800 hover:text-[#008753] transition font-medium"
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => router.push('/login')}
              className="bg-[#008753] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#006b42] transition"
            >
              Login / Signup
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-800 hover:text-[#008753] focus:outline-none"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <div className="pt-6 pb-8 space-y-4">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-gray-200">
                <Link 
                  href={item.href}
                  className="block py-4 text-gray-800 hover:text-[#008753] font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </div>
            ))}
            <button
              onClick={() => {
                router.push('/login');
                setIsOpen(false);
              }}
              className="w-full bg-[#008753] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#006b42] transition"
            >
              Login / Signup
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}