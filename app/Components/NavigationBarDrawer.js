/* NavigationBarDrawer is the same as navigation bar, but instead of  *
 * having a back button on the top left, it has the 'hamburger'       *
 * button which shows the navigation drawer. This should be used only *
 * on certain pages. It takes in 2 parameters:                        *
 * navigator reference: this.props.navigator from screen calling      *
 * callingScreen: the string that would be sent to navigator          *
 * Copyright 2016 Lou George All Rights Reserved.                     */

import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

import StatusBarFiller from './StatusBarFiller';
import Icon from '../../node_modules/react-native-vector-icons/FontAwesome';
import ViewContainer from './ViewContainer';

var colorTheme = '#007ACC';
var showRight = true;

class NavigationBarDrawer extends Component{
    render(){
        return(
            <View backgroundColor={this.props.backgroundColor}>
                <StatusBarFiller backgroundColor="#007AFF" />
                <View style={styles.mainMenuNavBar}>
                    <View style={styles.navBarTitleContainer}>
                        <Text style={styles.navBarTitle}>
                            {this.props.title}
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={this.props.action}>
                            <Icon name='bars' size={20} style={styles.drawerIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainMenuNavBar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },

    navBarTitleContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    navBarTitle:{
        color: '#ffffff',
        marginTop: 20,
        fontSize: 20,
        alignItems: 'center',
    },

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 10,
    },

    drawerIcon:{
        color: '#ffffff',
        alignSelf: 'flex-start',
        width: 30,
        marginLeft: 10,
        marginTop: 20,
    },
});

module.exports = NavigationBarDrawer;
