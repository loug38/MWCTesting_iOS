/* Login Screen has 2 options, to log in directly or set up a new     *
 * account.                                                           *
 * navigator string: "Login"                                          *
 * Copyright 2016 Lou George All Rights Reserved.                     */

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image,
         Dimensions, Navigator} from 'react-native';

//Custom Components
import StatusBarFiller from '../Components/StatusBarFiller';
import ViewContainer from '../Components/ViewContainer';
import Button from '../../node_modules/react-native-button';
import DatePicker from 'react-native-datepicker';

import Icon from 'react-native-vector-icons/FontAwesome';

//globals
const window = Dimensions.get('window');
var colorTheme = '#007ACC';

class LoginScreen extends Component{
    _navigateToMainMenu(){
        this.props.navigator.push({
            ident: "MainMenu",
        });
    }

    _navigateToNewUser(){
        this.props.navigator.push({
            ident: "NewUser",
            sceneConfig: Navigator.SceneConfigs.PushFromRight,
        });
    }

    //Below I wrap the TextInputs with Views in order to have just a
    //line under the text input instead of a border all around.
    //borderBottomWidth doesn't work for TextInput but it does for
    //Views. Will change when facebook fixes the bug.
    render(){
        return(
            <View style={styles.container}>
                <StatusBarFiller backgroundColor={colorTheme}/>
                <Image style={styles.logo}
                    source={require('../../img/loginlogo1.png')}
                />
                <View>
                    <View style={styles.textInputWrapper}>
                        <TextInput style={styles.textFields}
                            onChangeText={(text) => this.setState({text})}
                            placeholder="Login"
                        />
                    </View>
                    <View style={styles.textInputWrapper}>
                        <TextInput style={styles.textFields}
                            secureTextEntry={true}
                            onChangeText={(text) => this.setState({text})}
                            placeholder="Password"
                        />
                    </View>
                </View>

                <Button onPress={() => this._navigateToMainMenu()}
                    backgroundColor={colorTheme}
                    style={styles.loginButton}>
                    Login
                </Button>
                <Button onPress={() => this._navigateToNewUser()}
                    style={styles.newUserButton}>
                    New Account
                </Button>
                <Text style={{fontSize: 10, marginTop: 40, color:'#666666'}}> Powered by </Text>
                <Image style={styles.dcLogo}
                    source={require('../../img/datacareLogo.png')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    logo:{
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 50,
        marginTop: 50,
    },

    dcLogo:{
        width: 200,
        height: 100,
        alignSelf: 'center',
        resizeMode: 'contain',
    },

    textFields:{
        height: 40,
        width: (window.width - 50),
    },

    loginButton: {
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 50,
        padding: 5,
        width: 250,
        fontSize: 30,
        color: 'white',
        backgroundColor: colorTheme,
    },

    newUserButton: {
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 10,
        padding: 5,
        fontSize: 15,
        color: 'white',
        backgroundColor: colorTheme
    },

    textInputWrapper: {
        height: 40,
        width: (window.width - 50),
        borderBottomWidth: 1,
        borderBottomColor: '#aaaaaa'
    },
});

module.exports = LoginScreen;
