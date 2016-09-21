/* Default view, used a few times throughout the app instead of       *
 * having to redefine a View style over and over again.               *
 * Copyright 2016 Lou George All Rights Reserved.                     */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

//Default ViewContainer which sets up the app screens to build top down
class ViewContainer extends Component{
    render() {
        return(
            <View style={styles.ViewContainer}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ViewContainer:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#ffffff',
    },
});

module.exports = ViewContainer
