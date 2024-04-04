import { Sequelize } from "sequelize";

const sequelize = new Sequelize('diplom', 'postgres', '1111', {
  dialect: "postgres",
  host: "localhost",
  port: "5432",
  pool: {
    max: 15,
    min: 5,
    idle: 20000,
    evict: 15000,
    acquire: 30000
},
});

export default sequelize