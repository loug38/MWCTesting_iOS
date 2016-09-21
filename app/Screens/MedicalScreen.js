/* Medical Screen in progress.                                        *
 * navigator string: "Medical"                                        *
 * Copyright 2016 Lou George All Rights Reserved.                     */

import React, { Component } from 'react';
import {View, Text, StyleSheet } from 'react-native';

//custom components
import ViewContainer from '../../app/Components/ViewContainer';
import StatusBarFiller from '../../app/Components/StatusBarFiller';
import NavigationBarDrawer from '../../app/Components/NavigationBarDrawer';
import NavigationDrawer from '../../app/Components/NavigationDrawer';

//packages
import DrawerLayout from 'react-native-drawer-layout';


const colorTheme = '#cc0000';

class MedicalScreen extends Component{
    _renderDrawer(){
        return (<NavigationDrawer navigator={this.props.navigator} callingScreen={"Medical"}/>);
    }

    render(){
        var navigationView = this._renderDrawer();
        return(
            <View style={styles.container}>
                <StatusBarFiller backgroundColor={colorTheme} />
                <DrawerLayout
                    drawerWidth={300}
                    drawerPosition={DrawerLayout.positions.left}
                    ref={(drawer) => {return this.drawer = drawer}}
                    renderNavigationView={() => navigationView}>
                    <NavigationBarDrawer backgroundColor={colorTheme} title="Medical" action={() => this.drawer.openDrawer()} />
                    <Text>
                        Medical Screen
                    </Text>
                </DrawerLayout>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
    }
});

module.exports = MedicalScreen;
