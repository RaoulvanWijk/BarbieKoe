import { Express, Router } from "express";
import conn, {query} from "../lib/db";

const router = Router();

router.get('/users', async (req, res) => {
  const resu = await query("CALL sp_get_users()") as any;
  res.status(200).send(resu[0]);
});

router.post('/login', async (req, res) => {
  const body = req.body;
  console.log(body);

  // const resu = await query("CALL sp_login(?, ?)", [username, password]) as any;
  res.status(200).send();
});

module.exports = router;