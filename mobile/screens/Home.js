import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableNativeFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';

function HomeScreen(props) {
    const { navigation } = props;
    const [token, setToken] = useState('');

    const _checkToken = async () => {
        const token = await AsyncStorage.getItem('accessToken');
        setToken(token);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            _checkToken();
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <React.Fragment>
            <ImageBackground style={styles.background} source={require('../assets/doc-bg.png')}>
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Welcome To My Doctor</Text>
                        <Text style={styles.text}>The First App To connect Perfect Doctors</Text>
                    </View>
                    {token ?
                        (
                            <React.Fragment>
                                <Button
                                    text='View Doctors list'
                                    onPress={() => navigation.navigate('Doctors')}
                                />
                                <TouchableNativeFeedback
                                    onPress={() => navigation.navigate('Profile')}
                                >
                                    <Text style={styles.labelButton}>View My Profile</Text>
                                </TouchableNativeFeedback>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Button
                                    text='SignIn'
                                    onPress={() => navigation.navigate('SignIn')}
                                />
                                <TouchableNativeFeedback
                                    onPress={() => navigation.navigate('SignUp')}
                                >
                                    <Text style={styles.labelButton}>Sign Up</Text>
                                </TouchableNativeFeedback>
                            </React.Fragment>
                        )}
                </View>
            </ImageBackground>
        </React.Fragment>
    )
}


const textStyles = {
    color: '#fff',
    textAlign: 'center',
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
    },
    container: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        marginBottom: 30,
    },
    title: {
        ...textStyles,
        fontSize: 35,
    },
    text: {
        ...textStyles,
        fontSize: 20,
    },
    labelButton: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
        color: '#fff'
    }
})



export default HomeScreen;