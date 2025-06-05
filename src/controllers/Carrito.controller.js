import { Carrito, } from "../models/Carrito.js"
import { CarritoProducto } from "../models/CarritoProducto.js";
import { Pedido } from "../models/Pedido.js";
import { PedidoProducto } from "../models/PedidoProducto.js";
import { Producto } from "../models/Producto.js";

export const productosCarrito = async (req, res) => {
    try {
        const body = req.body
        let carrito = await Carrito.findOne({
            attributes: [
                'id'
            ],
            where: {
                createdBy: req.user.id
            },
            raw: true
        })

        if (carrito == null) {
            carrito = await Carrito.create({ idTienda: body.idTienda, createdBy: req.user.id });
        }
        const ExitPC = await CarritoProducto.findOne({
            attributes: [
                'id'
            ],
            where: {
                idProducto: body.idProducto,
                idCarrito: carrito.id
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
                id: body.idProducto
            },
            raw: true
        })


        await CarritoProducto.create({
            idCarrito: carrito.id,
            idProducto: body.idProducto,
            cantidad: 1,
            valorUnidad: producto.precio,
            createdBy: req.user.id,
            updatedBy: req.user.id
        });

        await Producto.update(
            { stock: producto.stock - 1 },
            { where: { id: body.idProducto } }
        );

        return res.status(200).json({ message: 'Creado correctamente', data: true })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al consultar', error })
    }
}

export const eliminarProductos = async (req, res) => {
    try {
        const body = req.body
        await CarritoProducto.destroy({
            where: {
                idProducto: body.idProducto,
                createdBy: req.user.id
            },
        });
        return res.status(200).json({ message: 'Producto eliminada con exito' })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al eliminar producto', error })
    }
}

export const addQuantityProduct = async (req, res) => {
    try {
        const { idProductoCarrito, cantidad } = req.body;

        const carritoProducto = await CarritoProducto.findByPk(idProductoCarrito);

        if (carritoProducto) {
            carritoProducto.cantidad += cantidad;
            await carritoProducto.save();

            return res.status(200).json({ message: 'Actualizado correctamente' });
        } else {
            return res.status(404).json({ message: 'Producto del carrito no encontrado' });
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Error al actualizar cantidad', error });
    }
};

export const substractQuantityProduct = async (req, res) => {
    try {
        const { idProductoCarrito, cantidad } = req.body;

        const carritoProducto = await CarritoProducto.findByPk(idProductoCarrito);

        if (carritoProducto) {
            carritoProducto.cantidad -= cantidad;
            await carritoProducto.save();

            return res.status(200).json({ message: 'Actualizado correctamente' });
        } else {
            return res.status(404).json({ message: 'Producto del carrito no encontrado' });
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Error al actualizar cantidad', error });
    }
};

export const comprarProductos = async (req, res) => {
    try {
        const idUser = req.user.id;
        const body = req.body;
        const carrito = await Carrito.findOne({
            attributes: ['id', 'idTienda'],
            where: { createdBy: idUser },
            raw: true
        });
        if (!carrito) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }
        const productosCarrito = await CarritoProducto.findAll({
            attributes: ['id', 'idProducto', 'cantidad', 'valorUnidad'],
            where: { idCarrito: carrito.id },
            raw: true
        });

        const pedido = await Pedido.create({
            idTienda: carrito.idTienda,
            estado:  1,
            observaciones: body?.observaciones ?? null,
            valorTotal: 0,
            createdBy: idUser,
            updatedBy: idUser
        });

        let total = 0;
        for (const producto of productosCarrito) {
            await PedidoProducto.create({
                idPedido: pedido.id,
                idProducto: producto.idProducto,
                cantidad: producto.cantidad,
                valorUnidad: producto.valorUnidad,
                despachado: 0,
                createdBy: idUser,
                updatedBy: idUser
            });

            // Actualizar stock del producto
            const productoDB = await Producto.findByPk(producto.idProducto);
            if (productoDB) {
                await productoDB.update({ stock: productoDB.stock - producto.cantidad });
            }
            total += producto.cantidad * producto.valorUnidad;
        }

        await CarritoProducto.destroy({ where: { idCarrito: carrito.id } });
        await Carrito.destroy({ where: { createdBy: idUser } });
        await Pedido.update({ valorTotal: total }, { where: { id: pedido.id } });

        return res.status(200).json({ message: 'Compra realizada con éxito', data: pedido });

    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Error al actualizar cantidad', error });
    }
};

