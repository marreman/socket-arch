var UserListItem = React.createClass({
	statics: {
		contract: {
			id: "integer",
			name: "sstring"
		}
	},
	render: function () {
		var styles = { color: "blue", fontSize: 50 };

		return (
			<li style={styles.name} onClick={this.click}>
				{this.props.user.name}
			</li>
		)
	},
	click: function () {
		actions.increment(this.props.user.id, this.props.user.count + 1);
	}
});
