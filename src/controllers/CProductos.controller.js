import { Op, literal } from 'sequelize';
import { Categoria } from "../models/Categoria.js"
import { Producto } from "../models/Producto.js"
import { Carrito } from "../models/Carrito.js"

export const categorias = async (req, res) => {
    try {
        const { idTienda } = req.query;
        const idUser = req.user.id;

        // Obtener carrito
        const cart = await Carrito.findOne({
            attributes: ['id'],
            where: { createdBy: idUser },
            raw: true
        });
        const idCart = cart ? cart.id : 0;

        // Obtener categorías
        const categorias = await Categoria.findAll({
            attributes: ['id', 'nombre'],
            where: {
                idTienda,
                estado: 1
            },
            raw: true
        });

        // Agregar productos a cada categoría
        for (const categoria of categorias) {
            const productos = await Producto.findAll({
                attributes: [
                    'id',
                    'idCategoria',
                    'sku',
                    'nombre',
                    'precio',
                    'stock',
                    'estado',
                    'imagen',
                    [literal(`(SELECT cp.cantidad FROM carritosProductos AS cp WHERE cp.idProducto = productos.id AND cp.createdBy = ${idUser} AND cp.idCarrito = ${idCart})`), 'cantidadProductosCarrito'],
                    [literal(`(SELECT cp.id FROM carritosProductos AS cp WHERE cp.idProducto = productos.id AND cp.createdBy = ${idUser} AND cp.idCarrito = ${idCart})`), 'idProductoCarrito']
                ],
                where: {
                    idCategoria: categoria.id
                },
                raw: true
            });

            categoria.productos = productos;
        }

        // Filtrar categorías que tienen al menos un producto
        const categoriasConProductos = categorias.filter(cat => cat.productos.length > 0);

        return res.status(200).json({
            message: 'Consultado con éxito',
            data: categoriasConProductos
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error al consultar', error });
    }
};