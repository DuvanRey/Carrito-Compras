import sequelize from 'sequelize'
import { config } from './config.js'

export const tiendaDB = new sequelize(config.DB)