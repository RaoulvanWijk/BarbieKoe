import mysql from "mysql2";

const conn = mysql.createConnection({
  host:"localhost",
  port: 3306,
  user:"root",
  password:"",
  database:"barbiekoe",
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