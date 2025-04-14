import { DataTypes } from "sequelize";
import { tiendaDB } from "../config/DB.js";



export const Producto = tiendaDB.define("productos", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idCategoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Categoria',
            key: 'id'
        },
        field: 'idCategoria'
    },
    sku: {
        type: DataTypes.STRING(15),
        allowNull: false,
        field: 'sku',
    },
    nombre: {
        type: DataTypes.STRING(120),
        allowNull: false,
        field: 'nombre',
    },

    estado: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        field: 'estado',   
    },

    precio: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        field: 'precio',   
    },
    stock: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        field: 'stock',   
    },

    imagen: {
        type: DataTypes.STRING(120),
        allowNull: true,
        field: 'imagen',
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