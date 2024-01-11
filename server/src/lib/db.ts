import mysql from "mysql2";

const conn = mysql.createConnection({
  host:process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME,
});

conn.connect((err)=> {
  if(err) {
  return    console.log(err);
  } else {
      console.log("Connected!")
  }
});

export const query = (query: string, values?: object|null) => {
  return new Promise((resolve, reject) => {
    conn.query(query, values, (err: any, res: any) => {
      if (err) reject(err)
      else resolve(res)
    })
  })

}

export default conn;