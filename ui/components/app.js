var App = React.createClass({

	componentWillMount: function () {
		store.sync(UserList.contract, this.setState.bind(this));
	},

	render: function () {
		if (this.state) {
			return <UserList users={this.state.users} />;
		} else {
			return <p>Loading</p>;
		}
	}

});
