import { useQuery } from "@tanstack/react-query";
import {
  getServices,
  getServiceById,
  getTimeSlots,
} from "@/services/booking.service";

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });
}

export function useService(id: string) {
  return useQuery({
    queryKey: ["service", id],
    queryFn: () => getServiceById(id),
    enabled: !!id,
  });
}

export function useTimeSlots(barberId: string | null, date: Date | null) {
  return useQuery({
    queryKey: ["timeSlots", barberId, date?.toISOString()],
    queryFn: () => getTimeSlots(barberId!, date!),
    enabled: !!barberId && !!date,
  });
}
