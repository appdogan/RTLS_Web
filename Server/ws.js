const dgram = require('dgram');
const server = dgram.createSocket('udp4');
server.bind(5678);
var io = require('socket.io').listen(3000);
io.sockets.on('connection', function (socket) {
    server.on("message", function (data) {
        //console.log("--" + data.length + "--");
        if (data.length == 4) {
            console.log(data[0] + "," + data[1] + "," + data[2] + "," + data[3]);
            socket.emit('mesajgitti', data[0] + "," + data[1] + "," + data[2] + "," + data[3]);
        } else if (data.length == 13) {
            console.log(data[1] + "," + data[2] + "," + data[3] + "," + data[4] + "," + data[5] + "," + data[6] + "," + data[7] + "," + data[8] + "," + data[9] + "," + data[10] + "," + data[11]);
            socket.emit('mesajgitti', data[1] + "," + data[2] + "," + data[3] + "," + data[4] + "," + data[5] + "," + data[6] + "," + data[7] + "," + data[8] + "," + data[9] + "," + data[10] + "," + data[11]);
        } else {
            var v = '';
            for (var i = 0; i < data.length; i++) {
                if (v == '') {
                    v = data[i];
                } else {
                    v += ',' + data[i];
                }
            }
            console.log(v);
            socket.emit('mesajgitti', v);
        }
    });
});
server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});
server.on('listening', () => {
    const address = server.address();
    console.log(`Server Baglantisi ${address.address}:${address.port}`);
});
var client = dgram.createSocket('udp4');
var message = new Buffer([0x4, 0xFF]);
function intervalFunc() {
    client.send(message, 0, message.length, 4211, "192.168.10.50", function (err, bytes) {
        if (err) throw err;
        console.log('UDP message sent to 192.168.10.50:4211');
        //client.close();
    });
}