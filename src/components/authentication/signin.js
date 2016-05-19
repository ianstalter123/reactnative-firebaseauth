var React = require('react-native');
var Firebase = require('firebase');
var Login = new Firebase('https://myfirebase.com');


var {
	View,
	Text,
	StyleSheet,
	TextInput
} = React;

var Button = require('../common/button');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			username: 'default',
			password: '',
			errorMessage: ''
			}
	},
	render: function() {
		return(
			<View style={styles.container}>
				<Text style={styles.label}>Sign In</Text>

				<Text style={styles.label}>Username:</Text>
				<TextInput
				 style={styles.input}
				 value={this.state.username}
				 onChangeText={(text) => this.setState({username: text})}
				 />

				<Text style={styles.label}>Password:</Text>
				<TextInput
				secureTextEntry={true}
				style={styles.input}
				value={this.state.password}
				onChangeText={(text) => this.setState({password: text})} />

				<Text style={styles.label}> {this.state.errorMessage}</Text>
				<Button text={'Sign in'}
				onPress={this.onPress} />
				<Button text={'I need an account...'} onPress={this.onSignupPress} />
			</View>
			);
	},
	onSignupPress: function() {
		this.props.navigator.push({name: 'signup'})
	},
	onPress: function() {
		Login.authWithPassword({
  email    : this.state.username,
  password : this.state.password
	}, function(error, authData){
		if (error) {
    console.log("Login Failed!", error),
    this.setState({errorMessage: error.message})
  } else {
    console.log("Authenticated successfully with payload:", authData);
  	this.setState({errorMessage: ''})
  	this.props.navigator.immediatelyResetRouteStack([{ name: 'tweets'}]);

  }
	}.bind(this))
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	input: {
		padding: 4,
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 5,
		margin: 5,
		width: 200,
		alignSelf: 'center'
	},
	label: {
		fontSize: 25
	}
});
