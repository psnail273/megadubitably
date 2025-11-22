'use client';

import Link from 'next/link';
import Image from 'next/image';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (menuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent background scroll when menu is open
      // document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!menuOpen || !menuRef.current) return;

    const focusableElements = menuRef.current.querySelectorAll(
      'a[href], button:not([disabled])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    // Focus first element when menu opens
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleTab);
    };
  }, [menuOpen]);

  return (
    <nav className="relative flex flex-row m-8">
      <div className="flex flex-1 flex-col">
        <div className="font-playfair-display-sc text-[#939BBA] font-black italic text-2xl tracking-wide">Margaret Hardy</div>
        <div className="font-open-sans-light text-black text-sm tracking-[.225em] uppercase">Art Director & Illustrator</div>
      </div>
      <div className="hidden lg:flex flex-row justify-end items-center gap-8 ">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className={`font-open-sans-light tracking-wider uppercase hover:opacity-50 active:scale-105 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#939BBA] ${
            (link.href === '/' ? (pathname === '/' || pathname.startsWith('/poster')) : pathname.startsWith(link.href))
              ? 'text-[#939BBA] underline underline-offset-4'
              : 'text-black'
          }`}>
            {link.label}
          </Link>
        ))}
        {socialLinks.map((link) => (
          <Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-50 active:scale-105 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#939BBA] rounded" aria-label={link.label}>
            <Image src={link.icon} alt={link.label} width={24} height={24} />
          </Link>
        ))}
      </div>
      <div className="flex lg:hidden flex-col justify-center items-center">
        <button
          ref={menuButtonRef}
          aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-3 hover:opacity-50 active:scale-105 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#939BBA] rounded"
        >
          <Image src={menuOpen ? '/close.svg' : '/menu.svg'} alt='Menu' width={38} height={38} />
        </button>
      </div>
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white shadow-lg z-1 lg:hidden animate-slideDown"
        >
          <div className="flex flex-col gap-6 p-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`font-open-sans-light tracking-wider uppercase hover:opacity-50 active:scale-105 origin-left transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#939BBA] ${
                  (link.href === '/' ? (pathname === '/' || pathname.startsWith('/poster')) : pathname.startsWith(link.href))
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
                  className="hover:opacity-50 active:scale-105 origin-left transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#939BBA] rounded"
                  aria-label={link.label}
                >
                  <Image src={link.icon} alt={link.label} width={24} height={24} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}