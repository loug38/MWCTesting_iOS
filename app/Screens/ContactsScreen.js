/* Shows a list of contacts available to the user. This screen is the *
 * first screen after pressing the contacts butotn in the menu. Each  *
 * contact can be pressed for more details, or the user can press the *
 * envelope button to open a direct message to the user.              *
 * navigator string: "Contacts"                                       *
 * Copyright 2016 Lou George All Rights Reserved.                     */

import React, {Component} from 'react';
import {Text, View, StyleSheet, ListView, TouchableOpacity, Alert,
        Navigator} from 'react-native';

//Custom Components
import ViewContainer from '../../app/Components/ViewContainer';
import StatusBarFiller from '../../app/Components/StatusBarFiller';
import NavigationBarDrawer from '../../app/Components/NavigationBarDrawer';
import NavigationDrawer from '../../app/Components/NavigationDrawer';
import ClaimData from '../../app/Data/MockData';

//Packages
import Icon from 'react-native-vector-icons/FontAwesome';
import DrawerLayout from 'react-native-drawer-layout';
import Communications from 'react-native-communications';

//globals
var colorTheme = '#007ACC';
const contacts = [
    {name: "Hal Jordan", job: "Claims Examiner", contact:"gl@gmail.com"},
    {name: "Barry Allen", job: "Physician", contact:"tf@gmail.com"},
    {name: "Guy Gardner", job: "Employer", contact:"gl2@gmail.com"},
    {name: "Wally West", job: "Supervisor", contact:"tf2@gmail.com"},
    {name: "Dinah Lance", job: "Nurse", contact:"tbc@gmail.com"},
    {name: "Oliver Queen", job: "Case Manager", contact:"tga@gmail.com"},
];
var offSet = 0;

class ContactsScreen extends Component{

    //Necessary constructor for ListView. The code is really wonky,
    //because facebook still hasn't implemented a better syntax for
    //a listview but this does work completely, so don't worry about it
    //too much. Still easier than doing it natively.
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2});
        this.state ={
            contactsDataSource: ds.cloneWithRows(contacts),
        };
    }

    //In the case of pressing a contact for more info
    _navigateToContactDetails(contact){
        this.props.navigator.push({
            ident: "ContactDetails",
            contact: contact,
            sceneConfig: Navigator.SceneConfigs.PushFromRight,
        });
    }

    //in the case the message button has been pressed
    _sendMessage(contact){
        this.props.navigator.push({
            ident: "Message",
            sceneConfig: Navigator.SceneConfigs.PushFromRight,
            contact: contact,
        });
    }

    //in the case the call button has been pressed
    _makeCall(contact){
        Communications.phonecall('0123456789', true);
    }

    _iconSelection(contact){
        switch(contact.job){
            case 'Physician':
                return 'hospital-o';
                break;
            case 'Nurse':
                return 'plus';
                break;
            case 'Claims Examiner':
                return 'bank';
                break;
            case 'Employer':
                return 'user';
                break;
            case 'Supervisor':
                return 'black-tie';
                break;
            case 'Case Manager':
                return 'folder';
                break;
        }
    }


    _renderContactRow(contact){
        return(
            //Each row has 3 parts:
            //Icon position/name InfoIcon (Pressable for more info)
            <View style={styles.rows}>
                <TouchableOpacity style={styles.contactRow} onPress={(event) => this._navigateToContactDetails(contact)}>
                    <View style={styles.circleContainer}>
                        <Icon name={this._iconSelection(contact)} size={30} style={styles.circle} />
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.contactJob}>
                            {contact.job}
                        </Text>
                        <Text style={styles.contactName}>
                            {contact.name}
                        </Text>
                    </View>
                    <View style={{flex: 1}} />
                        <TouchableOpacity onPress={() => this._sendMessage(contact)}>
                            <Icon   name="envelope"
                                    size={25}
                                    style={styles.infoIcon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._makeCall(contact)}>
                            <Icon   name="phone"
                                    size={25}
                                    style={styles.infoIcon}
                            />
                        </TouchableOpacity>
                </TouchableOpacity>
            </View>
        )
    }

    _renderDrawer(){
        return (<NavigationDrawer navigator={this.props.navigator} callingScreen={"Contacts"}/>);
    }

    render(){
        var navigationView = this._renderDrawer();
        var currentCase = ClaimData.getCurrentCase();
        return(
            <View style={styles.container}>
                <DrawerLayout
                    drawerWidth={300}
                    drawerPosition={DrawerLayout.positions.left}
                    ref={(drawer) => {return this.drawer = drawer}}
                    renderNavigationView={() => navigationView}>
                <StatusBarFiller backgroundColor={colorTheme} />
                <NavigationBarDrawer backgroundColor={colorTheme} title="Contacts" action={() => this.drawer.openDrawer()} />
                <Text>
                    {currentCase.claimNumber}
                </Text>
                <ListView
                    dataSource={this.state.contactsDataSource}
                    renderRow={(contact) => {return this._renderContactRow(contact)}}
                />
                </DrawerLayout>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
    },

    contactRow: {
        marginTop: 15,
        flexDirection: 'row',
        height: 40,
    },

    info: {
        flexDirection: 'column',
        height: 40,
    },

    infoIcon:{
        paddingTop: 5,
        paddingRight: 20,
        color: colorTheme
    },

    contactIcon:{
        color: colorTheme,
        marginLeft: 20,
        paddingRight: 10,
        paddingTop: 15,
    },

    contactJob:{
        fontSize: 20,
    },

    contactName:{
        fontSize: 14,
        color: '#999999',
        marginTop: 5,
    },

    rows: {
         paddingBottom: 25,
         borderBottomWidth: 1,
         borderBottomColor: '#dddddd',
    },

    circleContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        height: 50,
        width: 50,
        overflow: 'hidden',
        borderRadius: 25,
        backgroundColor: colorTheme,
    },

    circle: {
        color: 'white',
    },

});

module.exports = ContactsScreen;
