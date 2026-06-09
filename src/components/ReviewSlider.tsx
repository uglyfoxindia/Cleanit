import React, { useRef, useEffect, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Settings, X, RefreshCw, CheckCircle2, Plus, Trash2, Sliders } from 'lucide-react';

interface GoogleReviewData {
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  text: string;
  relative_time_description?: string;
}

const DEFAULT_REVIEWS: GoogleReviewData[] = [
  {
    author_name: "Sarah Jenkins",
    profile_photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250",
    rating: 5,
    text: "Absolutely spotless service. The deep cleaning team completely transformed our office, turning a dusty renovation site into a sterile, pristine sanctuary. The attention to detail is remarkable.",
    relative_time_description: "1 week ago"
  },
  {
    author_name: "David Chen",
    profile_photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250",
    rating: 5,
    text: "Our creative space needs to reflect our standards. Cleanit maintains a spotless level of precision, speed, and safety. Being able to trust them is an absolute superpower for our brand.",
    relative_time_description: "2 weeks ago"
  },
  {
    author_name: "Elena Rodriguez",
    profile_photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250",
    rating: 5,
    text: "We stopped negotiating with unreliable agencies and moved our facilities cleaning entirely to Cleanit. The execution is tailor-made to perfection every single visit.",
    relative_time_description: "1 month ago"
  },
  {
    author_name: "Marcus Sterling",
    profile_photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250",
    rating: 5,
    text: "Professional, vetted, and incredibly thorough. Their organic, allergen-free sanitizers are phenomenal and completely safe for our pet-friendly residence.",
    relative_time_description: "2 months ago"
  }
];

