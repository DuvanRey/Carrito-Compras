import { DataTypes } from "sequelize";
import { tiendaDB } from "../config/DB.js";


export const Pedido = tiendaDB.define("pedidos", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idTienda: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Tienda',
            key: 'id'
        },
        field: 'idTienda'
    },
    estado: {
        type: DataTypes.TINYINT,
        allowNull: false,
        field: 'estado',   
    },

    valorTotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'valorTotal',
       
    },
    observaciones: {
        type: DataTypes.STRING(300),
        allowNull: true,
        field: 'observaciones',
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