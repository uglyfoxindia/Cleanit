import React, { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, ShieldCheck, Sparkles, ExternalLink, Navigation } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    }, 1000);
  };

  const mapIframeUrl = "https://maps.google.com/maps?q=Marietta,%20GA%2030060&t=&z=14&ie=UTF8&iwloc=&output=embed";
  const externalMapUrl = "https://www.google.com/maps/place/Marietta,+GA+30060/@33.952602,-84.549933,14z";

  return (
    <section id="contact-section" className="py-16 md:py-24 bg-transparent border-t border-slate-150">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header elements that align with FAQs & Reviews */}
        <div className="text-center mb-12 space-y-3">
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#0a0e1a]/60 bg-[#b9e230]/20 border border-[#b9e230]/30 px-3 py-1 rounded-full">
            <Sparkles className="w-3 h-3 text-slate-800" />
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-6xl font-black uppercase tracking-tighter text-[#0a0e1a] leading-none sm:leading-[1.05]">
            CONTACT <span className="font-serif italic font-light lowercase text-slate-800">our team</span>
          </h2>
          <p className="mt-3 text-xs md:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Have any questions or need custom quotes? Our team in Marietta is active and ready to assist you.
          </p>
        </div>

        {/* Desktop 2-Column Layout (Form on Left, Google Map on Right) */}
        <div className="hidden sm:grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-3xs relative overflow-hidden h-full flex flex-col justify-center">
              
              {isSubmitted ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-16 h-16 bg-[#b9e230]/20 border border-[#b9e230]/40 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <ShieldCheck className="w-8 h-8 text-slate-900" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-black uppercase text-[#0a0e1a] tracking-tight">
                      Inquiry Received
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out! A SupremeShine specialist has been dispatched to review your request and will contact you within 2 hours.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-805 text-white font-extrabold text-[9px] uppercase tracking-wider rounded-full cursor-pointer transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  
                  {/* Visual form details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block ml-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 focus:bg-white transition-all shadow-3xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block ml-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 focus:bg-white transition-all shadow-3xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 focus:bg-white transition-all shadow-3xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block ml-1">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your space size, frequency of cleaning, or custom request details..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 focus:bg-white transition-all shadow-3xs resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-900 hover:bg-[#b9e230] text-white hover:text-slate-950 font-black py-4 px-6 rounded-full text-[10px] uppercase tracking-widest transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin mr-1"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

          {/* Right Column: Google Map */}
          <div className="lg:col-span-6 h-full min-h-[480px] relative">
            <div className="w-full h-full rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 relative group shadow-3xs">
              
              {/* Floating Google Maps Card Overlay */}
              <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded-xl shadow-md border border-slate-100 max-w-[260px] text-left">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold text-[#0a0e1a] tracking-tight">30060</h3>
                    <p className="text-[10px] text-slate-500 font-medium">Marietta, GA 30060, USA</p>
                    <p className="text-[9px] text-slate-400 font-bold block pt-1">No reviews</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a 
                      href={externalMapUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-1.5 text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg transition-all border border-slate-100"
                      title="Open in Google Maps"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a 
                      href={externalMapUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-1.5 text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-sm transition-all"
                      title="Get Directions"
                    >
                      <Navigation className="w-3.5 h-3.5 fill-current" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Iframe Google Map embed centered on Marietta, GA */}
              <iframe 
                src={mapIframeUrl}
                className="w-full h-full border-0 rounded-2xl" 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer"
              />

            </div>
          </div>

        </div>

        {/* Mobile Contact Info Cards & Map (seen ONLY on mobile viewports) */}
        <div className="block sm:hidden max-w-sm mx-auto space-y-4">
          
          {/* Phone Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4 text-left shadow-3xs hover:border-slate-300 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#b9e230]/10 flex items-center justify-center shrink-0 border border-[#b9e230]/20">
              <Phone className="w-4 h-4 text-slate-900" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Call Us</span>
              <a href="tel:+15552345678" className="text-sm font-black text-[#0a0e1a] hover:text-[#b9e230] transition-colors">
                +1 (555) 234-5678
              </a>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4 text-left shadow-3xs hover:border-slate-300 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#b9e230]/10 flex items-center justify-center shrink-0 border border-[#b9e230]/20">
              <Mail className="w-4 h-4 text-slate-900" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Write Us</span>
              <a href="mailto:support@cleanit.com" className="text-sm font-black text-[#0a0e1a] hover:text-[#b9e230] transition-colors">
                support@cleanit.com
              </a>
            </div>
          </div>

          {/* Address Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4 text-left shadow-3xs hover:border-slate-300 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#b9e230]/10 flex items-center justify-center shrink-0 border border-[#b9e230]/20">
              <MapPin className="w-4 h-4 text-slate-900" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Visit Us</span>
              <span className="text-sm font-black text-[#0a0e1a] block">
                Marietta, GA 30060, USA
              </span>
            </div>
          </div>

          {/* Map block embedded on mobile right below cards */}
          <div className="relative w-full h-[260px] rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 mt-6 shadow-3xs">
            
            {/* Minimal Mobile Map Location Floating Badge */}
            <div className="absolute top-2.5 left-2.5 z-10 bg-white/95 backdrop-blur-xs px-3 py-2 rounded-xl shadow-md border border-slate-150 flex items-center justify-between gap-3 text-left max-w-[210px]">
              <div className="space-y-0.5">
                <h4 className="text-xs font-black text-[#0a0e1a]">30060</h4>
                <p className="text-[8px] text-slate-500 font-bold uppercase tracking-tight">Marietta, GA, USA</p>
              </div>
              <a 
                href={externalMapUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-1 text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all"
              >
                <Navigation className="w-3.5 h-3.5 fill-current" />
              </a>
            </div>

            <iframe 
              src={mapIframeUrl}
              className="w-full h-full border-0 rounded-2xl" 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer"
            />

          </div>

        </div>

        {/* Small desktop-only footer metadata contacts row */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-slate-100 max-w-2xl mx-auto text-center font-medium">
          <div className="space-y-1">
            <span className="text-[8px] font-black uppercase text-slate-400 tracking-wider block">Call Us</span>
            <a href="tel:+15552345678" className="text-xs font-black text-slate-900 hover:text-[#b9e230] transition-colors">
              +1 (555) 234-5678
            </a>
          </div>
          <div className="space-y-1">
            <span className="text-[8px] font-black uppercase text-slate-400 tracking-wider block">Write Us</span>
            <a href="mailto:support@cleanit.com" className="text-xs font-black text-slate-900 hover:text-[#b9e230] transition-colors">
              support@cleanit.com
            </a>
          </div>
          <div className="space-y-1">
            <span className="text-[8px] font-black uppercase text-slate-400 tracking-wider block">Visit Us</span>
            <span className="text-xs font-black text-slate-900">
              Marietta, GA 30060, USA
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
