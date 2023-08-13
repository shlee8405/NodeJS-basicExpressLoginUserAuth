pool = require("../utils/db.js");

module.exports = {
  async read(username) {
    try {
      const conn = await pool.getConnection();
      const sql = "SELECT id,username,email,role FROM USERS WHERE username = ?";
      const rows = await conn.query(sql, username);
      conn.release(); // Use release instead of end
      if (rows.length == 1) {
        return rows[0];
      } else {
        return null; // Return null instead of false
      }
    } catch (err) {
      throw err;
    }
  },

  async list() {
    try {
      const conn = await pool.getConnection();
      const sql = "SELECT id,username,email,role FROM USERS";
      const rows = await conn.query(sql);
      conn.release(); // Use release instead of end
      return rows;
    } catch (err) {
      throw err;
    }
  },

  async areValidCredentials(username, password) {
    try {
      const conn = await pool.getConnection();
      const sql = "SELECT pass FROM USERS WHERE username = ?";
      const rows = await conn.query(sql, username);
      conn.release(); // Use release instead of end

      if (rows.length == 1 && rows[0].pass === password) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  }
};
