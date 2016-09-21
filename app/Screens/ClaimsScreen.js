/* Copyright 2016 Lou George All Rights Reserved.                     */

import React, { Component } from 'react';
import {View, Text, StyleSheet, ListView, TouchableOpacity, Native, TouchableHighlight } from 'react-native';

//custom components
import ViewContainer from '../../app/Components/ViewContainer';
import StatusBarFiller from '../../app/Components/StatusBarFiller';
import NavigationBarDrawer from '../../app/Components/NavigationBarDrawer';
import NavigationDrawer from '../../app/Components/NavigationDrawer';
import ClaimData from '../../app/Data/MockData';

//packages
import DrawerLayout from 'react-native-drawer-layout';

const colorTheme = '#007ACC';
const claimsInfo = [
    {name: 'George Harkness', address1:  '123 Fake st.', address2: 'Woodland Hills, AU 91364',
     extraInfo: 'Accident using the forklift, could be out for several months.', date: '03/15/2007', claimID: 1,
     injuries: 'Leg, Arm, Hand'},
];

class ClaimsScreen extends Component{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2});
        var ds2 = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2});
        this.state ={
            claimsDataSource: ds2.cloneWithRows(claimsInfo),
        };
    }

    _renderInjuryRow(injuryRow){
        return(
            <View>
                <Text> {injuryRow.bodyPart} </Text>
            </View>
        );
    }

    _renderClaimsRow(claimsRow){
        return(
            <TouchableOpacity onPress={console.log('claim pressed')}>
                <View style={styles.claimContainer}>
                    <View style={styles.claimNumber}>
                        <Text style={{fontSize: 10, color: "#666666"}}> Claim Number</Text>
                        <Text> CLAIM NAME </Text>
                    </View>
                    <View style={styles.rowItems}>
                        <View style={styles.nameContainer}>
                            <Text style={{fontSize: 10, color: "#666666"}}> Name </Text>
                            <Text> {claimsRow.name} </Text>
                        </View>
                        <View style={styles.injuryDate}>
                            <Text style={{fontSize: 10, color: "#666666"}}> Date of injury </Text>
                            <Text> {claimsRow.date} </Text>
                        </View>
                    </View>

                    <View style={styles.addressContainer}>
                        <Text style={{fontSize: 10, color: "#666666"}}> Address </Text>
                        <Text> {`${claimsRow.address1} \n ${claimsRow.address2}`} </Text>
                    </View>

                    <View style={styles.injuredBodyParts}>
                        <Text style={{fontSize: 10, color: "#666666"}}> Injured Body Parts </Text>
                        <Text> {claimsRow.injuries} </Text>
                    </View>
                    <View style={styles.rowItems}>
                        <View style={styles.extraInfo}>
                            <Text style={{fontSize: 10, color: "#666666"}}> Extra Information </Text>
                            <Text> {claimsRow.extraInfo} </Text>
                        </View>
                        <View style={{marginTop: 10, alignSelf: 'flex-end'}}>
                            <TouchableOpacity onPress={() => console.log('recent claim activity')}>
                                <Text style={{color: '#007AFF'}}> Recent Claim Activity </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    _renderDrawer(){
        return (<NavigationDrawer navigator={this.props.navigator} callingScreen={"Medical"}/>);
    }

    render(){
        var navigationView = this._renderDrawer();
        return(
            <ViewContainer>
                <StatusBarFiller backgroundColor={colorTheme} />
                <DrawerLayout
                    drawerWidth={300}
                    drawerPosition={DrawerLayout.positions.left}
                    ref={(drawer) => {return this.drawer = drawer}}
                    renderNavigationView={() => navigationView}>
                    <NavigationBarDrawer backgroundColor={colorTheme} title="Claim Information" action={() => this.drawer.openDrawer()} />
                    <View style={styles.container}>
                        <ListView
                            dataSource={this.state.claimsDataSource}
                            renderRow={(claimsRow) => {return this._renderClaimsRow(claimsRow)}}
                        />
                    </View>
                </DrawerLayout>
            </ViewContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#dedede',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },

    claimContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 25,
        marginTop: 5,
    },

    claimNumber: {
        flexDirection: 'column',
        alignItems: 'center',
    },

    nameContainer: {
        margin: 5,
    },

    injuryDate: {
        margin: 5,

    },

    rowItems: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    addressContainer: {
        margin: 5,
    },

    injuredBodyParts: {
        margin: 5,
    },

    extraInfo: {
        flex: 0.8,
        alignSelf: 'flex-start',
        margin: 5,
        backgroundColor: 'transparent',
    },
});

module.exports = ClaimsScreen;
