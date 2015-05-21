var actions = {
	increment: function (id, newCount) {
		store.write({
			users: [
				{ id: id, count: newCount }
			]
		});
	}
}
