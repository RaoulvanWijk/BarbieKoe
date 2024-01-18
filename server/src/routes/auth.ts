import { SafeUser, ResultSetHeader, LoginUser } from "../../../src/lib/types/database";
import { Router } from "express";
import { query } from "../lib/db";
import bcryptjs from "bcryptjs";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

const router = Router();

router.get("/users", async (req, res) => {
  const resu = (await query("CALL sp_get_users()")) as [
    SafeUser[],
    ResultSetHeader
  ];
  res.status(200).send(resu[0]);
});

router.get("/validate", async (req, res) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) return res.status(401).send({ error: "No token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as Secret) as JwtPayload;
    console.log(decoded);
    const resu = (await query("CALL sp_get_session(?)", [decoded.id])) as [[{token: string}], ResultSetHeader];
    console.log(resu);
    if (resu[0][0].token !== token) return res.status(401).send({ error: "Token is invalid" });
    res.status(200).send({ token });
  } catch (error: any) {
    return res.status(500).send({ error: error.message });
  }
}
);

router.post("/login", async (req, res) => {
  console.log(req.body);
  
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

  const token = jwt.sign({ id: user_id, username: user[0][0].username, profile_picture: user[0][0].profile_picture }, process.env.JWT_SECRET_KEY as Secret, {
    expiresIn: '2 days',
  });

  console.log(token);
  
  const resu = (await query("CALL sp_create_session(?, ?)", [ user_id, token ])) as [ResultSetHeader];

  res.status(200).setHeader(
    "Set-Cookie",
    `token=${token}; HttpOnly; Path=/; Max-Age=172800`
  ).send({ token });
});

module.exports = router;
