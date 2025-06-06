import { DataTypes } from "sequelize";
import { tiendaDB } from "../config/DB.js";


export const Tienda = tiendaDB.define("tiendas", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idUserAdministrador: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'UserAdministrador',
            key: 'id'
        },
        field: 'idUserAdministrador'
    },
    nombre: {
        type: DataTypes.STRING(120),
        allowNull: false,
        field: 'nombre',
    },

    descripcion: {
        type: DataTypes.STRING(300),
        allowNull: false,
        field: 'descripcion',
    },
    foto: {
        type: DataTypes.STRING(120),
        allowNull: false,
        field: 'foto',   
    },
    fotoMini: {
        type: DataTypes.STRING(120),
        allowNull: false,
        field: 'fotoMini',   
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'telefono',   
    },
    direccion: {
        type: DataTypes.STRING(120),
        allowNull: false,
        field: 'direccion',   
    },
    apertura: {
        type: DataTypes.TINYINT,
        allowNull: false,
        field: 'apertura',   
    },
    estado: {
        type: DataTypes.TINYINT,
        allowNull: false,
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