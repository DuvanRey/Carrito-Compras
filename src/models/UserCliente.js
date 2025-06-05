import { DataTypes } from "sequelize";
import { tiendaDB } from "../config/DB.js";

export const UserCliente = tiendaDB.define("usersClientes", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        },
        field: 'idUser'
    },

    direccion: {
        type: DataTypes.STRING(200),
        allowNull: true,
        field: 'direccion',
    },

    nombre: {
        type: DataTypes.STRING(60),
        allowNull: false,
        field: 'nombre',
    },
    apellido: {
        type: DataTypes.STRING(60),
        allowNull: false,
        field: 'apellido',
    },

    imagen: {
        type: DataTypes.STRING(120),
        allowNull: true,
        field: 'apellido',
    },

    fechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'fechaNacimiento',   
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