const sql = require("../config/db");
const UserRepository = require("../models/user.model");

UserRepository.create = (newUser, result) => {

    sql.query("INSERT INTO tb_user SET ?", newUser, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
  };
  
UserRepository.findById = (id, result) => {

    sql.query(`SELECT * FROM tb_user WHERE id = ${id}`, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the id
        result({ kind: "not_found" }, null);
});
};

UserRepository.getAll = (name, result) => {

    let query = "SELECT * FROM tb_user";

    if (name) {
        query += ` WHERE name LIKE '%${name}%'`;
    }

    sql.query(query, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tb_user: ", res);
        result(null, res);
    });
};

UserRepository.updateById = (id, user, result) => {

    sql.query(
        "UPDATE tb_user SET name = ?, email = ?, WHERE id = ?",
        [user.name, user.email, id],
        (err, res) => {

            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found User with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated user: ", { id: id, ...user });
            result(null, { id: id, ...user });
        }
    );
};

UserRepository.remove = (id, result) => {

    sql.query("DELETE FROM tb_user WHERE id = ?", id, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted user with id: ", id);
        result(null, res);
    });
};

module.exports = UserRepository;