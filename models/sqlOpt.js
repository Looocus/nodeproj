module.exports = function (timestamp, email, code, flag, connection) {
  //console.log('sql');
  //train为表名
  if(flag === 1){
    //console.log('1');
    var insertSql = 'INSERT INTO train (timestamp, email, code) VALUES (?,?,?)';
    var insertParams = [timestamp, email, code];
    connection.query(insertSql, insertParams, function (err) {
      if(err){
        console.log('[INSERT ERROR] - ', err.message);
        return {};
      }
    });
  };
  if(flag === 2){
    console.log('2');
    var selectSql = 'SELECT * FROM train';
    connection.query(selectSql, function (err, result) {
      if(err) {
        console.log('[SELECT ERROR] - ', err.message);
        return {};
      };
      console.log(result);
    });
  };
  if(flag === 3){
    //console.log('3');
    this.queryResult = function (callback) {
      var querySql = 'SELECT * FROM train where email = ? order by timestamp desc limit 1';
      var queryParams = [email];
      var resultFn;
      connection.query(querySql, queryParams, function (err, result) {
        if (err) {
          console.log('[SELECT ERROR] - ', err.message);
          return {};
        };
        resultFn = {codee: result[0]['code'], timestampp: result[0]['timestamp']};
        //console.log(result[0]['code']);
        //{codee: result[0]['code'], timestampp: result[0]['timestamp']};
        callback(resultFn);
      });
    };
  };
};
