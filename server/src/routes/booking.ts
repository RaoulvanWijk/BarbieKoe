import { Express, Router } from "express";
import { query } from "../lib/db";
import {
  bookingSchema,
  createAccommodationsSchema,
  createCostGuestSchema,
  createCampingSpots,
  updateInfoCampingSpots,
} from "../types/zodSchemes";
import { count, countReset } from "console";
const router = Router();

// DELETE BOOKING WERKT ALLEEN MET CASCADING VAN FOREIGN KEYS OP AAN, GEBRUIK HIERVOOR DUS DE NIEUWST VERSIE VAN BARBIEKOE DB.
router.delete("/delete/:id", async (req, res) => {
  await query(
    `
  DELETE address
  FROM address
  JOIN guests ON address.id = guests.address_id
  JOIN booking ON guests.id = booking.guest_id
  WHERE booking.id = ?;

  `,
    [req.params.id]
  );
  res.status(200).send("Succesvol volledige booking verwijderd");
});

router.put("/guest-cost", async (req, res) => {
  const { id, cost } = req.body;
  if (id <= 0 || cost < 0) {
    res
      .status(404)
      .send(
        "Id kan niet 0 of negatief zijn en de kosten mogen niet negatief zijn"
      );
    return;
  }
  await query(
    `
  UPDATE cost_guest_sort
  SET
    cost = ?,
    updated_at = NOW()
    WHERE id = ?
  `,
    [cost, id]
  );
  res.status(200).send("Succesvol een gast soort verwijderd");
});

router.get("/guest-cost", async (req, res) => {
  const result = await query(
    ` SELECT id, person_type, cost FROM cost_guest_sort`
  );
  res.status(200).json(result);
});

router.delete("/delete-accommodation/:id", async (req, res) => {
  await query(
    `
  DELETE FROM accommodations
  WHERE id = ?
  `,
    [req.params.id]
  );
  res.status(200).send("Succesvol een accommodatie verwijderd");
});

router.delete("/delete-camping-spot/:id", async (req, res) => {
  await query(
    `
  DELETE FROM camping_spots
  WHERE id = ?
  `,
    [req.params.id]
  );
  res.status(200).send("Succesvol een camping spot verwijderd");
});

router.put("/update-info/:id", async (req, res) => {
  const validateResult = bookingSchema.safeParse(req.body);
  if (!validateResult.success) {
    res.status(400).send(validateResult.error.message);
    return;
  }
  const {
    first_name,
    last_name,
    phone,
    email,
    adult,
    child,
    young_child,
    booking_status,
    notes,
    license_plate,
    car_status,
    house_number,
    city,
    country,
    streetname,
    zipcode,
    camping_spot_id,
    arrival,
    departure,
  } = validateResult.data;

  const cost = req.body.cost;
  if (cost < 0) {
    res.status(400).send("Kosten kunnen niet negatief zijn");
    return;
  }

  await query(
    `
    UPDATE guests
    INNER JOIN booking ON guests.id = booking.guest_id
    INNER JOIN camping_spots ON booking.camping_spot_id = camping_spots.id
    INNER JOIN cars ON booking.id = cars.booking_id
    INNER JOIN address ON guests.address_id = address.id
    
    SET 
      first_name = ?,
      last_name = ?,
      phone = ?,
      email = ?,
      guests.updated_at = NOW(),
      booking.adult = ?,
      booking.child = ?,
      booking.young_child = ?,
      booking.cost = ?,
      booking.booking_status = ?,
      booking.notes = ?,
      booking.arrival = ?,
      booking.departure = ?,
      booking.updated_at = NOW(),
      cars.license_plate = ?,
      cars.car_status = ?,
      address.house_number = ?,
      address.city = ?,
      address.country = ?,
      address.streetname = ?,
      address.zipcode = ?,
      address.updated_at = NOW(),
      booking.camping_spot_id = ?
    WHERE booking.id = ?
    `,
    [
      first_name,
      last_name,
      phone,
      email,
      adult,
      child,
      young_child,
      cost,
      booking_status,
      notes,
      arrival,
      departure,
      license_plate,
      car_status,
      house_number,
      city,
      country,
      streetname,
      zipcode,
      camping_spot_id,
      req.params.id,
    ]
  );
  res.status(200).send("Booking info geüpdatet");
});

router.get("/all", async (req, res) => {
  const result = await query(`
  SELECT booking.id, first_name, last_name, phone, email, booking.arrival, booking.departure, booking.adult, booking.child, booking.young_child, booking.cost, booking_status, booking.notes, cars.license_plate, cars.car_status, address.house_number, address.city, address.country, address.streetname, address.zipcode, booking.camping_spot_id, camping_spots.spot_name
    FROM guests
      INNER JOIN booking ON guests.id = booking.guest_id
      INNER JOIN camping_spots ON booking.camping_spot_id = camping_spots.id
      INNER JOIN cars ON booking.id = cars.booking_id
      INNER JOIN address ON guests.address_id = address.id
      `);
  res.status(200).json(result);
});

