'use client';

import Link from 'next/link';
import Image from 'next/image';

import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

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
    <nav className="flex flex-row m-8">
      <div className="flex flex-col">
        <div className="font-playfair-display-sc text-[#939BBA] font-black italic text-2xl tracking-wide">Margaret Hardy</div>
        <div className="font-open-sans-light text-black text-sm tracking-[.225em] uppercase">Art Director & Illustrator</div>
      </div>
      <div className="flex flex-1 flex-row justify-end items-center gap-8">
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
    </nav>
  );
}