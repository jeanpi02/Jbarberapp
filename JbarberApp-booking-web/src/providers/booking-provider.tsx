"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type {
  Professional,
  Service,
  TimeSlot,
  BookingState,
} from "@/types";

interface BookingContextType {
  state: BookingState;
  setProfessional: (professional: Professional) => void;
  setService: (service: Service) => void;
  setDate: (date: Date) => void;
  setTimeSlot: (timeSlot: TimeSlot) => void;
  setCustomerInfo: (info: {
    name: string;
    phone: string;
    email: string;
    notes: string;
  }) => void;
  reset: () => void;
}

const initialState: BookingState = {
  professional: null,
  service: null,
  date: null,
  timeSlot: null,
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  notes: "",
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>(initialState);

  const setProfessional = useCallback((professional: Professional) => {
    setState((prev) => ({ ...prev, professional }));
  }, []);

  const setService = useCallback((service: Service) => {
    setState((prev) => ({ ...prev, service }));
  }, []);

  const setDate = useCallback((date: Date) => {
    setState((prev) => ({ ...prev, date }));
  }, []);

  const setTimeSlot = useCallback((timeSlot: TimeSlot) => {
    setState((prev) => ({ ...prev, timeSlot }));
  }, []);

  const setCustomerInfo = useCallback(
    (info: { name: string; phone: string; email: string; notes: string }) => {
      setState((prev) => ({
        ...prev,
        customerName: info.name,
        customerPhone: info.phone,
        customerEmail: info.email,
        notes: info.notes,
      }));
    },
    []
  );

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <BookingContext.Provider
      value={{
        state,
        setProfessional,
        setService,
        setDate,
        setTimeSlot,
        setCustomerInfo,
        reset,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
