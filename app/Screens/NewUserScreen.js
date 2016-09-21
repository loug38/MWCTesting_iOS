/* New user screen lets a user set up an account. All the fields      *
 * except for username and password must match the database           *
 * navigator string: "NewUser"                                        *
 * Copyright 2016 Lou George All Rights Reserved.                     */

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image,
         Dimensions, Alert, ScrollView} from 'react-native';

//Custom components
import ViewContainer from '../Components/ViewContainer';
import StatusBarFiller from '../Components/StatusBarFiller';
import NavigationBar from '../Components/NavigationBar';

//packages
import Button from 'react-native-button';
import DatePicker from 'react-native-datepicker';

//globals
const window = Dimensions.get('window');
const pseudoData = { birthday: "10-20-1990", claimNumber:"1", ssn:"123456789" };

var colorTheme = '#007ACC';


class NewUserScreen extends Component
{

    //Necessary constructor for datepicker
    constructor(props)
    {
        super(props);
        this.state =
        {
            date: "",
            claimNumber: "",
            socialSecurityNumber: "",
            username: "",
            password: "",
            passwordConf: "",
        }
    }

    _navigateToLogin() { this.props.navigator.pop; }

    //Makes sure that all fields match when creating an account
    _confirmAccountCreation(){
        if (this.state.password != this.state.passwordConf){
            this._throwAlert('Passwords don\'t match');
        }
        else if (this.state.claimNumber != pseudoData.claimNumber){
            this._throwAlert('Couldn\'t find that claim number');
        }
        else if (this.state.socialSecurityNumber != pseudoData.ssn){
            this._throwAlert('Social Security Number does not match');
        }else if (this.state.date != pseudoData.birthday){
            this._throwAlert('Birthdate does not match')
        }
        else this.props.navigator.pop();
    }

    //Pop up alert that tells you what field wasn't accepted/
    //Takes a message parameter.
    _throwAlert(message){
        Alert.alert(
            'Error creating account', message,
            [{text: 'OK', onPress:() => console.log('OK')},]
        );
    }

    //Below I wrap the TextInputs with Views in order to have just a
    //line under the text input instead of a border all around.
    //borderBottomWidth doesn't work for TextInput but it does for
    //Views. Will change when facebook fixes the bug.
    render()
    {
        return (
            <ScrollView>
                <ViewContainer>
                    {/* Status bar and navigation bar*/}
                    <StatusBarFiller backgroundColor={colorTheme} />
                    <NavigationBar  backgroundColor={colorTheme}
                                    leftWord="Back"
                                    title="Create Account"
                                    rightWord=""
                                    nav={this.props.navigator}
                    />
                    {/* BODY */}
                    {/* DatePicker for documentation check out
                        https://github.com/xgfe/react-native-datepicker*/}
                    <Text style={styles.fieldDescription}>
                        Birthdate
                    </Text>
                    <View style={styles.container}>
                        <DatePicker
                            style={{width:200}}
                            date={this.state.date}
                            mode='date'
                            placeholder='Birthday'
                            format="MM-DD-YYYY"
                            minDate="01-01-1900"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(date) => {this.setState({date: date});}}
                        />
                    </View>

                    {/* Had to wrap each field individually since if you're more
                        than 2 views deep TextInput is invisible (bug).       */}

                    {/* Claim Number Field */}
                    <Text style={styles.fieldDescription}>
                        Claim Number
                    </Text>
                    <View style={styles.textInputWrapper}>
                        <TextInput style ={styles.textFields}
                            placeholder="xxxxxxx-xxxx"
                            onChangeText={(claimNumber) => this.setState({claimNumber})}
                        />
                    </View>

                    {/* Social Security Field */}
                    <Text style={styles.fieldDescription}>
                        Social Security Number
                    </Text>
                    <View style={styles.textInputWrapper}>
                        <TextInput style ={styles.textFields}
                            placeholder="xxx-xx-xxxx"
                            onChangeText={(socialSecurityNumber) => this.setState({socialSecurityNumber})}
                        />
                    </View>

                    {/* Username field */}
                    <Text style={styles.fieldDescription}>
                        Username
                    </Text>
                    <View style={styles.textInputWrapper}>
                        <TextInput style ={styles.textFields}
                            placeholder="Username"
                            onChangeText={(username) => this.setState({username})}
                        />
                    </View>

                    {/* Password fields */}
                    <Text style={styles.fieldDescription}>
                        Password
                    </Text>
                    <View style={styles.textInputWrapper}>
                        <TextInput style ={styles.textFields}
                            secureTextEntry={true}
                            placeholder="Password"
                            onChangeText={(password) => this.setState({password})}
                        />
                    </View>
                    <Text style={styles.fieldDescription}>
                        Confirm Password
                    </Text>
                    <View style={styles.textInputWrapper}>
                        <TextInput style ={styles.textFields}
                            secureTextEntry={true}
                            placeholder="Password"
                            onChangeText={(passwordConf) => this.setState({passwordConf})}
                        />
                    </View>

                    {/* Create Account Button */}
                    <Button onPress={() => this._confirmAccountCreation()}
                        style={styles.createAccountButton}>
                            Create Account
                    </Button>
                </ViewContainer>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    fieldDescription:
    {
        color: '#777777',
        paddingTop: 20,
        fontSize: 10,
        paddingLeft: 20,
    },

    container:
    {
        padding: 20,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    textInputWrapper:
    {
        height: 40,
        width: (window.width - 50),
        marginLeft: 20,
        marginRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
    },

    textFields:
    {
        height: 40,
    },

    createAccountButton:
    {
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 60,
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 50,
        padding: 5,
        fontSize: 15,
        color: 'white',
        backgroundColor: colorTheme,
    },
});

module.exports = NewUserScreen;
