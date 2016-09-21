import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Navigator, View } from 'react-native';
import AppNavigator from './app/Navigation/AppNavigator';

//Basically only redirects to the default first screen
class MWCTesting extends Component {
    render() {
        return(
            <AppNavigator initialRoute={{ident: "Login"}} />
        );
    }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('MWCTesting', () => MWCTesting);
