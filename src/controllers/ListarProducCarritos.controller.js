import { where } from "sequelize"
import { Carrito } from "../models/Carrito.js"
import { CarritoProducto } from "../models/CarritoProducto.js"
import { Producto } from "../models/Producto.js"

export const listarproductoscarritos = async (req, res) => {                       //estudiar este codigo cuando se remplza el for
    try {
        const carrito = await Carrito.findOne({
            attributes: [
                'id'
            ],
            where: {
                createdBy: 1
            },
            raw: true
        })

        if (carrito != null) {
            const productoCarritos = await CarritoProducto.findAll({
                attributes: [
                    'idCarrito',
                    'idProducto',
                    'cantidad',
                    'valorUnidad'
                ],
                where: {
                    idCarrito: carrito.id
                },
                raw: true
            })


            for (const pCarrito of productoCarritos) {
                const producto = await Producto.findOne({
                    attributes: [
                        'nombre',
                        'imagen'
                    ],
                    where: {
                        id: pCarrito.idProducto
                    }
                })
                pCarrito.nombre = producto.nombre
                pCarrito.imagen = producto.imagen

            }
            return res.status(200).json({ message: 'Consultado con exito', data: productoCarritos })
        }
        return res.status(200).json({ message: 'Consultado con exito', data: null })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al consultar', error })
    }
}



export const contarProducto = async (req, res) => {
    try {
        const carrito = await Carrito.findOne({
            attributes:['id'],
            where: {
                createdBy: 1
            },
            raw: true
        })


        let contarProductos = 0
        if (carrito != null) {
            contarProductos = await CarritoProducto.count({
                where: {
                    idCarrito: carrito.id
                }
            })

        }
        return res.status(200).json({ message: 'Consultado con exito', data: contarProductos })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al consultar', error })
    }
}

