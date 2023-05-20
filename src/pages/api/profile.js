import jwt from "jsonwebtoken";
import cookiesHandler from "./cookies";

export default function profileHandler(req, res) {
  // Analizar las cookies usando el middleware personalizado
  cookiesHandler(req, res, () => {
    const { myTokenName } = req.cookies;

    if (!myTokenName) {
      return res.status(401).json({ error: "Not logged in" });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(myTokenName, "secret");
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const { email, name, lastName, username, image } = decodedToken;

    return res.status(200).json({ email, name, lastName, username });
  });
}
