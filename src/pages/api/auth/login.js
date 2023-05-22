import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import users from "src/models/users.json";

export default function loginHandler(req, res) {
  const { email, password } = req.body;

  const user = users.find(user => user.email);

  if (email === user.email && password === user.password) {
    // expire in 30 days
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        email,
        username: user.username,
        name: user.name,
        lastName: user.lastName,
        image: user.image
      },
      "secret"
    );

    const serialized = serialize("myTokenName", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    return res.status(200).json({
      message: "Login successful",
    });
  }

  return res.status(401).json({ error: "Invalid credentials" });
}