/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  Hourglass, 
  ThumbsUp, 
  MapPin, 
  Star, 
  Lightbulb, 
  ArrowRight, 
  Smartphone, 
  Clock, 
  ChevronRight,
  Menu,
  X,
  Calendar,
  ArrowUpRight,
  ChevronLeft,
  Play,
  ChevronDown,
  ArrowUp,
  Globe,
  Instagram,
  Facebook,
  Linkedin
} from 'lucide-react';
import FAQSection from './components/FAQSection';
import ReviewSlider from './components/ReviewSlider';
import ContactUs from './components/ContactUs';

// Tip Bank for the interactive Tip module
const CLEANING_TIPS = [
  {
    title: 'Warm Water Microfiber Magic',
    body: 'For streak-free glass or steel mirrors, always use non-abrasive microfibers dampened with water, then buff immediately with a dry microfiber. Skip aggressive chemical sprays entirely!'
  },
  {
    title: 'The Dusting Top-Down Protocol',
    body: 'Always dust from the top shelves down to the floor boards. Dust particles will drift down during cleaning. By doing floors absolute last, you ensure no residual particles remain.'
  },
  {
    title: 'Neutralizer for Pet Hair Magnetism',
    body: 'Struggling with pet hair embedded in carpets? Run a clean window squeegee with a rubber blade across the rug surface. The static friction pulls hair right out like magic!'
  },
  {
    title: 'Baking Soda Kitchen Sink Reboot',
    body: 'Buff your stainless steel sinks with baking soda and a cut lemon. It gently polishes minor micro-scratches and introduces active sanitizing properties without acidic erosion.'
  },
  {
    title: 'Eco-Friendly Hardwater Removal',
    body: 'Saturate a soft clean rag with distilled white vinegar and wrap it around crusty faucets for 15 minutes. The natural acid de-bonds calcium buildup effortlessly.'
  }
];

