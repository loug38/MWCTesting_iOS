/* Fills out the statusBar at the top of the app that shows network,  *
 * clock, battery and takes in 1 parameter:                           *
 * backgroundColor: pass in a color value                             *
 * Copyright 2016 Lou George All Rights Reserved.                     */

import React, {Component} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';

class StatusBarFiller extends Component{
    render(){
        return(
            <StatusBar
                barStyle='light-content'
                backgroundColor={this.props.backgroundColor}
            />
        );
    }
}

const styles = StyleSheet.create({
    statusBar: {
        height: 20,
    },
});

module.exports = StatusBarFiller;
