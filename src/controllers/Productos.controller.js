import { Producto } from "../models/Producto.js"

export const crearProductos = async (req, res) => {
    try {
        const body = req.body
        const productos = await Producto.create({ idCategoria: body.idCategoria, sku: body.sku, nombre: body.nombre, precio: body.precio,
            stock: body.stock, createdBy: 1 });
        return res.status(200).json({ message: 'Productos guardados con exito', productos })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al guardar el producto', error })
    }
}

export const actualizarProductos = async (req, res) => {
    try {
        const body = req.body
        await Producto.update(
            {
                sku: body.sku,
                nombre: body.nombre,
                precio: body.precio,
                stock: body.stock,
                updatedBy: 1
            },
            {
                where: {
                    id: body.id
                },
            },
        );
        return res.status(200).json({ message: 'Producto actualizada con exito' })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al guardar producto', error })
    }
}

export const eliminarProductos = async (req, res) => {
    try {
        const query = req.query
        await Producto.destroy({
            where: {
                id: query.id,
            },
        });
        return res.status(200).json({ message: 'Producto eliminada con exito' })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al eliminar producto', error })
    }
}

export const obtenerProductos = async (req, res) => {
    try {
        const query = req.query
        const producto = await Producto.findAll({
            attributes: [
                'id',
                'sku',
                'nombre',
                'estado',
                'precio',
                'stock'
            ],
            where: {
                idCategoria: query.idCategoria,
            },
        })
        return res.status(200).json({ message: 'Producto obtenida con exito', data: producto })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al obtener producto', error })
    }
}


export const cambiarEstadoProducto = async (req, res) => {
    try {
        const body = req.body
        const producto = await Producto.findOne({
            where: {
                id: body.id,
            },
        })

        if (producto.estado == 0) {
            await Producto.update({
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
            await Producto.update({
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


