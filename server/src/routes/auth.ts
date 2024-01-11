import { Express, Router } from "express";
import conn, {query} from "../lib/db";

const router = Router();

router.get('/users', async (req, res) => {
  const resu = await query("CALL sp_get_users()") as any;
  res.status(200).send(resu[0]);
});

module.exports = router;