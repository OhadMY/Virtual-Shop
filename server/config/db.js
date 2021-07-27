// const mysql = require("mysql");

// const connectToSQL = async () => {
//   try {
//     await mysql.createConnection({
//       host: "localhost",
//       user: "root",
//       password: "",
//       database: "fourth_project",
//     });

//     console.log("Connected to SQL");
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = { connectToSQL };

const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fourth_project",
});

con.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MySQL");
  }
});

const myQuery = (q) => {
  return new Promise((resolve, reject) => {
    con.query(q, (err, results) => {
      if (err) {
        reject(err);
        console.log(err);
      } else {
        resolve(results);
        console.log(results);
      }
    });
  });
};

module.exports = { myQuery };
