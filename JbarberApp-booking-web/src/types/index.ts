export interface Professional {
  id: string;
  name: string;
  nickname: string;
  role: string;
  rating: number;
  reviewCount: number;
  experience: number;
  avatar: string;
  nextAvailable: string;
  isFeatured?: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  image?: string;
  isPopular?: boolean;
  isPremium?: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  period: "morning" | "afternoon" | "evening";
}

export interface BookingState {
  professional: Professional | null;
  service: Service | null;
  date: Date | null;
  timeSlot: TimeSlot | null;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes: string;
}

export interface BookingConfirmation {
  id: string;
  professional: Professional;
  service: Service;
  date: Date;
  timeSlot: TimeSlot;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  totalPrice: number;
}

export interface BusinessInfo {
  name: string;
  address: string;
  phone: string;
  rating: number;
  hours: {
    weekdays: string;
    sunday: string;
  };
  social: {
    chat: string;
    instagram: string;
  };
}
