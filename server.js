var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var fs = require("fs");
var Q = require("q");


var db = {
	read: function () {
		var deferred = Q.defer();

		fs.readFile("server/data.json", "utf-8", function(err, content) {
			deferred.resolve(content);
		});

		return deferred.promise;
	},
	fulfill: function (contract) {
		return this.read();
	},
	write: function (changes) {
		this.read().then(function (data) {
			console.log(data);
			console.log(changes);
		});
	}
}

app.use("/ui", express.static("ui"));

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket){
	socket.on("contract", function (contract) {
		db.fulfill(contract).then(function (data) {
			socket.emit("data", data);
		})
	});

	socket.on("write", function (changes) {
		db.write(changes);
	})
});

http.listen(3000, function(){
	console.log("listening on *:3000");
});
