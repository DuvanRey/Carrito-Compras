import { DataTypes } from "sequelize";
import { tiendaDB } from "../config/DB.js";

export const User = tiendaDB.define("users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo: {
        type: DataTypes.TINYINT,
        allowNull: false,
        field: 'tipo',   
    },
    estado: {
        type: DataTypes.TINYINT,
        allowNull: false,
        field: 'estado',   
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'telefono',   
    },

    correo: {
        type: DataTypes.STRING(60),
        allowNull: false,
        field: 'correo',
    },
    password: {
        type: DataTypes.STRING(120),
        allowNull: false,
        field: 'password',
    },

    actualizarpassword: {
        type: DataTypes.TINYINT,
        allowNull: false,
        field: 'actualizarpassword',   
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