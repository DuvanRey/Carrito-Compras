import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
import { compareSync } from 'bcrypt';
import { config } from '../config/config.js';
import { User } from '../models/User.js';

export const loginManager = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({
            where: { correo: username, tipo: 1 },
            raw: true
        });
        if (!user) return res.status(400).json({ message: 'El usuario no existe' })


        const isValidPassword = compareSync(password, user.password);
        if (!isValidPassword) return res.status(400).json({ message: 'Contraseña incorrecta' })
        const payload = {
            sub: user.id,
            iat: dayjs().unix(),
            exp: dayjs().add(1, 'days').unix(),
        };

        const data = {
            token: jwt.sign(payload, config.jwt.secret),
            user: {
                idUser: user.id,
                correo: user.correo,
                tipo: user.tipo,
            }
        }
        return res.status(200).json({ message: 'Consultado correctamenteo', data })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al obtener Tienda', error })
    }
}

export const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({
            where: { correo: username },
            raw: true
        });
        if (!user) return res.status(400).json({ message: 'El usuario no existe' })


        const isValidPassword = compareSync(password, user.password);
        if (!isValidPassword) return res.status(400).json({ message: 'Contraseña incorrecta' })
        const payload = {
            sub: user.id,
            iat: dayjs().unix(),
            exp: dayjs().add(1, 'days').unix(),
        };

        const data = {
            token: jwt.sign(payload, config.jwt.secret),
            user: {
                idUser: user.id,
                correo: user.correo,
                tipo: user.tipo,
            }
        }
        return res.status(200).json({ message: 'Consultado correctamenteo', data })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al obtener Tienda', error })
    }
}
export const loginCliente = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({
            where: { correo: username },
            raw: true
        });
        if (!user) return res.status(400).json({ message: 'El usuario no existe' })


        const isValidPassword = compareSync(password, user.password);
        if (!isValidPassword) return res.status(400).json({ message: 'Contraseña incorrecta' })
        const payload = {
            sub: user.id,
            iat: dayjs().unix(),
            exp: dayjs().add(1, 'days').unix(),
        };

        const data = {
            token: jwt.sign(payload, config.jwt.secret),
            user: {
                idUser: user.id,
                correo: user.correo,
                tipo: user.tipo,
            }
        }
        return res.status(200).json({ message: 'Consultado correctamenteo', data })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al ingresar', error })
    }
}

