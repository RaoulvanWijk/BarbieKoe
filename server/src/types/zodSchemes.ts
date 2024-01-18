import { z } from "zod";

export const loginSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Wachtwoord is minimaal 6 karakters lang" }),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export const bookingSchema = z.object({
  house_number: z.string().nullable(),
  city: z.string().nullable(),
  country: z.string().nullable(),
  streetname: z.string().nullable(),
  zipcode: z.string().nullable(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().email().nullable(),
  // Jammer maar wel waar, niet iedereen heeft een naam, adres email etc etc...
  arrival: z.coerce.date({
    required_error: "Selecteer alstublieft een datum en tijd",
  }),
  departure: z.coerce.date({
    required_error: "Selecteer alstublieft een datum en tijd",
  }),
  // ARRIVAL EN DEPARTURE KRIJGEN ISO STRINGS: 2023-01-10T00:00:00.000Z, MYSQL VERANDERT HET AUTOMATISCH NAAR DATETIME
  adult: z.number().nonnegative({
    message: "Aantal volwassenen moet een nummer zijn en niet negatief",
  }),
  child: z.number().nonnegative({
    message: "Aantal kinderen moet een nummer zijn en niet negatief",
  }),
  young_child: z.number().nonnegative({
    message: "Aantal jonge kinderen moet een nummer zijn en niet negatief",
  }),
  booking_status: z.boolean({
    required_error: "Booking status is vereist",
    invalid_type_error: "Booking status moet een boolean zijn",
  }),
  notes: z.string().nullable(),
  license_plate: z.string().nullable(),
  car_status: z.boolean({
    required_error: "Auto status is vereist",
    invalid_type_error: "car_status moet een boolean zijn",
  }),
  // Kenteken kan wel nullable zijn maar MySQL wilt een boolean waarde in car status tabel, gewoon op 0 zetten.
  camping_spot_id: z
    .number()
    .min(1, { message: "Camping spot id moet minimaal 1 zijn" }),
});

export type TBookingSchema = z.infer<typeof bookingSchema>;

export const createAccommodationsSchema = z.object({
  accommodation_type: z.string().min(1, {
    message: "Accommodatie type moet minimaal één karakter bevatten",
  }),
  description_note: z.string().nullable(),
  cost: z.number().min(0, { message: "Kosten kunnen niet negatief zijn." }),
});

export type TCreateAccommodationsSchema = z.infer<
  typeof createAccommodationsSchema
>;

export const createCostGuestSchema = z.object({
  person_type: z
    .string()
    .min(1, { message: "Een persoon type moet minimaal één karakter zijn" }),
  cost: z.number().min(0, { message: "Kosten kunnen niet negatief zijn." }),
});

export type TCreateCostGuestSchema = z.infer<typeof createCostGuestSchema>;

export const createCampingSpots = z.object({
  accommodations_id: z.number(),
  spot_name: z
    .string()
    .min(1, { message: "Spot naam moet minimaal 1 karakter lang zijn" }),
  spot_status: z.boolean(),
  notes: z.string().nullable(),
});

export type TCreateCampingSpots = z.infer<typeof createCampingSpots>;
