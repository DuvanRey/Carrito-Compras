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
import * as CLogincontroller from "../controllers/Login.controller.js"
import * as CUserController from "../controllers/User.controller.js"
import * as Managercontroller from "../controllers/Manager.controller.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

//CATEGORIAS
router.post('/admin/categorias', authMiddleware, categoriacontroller.crearCategoria)
router.put('/admin/categorias/:idCategoria', authMiddleware, categoriacontroller.actualizarCategoria)
router.delete('/admin/categorias/:idCategoria', authMiddleware, categoriacontroller.eliminarCategoria)
router.get('/admin/categorias', authMiddleware, categoriacontroller.obtenerCategoria)
router.put('/admin/categorias/:idCategoria/estado', authMiddleware, categoriacontroller.cambiarEstadoCategoria)

//PRODUCTOS
router.post('/admin/categoria/:idCategoria/productos', authMiddleware, productoscontroller.crearProductos)
router.post('/admin/categoria/:idCategoria/productos/:idProducto', authMiddleware, productoscontroller.actualizarProductos)
router.delete('/admin/categoria/:idCategoria/productos/:idProducto', authMiddleware, productoscontroller.eliminarProductos)
router.get('/admin/categoria/:idCategoria/productos', authMiddleware, productoscontroller.obtenerProductos)
router.put('/admin/categoria/:idCategoria/productos/:idProducto/estado', authMiddleware, productoscontroller.cambiarEstadoProducto)

//Listar Pedidos
router.get('/admin/pedidos', authMiddleware, pedidoscontroller.listarpedidos)
router.get('/admin/pedido/:idPedido', authMiddleware, pedidoscontroller.detallespedidos)
router.post('/admin/pedido/:idPedido/estado', authMiddleware, pedidoscontroller.actualizarestadopedido)
router.post('/admin/pedido/:idPedido/producto/:idProducto', authMiddleware, pedidoscontroller.actualizarestadoproducto)


//LISTA PRODUCTOS
router.get('/cliente/categorias-productos', authMiddleware, CProductoscontroller.categorias)

// LISTAR PRODUCTO CARRITOS
router.get('/cliente/carrito/productos', authMiddleware, ListarProducCarritoscontroller.listarproductoscarritos)
router.get('/cliente/carrito/contar-producto', authMiddleware, ListarProducCarritoscontroller.contarProducto)
router.post('/cliente/carrito/agregar-nuevo-producto', authMiddleware, Carritocontroller.productosCarrito)
router.post('/cliente/carrito/eliminar-producto', authMiddleware, Carritocontroller.eliminarProductos)


router.post('/cliente/carrito/agregar-cantidad-producto', authMiddleware, Carritocontroller.addQuantityProduct)
router.post('/cliente/carrito/quitar-cantidad-producto', authMiddleware, Carritocontroller.substractQuantityProduct)
router.post('/cliente/carrito/comprar', authMiddleware, Carritocontroller.comprarProductos)



// LISTAR PEDIDOS
router.get('/cliente/pedidos', authMiddleware, CPedidocontroller.listarPedidos)
router.get('/cliente/pedidos/:idPedido', authMiddleware, CPedidocontroller.detallespedidos)

// LOGIN
router.post('/manager/login', CLogincontroller.loginManager)
router.post('/admin/login', CLogincontroller.loginAdmin)
router.post('/cliente/login', CLogincontroller.loginCliente)

//USER
router.post('/manager/usuarios-administrador', authMiddleware, CUserController.createUsersAdmin);
router.put('/manager/usuarios-administrador/:idUserAdmin', authMiddleware, CUserController.updateUsersAdmin);
router.get('/manager/usuarios-administrador/:idUserAdmin', authMiddleware, CUserController.getUsersAdminById);
router.get('/manager/usuarios-administrador', authMiddleware, CUserController.getUsersAdmin);

router.get('/cliente/user', authMiddleware, CUserController.getUserClient);
router.post('/cliente/registro', authMiddleware, CUserController.registerUserClient);


router.get('/cliente/select/tiendas', authMiddleware, CTiendacontroller.selectTiendas);



//Manager
router.post('/manager/tienda', authMiddleware, Managercontroller.crearTienda);
router.get('/manager/tiendas', authMiddleware, Managercontroller.listarTiendas);

export { router }
