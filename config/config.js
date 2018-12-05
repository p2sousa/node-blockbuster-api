require('dotenv').load();

export default {
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
  username: process.env.DB_USER ,
  password: process.env.DB_PASS,
  params: {
    dialect: process.env.DB_DIALECT,
    define: {
      underscored: true,
      timestamps: false
    }
  }
}