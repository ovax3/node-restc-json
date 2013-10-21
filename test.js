var http = require('http');
var assert = require('assert');
var restc = require('restc');

var server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('{"message":"Hello World"}');
});

var client = restc(
  {
    port: 1337
  },
  require('./index')
);

server.listen(1337, '127.0.0.1', function () {
  console.log('Server running at http://127.0.0.1:1337');

  client.post('/', { message: 'hey' }, function (err, req, res, data) {
    if (err) throw err;
    console.log(req.options.data);
    console.log(req.options.body);
    console.log(res.body);
    console.log(res.data);
    assert.deepEqual(req.options.body, '{"message":"hey"}');
    assert.deepEqual(res.data, { message: 'Hello World' });
    process.exit();
  });

});

