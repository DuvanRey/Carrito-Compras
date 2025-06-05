import { Categoria } from "../models/Categoria.js";
import { Producto } from "../models/Producto.js"
import { uploadFile } from "../utils/storage.js";

export const crearProductos = async (req, res) => {
    try {
        const body = req.body
        const file = req.files
        const params = req.params
        let imagen = await uploadFile(file.imagen, 'carrito/productos');
        const productos = await Producto.create({
            idCategoria: params.idCategoria,
            sku: body.sku,
            nombre: body.nombre,
            imagen: imagen.url,
            precio: body.precio,
            stock: body.stock,
            createdBy: req.user.id,
            updatedBy: req.user.id,
        });
        return res.status(200).json({ message: 'Productos guardados con exito', productos })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al guardar el producto', error })
    }
}

export const actualizarProductos = async (req, res) => {
    try {
        const body = req.body
        const params = req.params
        const file = req.files
        let imagen = null
        if (file) {
            imagen = await uploadFile(file.imagen, 'carrito/productos');
        }
        await Producto.update(
            {
                sku: body.sku,
                nombre: body.nombre,
                precio: body.precio,
                imagen: imagen ? imagen.url : body.imagen,
                stock: body.stock,
                updatedBy: req.user.id
            },
            {
                where: {
                    id: params.idProducto,
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
        const params = req.params
        await Producto.destroy({
            where: {
                id: params.idProducto,
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
        const params = req.params
        const productos = await Producto.findAll({
            attributes: [
                'id',
                'sku',
                'nombre',
                'estado',
                'precio',
                'stock',
                'imagen',
            ],
            where: {
                idCategoria: params.idCategoria,
            },
        })

        const categoria = await Categoria.findOne({
            attributes: [
                'id',
                'nombre',
                'estado'
            ],
            where: {
                id: params.idCategoria,
            },
        })

        const data = { productos, categoria }
        return res.status(200).json({ message: 'Productos obtenidos con exito', data: data })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al obtener producto', error })
    }
}


export const cambiarEstadoProducto = async (req, res) => {
    try {
        const params = req.params
        const producto = await Producto.findOne({
            where: {
                id: params.idProducto,
            },
        })

        if (producto.estado == 0) {
            await Producto.update({
                estado: 1,
                updatedBy: 1
            },
                {
                    where: {
                        id: params.idProducto,
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
                        id: params.idProducto,
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


