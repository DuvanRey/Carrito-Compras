import { literal, Op } from "sequelize";
import { Pedido } from "../models/Pedido.js";
import { PedidoProducto } from "../models/PedidoProducto.js";
import { UserAdministrador } from "../models/UserAdministrador.js";
import { Tienda } from "../models/Tienda.js";
import { UserCliente } from "../models/UserCliente.js";

export const listarpedidos = async (req, res) => {    /* llamar esta funcion desde otras partes por medio de la ruta*/
    try {
        const userAdmin = await UserAdministrador.findOne({  /* buscar el id del usuario que esta logueado*/
            attributes: ['id'],
            where: {
                idUser: req.user.id
            },
            raw: true
        })

        const store = await  Tienda.findOne({  /* buscar el id de la tienda que esta logueado*/
            attributes: ['id'],
            where: {
                idUserAdministrador: userAdmin.id
            },
            raw: true
        })
        const pedido = await Pedido.findAll({          /* listar el pedido de la tienda*/
            attributes: [
                'id',
                'idTienda',
                'estado',
                'valorTotal',
                'observaciones',
                'createdAt',
                [literal("(SELECT COUNT(pp.id) FROM pedidosProductos AS pp WHERE pedidos.id = pp.idpedido)"), "cantidadProductos"]
            ],
            where: {
                idTienda: store.id
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
        const params = req.params
        let pedidoDetalle = await Pedido.findOne({
            attributes: [
                'id',
                'idTienda',
                'estado',
                'valorTotal',
                'observaciones',
                'createdAt',
                'createdBy',
                [literal("(SELECT COUNT(pp.id) FROM pedidosProductos AS pp WHERE pedidos.id = pp.idpedido)"), "cantidadProductos"],
            ],
            where: {
                id: params.idPedido,
            },
            raw: true
        })
        if(pedidoDetalle) {
            const cliente = await UserCliente.findOne({  /* buscar el id del usuario que creo el pedido*/
                attributes: [
                    'direccion',
                    'nombre',
                    'apellido',
                ],
                where: {
                    idUser: pedidoDetalle.createdBy
                },
                raw: true
            })

            pedidoDetalle.direccion = cliente.direccion
            pedidoDetalle.cliente = cliente.nombre + " " + cliente.apellido
        }
        const pedidosproductos = await PedidoProducto.findAll({
            attributes: [
                'id',
                'idPedido',
                'idProducto',
                'cantidad',
                'valorUnidad',
                'despachado',
                [literal("(SELECT productos.nombre FROM productos WHERE pedidosProductos.idProducto = productos.id)"), "nombre"],
                [literal("(SELECT productos.imagen FROM productos WHERE pedidosProductos.idProducto = productos.id)"), "imagen"]
            ],
            where: {
                idPedido: params.idPedido,
            },
        })
        const detalle = {
            orden: pedidoDetalle,
            productos: pedidosproductos
        }
        console.log("🚀 ~ detallespedidos ~ detalle.pedidoDetalle:", pedidoDetalle)
        return res.status(200).json({ message: 'Categoria obtenida con exito', data: detalle })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al obtener categoria', error })
    }
}

export const actualizarestadopedido = async (req, res) => {
    try {
        const body = req.body
        const params = req.params
        await Pedido.update({
            estado: body.estado  /* van los atributos que necesito cambiar*/
        },
            {
                where: {
                    id: params.idPedido    /* la condicion que voy actualizar*/
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
        const params = req.params
        await PedidoProducto.update({
            despachado: body.despachado  /* van los atributos que necesito cambiar*/
        },
            {
                where: {
                    idPedido: params.idPedido,    /* la condicion que voy actualizar*/
                    id: params.idProducto        /* la condicion que voy actualizar*/
                },
            },

        )
        const listaPedidosProductos = await PedidoProducto.findAll({
            attributes: [
                'cantidad',
                'valorUnidad'
            ],
            where: {
                idPedido: params.idPedido,
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
                    id: params.idPedido                   /* la condicion que voy actualizar*/
                },
            },

        )

        return res.status(200).json({ message: 'Categoria actualizada con exito' })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al guardar categoria', error })
    }
}