
var UserList = React.createClass({

	statics: {
		contract: {
			users: {
				type: "array",
				props: _.extend({
					id: "integer",
					count: "integer"
				}, UserListItem.contract)
			}
		}
	},

	render: function () {
		var style = { margin: "50px auto", width: 400 };

		var users = this.props.users.sort(function (user1, user2) {
			return user1.count < user2.count ? 1 : -1
		}).map(function (user) {
			return <UserListItem key={user.id} user={user} />
		});

		return <ul style={style}>{users}</ul>;
	}

});
