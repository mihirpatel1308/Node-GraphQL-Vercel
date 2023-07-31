const jwt = require("jsonwebtoken");
const jwksRsa = require("jwks-rsa");
const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 3600 });

const jwksClient = jwksRsa({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: "https://dev-qel4c52gve5yd8kj.us.auth0.com/.well-known/jwks.json",
});

const checkJwt = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      console.error("No token provided");
      return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(
      token,
      getKey,
      {
        audience: "nZ9SyVljqJmr2rKQPiokHL4eNeVXJBDR",
        issuer: "https://dev-qel4c52gve5yd8kj.us.auth0.com/",
        algorithms: ["RS256"],
      },
      (err, decoded) => {
        if (err) {
          console.error("JWT verification failed:", err);
          res.status(401).json({ error: "Unauthorized" });
        } else {
          req.user = decoded;
          // console.log("req.user : ", req.user);
          next();
        }
      }
    );
  } catch (error) {
    console.error("Error during JWT verification:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

const getKey = async (header, callback) => {
  try {
    const key = await jwksClient.getSigningKey(header.kid);
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  } catch (error) {
    console.error("Error retrieving JWKS from remote:", error);
    callback(error);
  }
};

module.exports = checkJwt;

// Remotely read token :
// const jwt = require("express-jwt");
// const jwksRsa = require("jwks-rsa");

// const checkJwt = async (req, res, next) => {
//   try {
//     const secret = await jwksRsa.expressJwtSecret({
//       cache: true,
//       rateLimit: true,
//       jwksRequestsPerMinute: 5,
//       jwksUri: `https://dev-qel4c52gve5yd8kj.us.auth0.com/.well-known/jwks.json`,
//     });

//     await jwt({
//       secret,
//       audience: "nZ9SyVljqJmr2rKQPiokHL4eNeVXJBDR",
//       issuer: `https://dev-qel4c52gve5yd8kj.us.auth0.com/`,
//       algorithms: ["RS256"],
//     })(req, res, next);
//   } catch (error) {
//     // Handle the error here
//     console.log('error : ' , error);
//     res.status(401).json({ error: "Unauthorized" });
//   }
// };

// module.exports = checkJwt;
