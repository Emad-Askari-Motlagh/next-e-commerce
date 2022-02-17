import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  let getToken = req.headers.authorization;
  if (getToken) {
    const token = getToken.replace("Bearer ", "");
    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, "MY_SECRET", (err, decoded) => {
        if (err) {
          return res.status(403).send({
            success: false,
            message: "Failed to authenticate token.",
          });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });
    } else {
      // if there is no token, return an error
      return res.status(403).send({
        success: false,
        message: "No token provided.",
      });
    }
  }
};
export default authMiddleware;
