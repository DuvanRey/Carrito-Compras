import express from 'express'
import cors from "cors"
import passport from 'passport';
import bodyParser from 'body-parser';
import fileUpload from "express-fileupload";
import { jwtStrategy } from './config/passport.js';
import { tiendaDB } from "./config/DB.js"
import { router } from './routes/index.js'



const app = express();
const PORT = 4000;


app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use(express.json({ limit: '20mb' }));


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use(fileUpload());
app.use(cors());


app.get('/', (req,res)=>{
    res.send('REST API FROM UNIDADE Duvan')
})


tiendaDB.authenticate()
	.then(() => console.log("Database carrito!!!"))
	.catch((err) => console.log(err));


app.use('/api', router)


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

