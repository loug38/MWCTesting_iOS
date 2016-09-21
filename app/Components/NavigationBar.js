/* NavigationBar is the bar at the top. The top left always has a     *
 * angle-left icon and a word after it. The word can be passed in,    *
 * but generally should be 'back' or something of the sort since it   *
 * pops the navigator stack. Overall it takes 5 parameters:           *
 * backgroundColor: the background color                              *
 * leftWord: the word on the top left (generally "back")              *
 * navBarTitle: In the center, the title of the current page          *
 * rightWord: the word on the top right (generally "add")             *
 * nav: the navigator reference from where its coming from so you     *
 * can back out to previous screen (pop screen off the stack.)        *
 * Copyright 2016 Lou George All Rights Reserved.                     */

import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

//Custom Components
import StatusBarFiller from './StatusBarFiller';
import Icon from '../../node_modules/react-native-vector-icons/FontAwesome';
import ViewContainer from './ViewContainer';

//Globals
var colorTheme = '#007ACC';

class NavigationBar extends Component{
    render(){
        return(
            <View backgroundColor={this.props.backgroundColor}>
                <StatusBarFiller backgroundColor="#007AFF" />
                <View style={styles.navBar}>
                    <View style={styles.navBarTitleContainer}>
                        <Text style={styles.navBarTitle}>
                            {this.props.title}
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => this.props.nav.pop()}>
                            <Icon name='angle-left' size={20} style={styles.backIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.nav.pop()}>
                            <Text style={styles.backText}>
                                {this.props.leftWord}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => this.props.nav.push({ident: this.props.navTo,})}>
                            <Text style={styles.forwardText}>
                                {this.props.rightWord}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    navBar: {
        marginTop: 20,
        height: 40,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 10,
    },

    backIcon:{
        color: '#ffffff',
        alignSelf: 'flex-start',
        width: 30,
        paddingLeft: 10,
    },

    forwardIcon:{
        color: '#ffffff',
        alignSelf: 'flex-start',
        width: 30,
        paddingRight: 10,
    },

    backText:{
        color: '#ffffff',
        fontSize: 16,
        paddingRight: 10,
        alignSelf: 'flex-start'
    },

    forwardText:{
        color: '#ffffff',
        fontSize: 16,
        paddingLeft: 10,
        alignSelf: 'flex-end',
    },

    navBarTitle:{
        color: '#ffffff',
        fontSize: 20,
        alignItems: 'center',
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
});

module.exports = NavigationBar;
