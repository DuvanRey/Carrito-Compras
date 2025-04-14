import express from 'express'
import cors from "cors"
import fs from "fs"
import { tiendaDB } from "./config/DB.js"
import { router } from './routes/index.js'



const app = express();
const PORT = 4000;

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({extended:false}));

// app.use(cors());
// app.options('*', cors());


app.get('/', (req,res)=>{
    res.send('REST API FROM UNIDADE Duvan')
})


tiendaDB.authenticate()
	.then(() => console.log("Database manager Authenticated!!!"))
	.catch((err) => console.log(err));

tiendaDB.sync()
	.then(() => console.log("Database manager Synced!!!"))
	.catch((err) => console.log(err));

app.use('/api', router)


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

