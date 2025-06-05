import { DataTypes } from "sequelize";
import { tiendaDB } from "../config/DB.js";


export const UserAdministrador = tiendaDB.define("usersAdministradores", {
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

    estado: {
        type: DataTypes.TINYINT,
        allowNull: false,
        field: 'estado',   
    },

    nombre: {
        type: DataTypes.STRING(120),
        allowNull: false,
        field: 'nombre',
    },
    apellido: {
        type: DataTypes.STRING(120),
        allowNull: false,
        field: 'apellido',
    },

    fechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'fechaNacimiento',   
    },

    fechaIngreso: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'fechaIngreso',   
    },

    direccion: {
        type: DataTypes.STRING(120),
        allowNull: false,
        field: 'direccion',
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