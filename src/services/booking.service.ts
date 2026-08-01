import type { Professional, Service, TimeSlot } from "@/types";
import { apiClient } from "@/lib/api-client";

export interface BarberResponse {
  id: string;
  name: string;
  nickname: string | null;
  role: string;
  rating: number;
  reviewCount: number;
  experience: number;
  avatar: string | null;
  bio: string | null;
  isActive: boolean;
  schedules: ScheduleResponse[];
}

export interface ScheduleResponse {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

export interface ServiceResponse {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  image: string | null;
  isPopular: boolean;
  isPremium: boolean;
  isActive: boolean;
}

export interface AvailabilityResponse {
  time: string;
  available: boolean;
}

function mapBarberToProfessional(barber: BarberResponse): Professional {
  return {
    id: barber.id,
    name: barber.name,
    nickname: barber.nickname || "",
    role: barber.role,
    rating: barber.rating,
    reviewCount: barber.reviewCount,
    experience: barber.experience,
    avatar: barber.avatar || "",
    nextAvailable: "Today",
    isFeatured: barber.rating >= 4.9,
  };
}

function mapServiceResponseToService(service: ServiceResponse): Service {
  return {
    id: service.id,
    name: service.name,
    description: service.description,
    duration: service.duration,
    price: Number(service.price),
    image: service.image || undefined,
    isPopular: service.isPopular,
    isPremium: service.isPremium,
  };
}

export async function getProfessionals(): Promise<Professional[]> {
  const { data } = await apiClient.get<BarberResponse[]>("/barbers");
  return data.map(mapBarberToProfessional);
}

export async function getProfessionalById(
  id: string
): Promise<Professional | undefined> {
  const { data } = await apiClient.get<BarberResponse>(`/barbers/${id}`);
  return mapBarberToProfessional(data);
}

export async function getServices(): Promise<Service[]> {
  const { data } = await apiClient.get<ServiceResponse[]>("/services");
  return data.map(mapServiceResponseToService);
}

export async function getServiceById(
  id: string
): Promise<Service | undefined> {
  const { data } = await apiClient.get<ServiceResponse>(`/services/${id}`);
  return mapServiceResponseToService(data);
}

export async function getTimeSlots(
  barberId: string,
  date: Date
): Promise<TimeSlot[]> {
  const dateStr = date.toISOString().split("T")[0];
  const { data } = await apiClient.get<AvailabilityResponse[]>(
    `/barbers/${barberId}/availability`,
    { params: { date: dateStr } }
  );

  return data.map((slot, index) => ({
    id: `ts-${index}`,
    time: slot.time,
    available: slot.available,
    period: getPeriod(slot.time),
  }));
}

function getPeriod(time: string): "morning" | "afternoon" | "evening" {
  const hour = parseInt(time.split(":")[0], 10);
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

export interface CreateBookingPayload {
  professionalId: string;
  serviceId: string;
  date: string;
  timeSlotId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  notes?: string;
}

export interface BookingResult {
  id: string;
  status: "confirmed";
  createdAt: string;
}

export async function createBooking(
  payload: CreateBookingPayload
): Promise<BookingResult> {
  const date = new Date(payload.date);
  const bookingDate = date.toISOString().split("T")[0];

  const { data } = await apiClient.post("/bookings", {
    barberId: payload.professionalId,
    serviceId: payload.serviceId,
    bookingDate,
    startTime: payload.timeSlotId,
    endTime: calculateEndTime(payload.timeSlotId, 45),
    customerName: payload.customerName,
    customerPhone: payload.customerPhone,
    customerEmail: payload.customerEmail,
    notes: payload.notes,
  });

  return {
    id: data.id,
    status: "confirmed",
    createdAt: data.createdAt,
  };
}

function calculateEndTime(startTime: string, durationMinutes: number): string {
  const [hours, minutes] = startTime.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const endHours = Math.floor(totalMinutes / 60);
  const endMinutes = totalMinutes % 60;
  return `${endHours.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;
}
