import { Express, Router } from "express";
import conn, {query} from "../lib/db";

const router = Router();

router.get('/users', async (req, res) => {
  const resu = await query("SELECT * FROM users")

  console.log(resu)
  res.status(200).send(resu);
});

module.exports = router;