import express from "express"
const router = express.Router()
import * as categoriacontroller from "../controllers/Categoria.controller.js"
import * as productoscontroller from "../controllers/Productos.controller.js"
import * as pedidoscontroller from "../controllers/Pedidos.controller.js"
import * as CTiendacontroller from "../controllers/CTienda.controller.js"
import * as CProductoscontroller from "../controllers/CProductos.controller.js"
import * as ListarProducCarritoscontroller from "../controllers/ListarProducCarritos.controller.js"
import * as Carritocontroller from "../controllers/Carrito.controller.js"
import * as CPedidocontroller from "../controllers/CPedidos.controller.js"

//CATEGORIAS
router.post('/admin/crear-categorias', categoriacontroller.crearCategoria)
router.put('/admin/actualizar-categorias', categoriacontroller.actualizarCategoria)
router.delete('/admin/eliminar-categorias', categoriacontroller.eliminarCategoria)
router.get('/admin/obtener-categorias', categoriacontroller.obtenerCategoria)
router.put('/admin/cambiar-estado-categorias', categoriacontroller.cambiarEstadoCategoria)

//PRODUCTOS
router.post('/admin/crear-productos', productoscontroller.crearProductos)
router.put('/admin/actualizar-productos', productoscontroller.actualizarProductos)
router.delete('/admin/eliminar-producto', productoscontroller.eliminarProductos)
router.get('/admin/obtener-productos', productoscontroller.obtenerProductos)
router.put('/admin/cambiar-estado-productos', productoscontroller.cambiarEstadoProducto)

//Listar Pedidos
router.get('/admin/listar-pedidos', pedidoscontroller.listarpedidos)
router.get('/admin/detalles-pedidos', pedidoscontroller.detallespedidos)
router.put('/admin/actualizar-estado-pedido', pedidoscontroller.actualizarestadopedido)
router.put('/admin/actualizar-estado-producto', pedidoscontroller.actualizarestadoproducto)

//CLIENTES ROUTES
router.get('/client/alistar-tiendas', CTiendacontroller.alistarTiendas)

//LISTA PRODUCTOS
router.get('/client/:idTienda/categorias-productos', CProductoscontroller.categorias)

// LISTAR PRODUCTO CARRITOS
router.get('/client/listar-productos-carritos', ListarProducCarritoscontroller.listarproductoscarritos)
router.get('/client/contar-producto', ListarProducCarritoscontroller.contarProducto)
router.post('/client/producto-carrito', Carritocontroller.productosCarrito)
router.delete('/client/eliminar-producto', Carritocontroller.eliminarProductos)

// LISTAR PEDIDOS
router.get('/client/listar-pedidos', CPedidocontroller.listarPedidos)
router.get('/client/detalle-pedido/:idPedido', CPedidocontroller.detallespedidos)


export { router }
