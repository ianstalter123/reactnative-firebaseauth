var React = require('react-native');
var Firebase = require('firebase');
var {
    View,
    Text,
    StyleSheet,
    Navigator
} = React;

var Signin = require('./components/authentication/signin');
var Signup = require('./components/authentication/signup');
var Tweets = require('./components/tweets/tweets');


var ROUTES = {
	signin: Signin,
	signup: Signup,
	tweets: Tweets
}

module.exports = React.createClass({

	componentWillMount: function() {
	},
	renderScene: function(route, navigator) {
		var Component = ROUTES[route.name];
		return <Component
		        route={route}
		        navigator={navigator} />;
	},
	render: function() {
		return (
			<Navigator
				style={styles.container}
				initialRoute={{name: 'signin'}}
				renderScene={this.renderScene}
				configureScene={() => { return Navigator.SceneConfigs.FloatFromRight;}}
			/>
			);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
	}
});
