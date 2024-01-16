import { Express, Router } from "express";
import conn, {query} from "../lib/db";


const router = Router();

router.get('/hoi', (req, res) => {
  res.send('Hello World!');
});

router.post('/createBooking', async (req, res) => {
  console.log(req.body)
 const created_at = new Date().toISOString().slice(0, 19).replace("T", " ");
 const updated_at = created_at;
// Allebei strings maar je hoeft ze niet echt per se te declaren.
 const {house_number, city, country,streetname,zipcode,first_name,last_name,phone,email, arrival, departure,adult,child,young_child,booking_status,notes,license_plate,car_status,camping_spot_id,} = req.body;

const createAddress: any = await query("INSERT INTO address (house_number, city, country, streetname, zipcode, created_at, updated_at) values (?,?,?,?,?,?,?)", [house_number, city, country, streetname, zipcode, created_at, updated_at]);

const address_id = createAddress.insertId;

const createGuests: any = await query("INSERT INTO guests (address_id, first_name, last_name, phone, email, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)", [address_id, first_name, last_name, phone, email, created_at, updated_at]);

const guest_id = createGuests.insertId;
const cost = (adult * 20 + child * 10 + young_child * 5);

const createBooking: any = await query("INSERT INTO booking (guest_id, camping_spot_id, arrival, departure, adult, child, young_child, cost, booking_status, notes, created_at, updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)", [guest_id, camping_spot_id, arrival, departure, adult,child, young_child, cost, booking_status,notes, created_at, updated_at,]);

const booking_id = createBooking.insertId;

await query("INSERT INTO cars (booking_id, license_plate, car_status, created_at, updated_at) VALUES(?,?,?,?,?)", [booking_id, license_plate, car_status, created_at, updated_at]);


res.status(200).send(`Succesvol een nieuw form aangemaakt.`)
});

module.exports = router;