var styles = {
	name: {
		color: "blue",
		fontSize: 50
	}
};

var UserListItem = React.createClass({
	statics: {
		contract: {
			id: "integer",
			name: "string"
		}
	},
	render: function () {
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
