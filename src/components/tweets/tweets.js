var React = require('react-native');
var Firebase = require('firebase');
var Login = new Firebase('https://crackling-fire-8350.firebaseio.com');
var Button = require('../common/button')
var {
	View,
	StyleSheet,
	Text
} = React;

module.exports = React.createClass({
	getInitialState: function() {
		return {
			user: null
		};
	},
	componentWillMount: function() {
		var authData = Login.getAuth();
if (authData) {
  console.log("Authenticated user with uid:", authData.uid);
  this.setState({user: authData.uid})
}
	},

	render: function() {
		if(!this.state.user) {
			return <Text>Loading...</Text>
		}

		var user = this.state.user;

		return (
			<View style={styles.container}>
				<Text> Welcome back, {user} </Text>
			 <Button text={'Sign out'} onPress={this.onSignout} />

			</View>
			)
	},
		onSignout: function() {
			Login.unauth();
			this.props.navigator.push({name: 'signin'})
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})
