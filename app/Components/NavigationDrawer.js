/* This is the navigation drawer. It is accessable from only certain  *
 * screens via swipe in from left or from the hamburger button. It    *
 * takes in a navigator reference from the screen calling it, and     *
 * the title of the screen it came in from as a string to keep from   *
 * navigating to the same screen again causing the stack to grow      *
 * with no way to pop the screen off.                                 *
 * 'navigator' send in this.props.navigator                           *
 * 'callingScreen' send in the string you would send the navigator    *
 * Copyright 2016 Lou George All Rights Reserved.                     */


import React, {Component} from 'react';
import {StyleSheet, Text, View,TouchableOpacity, ScrollView, Alert,
        Navigator, Dimensions, ListView, Image, PropTypes} from 'react-native';

//Custom Components
import ViewContainer from '../../app/Components/ViewContainer';
import StatusBarFiller from '../../app/Components/StatusBarFiller';
import MainMenu from '../../app/Screens/MainMenuScreen';
import ClaimData from '../../app/Data/MockData';

//packages
import Icon from 'react-native-vector-icons/FontAwesome';

const colorTheme = '#007ACC';

//globals
const window = Dimensions.get('window');

const menu = [
    {item: "News Feed", icon: "newspaper-o"},
    {item: "Contacts", icon: "group"},
    {item: "Financial", icon: "money"},
    {item: "Medical", icon: "plus"},
    {item: "Calendar", icon: "calendar"},
    {item: "Claim Information", icon: "legal"},
    {item: "Message Center", icon: "envelope"},
];

