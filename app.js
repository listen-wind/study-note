const http = require('http')
const fs = require('fs')

function showMem() {
  var mem = process.memoryUsage();

  console.log('Process: heapTotal ' + format(mem.heapTotal) +
    ' heapUsed ' + format(mem.heapUsed) + ' rss ' + format(mem.rss));
  console.log('-----------------------------------------------------------');
};

function format(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
};

function useMem() {
  var size = 8 * 1024;
  var arr = new Buffer(size);

  arr.fill(0);

  return arr;
}

var total = [];

for (var i = 0; i < 50; i++) {
  showMem();
  total.push(useMem());
}

var leakArray = [];
// var leak = function () {
//   leakArray.push("leak" + Math.random());
// };

// http.createServer(function (req, res) {
//   leak();
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello World\n');
// }).listen(1337);

// console.log('Server running at http://127.0.0.1:1337/');

// var reader = fs.createReadStream('./files/outfiles.text');
// var writer = fs.createWriteStream('./files/infiles.text');

// reader.on('data', function (chunk) {
//   writer.write(chunk)
// })

// reader.on('end', function () {
//   writer.end();
// })
