import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader(
    "Set-Cookie",
    serialize(process.env.COOKIE_NAME, "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
    })
  );
  res.status(200);
  res.json({});
}
