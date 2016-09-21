/* Main Menu screen is acutally just the NewsFeed scene, and it uses  *
 * a naviation drawer. Not much to it, this is the screen that is     *
 * displayed upon login.                                              *
 * navigator string: "MainMenu"                                       *
 * Copyright 2016 Lou George All Rights Reserved.                     */

import React, {Component} from 'react';
import {StyleSheet, AppRegistry, Text, View,TouchableOpacity, ScrollView,
        Navigator, Dimensions, InteractionManager, ListView, Image,} from 'react-native';

//Custom Components
import ViewContainer from '../../app/Components/ViewContainer';
import StatusBarFiller from '../../app/Components/StatusBarFiller';
import NavigationBarDrawer from '../../app/Components/NavigationBarDrawer';
import NavigationDrawer from '../../app/Components/NavigationDrawer';

//packages
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from 'react-native-button';
import DrawerLayout from 'react-native-drawer-layout';

const colorTheme = '#007ACC';

//globals
const window = Dimensions.get('window');

//Just temp data
const feedInfo = [
    {category: 'Message Center',        data: 'this is a test message.',
     associatedContact: 'Hal Jordan',   associatedContactJob: 'Claim Examiner',
     dateRecieved: '08/01/16',          timeRecieved: '6:45 PM'},

    {category: 'Claims',                data: 'you have a new claim update.',
     associatedContact: '',             associatedContactJob: '',
     dateRecieved: '07/23/16',          timeRecieved: '10:25 AM'},

    {category: 'Financial',             data: 'you have a new paycheck.',
     associatedContact: '',             associatedContactJob: '',
     dateRecieved: '07/22/16',          timeRecieved: '1:13 PM'},

    {category: 'Medical',               data: 'You are running low on a presc...',
     associatedContact: 'Avia',         associatedContactJob: '',
     dateRecieved: '07/01/16',          timeRecieved: '4:52 PM'},

    {category: 'Contacts',              data: 'A new contact has been added.',
     associatedContact: 'Barry Allen',  associatedContactJob: 'Physician',
     dateRecieved: '06/29/16',          timeRecieved: '8:45 AM'},

    {category: 'Message Center',        data: "This is another test message.",
     associatedContact: 'Bruce Wayne',  associatedContactJob: 'Doctor',
     dateRecieved: '05/30/16',          timeRecieved: '1:00 PM'},

    {category: 'Medical',               data: 'New prescription available.',
     associatedContact: '',             associatedContactJob: '',
     dateRecieved: '05/25/16',          timeRecieved: '11:34 AM'},

    {category: 'Financial',             data: 'You have a new paycheck.',
     associatedContact: '',             associatedContactJob: '',
     dateRecieved: '05/24/16',          timeRecieved: '11:00 AM'},

    {category: 'Message Center',        data: "Testing the communication.",
     associatedContact: 'Connor Hawke', associatedContactJob: 'Lawyer',
     dateRecieved: '05/16/16',          timeRecieved: '1:13 PM'},

    {category: 'Message Center',        data: "This is another test message.",
     associatedContact: 'Tim Drake',    associatedContactJob: 'Claim Adjustor 2',
     dateRecieved: '05/15/16',          timeRecieved: '7:00 PM'},
];

//Main navigation for the app
class MainMenuScreen extends Component {

    //Necessary constructor for ListView. The code is really wonky,
    //because facebook still hasn't implemented a better syntax for
    //a listview but this does work completely, so don't worry about it
    //too much. Still easier than doing it natively.
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2});
        this.state ={
            feedDataSource: ds.cloneWithRows(feedInfo),
        };
    }

    _navigateToMenuItem(menuItem){
        switch (menuItem) {
            case 'Contacts':
                this.props.navigator.push({ident: "Contacts",});
                break;
            case 'Financial':
                this.props.navigator.push({ident: "Financial",});
                break;
            case 'Message':
                this.props.navigator.push({ident: "Message",});
                break;
            case 'Medical':
                this.props.navigator.push({ident: "Medical"});
                break;
            case 'Message Center':
                this.props.navigator.push({ident: "Message Center"});
                break;
            case 'Claims':
                this.props.navigator.push({ident: "Claims"});
                break;
        };
    }

    //Render NewsFeed
    _renderFeedRow(feedInfo){
        var icon = '';
        switch(feedInfo.category){
            case 'Message Center':
                icon = 'envelope';
                break;
            case 'Claims':
                icon='legal';
                break;
            case 'Financial':
                 icon='money';
                 break;
            case 'Medical':
                icon='plus';
                break;
            case 'Contacts':
                icon='user';
                break;
        };

        return(
            <View style={styles.feedRows}>
                <TouchableOpacity onPress={(event) => this._navigateToMenuItem(feedInfo.category)}>
                <View style={styles.feedCell}>
                    <View style={styles.splitIconAndInfo}>
                        <View style={styles.iconContainer}>
                            <Icon name={icon} size={50} color={colorTheme} />
                        </View>
                        <View style={styles.feedData}>
                            <Text style={{color: '#666666'}}> {feedInfo.associatedContact} </Text>
                            <Text style={{color: '#666666'}}> {feedInfo.associatedContactJob} </Text>
                            <Text style={{color: '#666666'}}> {feedInfo.data} </Text>
                        </View>
                    </View>
                    <View style={styles.timeStamp}>
                        <Text style={{backgroundColor: '#FFFFFF', color: '#666666'}}>
                            {feedInfo.dateRecieved}
                        </Text>
                        <Text style={{backgroundColor: '#FFFFFF', color: '#666666'}}>
                            {feedInfo.timeRecieved}
                        </Text>
                    </View>
                </View>
                </TouchableOpacity>
            </View>
        )
    }

    _renderDrawer(){
        return (<NavigationDrawer navigator={this.props.navigator} callingScreen={"News Feed"}/>);
    }

    _closeDrawer(){
        this.drawer.closeDrawer();
    }

    render(){
        var navigationView = this._renderDrawer();
        return(
            <ViewContainer>
                <StatusBarFiller backgroundColor= {colorTheme} />
                <DrawerLayout
                    drawerWidth={300}
                    drawerPosition={DrawerLayout.positions.left}
                    ref={(drawer) => {return this.drawer = drawer}}
                    ref2={this}
                    renderNavigationView={() => navigationView}>
                    <View style={styles.feedContainer}>

                        {/* This is just the custom navigation bar for this screen */}
                        <NavigationBarDrawer backgroundColor={colorTheme} title="Feed" action={() => this.drawer.openDrawer()} />

                        {/* This is where the lsitview actually starts */}
                        <View style={styles.container}>
                            <ListView
                                dataSource={this.state.feedDataSource}
                                renderRow={(feedRow) => {return this._renderFeedRow(feedRow)}}
                            />
                        </View>
                    </View>
                </DrawerLayout>
            </ViewContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },

    feedCell: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        padding: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
    },

    feedContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#dedede',
    },

    iconContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
    },

    mainMenuNavBar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: colorTheme,
    },

    feedRows: {
        flexWrap: 'wrap',
        marginTop: 5,
        marginBottom: 5,
    },

    feedData: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 5,
        marginBottom: 5,
        flex: 1,
    },

    timeStamp: {
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        margin: 5,
        backgroundColor: '#ffffff',
    },

    splitIconAndInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flex: 1,
    },
});

module.exports = MainMenuScreen;
