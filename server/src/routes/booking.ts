import { Express, Router } from "express";
import conn, { query } from "../lib/db";

const router = Router();

// Alle API endpoints voor het maken van data m.b.t. reserveringen

router.post("/createBooking", async (req, res) => {
  console.log(req.body);
  const created_at = new Date().toISOString().slice(0, 19).replace("T", " ");
  const updated_at = created_at;
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
  } = req.body;

  const createAddress: any = await query(
    "INSERT INTO address (house_number, city, country, streetname, zipcode, created_at, updated_at) values (?,?,?,?,?,?,?)",
    [house_number, city, country, streetname, zipcode, created_at, updated_at]
  );

  const address_id = createAddress.insertId;

  const createGuests: any = await query(
    "INSERT INTO guests (address_id, first_name, last_name, phone, email, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [address_id, first_name, last_name, phone, email, created_at, updated_at]
  );

  const guest_id = createGuests.insertId;
  const cost = adult * 20 + child * 10 + young_child * 5;

  const createBooking: any = await query(
    "INSERT INTO booking (guest_id, camping_spot_id, arrival, departure, adult, child, young_child, cost, booking_status, notes, created_at, updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      guest_id,
      camping_spot_id,
      arrival,
      departure,
      adult,
      child,
      young_child,
      cost,
      booking_status,
      notes,
      created_at,
      updated_at,
    ]
  );

  const booking_id = createBooking.insertId;

  await query(
    "INSERT INTO cars (booking_id, license_plate, car_status, created_at, updated_at) VALUES(?,?,?,?,?)",
    [booking_id, license_plate, car_status, created_at, updated_at]
  );

  res.status(200).send(`Succesvol een nieuw form aangemaakt.`);
});

router.post("/createCostGuest", async (req, res) => {
  const created_at = new Date().toISOString().slice(0, 19).replace("T", " ");
  const updated_at = created_at;
  const { person_type, cost } = req.body;

  await query(
    "INSERT INTO cost_guest_sort (person_type, cost, created_at, updated_at) VALUES (?,?,?,?)",
    [person_type, cost, created_at, updated_at]
  );

  res.status(200).send("Succesvol een nieuw soort gast en kosten aangemaakt");
});

router.post("/createAccommodations", async (req, res) => {
  const created_at = new Date().toISOString().slice(0, 19).replace("T", " ");
  const updated_at = created_at;
  const { accommodation_type, description_note, cost } = req.body;

  await query(
    "INSERT INTO accommodations (accommodation_type, description_note, cost, created_at, updated_at) VALUES(?,?,?,?,?)",
    [accommodation_type, description_note, cost, created_at, updated_at]
  );

  res.status(200).send("Succesvol een nieuw accomodatie type aangemaakt");
});

router.post("/createCampingSpots", async (req, res) => {
  const created_at = new Date().toISOString().slice(0, 19).replace("T", " ");
  const updated_at = created_at;
  const { accommodations_id, spot_name, spot_status, notes } = req.body;

  await query(
    "INSERT INTO camping_spots (accommodations_id, spot_name, spot_status, notes, created_at, updated_at) VALUES(?,?,?,?,?,?)",
    [accommodations_id, spot_name, spot_status, notes, created_at, updated_at]
  );

  res.status(200).send("Succesvol een camping spot aangemaakt");
});
// Einde API post endpoints m.b.t. reserveringen

module.exports = router;
