var store = (function () {

	var socket = io(),
		data = {},
		changeListeners = [];

	function log(message, data) {
		console.info("STORE", "::", message, data)
	}

	function triggerChange() {
		log("change", data);

		changeListeners.forEach(function (listener) {
			listener(data);
		});
	}

	function request(method, data) {
		return fetch("/server/" + method + ".php", {
			method: "post",
			body: JSON.stringify(data)
		}).then(function(response) {
			return response.json();
		}).catch(function(exception) {
			console.info("ERROR", exception);
		});
	}

	function updateData(newData) {
		data = newData;
		triggerChange();
	}

	return {
		sync: function (contract, listener) {
			// log("sync contract", contract);

			socket.on("data", function (msg) {
				listener(JSON.parse(msg));
			});

			socket.emit("contract", contract);

			// request("read", contract).then(updateData);
		},

		write: function (changes) {
			log("writing", changes);
			socket.emit("write", changes);
			// request("write", changes).then(updateData);
		}
	};

}());
