'use client';

import Link from 'next/link';
import Image from 'next/image';

import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Film/TV' },
    { href: '/comics', label: 'Comics' },
    { href: '/illustration', label: 'Illustration' },
    { href: '/about', label: 'About' },
  ];
  
  const socialLinks = [
    {
      href: 'https://www.instagram.com/megadubitably',
      icon:  '/instagram.svg',
      label: 'Instagram',
    },
    {
      href: 'https://www.linkedin.com/in/margaret-hardy-55489a17/',
      icon: '/linkedin.svg',
      label: 'LinkedIn',
    },
  ];

  return (
    <nav className="relative flex flex-row m-8">
      <div className="flex flex-1 flex-col">
        <div className="font-playfair-display-sc text-[#939BBA] font-black italic text-2xl tracking-wide">Margaret Hardy</div>
        <div className="font-open-sans-light text-black text-sm tracking-[.225em] uppercase">Art Director & Illustrator</div>
      </div>
      <div className="hidden lg:flex flex-row justify-end items-center gap-8 ">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className={`font-open-sans-light tracking-wider uppercase hover:opacity-50 ${
            pathname === link.href
              ? 'text-[#939BBA] underline underline-offset-4'
              : 'text-black'
          }`}>
            {link.label}
          </Link>
        ))}
        {socialLinks.map((link) => (
          <Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
            <Image src={link.icon} alt={link.label} width={24} height={24} className="hover:opacity-50"/>
          </Link>
        ))}
      </div>
      <div className="flex lg:hidden flex-col justify-center items-center">
        <button onClick={() => setMenuOpen(!menuOpen)}> 
          <Image src='/menu.svg' alt='Menu' width={32} height={32} className="hover:opacity-50"/>
        </button>
      </div>
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-lg z-1 lg:hidden">
          <div className="flex flex-col gap-6 p-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={() => setMenuOpen(false)}
                className={`font-open-sans-light tracking-wider uppercase hover:opacity-50 ${
                  pathname === link.href
                    ? 'text-[#939BBA] underline underline-offset-4'
                    : 'text-black'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-row gap-8 pt-2">
              {socialLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  <Image src={link.icon} alt={link.label} width={24} height={24} className="hover:opacity-50"/>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}