import { DataTypes } from "sequelize";
import { tiendaDB } from "../config/DB.js";

export const Categoria = tiendaDB.define("categorias", {
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
    nombre: {
        type: DataTypes.STRING(60),
        allowNull: true,
        field: 'nombre',
    },
    estado: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        field: 'estado',   
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