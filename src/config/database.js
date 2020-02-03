module.exports = {
  dialect: 'postgres',
  host: process.env.DBHOST,
  username: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
