import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  })

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "lax", //✅ BEST for proxying on localhost
    secure: false, //✅ Must be false on HTTP
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  return token
}
