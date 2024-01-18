import { Express, Router } from "express";
import conn, { query } from "../lib/db";
import {
  TBookingSchema,
  bookingSchema,
  TCreateAccommodationsSchema,
  createAccommodationsSchema,
  TCreateCostGuestSchema,
  createCostGuestSchema,
  TCreateCampingSpots,
  createCampingSpots,
} from "../types/zodSchemes";
const router = Router();

// Alle API endpoints voor het maken van data m.b.t. reserveringen

router.post("/createBooking", async (req, res) => {
  const validateResult = bookingSchema.safeParse(req.body);
  if (!validateResult.success) {
    res.status(400).send(validateResult.error.message);
    return;
  }

  const {
    house_number,
    city,
    country,
    streetname,
    zipcode,
    first_name,
    last_name,
    phone,
    email,
    arrival,
    departure,
    adult,
    child,
    young_child,
    booking_status,
    notes,
    license_plate,
    car_status,
    camping_spot_id,
  } = validateResult.data;
  const cost = adult * 20 + child * 10 + young_child * 5;

  await query(
    `
  START TRANSACTION;

  INSERT INTO address (house_number, city, country, streetname, zipcode, created_at, updated_at) VALUES (?,?,?,?,?,NOW(),NOW());

  INSERT INTO guests (address_id, first_name, last_name, phone, email, created_at, updated_at) VALUES (LAST_INSERT_ID(), ?, ?, ?, ?, NOW(), NOW());

  INSERT INTO booking (guest_id, camping_spot_id, arrival, departure, adult, child, young_child, cost, booking_status, notes, created_at, updated_at) VALUES (LAST_INSERT_ID(),?,?,?,?,?,?,?,?,?,NOW(),NOW());

  INSERT INTO cars (booking_id, license_plate, car_status, created_at, updated_at) VALUES (LAST_INSERT_ID(),?,?,NOW(),NOW());

  COMMIT;
`,
    [
      house_number,
      city,
      country,
      streetname,
      zipcode,
      first_name,
      last_name,
      phone,
      email,
      camping_spot_id,
      arrival,
      departure,
      adult,
      child,
      young_child,
      cost,
      booking_status,
      notes,
      license_plate,
      car_status,
    ]
  );

  res.status(200).send(`Succesvol een nieuw form aangemaakt.`);
  conn.end();
});

router.post("/createCostGuest", async (req, res) => {
  const validateResult = createCostGuestSchema.safeParse(req.body);
  if (!validateResult.success) {
    res.status(400).send(validateResult.error.message);
    return;
  }

  const { person_type, cost } = validateResult.data;

  await query(
    "INSERT INTO cost_guest_sort (person_type, cost, created_at, updated_at) VALUES (?,?,NOW(),NOW())",
    [person_type, cost]
  );

  res.status(200).send("Succesvol een nieuw soort gast en kosten aangemaakt");
  conn.end();
});

router.post("/createAccommodations", async (req, res) => {
  const validateResult = createAccommodationsSchema.safeParse(req.body);
  if (!validateResult.success) {
    res.status(400).send(validateResult.error.message);
    return;
  }

  const { accommodation_type, description_note, cost } = validateResult.data;

  await query(
    "INSERT INTO accommodations (accommodation_type, description_note, cost, created_at, updated_at) VALUES(?,?,?,NOW(),NOW())",
    [accommodation_type, description_note, cost]
  );

  res.status(200).send("Succesvol een nieuw accomodatie type aangemaakt");
  conn.end();
});

router.post("/createCampingSpots", async (req, res) => {
  const validateResult = createCampingSpots.safeParse(req.body);
  if (!validateResult.success) {
    res.status(400).send(validateResult.error.message);
    return;
  }

  const { accommodations_id, spot_name, spot_status, notes } =
    validateResult.data;

  await query(
    "INSERT INTO camping_spots (accommodations_id, spot_name, spot_status, notes, created_at, updated_at) VALUES(?,?,?,?,NOW(),NOW())",
    [accommodations_id, spot_name, spot_status, notes]
  );

  res.status(200).send("Succesvol een camping spot aangemaakt");
  conn.end();
});
// Einde API post endpoints m.b.t. reserveringen

module.exports = router;