export default function App() {
  // Mobile menu state handles standard styling
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Quick Hero selector states
  const [heroService, setHeroService] = useState('standard');
  const [heroDate, setHeroDate] = useState('');
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScrollTopButton = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScrollTopButton);
    return () => window.removeEventListener('scroll', handleScrollTopButton);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServiceDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenDatePicker = () => {
    if (dateInputRef.current) {
      try {
        dateInputRef.current.showPicker();
      } catch (e) {
        dateInputRef.current.focus();
        dateInputRef.current.click();
      }
    }
  };

  // Daily house care randomizer state
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  // Video modal state
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Testimonial custom slider state
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(1); // 2/4 is index 1

  // Top choice milestones scroll & active index
  const statsGridRef = useRef<HTMLDivElement>(null);
  const [activeStatIndex, setActiveStatIndex] = useState(0);

  const handleStatsScroll = (e: any) => {
    const target = e.currentTarget;
    const scrollLeft = target.scrollLeft;
    const width = target.clientWidth;
    if (width > 0) {
      const index = Math.round(scrollLeft / (width * 0.78));
      setActiveStatIndex(Math.min(2, Math.max(0, index)));
    }
  };

  const scrollStatTo = (index: number) => {
    if (statsGridRef.current) {
      const grid = statsGridRef.current;
      const cards = grid.querySelectorAll('[id^="stat-col-"]');
      if (cards && cards[index]) {
        cards[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
        setActiveStatIndex(index);
      }
    }
  };

  // Pricing slider milestones scroll & active index
  const pricingGridRef = useRef<HTMLDivElement>(null);
  const [activePricingIndex, setActivePricingIndex] = useState(0);

  const handlePricingScroll = (e: any) => {
    const target = e.currentTarget;
    const scrollLeft = target.scrollLeft;
    const width = target.clientWidth;
    if (width > 0) {
      const index = Math.round(scrollLeft / (width * 0.74));
      setActivePricingIndex(Math.min(2, Math.max(0, index)));
    }
  };

  const scrollPricingTo = (index: number) => {
    if (pricingGridRef.current) {
      const grid = pricingGridRef.current;
      const cards = grid.querySelectorAll('[id^="tier-"]');
      if (cards && cards[index]) {
        cards[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
        setActivePricingIndex(index);
      }
    }
  };

  // Our work slider scroll & active index for mobile
  const workGridRef = useRef<HTMLDivElement>(null);
  const [activeWorkIndex, setActiveWorkIndex] = useState(0);

  // Mouse drag state hooks for mobile lists (Pricing, Portfolio, and Stats)
  const [pricingIsDragging, setPricingIsDragging] = useState(false);
  const [pricingStartX, setPricingStartX] = useState(0);
  const [pricingScrollLeft, setPricingScrollLeft] = useState(0);

  const [workIsDragging, setWorkIsDragging] = useState(false);
  const [workStartX, setWorkStartX] = useState(0);
  const [workScrollLeft, setWorkScrollLeft] = useState(0);

  const [statsIsDragging, setStatsIsDragging] = useState(false);
  const [statsStartX, setStatsStartX] = useState(0);
  const [statsScrollLeft, setStatsScrollLeft] = useState(0);

  // Drag handlers for Pricing grid
  const handlePricingMouseDown = (e: React.MouseEvent) => {
    if (!pricingGridRef.current) return;
    setPricingIsDragging(true);
    e.preventDefault();
    setPricingStartX(e.pageX - pricingGridRef.current.offsetLeft);
    setPricingScrollLeft(pricingGridRef.current.scrollLeft);
  };

  const handlePricingMouseMove = (e: React.MouseEvent) => {
    if (!pricingIsDragging || !pricingGridRef.current) return;
    e.preventDefault();
    const x = e.pageX - pricingGridRef.current.offsetLeft;
    const walk = (x - pricingStartX) * 1.5; // Drag speed modifier
    pricingGridRef.current.scrollLeft = pricingScrollLeft - walk;
  };

  // Drag handlers for Work (Portfolio) grid
  const handleWorkMouseDown = (e: React.MouseEvent) => {
    if (!workGridRef.current) return;
    setWorkIsDragging(true);
    // Let buttons on the slide still be clickable, only block default if we drag
    e.preventDefault();
    setWorkStartX(e.pageX - workGridRef.current.offsetLeft);
    setWorkScrollLeft(workGridRef.current.scrollLeft);
  };

  const handleWorkMouseMove = (e: React.MouseEvent) => {
    if (!workIsDragging || !workGridRef.current) return;
    e.preventDefault();
    const x = e.pageX - workGridRef.current.offsetLeft;
    const walk = (x - workStartX) * 1.5; // Drag speed modifier
    workGridRef.current.scrollLeft = workScrollLeft - walk;
  };

  // Drag handlers for Stats grid
  const handleStatsMouseDown = (e: React.MouseEvent) => {
    if (!statsGridRef.current) return;
    setStatsIsDragging(true);
    e.preventDefault();
    setStatsStartX(e.pageX - statsGridRef.current.offsetLeft);
    setStatsScrollLeft(statsGridRef.current.scrollLeft);
  };

  const handleStatsMouseMove = (e: React.MouseEvent) => {
    if (!statsIsDragging || !statsGridRef.current) return;
    e.preventDefault();
    const x = e.pageX - statsGridRef.current.offsetLeft;
    const walk = (x - statsStartX) * 1.5; // Drag speed modifier
    statsGridRef.current.scrollLeft = statsScrollLeft - walk;
  };

  const handleWorkScroll = (e: any) => {
    const target = e.currentTarget;
    const scrollLeft = target.scrollLeft;
    const width = target.clientWidth;
    if (width > 0) {
      const index = Math.round(scrollLeft / (width * 0.78));
      setActiveWorkIndex(Math.min(3, Math.max(0, index)));
    }
  };

  const scrollWorkTo = (index: number) => {
    if (workGridRef.current) {
      const grid = workGridRef.current;
      const cards = grid.querySelectorAll('[id^="work-case-"]');
      if (cards && cards[index]) {
        cards[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
        setActiveWorkIndex(index);
      }
    }
  };

  // Quote popup states
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    phone: '',
    email: '',
    zip: ''
  });
  const [quoteSuccessMsg, setQuoteSuccessMsg] = useState('');

  const handleNextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % CLEANING_TIPS.length);
  };

  const handleApplyHeroSelector = (e: FormEvent) => {
    e.preventDefault();
    setQuoteModalOpen(true);
  };

  const handleQuoteSubmit = (e: FormEvent) => {
    e.preventDefault();
    setQuoteSuccessMsg('Thank you! Your free custom cleaning estimate request has been received. Our dispatch specialist will call you shortly.');
    setTimeout(() => {
      setQuoteSuccessMsg('');
      setQuoteForm({ name: '', phone: '', email: '', zip: '' });
      setQuoteModalOpen(false);
    }, 4500);
  };

  const handleScrollToCalcAidVal = (serviceId: string) => {
    const target = document.getElementById('pricing-standards');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] relative overflow-hidden font-sans antialiased text-slate-900 select-none">
      
      {/* Main sticky navigation header */}
      <header className="sticky top-0 z-50 bg-[#faf8f5]/85 backdrop-blur-md py-1.5 md:py-2" id="main-nav-header">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-12 md:h-14">
            
            {/* Elegant brand typography and logo */}
            <div id="brand-logo">
              <a 
                href="#" 
                className="font-display text-xl sm:text-2xl md:text-3xl font-black tracking-widest block hover:opacity-80 transition-opacity text-[#0a0e1a]"
              >
                Clean<span className="text-[#b9e230]">it</span>
              </a>
            </div>

            {/* Desktop link navigation */}
            <nav className="hidden md:flex items-center gap-10 text-[11px] md:text-xs font-black uppercase tracking-widest text-[#0a0e1a]/85" id="desktop-links">
              <a href="#services-portfolio" className="py-2 hover:text-[#115be4] transition-colors duration-200">
                About Us
              </a>
              <a href="#faq-section" className="py-2 hover:text-[#115be4] transition-colors duration-200">
                FAQ
              </a>
              <a href="#custom-client-success" className="py-2 hover:text-[#115be4] transition-colors duration-200">
                Reviews
              </a>
            </nav>

            {/* Action booking CTA header */}
            <div className="hidden md:flex items-center gap-4">
              {/* Circular arrow icon */}
              <a 
                href="#contact-section"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-900 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all duration-300 cursor-pointer focus:outline-none"
                title="Contact Us"
              >
                <ArrowUpRight className="w-5 h-5" />
              </a>
              <button
                onClick={() => setQuoteModalOpen(true)}
                id="header-cta-book"
                className="px-6 py-3 md:px-8 md:py-3.5 bg-[#b9e230] hover:bg-[#a7cc26] text-slate-950 font-black uppercase tracking-widest text-[10px] md:text-xs rounded-full transition-all duration-150 shadow-sm border border-slate-950/10 cursor-pointer"
              >
                Book Us
              </button>
            </div>

            {/* Mobile menu panel activator */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-900 hover:bg-slate-100 rounded-xl transition-colors focus:outline-none"
              id="mobile-menu-trigger"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile menu tray slider (integrated dropdown format) */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#faf8f5]/95 backdrop-blur-lg shadow-lg animate-fade-in" id="mobile-nav-tray">
            <div className="px-6 pt-4 pb-6 space-y-2">
              <a 
                href="#services-portfolio" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-bold uppercase tracking-wider text-slate-900 hover:text-[#115be4] transition-all"
              >
                About Us
              </a>
              <a 
                href="#faq-section" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-bold uppercase tracking-wider text-slate-900 hover:text-[#115be4] transition-all"
              >
                FAQ
              </a>
              <a 
                href="#custom-client-success" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-bold uppercase tracking-wider text-slate-900 hover:text-[#115be4] transition-all"
              >
                Reviews
              </a>
              <div className="pt-4 border-t border-slate-200 mt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setQuoteModalOpen(true);
                  }}
                  className="w-full text-center flex items-center justify-center gap-2 bg-[#b9e230] text-slate-950 font-bold py-3.5 px-4 rounded-full text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer focus:outline-none"
                >
                  <Calendar className="w-4 h-4 text-slate-950" />
                  <span>Book Us</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main id="main-content" className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* HERO SECTION */}
        <section className="pt-2 pb-6 md:pt-4 md:pb-8 relative" id="hero-banner">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left side detail structure: Header and text (7 cols) */}
            <div className="md:col-span-7 lg:col-span-6 space-y-8" id="hero-left-col">
              
              {/* Massive typographic logo block exactly like screenshot */}
              <div className="space-y-1 text-center md:text-left">
                <h1 className="text-3xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase text-[#0a0e1a] leading-[0.95]" style={{ fontFamily: 'var(--font-display)' }}>
                  PREMIER <span className="font-serif italic font-light lowercase text-slate-800 tracking-tight inline-block ml-2 normal-case">cleaning</span> <br />
                  SOLUTION
                </h1>
              </div>

              {/* Speech bubble/quote exactly like screenshot */}
              <div className="flex items-start gap-4 max-w-lg bg-transparent py-2 border-l-2 border-slate-300 pl-4 text-left mx-auto md:mx-0">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wide text-slate-800 leading-relaxed">
                  "BEST CLEANING SERVICES FOR YOUR BUSINESS AND HOUSE."
                </p>
              </div>

              {/* Mobile bucket only, rendered above the discover paragraph with interactive overlays */}
              <div className="md:hidden relative flex justify-center !mt-4 pb-6 pt-2" id="hero-right-col-mobile">
                <div className="relative w-full max-w-[280px] sm:max-w-[320px] mx-auto flex items-center justify-center">
                  
                  {/* Soft glowing ambient circle behind the bucket */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#b9e230]/25 to-emerald-400/10 rounded-full filter blur-2xl opacity-80 pointer-events-none z-0"></div>
                  
                  {/* Watch Video button floating over mobile bucket */}
                  <button 
                    onClick={() => setVideoModalOpen(true)}
                    className="absolute -top-1 left-2 sm:left-4 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-md border border-slate-200/80 px-3.5 py-2.5 rounded-full shadow-[0_8px_20px_-6px_rgba(0,0,0,0.12)] hover:shadow-md transition-all active:scale-95 group focus:outline-none cursor-pointer"
                    type="button"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#b9e230] flex items-center justify-center shadow-3xs group-hover:scale-110 transition-transform">
                      <Play className="w-2.5 h-2.5 text-slate-950 fill-slate-950 translate-x-[0.5px]" />
                    </div>
                    <span className="text-[10px] font-black uppercase text-slate-900 tracking-wider">Watch Video</span>
                  </button>

                  {/* 100% Organic floating badge */}
                  <div className="absolute -right-2 top-12 z-20 bg-[#b9e230] text-slate-950 px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-full shadow-[0_4px_12px_rgba(185,226,48,0.3)] animate-pulse duration-[3000ms]">
                    100% Organic
                  </div>

                  <img
                    src="https://raw.githubusercontent.com/uglyfoxindia/Cleanit/refs/heads/main/Bucket.png"
                    alt="Professional yellow bucket loaded with cleaning supplies"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)] select-none mix-blend-multiply relative z-10"
                  />
                </div>
              </div>

              {/* Bullet highlights - minimal */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl text-center md:text-left mx-auto md:mx-0">
                Discover the joy of a pristine space with Cleanit cleaning plans. Fully vetted, licensed, and comprehensive insured residential cleaners tailored to your exact lifestyle.
              </p>

              {/* Simple beautiful star rating row (Now below the discover text) */}
              <div className="flex flex-col gap-1 text-center items-center md:text-left md:items-start justify-center md:justify-start pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black text-slate-950 leading-none">4.5</span>
                  <div className="w-[1px] h-6 bg-slate-300"></div>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                  </div>
                </div>
                <div className="text-sm font-medium text-slate-600 tracking-tight">
                  326k Total Review
                </div>
              </div>

            </div>

            {/* Right side: High-quality studio photo of cleaning bucket loaded with supplies */}
            <div className="hidden md:flex md:col-span-5 lg:col-span-6 relative justify-center md:justify-end overflow-visible" id="hero-right-col">
              <div className="relative w-full flex items-center justify-center md:justify-end overflow-visible -mt-16 -mb-6 sm:-mt-24 sm:-mb-10 md:my-0">
                <img
                  src="https://raw.githubusercontent.com/uglyfoxindia/Cleanit/refs/heads/main/Bucket.png"
                  alt="Professional yellow bucket loaded with cleaning supplies"
                  referrerPolicy="no-referrer"
                  className="w-[120%] sm:w-[130%] md:w-[135%] lg:w-[140%] xl:w-[145%] max-w-none h-auto object-contain drop-shadow-2xl select-none mix-blend-multiply transition-all duration-300 transform -translate-y-6 sm:-translate-y-8 md:translate-y-0 md:translate-x-10 lg:translate-x-12 xl:translate-x-16"
                />
              </div>
            </div>

          </div>

          {/* DYNAMIC ACCENT SEARCH BAR AT BOTTOM OF HERO */}
          <div className="mt-12 md:mt-16 w-full relative z-20" id="hero-service-finder">
            {/* Elegant high-end radial ambient green glow in the background as underlay */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#b9e230]/25 via-emerald-400/15 to-[#b9e230]/5 rounded-3xl blur-2xl opacity-90 pointer-events-none -z-10 animate-pulse duration-3000"></div>
            
            <form 
              onSubmit={handleApplyHeroSelector}
              className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-100 p-4 md:py-4 md:px-6 shadow-[0_20px_50px_-12px_rgba(185,226,48,0.18),0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_-6px_rgba(185,226,48,0.28),0_0_25px_rgba(185,226,48,0.1)] transition-all duration-350 w-full grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            >
              {/* Bold service label with absolutely no top tag */}
              <div className="md:col-span-4 text-center md:text-left md:pl-2">
                <span className="text-lg md:text-xl font-extrabold uppercase tracking-tight text-[#0a0e1a]">
                  GET OUR SERVICE
                </span>
              </div>
              
              {/* Custom-designed Pill Dropdown Container for Service Type */}
              <div className="md:col-span-3 relative w-full" ref={dropdownRef}>
                <div 
                  onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
                  className="relative bg-slate-100/75 hover:bg-slate-200/50 rounded-full px-5 py-3.5 flex items-center justify-between cursor-pointer transition-colors duration-250 border border-slate-200/30"
                >
                  <span className="text-xs font-bold text-slate-800 tracking-wide text-left truncate pr-2 font-sans select-none">
                    {heroService === 'standard' ? 'Regular Standard Clean' :
                     heroService === 'deep' ? 'Extreme Deep scrubbing' :
                     heroService === 'move-out' ? 'Move-In / Move-Out' :
                     heroService === 'eco' ? '100% Eco-Friendly Clean' : 'Service Type'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-250 ${serviceDropdownOpen ? 'transform rotate-180' : ''}`} />
                </div>

                {serviceDropdownOpen && (
                  <div className="absolute left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-[0_12px_30px_rgba(0,0,0,0.12)] py-1.5 z-50 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => {
                        setHeroService('standard');
                        setServiceDropdownOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 text-xs font-bold font-sans transition-all duration-150 flex items-center justify-between cursor-pointer ${
                        heroService === 'standard' 
                          ? 'bg-[#b9e230]/20 text-[#0a0e1a]' 
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                      }`}
                    >
                      <span>Regular Standard Clean</span>
                      {heroService === 'standard' && <div className="w-1.5 h-1.5 bg-[#a7cc26] rounded-full"></div>}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setHeroService('deep');
                        setServiceDropdownOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 text-xs font-bold font-sans transition-all duration-150 flex items-center justify-between cursor-pointer ${
                        heroService === 'deep' 
                          ? 'bg-[#b9e230]/20 text-[#0a0e1a]' 
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                      }`}
                    >
                      <span>Extreme Deep scrubbing</span>
                      {heroService === 'deep' && <div className="w-1.5 h-1.5 bg-[#a7cc26] rounded-full"></div>}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setHeroService('move-out');
                        setServiceDropdownOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 text-xs font-bold font-sans transition-all duration-150 flex items-center justify-between cursor-pointer ${
                        heroService === 'move-out' 
                          ? 'bg-[#b9e230]/20 text-[#0a0e1a]' 
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                      }`}
                    >
                      <span>Move-In / Move-Out</span>
                      {heroService === 'move-out' && <div className="w-1.5 h-1.5 bg-[#a7cc26] rounded-full"></div>}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setHeroService('eco');
                        setServiceDropdownOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 text-xs font-bold font-sans transition-all duration-150 flex items-center justify-between cursor-pointer ${
                        heroService === 'eco' 
                          ? 'bg-[#b9e230]/20 text-[#0a0e1a]' 
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                      }`}
                    >
                      <span>100% Eco-Friendly Clean</span>
                      {heroService === 'eco' && <div className="w-1.5 h-1.5 bg-[#a7cc26] rounded-full"></div>}
                    </button>
                  </div>
                )}
              </div>

              {/* Custom-designed Pill Date Picker Container */}
              <div className="md:col-span-3 relative w-full">
                <div 
                  onClick={handleOpenDatePicker}
                  className="relative bg-slate-100/75 hover:bg-slate-200/50 rounded-full px-5 py-3.5 flex items-center justify-between cursor-pointer transition-colors duration-250 border border-slate-200/30"
                >
                  <span className="text-xs font-bold text-slate-800 tracking-wide font-sans select-none">
                    {heroDate ? heroDate : 'Select Date'}
                  </span>
                  <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                  <input
                    ref={dateInputRef}
                    type="date"
                    value={heroDate}
                    onChange={(e) => setHeroDate(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full pointer-events-none"
                    tabIndex={-1}
                  />
                </div>
              </div>

              {/* SEE DETAILS Button container */}
              <div className="md:col-span-2 text-right">
                <button
                  type="submit"
                  className="w-full bg-[#b9e230] hover:bg-[#a7cc26] text-slate-950 font-bold uppercase text-[11px] tracking-wider py-3.5 px-6 rounded-full transition-all duration-300 border border-slate-950/10 cursor-pointer hover:shadow-[0_4px_20px_rgba(185,226,48,0.4)] transform hover:scale-[1.02] active:scale-[0.98] text-center block"
                >
                  See Details
                </button>
              </div>
            </form>
          </div>

        </section>

        {/* WORK THAT WE DO / SERVICES GRID */}
        <section className="pt-6 pb-16 md:pt-10 md:pb-24" id="services-portfolio">
          
          <div className="grid grid-cols-1 md:grid-cols-12 items-start mb-16 gap-6 md:gap-8">
            <div className="md:col-span-7 text-left">
              <h2 className="text-3xl sm:text-6xl font-black uppercase tracking-tighter text-[#0a0e1a] leading-none sm:leading-[1.05]">
                OUR <span className="italic font-normal">WORK</span>
                <br />
                THAT WE DO
              </h2>
            </div>
            <div className="md:col-span-5 md:pt-3">
              <p className="text-xs sm:text-sm text-slate-500 text-left leading-relaxed">
                Discover the joy of a pristine space with SupremeShine Cleaning Services. Contact us today to schedule your cleaning appointment and experience.
              </p>
            </div>
          </div>

          {/* Mobile swipe helper header for Portfolio */}
          <div className="flex items-center justify-between md:hidden mb-4 px-1" id="portfolio-swipe-guide">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#0a0e1a]/40">Our Portfolio</span>
            <div className="flex items-center gap-1 text-[10px] font-black text-slate-800 uppercase tracking-wider bg-[#b9e230] px-2.5 py-1 rounded-full shadow-4xs animate-pulse">
              <span>Swipe</span>
              <span className="animate-bounce">⮕</span>
            </div>
          </div>

          {/* Asymmetric grid directly matching screenshot style with mobile swipe snap */}
          <div 
            ref={workGridRef}
            onScroll={handleWorkScroll}
            onMouseDown={handleWorkMouseDown}
            onMouseLeave={() => setWorkIsDragging(false)}
            onMouseUp={() => setWorkIsDragging(false)}
            onMouseMove={handleWorkMouseMove}
            className={`flex md:grid md:grid-cols-2 lg:grid-cols-12 gap-5 md:gap-8 overflow-x-auto md:overflow-x-visible [scrollbar-width:none] [::-webkit-scrollbar]:hidden snap-x snap-mandatory pb-4 md:pb-0 -mx-6 px-6 md:-mx-0 md:px-0 items-stretch select-none ${
              workIsDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            id="portfolio-cards-container"
          >
            
            {/* Box 01: Commercial Cleaning (Column Left - Spans 5 cols) */}
            <div className="lg:col-span-5 flex flex-col group justify-between w-[82vw] md:w-auto shrink-0 md:shrink snap-align-start snap-always" id="work-case-01">
              <div className="overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white p-3.5 shadow-sm transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(185,226,48,0.5)] group-hover:border-[#b9e230]/50 h-full flex flex-col">
                <div className="overflow-hidden rounded-[1.5rem] flex-1">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200"
                    alt="Commercial Cleaning"
                    referrerPolicy="no-referrer"
                    className="w-full h-[190px] sm:h-[260px] md:h-[340px] lg:h-[380px] object-cover rounded-[1.5rem] group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-4 mt-1 text-left">
                  <span className="text-xs font-mono font-bold text-slate-400 block mb-0.5">01/</span>
                  <h3 className="font-bold text-sm tracking-widest uppercase text-[#0a0e1a]">Commercial Cleaning</h3>
                </div>
              </div>
            </div>

            {/* Box 02: Regular Cleaning (Column Right - Spans 7 cols) */}
            <div className="lg:col-span-7 flex flex-col group justify-between w-[82vw] md:w-auto shrink-0 md:shrink snap-align-start snap-always" id="work-case-02">
              <div className="overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white p-3.5 shadow-sm transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(185,226,48,0.5)] group-hover:border-[#b9e230]/50 h-full flex flex-col">
                <div className="overflow-hidden rounded-[1.5rem] flex-1">
                  <img
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200"
                    alt="Regular Cleaning"
                    referrerPolicy="no-referrer"
                    className="w-full h-[190px] sm:h-[260px] md:h-[340px] lg:h-[380px] object-cover rounded-[1.5rem] group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-4 mt-1 text-left">
                  <span className="text-xs font-mono font-bold text-slate-400 block mb-0.5">02/</span>
                  <h3 className="font-bold text-sm tracking-widest uppercase text-[#0a0e1a]">Regular Cleaning</h3>
                </div>
              </div>
            </div>

            {/* Row 2, Left: Kitchen Cleaning (6 cols) */}
            <div className="lg:col-span-7 flex flex-col group justify-between w-[82vw] md:w-auto shrink-0 md:shrink snap-align-start snap-always" id="work-case-03">
              <div className="overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white p-3.5 shadow-sm transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(185,226,48,0.5)] group-hover:border-[#b9e230]/50 h-full flex flex-col">
                <div className="overflow-hidden rounded-[1.5rem] flex-1">
                  <img
                    src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200"
                    alt="Kitchen Cleaning"
                    referrerPolicy="no-referrer"
                    className="w-full h-[190px] sm:h-[260px] md:h-[340px] lg:h-[380px] object-cover rounded-[1.5rem] group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-4 mt-1 text-left">
                  <span className="text-xs font-mono font-bold text-slate-400 block mb-0.5">03/</span>
                  <h3 className="font-bold text-sm tracking-widest uppercase text-[#0a0e1a]">Kitchen Cleaning</h3>
                </div>
              </div>
            </div>

            {/* Row 2, Right: 25+ Services card (5 cols) */}
            <div className="lg:col-span-5 flex flex-col group justify-between w-[82vw] md:w-auto shrink-0 md:shrink snap-align-start snap-always" id="work-case-04">
              <div className="overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white p-3.5 shadow-sm transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(185,226,48,0.5)] group-hover:border-[#b9e230]/50 h-full flex flex-col">
                <div className="w-full h-full min-h-[190px] sm:min-h-[260px] md:min-h-[340px] lg:min-h-[380px] rounded-[1.5rem] bg-slate-50/75 p-6 flex flex-col justify-center items-center text-center relative gap-5 flex-1">
                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#0a0e1a] tracking-tight leading-tight">
                    25+ SERVICES
                    <br />
                    YOU CAN
                    <br />
                    EXPLORE
                  </h3>
                  
                  <button
                    onClick={() => handleScrollToCalcAidVal('standard')}
                    className="w-12 h-12 rounded-full bg-[#b9e230] hover:bg-[#a7cc26] text-slate-950 flex items-center justify-center transition-all duration-300 border border-slate-950/10 cursor-pointer shadow-xs active:scale-95 animate-pulse"
                    aria-label="See standard pricing plans"
                  >
                    <ArrowUpRight className="w-5 h-5 text-slate-950" />
                  </button>
                </div>
                <div className="p-4 mt-1 text-left">
                  <span className="text-xs font-mono font-bold text-slate-400 block mb-0.5">04/</span>
                  <h3 className="font-bold text-sm tracking-widest uppercase text-[#0a0e1a]">All Services</h3>
                </div>
              </div>
            </div>

          </div>

          {/* Navigation Indicators for work swipe on mobile */}
          <div className="flex md:hidden justify-center items-center gap-2 mt-5" id="work-swipe-dots">
            {[0, 1, 2, 3].map((idx) => (
              <button
                key={idx}
                onClick={() => scrollWorkTo(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                  activeWorkIndex === idx ? 'w-5 bg-[#b9e230]' : 'w-1.5 bg-slate-200/90 hover:bg-slate-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                type="button"
              />
            ))}
          </div>

        </section>

        {/* TOP CHOICE STATS SECTION WITH SKEWED BACKGROUND */}
        <section className="relative py-16 md:py-28 my-6 md:my-12 overflow-hidden w-screen left-1/2 -ml-[50vw]" id="stats-milestones">
          {/* Beautiful angled background layer */}
          <div 
            className="absolute inset-0 bg-white z-0 shadow-sm" 
            style={{ clipPath: 'polygon(0 30px, 100% 0, 100% calc(100% - 30px), 0 100%)' }}
          />
          
          <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
            <div className="text-center max-w-4xl mx-auto mb-8 md:mb-16 space-y-4">
              <h2 className="text-3xl sm:text-6xl font-black uppercase tracking-tight text-[#0a0e1a] leading-none sm:leading-[1.05]">
                TOP CHOICE FOR <br />
                <span className="font-serif italic font-light lowercase">cleaning</span> SERVICES
              </h2>
            </div>

            {/* Mobile swipe indicator helper header */}
            <div className="flex items-center justify-between md:hidden mb-4 px-1" id="mobile-swipe-guide">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0a0e1a]/40">Key Milestones</span>
              <div className="flex items-center gap-1 text-[10px] font-black text-slate-800 uppercase tracking-wider bg-[#b9e230] px-2.5 py-1 rounded-full shadow-4xs animate-pulse">
                <span>Swipe</span>
                <span className="animate-bounce">⮕</span>
              </div>
            </div>

            {/* Horizontal 3-column stats grid with mobile swipe snap */}
            <div 
              ref={statsGridRef}
              onScroll={handleStatsScroll}
              onMouseDown={handleStatsMouseDown}
              onMouseLeave={() => setStatsIsDragging(false)}
              onMouseUp={() => setStatsIsDragging(false)}
              onMouseMove={handleStatsMouseMove}
              className={`flex md:grid md:grid-cols-3 gap-5 md:gap-8 overflow-x-auto md:overflow-x-visible [scrollbar-width:none] [::-webkit-scrollbar]:hidden snap-x snap-mandatory pb-4 md:pb-0 text-left mt-4 md:mt-12 -mx-6 px-6 md:-mx-0 md:px-0 select-none ${
                statsIsDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              id="stats-milestones-grid"
            >
              
              {/* Stat 01 */}
              <div className="flex flex-col justify-between bg-[#faf8f5]/90 md:bg-slate-50/75 hover:bg-slate-50 p-6 md:p-8 rounded-[2rem] border border-slate-200/50 shadow-3xs transition-all duration-300 hover:shadow-[0_0_20px_rgba(185,226,48,0.25)] hover:border-[#b9e230]/40 w-[82vw] md:w-auto shrink-0 md:shrink snap-align-start snap-always" id="stat-col-1">
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl md:text-6xl font-black tracking-tight text-[#0a0e1a] font-mono block">5500+</span>
                    <span className="md:hidden text-[9px] font-black uppercase text-slate-500 bg-white border border-slate-200/70 px-2.5 py-1 rounded-full whitespace-nowrap">
                      Pristine Labs
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-black text-[#0a0e1a] uppercase tracking-wider block">Project Completed</span>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      Discover the joy of a pristine space with SupremeShine Cleaning Services.
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:mt-6 overflow-hidden rounded-xl h-[110px] md:h-[120px] border border-slate-100 relative">
                  <div className="absolute top-2 left-2 z-10 bg-black/75 backdrop-blur-xs text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">
                    Home & Kitchens
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=500"
                    alt="Kitchen Cleaning"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Stat 02 */}
              <div className="flex flex-col justify-between bg-[#faf8f5]/90 md:bg-slate-50/75 hover:bg-slate-50 p-6 md:p-8 rounded-[2rem] border border-slate-200/50 shadow-3xs transition-all duration-300 hover:shadow-[0_0_20px_rgba(185,226,48,0.25)] hover:border-[#b9e230]/40 w-[82vw] md:w-auto shrink-0 md:shrink snap-align-start snap-always" id="stat-col-2">
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl md:text-6xl font-black tracking-tight text-[#0a0e1a] font-mono block">99%</span>
                    <button
                      onClick={() => handleScrollToCalcAidVal('standard')}
                      className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#b9e230] hover:bg-[#a7cc26] text-slate-950 flex items-center justify-center transition-all duration-300 border border-slate-950/10 cursor-pointer shadow-3xs"
                    >
                      <ArrowUpRight className="w-4 h-4 text-slate-950" />
                    </button>
                  </div>
                  <div>
                    <span className="text-xs font-black text-[#0a0e1a] uppercase tracking-wider block">Satisfied Customer</span>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      Elite quality standards, highly responsive team care, and guaranteed pristine results.
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:mt-6 overflow-hidden rounded-xl h-[110px] md:h-[120px] border border-slate-100 relative">
                  <div className="absolute top-2 left-2 z-10 bg-black/75 backdrop-blur-xs text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">
                    Verified Feedback
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=500"
                    alt="Pristine Bathroom Home"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Stat 03 */}
              <div className="flex flex-col justify-between bg-[#faf8f5]/90 md:bg-slate-50/75 hover:bg-slate-50 p-6 md:p-8 rounded-[2rem] border border-slate-200/50 shadow-3xs transition-all duration-300 hover:shadow-[0_0_20px_rgba(185,226,48,0.25)] hover:border-[#b9e230]/40 w-[82vw] md:w-auto shrink-0 md:shrink snap-align-start snap-always" id="stat-col-3">
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl md:text-6xl font-black tracking-tight text-[#0a0e1a] font-mono block">80+</span>
                    <span className="md:hidden text-[9px] font-black uppercase text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                      Eco Certified
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-black text-[#0a0e1a] uppercase tracking-wider block">Expert Cleaner</span>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      Our commitment to excellence can make. Join countless satisfied clients who trust our experts.
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:mt-6 overflow-hidden rounded-xl h-[110px] md:h-[120px] border border-slate-100 relative">
                  <div className="absolute top-2 left-2 z-10 bg-black/75 backdrop-blur-xs text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">
                    Professional Maids
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=500"
                    alt="Expert Maid"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>

            {/* Navigation Indicators for swipe on mobile */}
            <div className="flex md:hidden justify-center items-center gap-2 mt-5" id="stats-swipe-dots">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => scrollStatTo(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                    activeStatIndex === idx ? 'w-5 bg-[#b9e230]' : 'w-1.5 bg-slate-200/90 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                  type="button"
                />
              ))}
            </div>

          </div>
        </section>

        {/* PRICING PLANS SECTION */}
        <section className="py-16 md:py-24" id="pricing-standards">
          
          <div className="text-center max-w-4xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter text-[#0a0e1a] leading-none sm:leading-[0.95]">
              BEST <span className="font-serif italic font-light lowercase">pricing</span> PLAN
            </h2>
          </div>

          {/* Mobile swipe helper header for Pricing */}
          <div className="flex items-center justify-between md:hidden mb-4 px-1" id="pricing-swipe-guide">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#0a0e1a]/40">Packages Available</span>
            <div className="flex items-center gap-1 text-[10px] font-black text-slate-800 uppercase tracking-wider bg-[#b9e230] px-2.5 py-1 rounded-full shadow-4xs animate-pulse">
              <span>Swipe</span>
              <span className="animate-bounce">⮕</span>
            </div>
          </div>

          <div 
            ref={pricingGridRef}
            onScroll={handlePricingScroll}
            onMouseDown={handlePricingMouseDown}
            onMouseLeave={() => setPricingIsDragging(false)}
            onMouseUp={() => setPricingIsDragging(false)}
            onMouseMove={handlePricingMouseMove}
            className={`flex md:grid md:grid-cols-3 gap-5 md:gap-8 overflow-x-auto md:overflow-x-visible [scrollbar-width:none] [::-webkit-scrollbar]:hidden snap-x snap-mandatory py-4 md:py-0 -mx-6 px-6 md:-mx-0 md:px-0 select-none ${
              pricingIsDragging ? "cursor-grabbing" : "cursor-grab"
            }`} 
            id="pricing-tiers"
          >
            
            {/* Box A: Residential */}
            <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 p-5 md:p-8 flex flex-col justify-between text-left relative md:hover:-translate-y-2 md:hover:shadow-2xl hover:border-slate-300 transition-all duration-300 w-[74vw] md:w-auto min-w-[230px] max-w-[270px] md:max-w-[380px] shrink-0 md:shrink snap-align-center md:snap-align-none snap-always" id="tier-residential">
              <div className="space-y-4 md:space-y-6">
                
                {/* Bullet item header */}
                <div className="flex items-center gap-2 pb-3 md:pb-4 border-b border-slate-100">
                  <span className="p-1.5 md:p-2 bg-slate-100 rounded-xl">
                    <Smartphone className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-700" />
                  </span>
                  <span className="font-bold uppercase text-[10px] md:text-xs tracking-wider text-[#0a0e1a]">RESIDENTIAL</span>
                </div>

                <div className="space-y-1 md:space-y-2">
                  <span className="text-3xl md:text-4xl font-extrabold text-[#0a0e1a] font-mono">$49</span>
                  <span className="text-[10px] md:text-xs text-slate-400 block uppercase font-bold tracking-widest">/ Month</span>
                </div>

                <ul className="space-y-2.5 md:space-y-3 text-[11px] md:text-xs text-slate-600 block pl-0.5">
                  <li className="flex items-center gap-1.5 md:gap-2">
                    <span className="text-[#b9e230] font-extrabold text-[11px] md:text-xs">✓</span>
                    Monthly Cleaning Reset
                  </li>
                  <li className="flex items-center gap-1.5 md:gap-2">
                    <span className="text-[#b9e230] font-extrabold text-[11px] md:text-xs">✓</span>
                    4 Working Hours Per Day
                  </li>
                  <li className="flex items-center gap-1.5 md:gap-2">
                    <span className="text-[#b9e230] font-extrabold text-[11px] md:text-xs">✓</span>
                    Full Space Observation
                  </li>
                </ul>

              </div>

              <button
                onClick={() => setQuoteModalOpen(true)}
                className="mt-6 md:mt-8 w-full bg-slate-900 text-white font-bold py-2.5 md:py-3.5 px-4 rounded-full text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-[#b9e230] hover:text-slate-950 transition-all duration-300 cursor-pointer border border-[#0a0e1a]/10"
              >
                Choose Package
              </button>
            </div>

            {/* Box B: Apartment */}
            <div className="bg-white rounded-2xl md:rounded-3xl border-2 border-slate-900 p-5 md:p-8 flex flex-col justify-between text-left relative md:hover:-translate-y-2 md:hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-300 shadow-sm w-[74vw] md:w-auto min-w-[230px] max-w-[270px] md:max-w-[380px] shrink-0 md:shrink snap-align-center md:snap-align-none snap-always" id="tier-apartment">
              {/* Most popular badge */}
              <span className="absolute -top-3 right-4 md:right-6 bg-[#b9e230] text-slate-950 text-[8px] md:text-[9px] font-black uppercase tracking-widest px-2.5 md:px-3 py-0.5 md:py-1 rounded-full border border-slate-950/10">Most Popular</span>
              
              <div className="space-y-4 md:space-y-6">
                
                {/* Bullet item header */}
                <div className="flex items-center gap-2 pb-3 md:pb-4 border-b border-slate-100">
                  <span className="p-1.5 md:p-2 bg-slate-100 rounded-xl">
                    <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-700" />
                  </span>
                  <span className="font-bold uppercase text-[10px] md:text-xs tracking-wider text-[#0a0e1a]">APARTMENT</span>
                </div>

                <div className="space-y-1 md:space-y-2">
                  <span className="text-3xl md:text-4xl font-extrabold text-[#0a0e1a] font-mono">$69</span>
                  <span className="text-[10px] md:text-xs text-slate-400 block uppercase font-bold tracking-widest">/ Month</span>
                </div>

                <ul className="space-y-2.5 md:space-y-3 text-[11px] md:text-xs text-slate-600 block pl-0.5">
                  <li className="flex items-center gap-1.5 md:gap-2">
                    <span className="text-[#b9e230] font-extrabold text-[11px] md:text-xs">✓</span>
                    Weekly Cleaning Reset
                  </li>
                  <li className="flex items-center gap-1.5 md:gap-2">
                    <span className="text-[#b9e230] font-extrabold text-[11px] md:text-xs">✓</span>
                    4 Working Hours Per Day
                  </li>
                  <li className="flex items-center gap-1.5 md:gap-2">
                    <span className="text-[#b9e230] font-extrabold text-[11px] md:text-xs">✓</span>
                    Full Space Observation
                  </li>
                  <li className="flex items-center gap-1.5 md:gap-2">
                    <span className="text-[#b9e230] font-extrabold text-[11px] md:text-xs">✓</span>
                    Priority Booking Slots
                  </li>
                </ul>

              </div>

              <button
                onClick={() => setQuoteModalOpen(true)}
                className="mt-6 md:mt-8 w-full bg-[#b9e230] text-slate-950 font-bold py-2.5 md:py-3.5 px-4 rounded-full text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all duration-300 cursor-pointer border border-[#0a0e1a]/10"
              >
                Choose Package
              </button>
            </div>

            {/* Box C: Commercial */}
            <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 p-5 md:p-8 flex flex-col justify-between text-left relative md:hover:-translate-y-2 md:hover:shadow-2xl hover:border-slate-300 transition-all duration-300 w-[74vw] md:w-auto min-w-[230px] max-w-[270px] md:max-w-[380px] shrink-0 md:shrink snap-align-center md:snap-align-none snap-always" id="tier-commercial">
              <div className="space-y-4 md:space-y-6">
                
                {/* Bullet item header */}
                <div className="flex items-center gap-2 pb-3 md:pb-4 border-b border-slate-100">
                  <span className="p-1.5 md:p-2 bg-slate-100 rounded-xl">
                    <Leaf className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-700" />
                  </span>
                  <span className="font-bold uppercase text-[10px] md:text-xs tracking-wider text-[#0a0e1a]">COMMERCIAL</span>
                </div>

                <div className="space-y-1 md:space-y-2">
                  <span className="text-3xl md:text-4xl font-extrabold text-[#0a0e1a] font-mono">$79</span>
                  <span className="text-[10px] md:text-xs text-slate-400 block uppercase font-bold tracking-widest">/ Month</span>
                </div>

                <ul className="space-y-2.5 md:space-y-3 text-[11px] md:text-xs text-slate-600 block pl-0.5">
                  <li className="flex items-center gap-1.5 md:gap-2">
                    <span className="text-[#b9e230] font-extrabold text-[11px] md:text-xs">✓</span>
                    Weekly Deep Disinfection
                  </li>
                  <li className="flex items-center gap-1.5 md:gap-2">
                    <span className="text-[#b9e230] font-extrabold text-[11px] md:text-xs">✓</span>
                    6 Working Hours Per Day
                  </li>
                  <li className="flex items-center gap-1.5 md:gap-2">
                    <span className="text-[#b9e230] font-extrabold text-[11px] md:text-xs">✓</span>
                    Full Space Observation
                  </li>
                  <li className="flex items-center gap-1.5 md:gap-2">
                    <span className="text-[#b9e230] font-extrabold text-[11px] md:text-xs">✓</span>
                    Commercial Certifications
                  </li>
                </ul>

              </div>

              <button
                onClick={() => setQuoteModalOpen(true)}
                className="mt-6 md:mt-8 w-full bg-slate-900 text-white font-bold py-2.5 md:py-3.5 px-4 rounded-full text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-[#b9e230] hover:text-slate-950 transition-all duration-300 cursor-pointer border border-[#0a0e1a]/10"
              >
                Choose Package
              </button>
            </div>

          </div>

          {/* Navigation Indicators for pricing swipe on mobile */}
          <div className="flex md:hidden justify-center items-center gap-2 mt-6" id="pricing-swipe-dots">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => scrollPricingTo(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                  activePricingIndex === idx ? 'w-5 bg-[#b9e230]' : 'w-1.5 bg-slate-200/90 hover:bg-slate-300'
                }`}
                aria-label={`Go to pricing tier ${idx + 1}`}
                type="button"
              />
            ))}
          </div>

        </section>

        {/* LARGE VIDEO FEATURE SECTION */}
        <section className="py-12 md:py-16" id="video-showcase">
          <div className="text-center max-w-4xl mx-auto mb-12 space-y-3">
            <h2 className="text-3xl sm:text-6xl font-[#0a0e1a] font-black uppercase tracking-tighter leading-none sm:leading-[1.05]">
              OUR BEST <span className="font-serif italic font-light lowercase">cleaning</span> SERVICES
            </h2>
          </div>

          <div className="relative rounded-[2.5rem] overflow-hidden group shadow-md" id="highlight-video-card">
            <img
              src="https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=1200"
              alt="Professional vacuumer"
              referrerPolicy="no-referrer"
              className="w-full h-[220px] sm:h-[300px] md:h-[520px] object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-[#0a0e1a]/25 backdrop-blur-[1px] flex items-center justify-center">
              
              {/* Play trigger button layout */}
              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all outline-none border border-white/50 cursor-pointer shadow-lg animate-pulse"
              >
                <Play className="w-5 h-5 md:w-8 md:h-8 text-slate-950 fill-slate-950 ml-1 md:ml-1.5" />
              </button>

            </div>
          </div>
        </section>

        {/* WHAT THEY SAY / CUSTOM TESTIMONIAL SLIDER */}
        <ReviewSlider />


        {/* FAQS COLUMN ACCORDION */}
        <FAQSection />

        {/* CUSTOM CONTACT US SECTION */}
        <ContactUs />

      </main>

      {/* FOOTER SECTION: EXTREME PREMIUM REDESIGN WITH HUGE BG WORDS */}
      <footer className="bg-black text-white pt-16 pb-8 relative overflow-hidden" id="site-footer">
        
        {/* Subtle grid pattern layer */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          
          {/* Centered horizontal line with circular social media links */}
          <div className="relative w-full py-8 mb-4">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/10 z-0"></div>
            <div className="relative z-10 flex justify-center gap-5 bg-black px-8 w-fit mx-auto">
              <a 
                href="#" 
                className="w-12 h-12 rounded-full border border-white/20 hover:border-[#b9e230] text-white hover:text-slate-950 hover:bg-[#b9e230] flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                title="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 rounded-full border border-white/20 hover:border-[#b9e230] text-white hover:text-slate-950 hover:bg-[#b9e230] flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                title="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 rounded-full border border-white/20 hover:border-[#b9e230] text-white hover:text-slate-950 hover:bg-[#b9e230] flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                title="Behance"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M8.228 15.01c0 .412-.056.784-.168 1.117-.112.333-.276.608-.492.825a1.986 1.986 0 0 1-.777.492c-.31.117-.674.175-1.092.175H2.571v-5.235h3.078c.412 0 .77.056 1.074.168.303.112.559.278.767.498.208.22.364.494.469.822.105.328.157.683.157 1.066s-.052.738-.157 1.065a2.534 2.534 0 0 1-.469.822c-.208.22-.464.386-.767.498zm-1.849-5.918c0 .356-.05.679-.151.968-.1.289-.25.53-.448.721a1.94 1.94 0 0 1-.703.435c-.282.1-.611.151-.986.151H2.571V8.048H5.16c.381 0 .717.052.998.157.281.105.518.256.711.454.193.198.339.444.437.738.098.294.147.625.147.994v.701zm11.121 4.701c-.139.467-.358.857-.655 1.171-.298.314-.664.551-1.1.711-.435.16-.928.24-1.478.24-.604 0-1.144-.105-1.618-.314a3.834 3.834 0 0 1-1.251-.837c-.352-.35-.615-.783-.79-1.299-.175-.516-.262-1.082-.262-1.698s.092-1.189.275-1.705c.183-.516.452-.953.805-1.311.353-.358.774-.633 1.264-.825.49-.193 1.026-.289 1.607-.289.58 0 1.099.094 1.558.281.459.188.847.456 1.164.805.317.349.559.775.727 1.277.168.502.251 1.065.251 1.689v.498h-7.14c.018.423.093.791.226 1.103.133.313.315.568.547.767s.501.344.807.435c.306.091.632.137.978.137.498 0 .903-.105 1.215-.314.312-.209.525-.544.639-1.006h1.263zm-.968-3.003c-.012-.401-.082-.746-.209-1.036-.127-.291-.303-.526-.526-.707a2.022 2.022 0 0 0-.756-.39c-.294-.084-.614-.126-.957-.126-.356 0-.679.044-.969.131a1.97 1.97 0 0 0-.738.384 2.11 2.11 0 0 0-.498.663c-.126.26-.201.583-.225.968h4.878zM14.07 5.617h4.86v1.074h-4.86V5.617z" />
                </svg>
              </a>
              <a 
                href="#" 
                className="w-12 h-12 rounded-full border border-white/20 hover:border-[#b9e230] text-white hover:text-slate-950 hover:bg-[#b9e230] flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                title="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Row of Details: Disclaimer | Designer */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-10 pb-4 text-center text-xs tracking-[0.1em] font-sans">
            <div className="font-extrabold uppercase text-[#ffffff60] text-[10px] sm:text-xs">
              &copy; CLEANING. ALL RIGHTS RESERVED.
            </div>
            <div className="font-extrabold uppercase text-[#ffffff60] text-[10px] sm:text-xs">
              DESIGN BY{' '}
              <a 
                href="https://uglyfox.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors text-[#b9e230] underline decoration-[#b9e230]/20 underline-offset-4"
              >
                UGLYFOX.IN
              </a>
            </div>
          </div>

        </div>

      </footer>

      {/* WATCH VIDEO MODAL POPUP */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0a0e1a]/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in" onClick={() => setVideoModalOpen(false)}>
          <div className="relative w-full max-w-3xl bg-slate-950 rounded-2xl md:rounded-[2rem] overflow-hidden p-1 sm:p-2 border border-white/10 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-3 right-3 md:top-4 md:right-4 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-slate-800 transition-colors cursor-pointer border border-white/15"
              aria-label="Close modal"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="aspect-auto md:aspect-video w-full min-h-[300px] md:min-h-0 py-10 md:py-0 bg-black rounded-xl md:rounded-[1.5rem] overflow-hidden flex items-center justify-center relative">
              {/* Embed an instructive high quality looping video placeholder or elegant graphic */}
              <img
                src="https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=1200"
                alt="Video Loop placeholder"
                className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[2px] md:blur-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/50" />
              <div className="relative text-center px-5 sm:px-8 py-2.5 space-y-3 md:space-y-5 max-w-xl z-10">
                <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#b9e230] text-slate-950 flex items-center justify-center mx-auto shadow-lg hover:scale-110 active:scale-95 transition-transform duration-300 cursor-pointer">
                  <Play className="w-4 h-4 md:w-5 md:h-5 text-slate-950 fill-slate-950 ml-0.5" />
                </span>
                <div className="space-y-2">
                  <h4 className="text-[11px] sm:text-xs md:text-lg font-black uppercase text-white tracking-widest leading-tight sm:leading-relaxed">
                    CLEANING STANDARD OPERATING PROCEDURE
                  </h4>
                  <p className="text-[10px] sm:text-xs text-slate-300 leading-normal sm:leading-relaxed select-none font-medium text-center balance">
                    "Our professional cleaning specialists utilize plant-derived sanitizers, clean microfiber standards, and double-HEPA filtration to maintain optimal, safe indoor atmospheres."
                  </p>
                </div>
                <button
                  onClick={() => setVideoModalOpen(false)}
                  className="px-5 py-2 md:px-6 md:py-2.5 bg-white text-slate-900 font-extrabold text-[8px] md:text-[9px] uppercase tracking-widest rounded-full hover:bg-slate-100 transition-all cursor-pointer shadow-sm hover:shadow active:scale-95 duration-200"
                >
                  Close Demonstration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GORGEOUS ESTIMATE/QUOTE POPUP MODAL */}
      {quoteModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-[#0a0e1a]/55 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in" 
          onClick={() => setQuoteModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-[480px] bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-300 transform scale-100 border border-slate-100" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close icon button */}
            <button
              onClick={() => setQuoteModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 hover:scale-110 active:scale-95 transition-all cursor-pointer p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {quoteSuccessMsg ? (
              <div className="text-center py-10 space-y-5 animate-fade-in">
                <div className="w-16 h-16 bg-[#b9e230]/20 rounded-full flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-black uppercase text-[#0a0e1a] tracking-tight">Request Received</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {quoteSuccessMsg}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setQuoteModalOpen(false)}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-full cursor-pointer transition-colors"
                  >
                    Back to browse
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-8">
                
                {/* Header content matching layout screenshot */}
                <div className="text-center space-y-2">
                  <h3 className="text-3xl sm:text-4xl text-[#0a0e1a] font-light leading-none font-serif italic" style={{ fontFamily: 'var(--font-serif, serif)' }}>
                    Request an accurate estimate
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-sm mx-auto">
                    Give new life to your sofa, mattress and carpets
                  </p>
                </div>

                {/* Form fields */}
                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-xs font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all shadow-3xs"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Phone number"
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-xs font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all shadow-3xs"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-xs font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all shadow-3xs"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Zip code"
                      value={quoteForm.zip}
                      onChange={(e) => setQuoteForm({ ...quoteForm, zip: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-xs font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all shadow-3xs"
                    />
                  </div>
                </div>

                {/* GET A FREE QUOTE CTA Button matching the yellow screenshot */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#b9e230] hover:bg-[#a7cc26] text-slate-950 font-black text-xs uppercase tracking-widest py-4 px-6 rounded-full transition-all duration-200 shadow-sm border border-slate-950/10 cursor-pointer transform active:scale-98"
                  >
                    Get a Free Quote
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>
      )}

      {/* Floating Scroll up Button of Lime Green Color */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#b9e230] hover:bg-slate-900 text-slate-950 hover:text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border border-[#b9e230]/20"
          title="Scroll to Top"
          aria-label="Scroll to Top"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}

    </div>
  );
}
