import { DataTypes } from "sequelize";
import { tiendaDB } from "../config/DB.js";

export const CarritoProducto = tiendaDB.define("carritosProductos", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idCarrito: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Carrito',
            key: 'id'
        },
        field: 'idCarrito'
    },
    idProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Producto',
            key: 'id'
        },
        field: 'idProducto'
    },
    cantidad: {
        type: DataTypes.TINYINT,
        allowNull: false,
        field: 'cantidad',
       
    },
    valorUnidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'valorUnidad',
       
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "User",
        references: {
            model: 'users',
            key: 'id'
        },
        field: 'createdBy'
    },

    updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "User",
        references: {
            model: 'users',
            key: 'id'
        },
        field: 'updatedBy'
    },


    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'createdAt'
    },

    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'updatedAt'
    },
   
});