-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: bnb2yszjtwok2gxpxhue-mysql.services.clever-cloud.com:3306
-- Tiempo de generación: 07-06-2025 a las 17:30:18
-- Versión del servidor: 8.4.2-2
-- Versión de PHP: 8.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bnb2yszjtwok2gxpxhue`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carritos`
--

CREATE TABLE `carritos` (
  `id` int NOT NULL,
  `idTienda` int NOT NULL,
  `createdBy` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carritosProductos`
--

CREATE TABLE `carritosProductos` (
  `id` int NOT NULL,
  `idCarrito` int NOT NULL,
  `idProducto` int NOT NULL,
  `cantidad` tinyint NOT NULL,
  `valorUnidad` int NOT NULL,
  `createdBy` int NOT NULL,
  `updatedBy` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int NOT NULL,
  `idTienda` int NOT NULL,
  `nombre` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` tinyint NOT NULL DEFAULT '1',
  `createdBy` int DEFAULT NULL,
  `updatedBy` int DEFAULT NULL,
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `idTienda`, `nombre`, `estado`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(13, 12, 'Frutas', 1, 20, NULL, '2025-06-06 21:41:05', '2025-06-06 21:41:05'),
(14, 12, 'Lacteos', 1, 20, NULL, '2025-06-06 21:45:44', '2025-06-06 21:45:44'),
(15, 13, 'Carnes', 1, 22, NULL, '2025-06-06 22:38:20', '2025-06-06 22:38:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int NOT NULL,
  `idTienda` int NOT NULL,
  `estado` tinyint NOT NULL,
  `valorTotal` int DEFAULT NULL,
  `observaciones` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdBy` int NOT NULL,
  `updatedBy` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `idTienda`, `estado`, `valorTotal`, `observaciones`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(8, 13, 1, 1450, NULL, 23, 23, '2025-06-06 22:42:59', '2025-06-06 22:43:00'),
(9, 12, 1, 1550, NULL, 21, 21, '2025-06-06 22:55:50', '2025-06-06 22:55:51'),
(10, 12, 1, 4500, NULL, 23, 23, '2025-06-06 22:56:40', '2025-06-06 22:56:41'),
(11, 12, 4, 450, NULL, 23, 23, '2025-06-06 23:15:27', '2025-06-06 23:20:21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidosProductos`
--

CREATE TABLE `pedidosProductos` (
  `id` int NOT NULL,
  `idPedido` int NOT NULL,
  `idProducto` int NOT NULL,
  `cantidad` tinyint NOT NULL,
  `valorUnidad` int NOT NULL,
  `despachado` tinyint DEFAULT '0' COMMENT '0=pendiente\r\n1=si\r\n2=No',
  `createdBy` int NOT NULL,
  `updatedBy` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `pedidosProductos`
--

INSERT INTO `pedidosProductos` (`id`, `idPedido`, `idProducto`, `cantidad`, `valorUnidad`, `despachado`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(13, 8, 27, 1, 100, 0, 23, 23, '2025-06-06 22:42:59', '2025-06-06 22:42:59'),
(14, 8, 31, 1, 900, 0, 23, 23, '2025-06-06 22:42:59', '2025-06-06 22:42:59'),
(15, 8, 38, 1, 450, 0, 23, 23, '2025-06-06 22:43:00', '2025-06-06 22:43:00'),
(16, 9, 28, 1, 200, 0, 21, 21, '2025-06-06 22:55:50', '2025-06-06 22:55:50'),
(17, 9, 35, 1, 900, 0, 21, 21, '2025-06-06 22:55:51', '2025-06-06 22:55:51'),
(18, 9, 38, 1, 450, 0, 21, 21, '2025-06-06 22:55:51', '2025-06-06 22:55:51'),
(19, 10, 33, 1, 1500, 0, 23, 23, '2025-06-06 22:56:40', '2025-06-06 22:56:40'),
(20, 10, 34, 1, 3000, 0, 23, 23, '2025-06-06 22:56:40', '2025-06-06 22:56:40'),
(21, 11, 38, 1, 450, 1, 23, 23, '2025-06-06 23:15:27', '2025-06-06 23:20:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int NOT NULL,
  `idCategoria` int NOT NULL,
  `sku` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` tinyint NOT NULL DEFAULT '1' COMMENT '1=activo\r\n0=inactivo',
  `precio` smallint NOT NULL,
  `stock` smallint NOT NULL,
  `imagen` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdBy` int NOT NULL,
  `updatedBy` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `idCategoria`, `sku`, `nombre`, `estado`, `precio`, `stock`, `imagen`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(27, 13, '1234', 'Pera', 1, 100, 7, 'https://parcial-aws-duvan.s3.amazonaws.com/carrito/productos/68111f7e-de97-46bc-94d8-20c8257a2015.jpg', 20, 20, '2025-06-06 21:41:51', '2025-06-06 23:10:43'),
(28, 13, '54', 'Piña', 1, 200, 10, 'https://parcial-aws-duvan.s3.amazonaws.com/carrito/productos/e060f047-3ba6-43b6-b3c1-e55267b4acfd.jpg', 20, 20, '2025-06-06 21:42:16', '2025-06-06 22:55:51'),
(29, 13, '332', 'Uva', 1, 500, 100, 'https://parcial-aws-duvan.s3.amazonaws.com/carrito/productos/73449599-40c2-4231-b292-4a0ff527c1b6.jpeg', 20, 20, '2025-06-06 21:43:06', '2025-06-06 21:43:06'),
(30, 13, '332', 'Maracuya', 1, 600, 19, 'https://parcial-aws-duvan.s3.amazonaws.com/carrito/productos/9ab8e448-76ea-4932-80e8-910bc48c6f80.avif', 20, 20, '2025-06-06 21:43:30', '2025-06-06 23:10:52'),
(31, 13, '986', 'Manzana', 1, 900, 10, 'https://parcial-aws-duvan.s3.amazonaws.com/carrito/productos/a25f2c2d-74b3-4fb8-80a3-7c48f01b836e.avif', 20, 20, '2025-06-06 21:44:30', '2025-06-06 22:42:59'),
(32, 13, '232', 'Fresa', 1, 200, 15, 'https://parcial-aws-duvan.s3.amazonaws.com/carrito/productos/32c35561-b9e0-4714-88c1-58a265a35e43.jpg', 20, 20, '2025-06-06 21:45:27', '2025-06-06 21:45:27'),
(33, 14, '454', 'Yogurt Freskaleche', 1, 1500, 18, 'https://parcial-aws-duvan.s3.amazonaws.com/carrito/productos/2be665a5-f310-429e-8df7-aa868d817e01.png', 20, 20, '2025-06-06 21:47:22', '2025-06-06 22:56:40'),
(34, 14, '2213', 'Leche Alqeria', 1, 3000, 13, 'https://parcial-aws-duvan.s3.amazonaws.com/carrito/productos/ebb4ea63-195f-4213-95c5-8de494fd69cb.png', 20, 20, '2025-06-06 21:49:25', '2025-06-06 22:56:41'),
(35, 14, '2345', 'bonyurt', 1, 900, 8, 'https://parcial-aws-duvan.s3.amazonaws.com/carrito/productos/e9617277-0412-4c44-b6b5-b304dfed522e.jpg', 20, 20, '2025-06-06 21:50:45', '2025-06-06 22:55:51'),
(36, 14, '238', 'Alpinito Fresa', 1, 500, 9, 'https://parcial-aws-duvan.s3.amazonaws.com/carrito/productos/1594b039-1861-496a-869f-48b815f9a257.jpg', 20, 20, '2025-06-06 21:52:03', '2025-06-06 23:10:56'),
(37, 14, '2356', 'Avena Alqueria', 1, 250, 11, 'https://parcial-aws-duvan.s3.amazonaws.com/carrito/productos/90263609-b64e-40d2-acf4-7625bb9fdfbd.png', 20, 20, '2025-06-06 21:53:21', '2025-06-06 21:53:21'),
(38, 14, '2212', 'Alpin', 1, 450, 5, 'https://parcial-aws-duvan.s3.amazonaws.com/carrito/productos/71e4e80c-2f4e-464a-9448-ace272a033c1.webp', 20, 20, '2025-06-06 21:55:06', '2025-06-06 23:15:28'),
(39, 15, '123456', 'Lomo', 1, 15000, 3, 'https://parcial-aws-duvan.s3.amazonaws.com/carrito/productos/c5a34305-2f2b-4607-b079-dad568356817.jpg', 22, 22, '2025-06-06 22:39:15', '2025-06-06 22:41:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiendas`
--

CREATE TABLE `tiendas` (
  `id` int NOT NULL,
  `idUserAdministrador` int NOT NULL,
  `nombre` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` tinyint NOT NULL DEFAULT '0',
  `foto` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fotoMini` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono` int NOT NULL,
  `direccion` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `apertura` tinyint NOT NULL DEFAULT '0',
  `createdBy` int NOT NULL,
  `updatedBy` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tiendas`
--

INSERT INTO `tiendas` (`id`, `idUserAdministrador`, `nombre`, `descripcion`, `estado`, `foto`, `fotoMini`, `telefono`, `direccion`, `apertura`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(12, 13, 'Tienda UTS', 'Tienda UTS para estudiantes', 1, 'https://parcial-aws-duvan.s3.amazonaws.com/carrito/tiendas/b385abaf-a3a9-4999-a4f7-4ba5e0014825.png', 'https://parcial-aws-duvan.s3.amazonaws.com/carrito/tiendas/b385abaf-a3a9-4999-a4f7-4ba5e0014825.png', 1234, 'calle de los estudiantes', 1, 1, 1, '2025-06-06 21:39:24', '2025-06-06 21:39:24'),
(13, 14, 'Exito', 'Productos frescos', 1, 'https://parcial-aws-duvan.s3.amazonaws.com/carrito/tiendas/4ce2f734-50c0-40bf-bb31-69add41fc3bf.svg', 'https://parcial-aws-duvan.s3.amazonaws.com/carrito/tiendas/4ce2f734-50c0-40bf-bb31-69add41fc3bf.svg', 123, 'Cra 21 # 13-12', 1, 1, 1, '2025-06-06 22:34:38', '2025-06-06 22:34:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `tipo` tinyint NOT NULL DEFAULT '3' COMMENT '1=manager\r\n2=administrador\r\n3=cliente',
  `estado` tinyint NOT NULL DEFAULT '1',
  `telefono` int NOT NULL,
  `correo` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `actualizarPassword` tinyint NOT NULL DEFAULT '0',
  `createdBy` int DEFAULT NULL,
  `updatedBy` int DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `tipo`, `estado`, `telefono`, `correo`, `password`, `actualizarPassword`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 0, 'manager@manager.com', '$2b$10$cjOUjWz5dQI9vNFGoO178O2oA6/daGQaTsKfb30RTVQMiZZQr5rv2', 0, NULL, NULL, '2024-11-08 02:00:19', '2024-11-17 18:14:41'),
(20, 2, 1, 12345, 'admin@admin.com', '$2b$10$V1dlLv5ACQXSy0S4Dn9.quRAJXaNTCbx.MbTbkAvaZptyqngoyO1C', 1, 1, 1, '2025-06-06 21:39:23', '2025-06-06 21:39:23'),
(21, 3, 1, 9876, 'duvan@gmail.com', '$2b$10$/TqXBFVEmcum8lKjxva0Fe7ywUH7AJ6d3Upi.rS8nZKJ9ygS4hemS', 0, NULL, NULL, '2025-06-06 22:10:14', '2025-06-06 22:10:14'),
(22, 2, 1, 123, 'joseh12@gmail.com', '$2b$10$n94eZG8dBG.4pYVH5Ob.iuF4WY066ZJlGSQa.DT/ojyjmyT6wE7AO', 1, 1, 1, '2025-06-06 22:34:37', '2025-06-06 22:34:37'),
(23, 3, 1, 123, 'pgrillo1@gmail.com', '$2b$10$TDPs6h22cDg0s7JCRkbs0eVVK0XxS7hNRr2MDynYiNZN8IwLjYPHO', 0, NULL, NULL, '2025-06-06 22:40:43', '2025-06-06 22:40:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usersAdministradores`
--

CREATE TABLE `usersAdministradores` (
  `id` int NOT NULL,
  `idUser` int NOT NULL,
  `estado` tinyint NOT NULL,
  `nombre` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fechaNacimiento` datetime NOT NULL,
  `fechaIngreso` datetime NOT NULL,
  `direccion` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdBy` int NOT NULL,
  `updatedBy` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usersAdministradores`
--

INSERT INTO `usersAdministradores` (`id`, `idUser`, `estado`, `nombre`, `apellido`, `fechaNacimiento`, `fechaIngreso`, `direccion`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(13, 20, 1, 'Duvan ', 'Rodriguez', '2000-09-13 00:00:00', '2025-06-06 00:00:00', 'calle de los estudiantes', 1, 1, '2025-06-06 21:39:23', '2025-06-06 21:39:23'),
(14, 22, 1, 'Jose', 'Hernandez', '1988-06-03 00:00:00', '2025-06-04 00:00:00', 'Cra 21 # 13-12', 1, 1, '2025-06-06 22:34:37', '2025-06-06 22:34:37');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usersClientes`
--

CREATE TABLE `usersClientes` (
  `id` int NOT NULL,
  `idUser` int NOT NULL,
  `direccion` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nombre` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `imagen` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fechaNacimiento` date NOT NULL,
  `createdBy` int NOT NULL,
  `updatedBy` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usersClientes`
--

INSERT INTO `usersClientes` (`id`, `idUser`, `direccion`, `nombre`, `apellido`, `imagen`, `fechaNacimiento`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(3, 21, 'calle 22 # 15-08', 'Duvan', 'Rodriguez', NULL, '2025-06-01', 21, 21, '2025-06-06 22:10:15', '2025-06-06 22:10:15'),
(4, 23, 'calle 56 #23-10', 'pepito', 'grillo', NULL, '2025-06-01', 23, 23, '2025-06-06 22:40:44', '2025-06-06 22:40:44');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carritos`
--
ALTER TABLE `carritos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `carritosProductos`
--
ALTER TABLE `carritosProductos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idCarrito` (`idCarrito`,`idProducto`),
  ADD KEY `pedidos_ibfk01` (`idCarrito`),
  ADD KEY `pedidos_prodcutos_ibfk02` (`idProducto`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedidosProductos`
--
ALTER TABLE `pedidosProductos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pedidos_ibfk01` (`idPedido`),
  ADD KEY `pedidos_prodcutos_ibfk02` (`idProducto`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productos_categoria01` (`idCategoria`);

--
-- Indices de la tabla `tiendas`
--
ALTER TABLE `tiendas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tienda_admin_ibfk_01` (`idUserAdministrador`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usersAdministradores`
--
ALTER TABLE `usersAdministradores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_administradores` (`idUser`);

--
-- Indices de la tabla `usersClientes`
--
ALTER TABLE `usersClientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_clientes01` (`idUser`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carritos`
--
ALTER TABLE `carritos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `carritosProductos`
--
ALTER TABLE `carritosProductos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `pedidosProductos`
--
ALTER TABLE `pedidosProductos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `tiendas`
--
ALTER TABLE `tiendas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `usersAdministradores`
--
ALTER TABLE `usersAdministradores`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `usersClientes`
--
ALTER TABLE `usersClientes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carritosProductos`
--
ALTER TABLE `carritosProductos`
  ADD CONSTRAINT `carritoibfk01` FOREIGN KEY (`idCarrito`) REFERENCES `carritos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carritos_productos_ibfk02` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedidosProductos`
--
ALTER TABLE `pedidosProductos`
  ADD CONSTRAINT `pedidos_ibfk01` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pedidos_prodcutos_ibfk02` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_categoria01` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Filtros para la tabla `tiendas`
--
ALTER TABLE `tiendas`
  ADD CONSTRAINT `tienda_admin_ibfk_01` FOREIGN KEY (`idUserAdministrador`) REFERENCES `usersAdministradores` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `usersAdministradores`
--
ALTER TABLE `usersAdministradores`
  ADD CONSTRAINT `users_administradores` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usersClientes`
--
ALTER TABLE `usersClientes`
  ADD CONSTRAINT `users_clientes01` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
