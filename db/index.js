const Pool = require("pg").Pool;

//insures that the .env file is only run in a development environment and not a production environment
if (process.env.NODE_ENV !== "production") {
  //requires the the .env file configuration be run first hiding all info hidden via the .env file
  require("dotenv").config();
}

const devConfig = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
};

const proConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },
};
