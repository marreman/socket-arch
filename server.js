var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var fs = require("fs");
var Q = require("q");

var contracts = {

	user: {
		id: "integer",
		name: "string",
		count: "integer"
	},

	validate: function (applicants) {
		var contract, name, applicant;

		for (name in applicants) {
			if (!this.hasOwnProperty(name)) {
				throw new Error("Contract '" + name + "' does not exist")
			}

			contract = this[name];
			applicant = applicants[name];

			for (prop in applicant) {
				if (!contract.hasOwnProperty(prop)) {
					throw new Error("Contract '" + name + "' does not have property " + prop);
				}

				if (contract[prop] !== applicant[prop]) {
					throw new Error("Contract '" + name + "'s property " + prop + " is not of type " + applicant[prop]);
				}
			}
		}
	}

}


var db = {
	read: function () {
		var deferred = Q.defer();

		fs.readFile("server/data.json", "utf-8", function(err, content) {
			deferred.resolve(content);
		});

		return deferred.promise;
	},
	fulfill: function (contract) {
		try {
			contracts.validate(contract);
			return this.read();
		} catch (error) {
			console.log(error)
		}
	},
	write: function (changes) {
		this.read().then(function (data) {
			console.log(data);
			console.log(changes);
		}).catch(function () {
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
		}).catch(function () {
			console.log("error");
		});
	});

	socket.on("write", function (changes) {
		db.write(changes);
	})
});

http.listen(3000, function(){
	console.log("listening on *:3000");
});
