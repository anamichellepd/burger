// Import MySQL connection.
var connection = require("../config/connection.js");

//ORM
console.log("running connection");

//adds question marks for mySQL values
function printQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

//convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];
  //key value to string
  for (var key in ob) {
    var value = ob[key];
    //check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      //if string with spaces, add quotations
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + vlue + "'";
      }
      arr.push(key + "=" + value);
    }
  }

  return arr.toString();
}
var orm = {
  read: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  create: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO" + table;
    queryString += "(";
    queryString += cols.toString();
    queryString += ")";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString = +")";

    console.log(queryString);
    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;
    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  delete: function(table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};
//selectAll()
//insertOne()
//updateOne()

// Export the orm object for the model (burger.js).
module.exports = orm;
