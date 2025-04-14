import { literal, Op } from "sequelize";
import { Pedido } from "../models/Pedido.js";
import { PedidoProducto } from "../models/PedidoProducto.js";

export const listarpedidos = async (req, res) => {    /* llamar esta funcion desde otras partes por medio de la ruta*/
    try {
        const query = req.query
        const pedido = await Pedido.findAll({          /* listar el pedido de la tienda*/
            attributes: [
                'id',
                'idTienda',
                'estado',
                'valorTotal',
                'observaciones',
                'createdAt',
                [literal("(SELECT COUNT(pp.id) FROM pedidosproductos AS pp WHERE pedidos.id = pp.idpedido)"), "cantidadProductos"]
            ],
            where: {
                idTienda: query.idTienda,
            },
        })
        return res.status(200).json({ message: 'Categoria obtenida con exito', data: pedido })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al obtener categoria', error })
    }
}

export const detallespedidos = async (req, res) => {
    try {
        const query = req.query
        const pedidoDetalle = await Pedido.findOne({
            attributes: [
                'id',
                'idTienda',
                'estado',
                'valorTotal',
                'observaciones',
                'createdAt',
                [literal("(SELECT COUNT(pp.id) FROM pedidosproductos AS pp WHERE pedidos.id = pp.idpedido)"), "cantidadProductos"]
            ],
            where: {
                id: query.idPedido,
            },
        })
        const pedidosproductos = await PedidoProducto.findAll({
            attributes: [
                'id',
                'idPedido',
                'idProducto',
                'cantidad',
                'valorUnidad',
                'despachado',
                [literal("(SELECT productos.nombre FROM productos WHERE pedidosproductos.idproducto = productos.id)"), "nombre"],
                [literal("(SELECT productos.imagen FROM productos WHERE pedidosproductos.idproducto = productos.id)"), "imagen"]
            ],
            where: {
                idPedido: query.idPedido,
            },
        })
        const detalle = {
            orden: pedidoDetalle,
            productos: pedidosproductos
        }
        return res.status(200).json({ message: 'Categoria obtenida con exito', data: detalle })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al obtener categoria', error })
    }
}

export const actualizarestadopedido = async (req, res) => {
    try {
        const body = req.body
        await Pedido.update({
            estado: body.estado  /* van los atributos que necesito cambiar*/
        },
            {
                where: {
                    id: body.id    /* la condicion que voy actualizar*/
                },
            },
        )
        return res.status(200).json({ message: 'Categoria actualizada con exito' })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al guardar categoria', error })
    }
}

export const actualizarestadoproducto = async (req, res) => {
    try {
        const body = req.body
        await PedidoProducto.update({
            despachado: body.despachado  /* van los atributos que necesito cambiar*/
        },
            {
                where: {
                    idPedido: body.idPedido,
                    id: body.id                   /* la condicion que voy actualizar*/
                },
            },

        )
        const listaPedidosProductos = await PedidoProducto.findAll({
            attributes: [
                'cantidad',
                'valorUnidad'
            ],
            where: {
                idPedido: body.idPedido,
                despachado: 1
                
            }
        })
        let valorTotalProductos = 0
        listaPedidosProductos.forEach(function (element) {
            let valorProductos = element.cantidad * element.valorUnidad
            valorTotalProductos = valorTotalProductos + valorProductos
            
        })
        await Pedido.update({
            valorTotal: valorTotalProductos  /* van los atributos que necesito cambiar*/
        },
            {
                where: {
                    id: body.idPedido                   /* la condicion que voy actualizar*/
                },
            },

        )

        return res.status(200).json({ message: 'Categoria actualizada con exito' })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al guardar categoria', error })
    }
}