router.get("/info-today", async (req, res) => {
  const result = await query(`
  SELECT booking.id, first_name, last_name, phone, email, booking.arrival, booking.departure, booking.adult, booking.child, booking.young_child, booking.cost, booking_status, booking.notes, cars.license_plate, cars.car_status, address.house_number, address.city, address.country, address.streetname, address.zipcode, booking.camping_spot_id, camping_spots.spot_name
    FROM guests
      INNER JOIN booking ON guests.id = booking.guest_id
      INNER JOIN camping_spots ON booking.camping_spot_id = camping_spots.id
      INNER JOIN cars ON booking.id = cars.booking_id
      INNER JOIN address ON guests.address_id = address.id
    WHERE booking.booking_status = 1
     OR DATE(booking.arrival) = CURDATE();`);
  res.status(200).json(result);
});

router.put("/update-camping-spot", async (req, res) => {
  const validateResult = updateInfoCampingSpots.safeParse(req.body);
  if (!validateResult.success) {
    res.status(400).send(validateResult.error.message);
    return;
  }

  const { camping_spots_id, spot_name, accommodations_id, spot_status, notes } =
    validateResult.data;

  await query(
    `
  UPDATE camping_spots
  SET spot_name = ?, accommodations_id = ?, spot_status = ?, notes = ?, updated_at = NOW()
  WHERE id = ?
  `,
    [spot_name, accommodations_id, spot_status, notes, camping_spots_id]
  );
  res.status(200).send("Succesvol camping spots info bijgewerkt");
});

router.get("/info-camping-spot", async (req, res) => {
  const result = await query(`
  SELECT camping_spots.id, spot_name, accommodations_id, accommodations.accommodation_type, spot_status, notes
  
  FROM camping_spots
  
  JOIN accommodations ON camping_spots.accommodations_id = accommodations.id;
  `);
  res.status(200).json(result);
});

router.get("/info-arrivals", async (req, res) => {
  const result = await query(`
  SELECT guests.first_name, guests.last_name, arrival, camping_spots.spot_name, guests.phone, booking_status, cost, booking.id
  
  FROM booking
  
  JOIN guests ON booking.guest_id = guests.id
  
  JOIN camping_spots ON booking.camping_spot_id = camping_spots.id
  
  WHERE DATE(booking.arrival) = CURDATE();`);
  res.status(200).json(result);
});

router.get("/info-available-spot", async (req, res) => {
  const result = await query(`
  SELECT camping_spots.id, spot_name, DATEDIFF(MIN(booking.arrival), CURDATE()) AS max_nights_allowed

  FROM camping_spots
  
  LEFT JOIN booking ON camping_spots.id = booking.camping_spot_id 
  
  WHERE (booking.arrival IS NULL OR DATE(booking.arrival) > CURDATE()) AND camping_spots.spot_status = 1 AND (booking.booking_status = 0 OR booking.id IS NULL)
  
  GROUP BY camping_spots.id;`);
  res.status(200).json(result);
});

router.put("/update-status", async (req, res) => {
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

router.put("/car-status", async (req, res) => {
  const { id, car_status } = req.body;
  if ((car_status === 1 || car_status === 0) && id > 0) {
    await query(
      "UPDATE cars SET car_status = ?, updated_at = NOW() WHERE id = ?",
      [car_status, id]
    );
    res.status(200).send("Car status geüpdatet");
  } else {
    res.status(400).send("Fout in verkregen informatie");
  }
});

router.get("/info-car", async (req, res) => {
  const result: any = await query(
    "SELECT id, license_plate, car_status FROM cars"
  );
  res.status(200).json(result);
});

router.get("/bookkeeping", async (req, res) => {
  const result: any = await query("SELECT cost, arrival FROM booking;");
  res.status(200).json(result);
});

// Alle API endpoints voor het maken van data m.b.t. reserveringen

router.post("/create", async (req, res) => {
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

  const arrivalDate = new Date(arrival);
  const departureDate = new Date(departure);
  arrivalDate.setHours(0, 0, 0, 0);
  departureDate.setHours(0, 0, 0, 0);
  const timeDifference = departureDate.getTime() - arrivalDate.getTime();
  const daysDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24));
  const cost =
    (adult * 20 + child * 10 + young_child * 5 + 20) * daysDifference;

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

router.post("/create-guest-cost", async (req, res) => {
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

router.post("/create-accommodation", async (req, res) => {
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

router.post("/create-camping-spot", async (req, res) => {
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