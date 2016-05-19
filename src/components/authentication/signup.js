var React = require('react-native');
var Firebase = require('firebase');
var Login = new Firebase('https://myfirebase.firebaseio.com');

var {
	Text,
	View,
	StyleSheet,
	TextInput
} = React;

var Button = require('../common/button')
module.exports = React.createClass({
	getInitialState: function() {
		return {
			username: '',
			password: '',
			errorMessage: ''
		}
	},
	render: function() {
		return (
			<View style={styles.container}>
				<Text> Sign Up</Text>

				<Text style={styles.label}> Username: </Text>
				<TextInput
					value={this.state.username}
					onChangeText={(text) => this.setState({username:text})}
					style={styles.input} />

				<Text style={styles.label}> Password: </Text>
				<TextInput
					secureTextEntry={true}
					value={this.state.password}
					onChangeText={(text) => this.setState({password:text})}
					style={styles.input} />

			<Text style={styles.label}> {this.state.errorMessage}</Text>

			<Button text={'Signup'} onPress={this.onSignUpPress} />

			<Button text={'I have an account'} onPress={this.onSigninPress}/>



			</View>
		);
	},
	onSignUpPress: function() {
		Login.createUser({
  email: this.state.username,
  password: this.state.password
}, function(error, userData) {
  if (error) {
    switch (error.code) {
      case "EMAIL_TAKEN":
        console.log("The new user account cannot be created because the email is already in use.");
        this.state.errorMessage = error.message;
        break;
      case "INVALID_EMAIL":
        console.log("The specified email is not a valid email.");
        this.state.errorMessage = error.message;
        break;
      default:
        console.log("Error creating user:", error);
        this.state.errorMessage = error.message;
    }
  } else {
    console.log("Successfully created user account with uid:", userData.uid);
		this.props.navigator.immediatelyResetRouteStack([{ name: 'tweets'}]);
  }
}.bind(this))
	},
	onSigninPress: function() {
			this.props.navigator.pop();
	}
})

var styles = StyleSheet.create({
		container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white'
	},
	label: {
		fontSize: 18
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
	}
})
