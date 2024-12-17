const mysql = require("mysql2");

let connection = null;

async function createConnection() {
    return new Promise((resolve, reject) => {
        if (connection == null) {
            connection = mysql.createConnection({
                host: "localhost",
                port: 3306,
                user: "root",
                database: "inventrak_web"
            });

            connection.connect((oError) => {
                if (oError == null) {
                    resolve(connection);
                } else {
                    reject(oError);
                }
            })
        } else {
            resolve(connection);
        }
    });
}

async function exec(sQuery, oParameter) {
    return new Promise(function (resolve, reject) {
        createConnection()
            .then((connection) => {
                connection.execute(sQuery, oParameter, function (oError, oResult, oField) {
                    if (oError == null) {
                        resolve({
                            result: oResult,
                            field: oField
                        });
                    } else {
                        reject(oError);
                    }
                })
            })
            .catch((oError) => reject(oError))
    });
}

module.exports = {
    exec
};