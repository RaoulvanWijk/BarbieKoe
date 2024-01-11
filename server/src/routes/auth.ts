import { SafeUser, ResultSetHeader, LoginUser } from "../lib/types/database";
import { Router } from "express";
import { query } from "../lib/db";
import bcryptjs from "bcryptjs";

const router = Router();

router.get("/users", async (req, res) => {
  const resu = (await query("CALL sp_get_users()")) as [
    SafeUser[],
    ResultSetHeader
  ];
  res.status(200).send(resu[0]);
});

router.post("/login", async (req, res) => {
  // Get id and password from the body
  const {user_id, password } = req.body;

  // Get the user from the database using the id
  const user = (await query("CALL sp_get_password_from_user(?)", [
    user_id,
  ])) as [[LoginUser], ResultSetHeader];

  // If the user doesn't exist, send a 404 error
  // if (!user[0][0]) return res.status(404).send({ error: "User not found" });
  console.log(user[0][0]);

  try {
    // Compare the password from the body with the password from the database
    const passwordMatches = await bcryptjs.compare(
      password,
      user[0][0].password
    );

    // If the passwords don't match, send a 401 error
    if (!passwordMatches)
      return res.status(401).send({ error: "Password is incorrect" });
  } catch (error: any) {
    // If there is an error, send a 500 error
    return res.status(500).send({ error: error.message });
  }

  res.status(200).send(user[0][0]);
});

module.exports = router;