export default function ReviewSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Google integration states
  const [customKey, setCustomKey] = useState(() => localStorage.getItem('google_places_api_key') || '');
  const [placeId, setPlaceId] = useState(() => localStorage.getItem('google_place_id') || '');
  const [isConnected, setIsConnected] = useState(() => localStorage.getItem('google_reviews_connected') === 'true');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  // Settings active tab: 'direct' or 'api'
  const [activeTab, setActiveTab] = useState<'direct' | 'api'>('direct');

  // Custom reviews state
  const [customReviews, setCustomReviews] = useState<GoogleReviewData[]>(() => {
    const saved = localStorage.getItem('custom_imported_reviews');
    return saved ? JSON.parse(saved) : [];
  });

  // Compiled active reviews block
  const [reviews, setReviews] = useState<GoogleReviewData[]>([]);

  // Import form states
  const [importForm, setImportForm] = useState({
    author_name: '',
    rating: 5,
    text: '',
    relative_time_description: 'Just now'
  });

  // Calculate final dynamic list to display
  useEffect(() => {
    if (isConnected && placeId) {
      // Fetch live dynamic Google API reviews
      fetchGoogleReviews(placeId, customKey);
    } else {
      // Default merged with any custom-imported user reviews
      setReviews([...customReviews, ...DEFAULT_REVIEWS]);
    }
  }, [isConnected, placeId, customReviews]);

  const [isHovered, setIsHovered] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // Set initial scroll position to the middle copy
  useEffect(() => {
    if (containerRef.current && reviews.length > 0) {
      const el = containerRef.current;
      const timer = setTimeout(() => {
        el.scrollLeft = el.scrollWidth / 3;
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [reviews.length]);

  // Autoplay loop continuous sliding effect
  useEffect(() => {
    if (isMobile) return;
    let animationFrameId: number;
    const el = containerRef.current;
    if (!el || reviews.length === 0) return;

    const continuousPlay = () => {
      if (!isDragging && !isHovered && !isNavigating && containerRef.current) {
        containerRef.current.scrollLeft += 0.65; // ultra smooth slow slide crawl
      }
      animationFrameId = requestAnimationFrame(continuousPlay);
    };

    animationFrameId = requestAnimationFrame(continuousPlay);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging, isHovered, isNavigating, reviews.length, isMobile]);

  // Infinite seamless wrap-around logic
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (!el) return;

    // Track active index specifically on mobile via scroll position
    if (isMobile && reviews.length > 0) {
      const sLeft = el.scrollLeft;
      const width = el.clientWidth;
      if (width > 0) {
        const approxCardWidth = width * 0.74;
        const currentSliceIndex = Math.round(sLeft / approxCardWidth);
        const activeIdx = currentSliceIndex % reviews.length;
        setActiveMobileIndex(activeIdx || 0);
      }
      return;
    }

    const oneThird = el.scrollWidth / 3;
    if (el.scrollLeft < 15) {
      el.scrollLeft += oneThird;
    } else if (el.scrollLeft >= oneThird * 2 - 10) {
      el.scrollLeft -= oneThird;
    }
  };

  const scrollMobileTo = (index: number) => {
    if (containerRef.current && reviews.length > 0) {
      const grid = containerRef.current;
      const targetIndex = reviews.length + index;
      const cards = grid.querySelectorAll('[id^="review-card-"]');
      if (cards && cards[targetIndex]) {
        cards[targetIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
        setActiveMobileIndex(index);
      }
    }
  };

  // Google Maps SDK Dynamic Fetch
  const fetchGoogleReviews = (pId: string, customApiKey?: string) => {
    const key = customApiKey || process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
    if (!pId) return;
    setIsLoading(true);
    setErrorMsg('');

    // Dynamically load Google Maps script if not loaded
    const scriptId = 'google-maps-places-loader';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    const performFetch = () => {
      try {
        const dummyNode = document.createElement('div');
        const service = new (window as any).google.maps.places.PlacesService(dummyNode);
        
        service.getDetails({
          placeId: pId,
          fields: ['reviews', 'rating', 'name']
        }, (place, status) => {
          setIsLoading(false);
          if (status === (window as any).google.maps.places.PlacesServiceStatus.OK && place) {
            if (place.reviews && place.reviews.length > 0) {
              const mapped: GoogleReviewData[] = place.reviews.map(r => ({
                author_name: r.author_name,
                profile_photo_url: r.profile_photo_url,
                rating: r.rating || 5,
                text: r.text || '',
                relative_time_description: r.relative_time_description
              }));
              // Merge custom imported with Google API results beautifully
              setReviews([...customReviews, ...mapped]);
              setIsConnected(true);
              localStorage.setItem('google_place_id', pId);
              if (customApiKey) localStorage.setItem('google_places_api_key', customApiKey);
              localStorage.setItem('google_reviews_connected', 'true');
            } else {
              setErrorMsg('No reviews found for this Google Place.');
            }
          } else {
            setErrorMsg(`Google Places API error: ${status}. Check key & ID.`);
          }
        });
      } catch (err: any) {
        setIsLoading(false);
        setErrorMsg('Places SDK initialized incorrectly. Please check if your API key matches.');
      }
    };

    if ((window as any).google?.maps?.places) {
      performFetch();
    } else {
      script.onload = () => {
        performFetch();
      };
      script.onerror = () => {
        setIsLoading(false);
        setErrorMsg('Failed to load Google Maps script. Check your internet connection or API settings.');
      };
    }
  };

  // Custom Keyless review creation handler
  const handleAddCustomReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importForm.author_name.trim() || !importForm.text.trim()) return;

    const newReview: GoogleReviewData = {
      author_name: importForm.author_name,
      rating: importForm.rating,
      text: importForm.text,
      relative_time_description: importForm.relative_time_description || 'Verified Customer',
      profile_photo_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(importForm.author_name)}`
    };

    const updated = [newReview, ...customReviews];
    setCustomReviews(updated);
    localStorage.setItem('custom_imported_reviews', JSON.stringify(updated));
    
    // Reset fields
    setImportForm({
      author_name: '',
      rating: 5,
      text: '',
      relative_time_description: 'Just now'
    });
  };

  const handleDeleteCustomReview = (indexToDelete: number) => {
    const updated = customReviews.filter((_, idx) => idx !== indexToDelete);
    setCustomReviews(updated);
    localStorage.setItem('custom_imported_reviews', JSON.stringify(updated));
  };

  // Mouse drag handlers to scroll the track on desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    e.preventDefault(); // Stop native text selection or ghost card dragging from blocking scroll
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed modifier
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Arrow button navigation
  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    setIsNavigating(true);
    const scrollAmount = 390;
    containerRef.current.scrollTo({
      left: containerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
      behavior: 'smooth'
    });

    // Momentarily disable continuous autoscrolling so smooth browser sliding finishes
    setTimeout(() => {
      setIsNavigating(false);
    }, 1200);
  };

  // Turn off API connection
  const disconnectGoogle = () => {
    localStorage.removeItem('google_place_id');
    localStorage.removeItem('google_places_api_key');
    localStorage.removeItem('google_reviews_connected');
    setPlaceId('');
    setCustomKey('');
    setIsConnected(false);
  };

  return (
    <section 
      className="py-12 md:py-24 bg-slate-50 relative overflow-hidden" 
      id="custom-client-success"
    >

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Dynamic Section Header mimicking screenshot design */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="space-y-3 md:space-y-4">
            <h2 
              className="text-3xl sm:text-5xl font-black uppercase text-[#0a0e1a] tracking-tighter leading-none cursor-default select-none mt-2"
              onDoubleClick={() => setSettingsOpen(true)}
              title="Double click to configure reviews"
            >
              CLIENT <span className="font-serif italic font-light lowercase">success</span>
            </h2>
            <p className="text-xs md:text-base text-slate-500 max-w-xl font-medium leading-relaxed">
              Real reviews from local residents and business owners. Seamless interactive mobile swipe.
            </p>
          </div>
        </div>

        {/* Mobile swipe helper header for Testimonials */}
        <div className="flex items-center justify-between md:hidden mb-4 px-1" id="reviews-swipe-guide">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#0a0e1a]/40">Testimonials</span>
          <div className="flex items-center gap-1 text-[10px] font-black text-slate-800 uppercase tracking-wider bg-[#b9e230] px-2.5 py-1 rounded-full shadow-4xs animate-pulse">
            <span>Swipe</span>
            <span className="animate-bounce">⮕</span>
          </div>
        </div>
 
        {/* Swipeable Track with Fading Overlays */}
        <div className="relative w-full overflow-hidden py-4">
          <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
 
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onScroll={handleScroll}
            className={`flex gap-5 md:gap-6 overflow-x-auto py-4 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} scrollbar-none snap-x snap-mandatory md:snap-none`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[...reviews, ...reviews, ...reviews].map((rev, index) => {
              const origIndex = index % reviews.length;
              const isCustom = origIndex < customReviews.length && !isConnected;
              
              return (
                <div
                  key={index}
                  id={`review-card-${index}`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="w-[74vw] md:w-auto min-w-[230px] max-w-[270px] md:max-w-[380px] bg-white rounded-2xl md:rounded-3xl p-4 md:p-8 border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group select-none cursor-grab active:cursor-grabbing shrink-0 md:shrink snap-align-center md:snap-align-none snap-always"
                >
                  <div className="space-y-4 md:space-y-6">
                    
                    {/* Gold star display */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                             key={i}
                            className={`w-3 h-3 md:w-4 md:h-4 ${i < Math.round(rev.rating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-200'}`}
                          />
                        ))}
                      </div>

                      {/* Manual badge indicator for custom imported ones */}
                      {isCustom && (
                        <span className="text-[7px] md:text-[8px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-1.5 py-0.5 rounded font-extrabold tracking-widest uppercase">
                          IMPORTED
                        </span>
                      )}
                    </div>

                    {/* Review Text block */}
                    <p className="text-[11px] md:text-sm text-slate-500 font-normal leading-relaxed line-clamp-4 md:line-clamp-5">
                      "{rev.text}"
                    </p>

                  </div>

                  {/* Verified Author detail row */}
                  <div className="flex items-center gap-2.5 md:gap-3.5 pt-3 md:pt-6 border-t border-slate-100 mt-4 md:mt-6 select-none">
                    {rev.profile_photo_url ? (
                      <img
                        src={rev.profile_photo_url}
                        alt={rev.author_name}
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 md:w-10 md:h-10 object-cover rounded-full border border-slate-100 placeholder:bg-slate-100"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(rev.author_name)}`;
                        }}
                      />
                    ) : (
                      <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-slate-100 flex items-center justify-center text-[9px] md:text-xs font-bold text-slate-500 uppercase">
                        {rev.author_name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="text-[10px] md:text-xs font-bold text-slate-900 tracking-wide leading-tight">
                        {rev.author_name}
                      </h4>
                      <span className="text-[8px] md:text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mt-0.5">
                        {rev.relative_time_description || 'Verified Customer'}
                      </span>
                    </div>

                    {/* Google Maps verify logo */}
                    <span className="ml-auto text-[7px] md:text-[9px] font-black tracking-widest text-[#4285F4] font-sans uppercase">Google</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Centered navigation slider buttons - Only shown on Desktop */}
        <div className="hidden md:flex items-center justify-center gap-3 mt-10">
          <button
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full bg-[#b9e230] hover:bg-slate-900 text-slate-950 hover:text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-md"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full bg-[#b9e230] hover:bg-slate-900 text-slate-950 hover:text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-md"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots slider indicators - Only shown on Mobile */}
        <div className="flex md:hidden justify-center items-center gap-2 mt-2" id="reviews-swipe-dots">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollMobileTo(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                activeMobileIndex % reviews.length === idx ? 'w-5 bg-[#b9e230]' : 'w-1.5 bg-slate-350 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
              type="button"
            />
          ))}
        </div>

      </div>

      {/* MODAL DRAWER/POPUP FOR CONNECTING GOOGLE PLACE */}
      {settingsOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0a0e1a]/45 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSettingsOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-[2rem] p-8 md:p-10 border border-slate-100 shadow-2xl relative overflow-y-auto max-h-[90vh] scrollbar-thin"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Direct Close Button */}
            <button
              onClick={() => setSettingsOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 hover:scale-110 cursor-pointer p-1 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-[9px] font-bold uppercase tracking-widest bg-slate-900 text-white px-2.5 py-1 rounded-full">
                  No API Key Setup Needed
                </span>
                <h3 className="text-2xl font-black text-[#0a0e1a] tracking-tight pt-1">
                  Import Google Map Reviews
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  Showcase real testimonials on your webpage immediately. Choose your configuration method below:
                </p>
              </div>

              {/* Segment tabs */}
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab('direct')}
                  className={`flex-1 text-center py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${activeTab === 'direct' ? 'bg-white text-slate-950 shadow-2xs' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  Direct Paste (Keyless)
                </button>
                <button
                  onClick={() => setActiveTab('api')}
                  className={`flex-1 text-center py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${activeTab === 'api' ? 'bg-white text-slate-950 shadow-2xs' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  Google SDK (API Key)
                </button>
              </div>

              {activeTab === 'direct' ? (
                <div className="space-y-6">
                  {/* Paste manual import form */}
                  <form onSubmit={handleAddCustomReview} className="space-y-4 bg-slate-50 border border-slate-150 rounded-2xl p-6">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                      Add custom real-time review
                    </h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Customer Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. John Doe"
                            value={importForm.author_name}
                            onChange={(e) => setImportForm({ ...importForm, author_name: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-slate-400 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Relative Time
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 1 week ago"
                            value={importForm.relative_time_description}
                            onChange={(e) => setImportForm({ ...importForm, relative_time_description: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-slate-400 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Star Rating
                        </label>
                        <select
                          value={importForm.rating}
                          onChange={(e) => setImportForm({ ...importForm, rating: Number(e.target.value) })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all"
                        >
                          <option value="5">★★★★★ (5 Stars)</option>
                          <option value="4">★★★★☆ (4 Stars)</option>
                          <option value="3">★★★☆☆ (3 Stars)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Review Text
                        </label>
                        <textarea
                          placeholder="Paste the genuine review text here from Google Maps..."
                          rows={3}
                          required
                          value={importForm.text}
                          onChange={(e) => setImportForm({ ...importForm, text: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 placeholder:text-slate-450 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all resize-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#b9e230] hover:bg-[#a7cc26] text-slate-950 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Import To Slider
                    </button>
                  </form>

                  {/* List of Custom Imported Reviews */}
                  {customReviews.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-805">
                          Currently Imported ({customReviews.length})
                        </h4>
                        <button
                          onClick={() => {
                            setCustomReviews([]);
                            localStorage.removeItem('custom_imported_reviews');
                          }}
                          className="text-[10px] font-extrabold text-red-500 hover:underline cursor-pointer"
                        >
                          Clear All Custom
                        </button>
                      </div>
                      <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                        {customReviews.map((item, index) => (
                          <div key={index} className="flex justify-between items-center bg-slate-50 border border-slate-100 rounded-xl p-3">
                            <div className="truncate pr-3 space-y-0.5">
                              <h5 className="text-xs font-bold text-slate-900 truncate">{item.author_name}</h5>
                              <p className="text-[10px] text-slate-450 truncate font-semibold">"{item.text}"</p>
                            </div>
                            <button
                              onClick={() => handleDeleteCustomReview(index)}
                              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <div className="space-y-4">
                  {isConnected ? (
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">SDK Connection Active</h4>
                          <p className="text-[10px] font-semibold text-slate-400 shrink truncate max-w-[240px]">
                            Place ID: {placeId}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={disconnectGoogle}
                        className="w-full text-center py-2.5 bg-red-55/15 text-red-600 hover:bg-red-50 font-extrabold text-[10px] uppercase tracking-wider rounded-xl cursor-pointer transition-colors"
                      >
                        Disconnect SDK Profile
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                          Google Place ID
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. ChIJN1t_tDeuEmsRUsoyG83OBY8"
                          value={placeId}
                          onChange={(e) => setPlaceId(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-400 transition-all"
                        />
                        <a
                          href="https://developers.google.com/maps/documentation/places/web-service/place-id"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[9px] font-extrabold text-blue-500 hover:underline block mt-1 relative z-10"
                        >
                          Find your Google Place ID &rarr;
                        </a>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                          Google Maps API Key (Optional)
                        </label>
                        <input
                          type="password"
                          placeholder="Optional Custom Developer Key"
                          value={customKey}
                          onChange={(e) => setCustomKey(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-400 transition-all"
                        />
                      </div>

                      {errorMsg && (
                        <p className="text-[10px] font-bold text-red-500 bg-red-55/10 p-3 rounded-xl leading-normal">
                          {errorMsg}
                        </p>
                      )}

                      <button
                        onClick={() => fetchGoogleReviews(placeId, customKey)}
                        disabled={isLoading || !placeId}
                        className="w-full bg-[#b9e230] disabled:bg-slate-100 disabled:text-slate-400 text-slate-950 font-black text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-3xs"
                      >
                        {isLoading ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          'Load Live SDK Reviews'
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

