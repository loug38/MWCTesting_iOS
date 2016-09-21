/* Mock Data                                                          *
 * Copyright 2016 Lou George All Rights Reserved.                     */

import React, { Component } from 'react';
import {View, Text, StyleSheet } from 'react-native';

var currentCase = '';
const data = [
    {'claim': {
        'claimNumber': '1234',
        'claimOwner': 'George Harkness',
        'dataOfInjury': '10-20-2004',
        'address': '6121 Glade Ave Woodland Hills, AU 91367',
        'injuredBodyParts': 'hand,leg, arm',
        'extraInformation': 'Hurt using the forklift, could be out of works for months.',
        'socialSecurityNumber': '123456789',
        'dateOfBirth': '08-24-1964',
        'contacts': {
            'contact': {'name': "Hal Jordan",   'job': "Claims Examiner",   'contact':"gl@gmail.com",   'phone': '(818) 744-1908'},
            'contact': {'name': "Barry Allen",  'job': "Physician",         'contact':"tf@gmail.com",   'phone': '(818) 744-1908'},
            'contact': {'name': "Guy Gardner",  'job': "Employer",          'contact':"gl2@gmail.com",  'phone': '(818) 744-1908'},
            'contact': {'name': "Wally West",   'job': "Supervisor",        'contact':"tf2@gmail.com",  'phone': '(818) 744-1908'},
            'contact': {'name': "Dinah Lance",  'job': "Nurse",             'contact':"tbc@gmail.com",  'phone': '(818) 744-1908'},
            'contact': {'name': "Oliver Queen", 'job': "Case Manager",      'contact':"tga@gmail.com",  'phone': '(818) 744-1908'},
        },
    }, 'claimNumber': '1234'},

    {'claim': {
        'claimNumber': '2345',
        'claimOwner': 'George Harkness',
        'dataOfInjury': '10-20-2004',
        'address': '6121 Glade Ave Woodland Hills, AU 91367',
        'injuredBodyParts': 'hand,leg, arm',
        'extraInformation': 'Hurt using the forklift, could be out of works for months.',
        'socialSecurityNumber': '123456789',
        'dateOfBirth': '08-24-1964',
        'contacts': {
            'contact': {'name': "Hal Jordan",   'job': "Claims Examiner",   'contact':"gl@gmail.com",   'phone': '(818) 744-1908'},
            'contact': {'name': "Barry Allen",  'job': "Physician",         'contact':"tf@gmail.com",   'phone': '(818) 744-1908'},
            'contact': {'name': "Guy Gardner",  'job': "Employer",          'contact':"gl2@gmail.com",  'phone': '(818) 744-1908'},
            'contact': {'name': "Wally West",   'job': "Supervisor",        'contact':"tf2@gmail.com",  'phone': '(818) 744-1908'},
            'contact': {'name': "Dinah Lance",  'job': "Nurse",             'contact':"tbc@gmail.com",  'phone': '(818) 744-1908'},
            'contact': {'name': "Oliver Queen", 'job': "Case Manager",      'contact':"tga@gmail.com",  'phone': '(818) 744-1908'},
        },
    }, 'claimNumber': '2345'},

    {'claim': {
        'claimNumber': '3456',
        'claimOwner': 'George Harkness',
        'dataOfInjury': '10-20-2004',
        'address': '6121 Glade Ave Woodland Hills, AU 91367',
        'injuredBodyParts': 'hand,leg, arm',
        'extraInformation': 'Hurt using the forklift, could be out of works for months.',
        'socialSecurityNumber': '123456789',
        'dateOfBirth': '08-24-1964',
        'contacts': {
            'contact': {'name': "Hal Jordan",   'job': "Claims Examiner",   'contact':"gl@gmail.com",   'phone': '(818) 744-1908'},
            'contact': {'name': "Barry Allen",  'job': "Physician",         'contact':"tf@gmail.com",   'phone': '(818) 744-1908'},
            'contact': {'name': "Guy Gardner",  'job': "Employer",          'contact':"gl2@gmail.com",  'phone': '(818) 744-1908'},
            'contact': {'name': "Wally West",   'job': "Supervisor",        'contact':"tf2@gmail.com",  'phone': '(818) 744-1908'},
            'contact': {'name': "Dinah Lance",  'job': "Nurse",             'contact':"tbc@gmail.com",  'phone': '(818) 744-1908'},
            'contact': {'name': "Oliver Queen", 'job': "Case Manager",      'contact':"tga@gmail.com",  'phone': '(818) 744-1908'},
        },
    }, 'claimNumber': '3456'},
];

var currentC = data[0];

class MockData extends Component{
    constructor() {
        super();
        currentC = data[0];
        this.state = { 
            currentClaim: data[0], 
        };
    }

    render(){this.setState({currentClaim: data[0]});}

    static getCurrentClaim(){
        return(this.state.currentClaim);
    }

    static getCurrentClaimName(){
        return(this.currentC.claim);
    }

    static getClaim(claim){
        return(data[claim].claimNumber);
    }

    static chooseDifferentClaim(claim){
        this.currentC = data[claim];
        return(data[claim].claimNumber);
    }

    static getClaimsList(){
        return(data);
    }
}

module.exports = MockData;
