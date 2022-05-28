import JWT from "jsonwebtoken";

export default async function storeJwt(value) {
  await JWT.sign(value, "MY_SECRET");
}
