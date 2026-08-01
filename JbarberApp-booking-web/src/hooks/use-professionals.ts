import { useQuery } from "@tanstack/react-query";
import { getProfessionals, getProfessionalById } from "@/services/booking.service";

export function useProfessionals() {
  return useQuery({
    queryKey: ["professionals"],
    queryFn: getProfessionals,
  });
}

export function useProfessional(id: string) {
  return useQuery({
    queryKey: ["professional", id],
    queryFn: () => getProfessionalById(id),
    enabled: !!id,
  });
}
