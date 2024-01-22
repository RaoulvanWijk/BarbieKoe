import mysql from "mysql2";

export const query = (query: string, values?: object | null) => {
  return new Promise((resolve, reject) => {
    const conn = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      multipleStatements: true,
    });

    conn.query(query, values, (err: any, res: any) => {
      if (err) {
        conn.end();
        reject(err);
      } else {
        conn.end();
        resolve(res);
      }
    });
  });
};
