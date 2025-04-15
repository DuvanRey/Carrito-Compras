import { Pedido } from "../models/Pedido.js";
import { PedidoProducto } from "../models/PedidoProducto.js";
import { Producto } from "../models/Producto.js";
import { Tienda } from "../models/Tienda.js";

export const listarPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            attributes: [
                'id',
                'idTienda',
                'observaciones',
                'valorTotal',
                'createdAt',
                'estado'
            ],
            where: {
                createdBy: 1
            },
            raw: true
        });
        for (const pedido of pedidos) {
            console.log("🚀 ~ listarPedidos ~ pedido:", pedido)
            const tienda = await Tienda.findOne({
                attributes: [
                    'nombre',

                ],
                where: {
                    id: pedido.idTienda
                }
            })
            pedido.tienda = tienda.nombre
            pedido.productos = await PedidoProducto.count({
                where: {
                    idPedido: pedido.id
                }
            })
        }

        return res.status(200).json({ message: 'Pedido traido con exito', data: pedidos })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al traer el pedido', error })
    }
}


export const detallespedidos = async (req, res) => {
    try {
        const params = req.params;

        let pedido = await Pedido.findOne({
            attributes: [
                'id',
                'idTienda',
                'observaciones',
                'valorTotal',
                'createdAt',
                'estado'
            ],
            where: {
                id: params.idPedido,
            },
            raw: true
        });

        const productosPedidos = await PedidoProducto.findAll({
            attributes: [
                'idProducto',
                'cantidad',
                'valorUnidad',
                'despachado'
            ],
            where: {
                idPedido: params.idPedido,
            },
            raw: true
        });

        for (const productoPedido of productosPedidos) {
            const producto = await Producto.findOne({
                attributes: ['nombre'],
                where: {
                    id: productoPedido.idProducto
                }
            });
            productoPedido.producto = producto.nombre
        }
        pedido.productos = productosPedidos
        

        return res.status(200).json({ message: 'Consultado con exito', data: pedido });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'error al consultar', error });
    }
};
