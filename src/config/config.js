import "dotenv/config"

export const config = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    DB: {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
    jwt:{
        secret:process.env.JWT_SECRET
    },
        aws: {
        accesKeyId:process.env.AWS_ACCESS_KEY_ID,
        secretAccesKey:process.env.AWS_SECRET_ACCESS_KEY,
        defaultRegion:process.env.AWS_DEFAULT_REGION,
        bucket:process.env.AWS_BUCKET
    },
}
