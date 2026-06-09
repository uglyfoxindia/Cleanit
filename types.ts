/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ServiceType = 'standard' | 'deep' | 'move-out' | 'eco';

export interface CleaningService {
  id: ServiceType;
  name: string;
  description: string;
  basePrice: number; // base price per bedroom
  multiplier: number; // price multiplier for total scale
  icon: string;
}

export type FrequencyType = 'one-time' | 'weekly' | 'bi-weekly' | 'monthly';

export interface FrequencyOption {
  id: FrequencyType;
  name: string;
  discount: number; // e.g. 0.15 for 15%
  description: string;
}

export interface AddOnItem {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: string;
}

export interface BookingInquiry {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  serviceType: ServiceType;
  bedrooms: number;
  bathrooms: number;
  frequency: FrequencyType;
  selectedAddOns: string[];
  preferredDate: string;
  preferredTime: string;
  notes: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  avatarLetter: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
