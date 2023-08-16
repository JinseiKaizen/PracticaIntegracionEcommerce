require("dotenv").config();

const config = {
  port: process.env.PORT,
  cookie_key: process.env.COOKIE_KEY,
  github_client_id: process.env.GITHUB_CLIENT_ID,
  github_secret_key: process.env.GITHUB_SECRET_KEY,
  github_callback: process.env.GITHUB_CALLBACK_URL,
  session_secret: process.env.SESSION_SECRET,
  jwt_secret: process.env.JWT_SECRET,
  jwt_experies: process.env.JWT_EXPERIES_IN,
  jwt_algorithm: process.env.JWT_ALGORITHM

}

const mongo = {
  mongo_local: process.env.MONGO_LOCAL,
  mongo_atlas: process.env.MONGO_ATLAS
}

module.exports = { config, mongo };