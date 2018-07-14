const mysql = require("mysql");
const colors = require("colors/safe");
const pool = require("../connectionPool");

class skin {
  constructor(uuid, caption, category) {
    /**
     * create a new skin
     */
    this.uuid = uuid;
    this.caption = caption;
    this.category = category;
  }
  save() {
    /**
     * saves the new skin to database.
     */
    pool.getConnection((error, connection) => {
      const sql = `INSERT INTO skininfo(uuid,caption,category)
        VALUES(${mysql.escape(this.uuid)},${mysql.escape(
        this.caption
      )},${mysql.escape(this.category)})`;
      connection.query(sql, function(err, result) {
        connection.release();
        if (err) throw err;
      });
    });
  }
  load(category = "all") {
    /**
     * Retreives skins from the database that matches the given category.
     * This method uses MYSQL regular expressions
     */
    category === "all"
      ? /**
         * match any character including carriage return and new line
         */
        (filter = "REGEXP '^f.*$'")
      : (filter = category
          .split("-")
          .map(category => {
            /**
             * this enables it to combine an abitrary number of categories in the search parameters
             */
            let concat = (concat += `REGEXP '^(${mysql.escape(
              category
              /**
               * match one or more existence of 'category' in string
               */
            )})*$' &`);
            return concat;
          })
          /**
           * remove the final '&' to prevent sql error
           */
          .slice(0, -1));

    pool.getConnection((error, connection) => {
      if (error) throw error;
      const sql = `SELECT * FROM skininfo WHERE (category ${mysql.escape(
        filter
      )}) `;
      connection.query(sql, (err, result) => {
        connection.release();
        if (err) throw err;
        this.loadedSkins = result;
      });
    });
    return this.loadedSkins;
  }
  addLike(uuid) {
    pool.getConnection((error, connection) => {
      if (error) throw error;
      /**
       * increment the likes by 1
       */
      const sql = `UPDATE skininfo
      SET likes = likes + 1 
       WHERE uuid= ${mysql.escape(uuid)}`;
      connection.query(sql, function(err, result) {
        connection.release();
        if (err) throw err;
      });
    });
  }
  info(uuid){
    pool.getConnection((error, result) =>{
      if(error) throw error
      const sql = `SELECT caption,category FROM skininfo WHERE uuid = ${mysql.escape(
        uuid
      )}`;
      connection.query(sql, (err, result) =>{
        connection.release();
        if (err) throw err;
        this.infoResult = result 
      });
    });

    return this.infoResult
  }
}

module.exports = {
skin
};
