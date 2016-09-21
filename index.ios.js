/* Just redirects to the actual app files when launching off of ios   *
 * platform                                                           *
 * Copyright 2016 Lou George All Rights Reserved.                     */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Navigator, View, InteractionManager } from 'react-native';
import AppNavigator from './app/Navigation/AppNavigator';

//Basically only redirects to the default first screen

import SpinKit from 'react-native-spinkit';

const colorTheme = '#007ACC';


class MWCTesting extends Component {
    constructor(props){
        super(props);
        this.state = {renderPlaceHolderOnly: true};
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceHolderOnly: false});
        });
    }

    _renderPlaceholderView() {
        return(
            <View style={styles.loadingScreen}>
                <SpinKit style={styles.spinner} isVisible={true} size={60} type='Circle' color={colorTheme} />
            </View>
        )
    }

    render() {
        if (this.state.renderPlaceHolderOnly) {
            return this._renderPlaceholderView();
        }
        return(
            <AppNavigator initialRoute={{ident: "Login"}} />
        );
    }
}

const styles = StyleSheet.create({
    loadingScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

AppRegistry.registerComponent('MWCTesting', () => MWCTesting);
