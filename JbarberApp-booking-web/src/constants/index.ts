import type { BusinessInfo, Professional, Service, TimeSlot } from "@/types";

export const BUSINESS_INFO: BusinessInfo = {
  name: "Barber King",
  address: "Calle Real 123, Madrid",
  phone: "+34 912 345 678",
  rating: 4.9,
  hours: {
    weekdays: "10:00 - 20:00",
    sunday: "Closed",
  },
  social: {
    chat: "#",
    instagram: "#",
  },
};

export const PROFESSIONALS: Professional[] = [
  {
    id: "1",
    name: "Marco",
    nickname: "The King",
    role: "Master Barber",
    rating: 5.0,
    reviewCount: 128,
    experience: 10,
    avatar:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop&crop=face",
    nextAvailable: "Today 4:00 PM",
    isFeatured: true,
  },
  {
    id: "2",
    name: "Alex",
    nickname: "Sharp",
    role: "Stylist Expert",
    rating: 4.8,
    reviewCount: 95,
    experience: 5,
    avatar:
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop&crop=face",
    nextAvailable: "Tomorrow 10:00 AM",
  },
  {
    id: "3",
    name: "Sofia",
    nickname: "Fade",
    role: "Creative Cuts",
    rating: 4.9,
    reviewCount: 112,
    experience: 7,
    avatar:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop&crop=face",
    nextAvailable: "Monday",
  },
];

export const SERVICES: Service[] = [
  {
    id: "1",
    name: "Classic Haircut",
    description:
      "Precision cut tailored to your face shape, followed by a professional styling with premium pomade.",
    duration: 45,
    price: 25,
    isPopular: true,
  },
  {
    id: "2",
    name: "Beard Trim & Shape",
    description:
      "Meticulous shaping, line-up with a straight razor, and nourishing beard oil treatment.",
    duration: 30,
    price: 15,
  },
  {
    id: "3",
    name: "The Royal Treatment",
    description:
      "The ultimate grooming experience: Full haircut, beard sculpting, and a relaxing 3-step hot towel treatment.",
    duration: 75,
    price: 45,
    isPremium: true,
  },
  {
    id: "4",
    name: "Hair Coloring",
    description:
      "Full coverage or highlights using premium organic dyes. Includes a conditioning treatment.",
    duration: 60,
    price: 40,
  },
];

export const FEATURED_SERVICES: Service[] = [
  {
    id: "f1",
    name: "Signature Cut",
    description:
      "A customized haircut including consultation, wash, and styling with premium products.",
    duration: 45,
    price: 35,
    image:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&h=400&fit=crop",
  },
  {
    id: "f2",
    name: "Royal Shave",
    description:
      "Traditional hot towel wet shave with straight razor precision and soothing facial massage.",
    duration: 45,
    price: 45,
    image:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=400&fit=crop",
  },
  {
    id: "f3",
    name: "Beard Sculpt",
    description:
      "Full beard shaping and trimming followed by premium oil treatment and steam towel.",
    duration: 30,
    price: 25,
    image:
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&h=400&fit=crop",
  },
];

export const TIME_SLOTS: TimeSlot[] = [
  { id: "ts1", time: "10:00", available: true, period: "morning" },
  { id: "ts2", time: "11:30", available: true, period: "morning" },
  { id: "ts3", time: "14:00", available: true, period: "afternoon" },
  { id: "ts4", time: "15:30", available: true, period: "afternoon" },
  { id: "ts5", time: "17:00", available: true, period: "evening" },
  { id: "ts6", time: "18:30", available: false, period: "evening" },
];

export const BOOKING_STEPS = [
  { id: 1, label: "Expert", icon: "check" as const },
  { id: 2, label: "Service", icon: "scissors" as const },
  { id: 3, label: "Time", icon: "calendar" as const },
  { id: 4, label: "Review", icon: "clipboard-check" as const },
] as const;
