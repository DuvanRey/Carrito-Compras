import { Where } from "sequelize/lib/utils";
import { Carrito, } from "../models/Carrito.js"
import { CarritoProducto } from "../models/CarritoProducto.js";
import { Producto } from "../models/Producto.js";

export const productosCarrito = async (req, res) => {
    try {
        const body = req.body
        let carrito = await Carrito.findOne({
            attributes: [
                'id'
            ],
            where: {
                createdBy: 1
            },
            raw: true
        })

        if (carrito == null) {
            carrito = await Carrito.create({ createdBy: 1 });
        }
        const ExitPC = await CarritoProducto.findOne({
            attributes: [
                'id'
            ],
            Where: {
                idProducto: body.idproducto,
                ExitPC: carrito.id
            }
        }
        );
        if (ExitPC != null) {
            return res.status(400).json({ message: 'Producto ya fue agregado al carrito' })
            
        }

        const producto = await Producto.findOne({
            attributes: [
                'precio',
                'stock'
            ],
            where: {
                id: body.idproducto
            },
            raw: true
        })


        const productosCarrito = await CarritoProducto.create({
            idCarrito: carrito.id,
            idProducto: body.idproducto,
            cantidad: 1,
            valorUnidad: producto.precio,
            createdBy: 1
        });

        await Producto.update(
            { stock: producto.stock - 1 },
            { where: { id: body.idproducto } }
        );

        return res.status(200).json({ message: 'Creado correctamente', data: true })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al consultar', error })
    }
}

export const eliminarProductos = async (req, res) => {
    try {
        const query = req.query
        console.log("🚀 ~ eliminarProductos ~ query:", query)
        await CarritoProducto.destroy({
            where: {
                id: query.idProductoCarrito,
            },
        });
        return res.status(200).json({ message: 'Producto eliminada con exito' })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al eliminar producto', error })
    }
}
