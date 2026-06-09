/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../types';

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Do I have to be home during the cleaning appointment?',
    answer: 'Absolutely not! In fact, most of our clients prefer to provide dynamic lockbox codes, key handovers, or leave keys under a secure porch mat. All our staff undergo rigorous background reviews, biometric validation, and are comprehensive insured so you are in complete peace.'
  },
  {
    id: 'faq-2',
    question: 'Are cleaning supplies and dual-HEPA vacuums provided?',
    answer: 'Yes! Our cleaners arrive fully equipped with clean sanitized microfibers, specialized scrapers, plant-derived active sprayers, and industrial vacuums. If you prefer us to utilize your household specific vacuums or designated slate oils, just drop a note in the estimator access box.'
  },
  {
    id: 'faq-3',
    question: 'What is included in the Move-In / Move-Out plan?',
    answer: 'Our moveout plan is designed to satisfy strict real-estate landlord handovers. It covers interior cleaning of the oven, scrubbing the inner shelves of refrigerators and kitchen cabinets, detailed baseboard polishing, interior windows, track scrubbing, and complete disinfection of high contact points.'
  },
  {
    id: 'faq-4',
    question: 'How do you handle household dogs or indoor pets?',
    answer: 'We love furry residents! Our cleaners are trained to calmly approach domestic cats and dogs. We ask that reactive or highly sensitive animals be safely secured in a designated playroom or exterior yard during the vacuuming phases to prevent anxiety or distress.'
  },
  {
    id: 'faq-5',
    question: 'Can I cancel or reschedule my booked appointment?',
    answer: 'Yes, with complete flexibility. You can reschedule or cancel any requested cleaning up to 24 hours before the arrival window begins. There are no penalty charges, dynamic fees or surprise lock-out fine premiums.'
  }
];

export default function FAQSection() {
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  const handleToggle = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq-section" className="py-12 md:py-20 bg-transparent">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Title details */}
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl sm:text-6xl font-black uppercase tracking-tighter text-[#0a0e1a] leading-none sm:leading-[1.05]">
            FREQUENTLY ASKED LOGISTICS
          </h2>
          <p className="mt-3 text-xs text-slate-500">
            Learn more about schedules, supplies, insurance coverages, and custom requests.
          </p>
        </div>

        {/* Accordions stack */}
        <div className="space-y-4">
          {FAQS.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div 
                key={item.id} 
                id={`faq-item-${item.id}`}
                className="bg-white rounded-2xl border border-slate-200 hover:border-slate-400 transition-all shadow-3xs overflow-hidden text-left"
              >
                <button
                  type="button"
                  id={`faq-btn-${item.id}`}
                  onClick={() => handleToggle(item.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-extrabold text-slate-900 text-xs uppercase tracking-wider hover:text-slate-950 cursor-pointer"
                >
                  <span>{item.question}</span>
                  <span className="p-1.5 rounded-full bg-slate-900 text-[#b9e230] hover:scale-105 transition-transform">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {/* Animated collapse with simple height transition */}
                <div 
                  id={`faq-content-${item.id}`}
                  className={`transition-all duration-300 ease-in-out ${
                    isExpanded 
                      ? 'max-h-72 opacity-100 border-t border-slate-100' 
                      : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <p className="p-5 text-xs text-slate-550 leading-relaxed bg-[#faf8f5]/40 font-medium">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer help callout */}
        <div className="text-center mt-10">
          <p className="text-xs text-slate-500">
            Have a custom requirement or industrial commercial space proposal? 
            <br className="sm:hidden" />
            <a href="mailto:support@cleanit.com" className="text-slate-900 font-extrabold underline ml-1 hover:text-[#b9e230]">
              Drop an email to support@cleanit.com
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
