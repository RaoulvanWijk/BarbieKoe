import { Express, Router } from "express";
import { query } from "../lib/db";
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

router.get("/getInfoCampingSpots", async (req, res) => {
  const result = await query(`
  SELECT camping_spots.id, spot_name, accommodations.accommodation_type, spot_status, notes
  
  FROM camping_spots
  
  JOIN accommodations ON camping_spots.accommodations_id = accommodations.id;
  `);
  res.status(200).json(result);
});

router.get("/getArrivalsToday", async (req, res) => {
  const result = await query(`
  SELECT guests.first_name, guests.last_name, arrival, camping_spots.spot_name, guests.phone, booking_status, cost
  
  FROM booking
  
  JOIN guests ON booking.guest_id = guests.id
  
  JOIN camping_spots ON booking.camping_spot_id = camping_spots.id
  
  WHERE DATE(booking.arrival) = CURDATE();`);
  res.status(200).json(result);
});

router.get("/getAvailableSpots", async (req, res) => {
  const result = await query(`
  SELECT camping_spots.id, spot_name, DATEDIFF(MIN(booking.arrival), CURDATE()) AS max_nights_allowed

  FROM camping_spots
  
  LEFT JOIN booking ON camping_spots.id = booking.camping_spot_id AND (booking.booking_status = 0 OR booking.id IS NULL)
  
  WHERE (booking.arrival IS NULL OR DATE(booking.arrival) > CURDATE()) AND camping_spots.spot_status = 1
  
  GROUP BY camping_spots.id;`);
  res.status(200).json(result);
});

router.put("/updateBookingStatus", async (req, res) => {
  const { id, booking_status } = req.body;
  if ((booking_status === 1 || booking_status === 0) && id > 0) {
    await query(
      "UPDATE booking SET booking_status = ?, updated_at = NOW() WHERE id = ?",
      [booking_status, id]
    );
    res.status(200).send("Booking status geüpdatet");
  }
  res.status(400).send("Ongeldig id");
});

router.put("/updateCarStatus", async (req, res) => {
  const { id, car_status } = req.body;
  if ((car_status === 1 || car_status === 0) && id > 0) {
    await query(
      "UPDATE cars SET car_status = ?, updated_at = NOW() WHERE id = ?",
      [car_status, id]
    );
    res.status(200).send("Car status geüpdatet");
  } else {
    res.status(400).send("Kon car tabel niet aanpassen, i.v.m. verkeerde data");
  }
});

router.get("/getCarInfo", async (req, res) => {
  const result: any = await query(
    "SELECT id, license_plate, car_status FROM cars"
  );
  res.status(200).json(result);
});

router.get("/getBookkeeping", async (req, res) => {
  const result: any = await query("SELECT cost, arrival FROM booking;");
  res.status(200).json(result);
});

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
});
// Einde API post endpoints m.b.t. reserveringen

module.exports = router;
