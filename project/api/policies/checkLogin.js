const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // const permissions = {
    //   create: ["admin"],
    //   updateProject: ["admin"],
    //   removeProject: ["admin"],
    // };

    if (!req.headers.authorization) {
      return res.status(400).json({
        message: "Unauthorized",
      });
    }

    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "123456", async (error, payload) => {
      if (error) {
        return res.status(400).json({
          message: "Internal Server Error",
        });
      }

      if (payload.id) {
        const userDb = await User.findOne({ id: payload.id });

        if (!userDb) {
          return res.status(400).json({
            message: "User not found",
          });
        }
        req.user = userDb;
        return next();
      }
    });
  } catch (error) {
    return res.status(403).json({ message: "Failed", error: error.message });
  }
};

