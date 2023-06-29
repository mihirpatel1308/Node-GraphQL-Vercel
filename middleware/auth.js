const { auth } = require("express-oauth2-jwt-bearer");

const checkJwtAsync = async (req, res, next) => {
  try {
    await auth({
      audience: "nZ9SyVljqJmr2rKQPiokHL4eNeVXJBDR",
      issuerBaseURL: `https://dev-qel4c52gve5yd8kj.us.auth0.com/`,
    })(req, res, (err) => {
      if (err) {
        res.status(401).json({ status: 401, error: "Unauthorized" });
      } else {
        next();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = checkJwtAsync;
