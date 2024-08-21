import dotenv from 'dotenv';
import path from 'path';


dotenv.config({path: path.join(process.cwd(), '.env')});

export default{
   port: process.env.PORT,
   db_url: process.env.DB_URL,
   bycrypt_salt_rounds: process.env.BYCRYPT_SALT_ROUNDS,
   default_password: process.env.DEFAULT_PASS,
   node_env: process.env.NODE_ENV
}