//Main navigation for the app
class NavigationDrawer extends Component {
    //Necessary constructor for ListView. The code is really wonky,
    //because facebook still hasn't implemented a better syntax for
    //a listview but this does work completely, so don't worry about it
    //too much. Still easier than doing it natively.
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2});
        var ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
        this.state ={
            menuDataSource: ds.cloneWithRows(menu),
            claimNumber: ClaimData.getClaim(0),
        };
    }

    //Render Drawer Menu
    _renderMenuRow(menuInfo){
        return(
            <View style={styles.drawerRows}>
                <TouchableOpacity onPress={(event) => this._navigateToMenuItem(menuInfo.item)}>
                    <View style={styles.splitIconAndInfo}>
                        <View style={styles.iconContainer}>
                            <Icon name={menuInfo.icon} size={30} color={'#555555'} />
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={{paddingTop: 5, fontSize: 15}}> {menuInfo.item} </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    _navigateToMenuItem(menuItem){
        if (menuItem == this.props.callingScreen) {
            return;
        }

        switch (menuItem) {
            case 'News Feed':
                this.props.navigator.replaceWithAnimation({ident: "News Feed"});
                break;
            case 'Contacts':
                this.props.navigator.replaceWithAnimation({ident: "Contacts"});
                break;
            case 'Financial':
                this.props.navigator.replaceWithAnimation({ident: "Financial"});
                break;
            case 'Message':
                this.props.navigator.replaceWithAnimation({ident: "Message"});
                break;
            case 'Medical':
                this.props.navigator.replaceWithAnimation({ident: "Medical"});
                break;
            case 'Message Center':
                this.props.navigator.replaceWithAnimation({ident: "Message Center"});
                break;
            case "Claim Information":
                this.props.navigator.replaceWithAnimation({ident: "Claims", 
                                                           claim: ClaimData.getCurrentClaim()});
                break;
            case 'Logout':
                this.props.navigator.popToTop();
        };
    }

    retFunction(){
        return (navigationView);
    }

    _changeClaim(claim){
        this.setState({claimData: ClaimData.chooseDifferentClaim(claim)});
        claimData = ClaimData.getCurrentClaim;
    }

    render(){
        return (
            <View style={styles.navDrawer}>
                {/* Top of the navigation drawer (background + user profile) */}
                <View style={{height:20, backgroundColor: colorTheme}} />
                <ScrollView>
                    <View style={styles.topImage}>
                        <Image style={{resizeMode: 'cover', width: 300, height: 150, flex: 1}}
                               source={require('../../img/SanFranciscoBackground.png')}>
                            <TouchableOpacity onPress={() => Alert.alert(
                                "Pick a claim",
                                "Select a claim from below",
                                [
                                    {text: ClaimData.getClaim(0), 
                                     onPress: () => this.setState({claimNumber: ClaimData.chooseDifferentClaim(0)})},
                                    {text: ClaimData.getClaim(1), 
                                     onPress: () => this.setState({claimNumber: ClaimData.chooseDifferentClaim(1)})},
                                    {text: ClaimData.getClaim(2), 
                                     onPress: () => this.setState({claimNumber: ClaimData.chooseDifferentClaim(2)})},
                               ]
                            )}>
                                <View style={styles.circleBackground}>
                                    <Icon name='file-text-o' size={40} color={'#ffffff'}/>
                                    <Text style={{color:'#ffffff', fontSize: 10, paddingTop: 2}}>
                                        {`#${this.state.claimNumber}`}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.identity}>
                                <Text style={styles.firstAndLastName}>
                                    First Last
                                </Text>
                                <Text style={styles.username}>
                                    username@gmail.com
                                </Text>
                            </View>
                        </Image>
                    </View>

                    {/* The actual navigation menu */}
                    <View style={{borderBottomWidth: 1, borderBottomColor: '#666666', padding: 5}}>
                        <Text style={{marginLeft: 3, fontSize: 17, color: '#666666'}}>
                            Navigation
                        </Text>
                    </View>
                    <ListView
                        dataSource={this.state.menuDataSource}
                        renderRow={(menuRow) => {return this._renderMenuRow(menuRow)}}
                        removeClippedSubviews={false}
                        initialListSize={10}
                    />
                </ScrollView>

                {/* Menu on the bottom of the dash that hovers above the ListView */}
                <View style={styles.bottomHoverMenu}>
                    {/* About option */}
                    <TouchableOpacity onPress={(event) => console.log("About")}>
                        <View style={styles.splitIconAndInfo}>
                            <View style={styles.iconContainer}>
                                <Icon name='info-circle' size={30} color={'#555555'} />
                            </View>
                            <View style={{marginTop: 10}}>
                                <Text style={{paddingTop: 5, fontSize: 15}}> About </Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Settings option */}
                    <TouchableOpacity onPress={() => console.log("Settings")}>
                        <View style={styles.splitIconAndInfo}>
                            <View style={styles.iconContainer}>
                                <Icon name='gear' size={30} color={'#555555'} />
                            </View>
                            <View style={{marginTop: 10}}>
                                <Text style={{paddingTop: 5, fontSize: 15}}> Settings </Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Logout option */}
                    <TouchableOpacity onPress={(event) => this._navigateToMenuItem("Logout")}>
                        <View style={styles.splitIconAndInfo}>
                            <View style={styles.iconContainer}>
                                <Icon name='arrow-circle-left' size={30} color={'#555555'} />
                            </View>
                            <View style={{marginTop: 10}}>
                                <Text style={{paddingTop: 5, fontSize: 15}}> Logout </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        flexDirection: 'column',
    },

    navDrawer: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginRight: 5,
    },

    drawerMenuText: {
        fontSize: 20,
        color: '#000000',
    },

    iconContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingLeft: 5,
        paddingRight: 10,
        paddingBottom: 5,
        width: 50,
    },

    drawerRows: {
        flex: 1,
        marginTop: 3,
        marginBottom: 3,
    },

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 10,
    },

    topImage: {
        width: 300,
        height: 150,
        flexDirection: 'column',
    },

    circleBackground: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        overflow: 'hidden',
        backgroundColor: colorTheme,
        width: 70,
        height: 70,
        marginLeft: 30,
        marginTop: 35,
    },

    identity: {
        alignItems: 'flex-start',
        marginTop: 10,
        marginLeft: 10,
    },

    splitIconAndInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flex: 1,
    },

    firstAndLastName: {
        fontSize: 12, 
        fontWeight: 'bold', 
        color: '#ffffff', 
        backgroundColor: 'transparent'
    },

    username: {
        fontSize: 12, 
        color: '#ffffff', 
        backgroundColor: 'transparent'
    },

    bottomHoverMenu: {
        flexDirection: 'column',
        alignItems: 'stretch',
        paddingTop: 5,
        paddingBottom: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0,
        },
    },
});

module.exports = NavigationDrawer;
