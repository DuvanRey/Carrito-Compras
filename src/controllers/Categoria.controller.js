import { Categoria } from "../models/Categoria.js"

export const crearCategoria = async (req, res) => {
    try {
        const body = req.body
        const categoria = await Categoria.create({ idTienda: body.idTienda, nombre: body.nombre, createdBy: 1 });
        return res.status(200).json({ message: 'Categoria guardada con exito', categoria })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al guardar categoria', error })
    }
}

export const actualizarCategoria = async (req, res) => {
    try {
        const body = req.body
        await Categoria.update(
            {
                nombre: body.nombre,
                updatedBy: 1
            },
            {
                where: {
                    id: body.id
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
        const query = req.query
        await Categoria.destroy({
            where: {
                id: query.id,
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
        const query = req.query
        const categoria = await Categoria.findAll({
            attributes: [
                'id',
                'idTienda',
                'nombre',
                'estado'
            ],
            where: {
                idTienda: query.idTienda,
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
        const body = req.body
        const categoria = await Categoria.findOne({
            where: {
                id: body.id,
            },
        })

        if (categoria.estado == 0) {
            await Categoria.update({
                estado: 1,
                updatedBy: 1
            },
                {
                    where: {
                        id: body.id
                    },
                },
            )
        } else {
            await Categoria.update({
                estado: 0,
                updatedBy: 1
            },
                {
                    where: {
                        id: body.id
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