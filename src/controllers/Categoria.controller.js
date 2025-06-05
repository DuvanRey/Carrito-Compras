import { literal } from "sequelize";
import { Categoria } from "../models/Categoria.js"
import { UserAdministrador } from "../models/UserAdministrador.js";
import { Producto } from "../models/Producto.js";

export const crearCategoria = async (req, res) => {
    try {
        const body = req.body
        const userAdmin = await UserAdministrador.findOne({
            attributes: [
                'id',
                [literal(`(SELECT tiendas.id FROM tiendas WHERE tiendas.idUserAdministrador = usersAdministradores.id)`), 'idTienda']
            ],
            where: {
                idUser: req.user.id
            },
            raw: true
        });
        const categoria = await Categoria.create({ idTienda: userAdmin.idTienda, nombre: body.nombre, createdBy: req.user.id });
        return res.status(200).json({ message: 'Categoria guardada con exito', categoria })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al guardar categoria', error })
    }
}

export const actualizarCategoria = async (req, res) => {
    try {
        const body = req.body
        const params = req.params
        await Categoria.update(
            {
                nombre: body.nombre,
                updatedBy: req.user.id
            },
            {
                where: {
                    id: params.idCategoria,
                },
            },
        );
        return res.status(200).json({ message: 'Categoria actualizada con exito' })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al guardar categoria', error })
    }
}

export const eliminarCategoria = async (req, res) => {
    try {
        const params = req.params
        const categoria = await Producto.count({
            where: {
                idCategoria: params.idCategoria,
            },
        })
        if (categoria > 0) {
            return res.status(400).json({ message: 'No se puede eliminar la categoria porque tiene productos asociados' })
        }
        await Categoria.destroy({
            where: {
                id: params.idCategoria,
            },
        });
        return res.status(200).json({ message: 'Categoria eliminada con exito' })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al eliminar categoria', error })
    }
}

export const obtenerCategoria = async (req, res) => {
    try {
        const userAdmin = await UserAdministrador.findOne({
            attributes: [
                'id',
                [literal(`(SELECT tiendas.id FROM tiendas WHERE tiendas.idUserAdministrador = usersAdministradores.id)`), 'idTienda']
            ],
            where: {
                idUser: req.user.id
            },
            raw: true
        });


        const categoria = await Categoria.findAll({
            attributes: [
                'id',
                'idTienda',
                'nombre',
                'estado'
            ],
            where: {
                idTienda: userAdmin.idTienda
            },
        })
        return res.status(200).json({ message: 'Categoria obtenida con exito', data: categoria })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al obtener categoria', error })
    }
}

export const cambiarEstadoCategoria = async (req, res) => {
    try {
        const params = req.params
        const categoria = await Categoria.findOne({
            where: {
                id: params.idCategoria,
            },
        })

        if (categoria.estado == 0) {
            await Categoria.update({
                estado: 1,
                updatedBy: req.user.idCategoria
            },
                {
                    where: {
                        id: params.idCategoria
                    },
                },
            )
        } else {
            await Categoria.update({
                estado: 0,
                updatedBy: req.user.idCategoria
            },
                {
                    where: {
                        id: params.idCategoria
                    },
                },
            )
        }
        return res.status(200).json({ message: 'Categoria actualizada con exito' })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al guardar categoria', error })
    }
}