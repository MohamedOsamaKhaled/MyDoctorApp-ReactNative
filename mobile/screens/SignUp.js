import React, { useState, useEffect } from 'react';
import {
    ScrollView, KeyboardAvoidingView, CheckBox, View, Text, StyleSheet
} from 'react-native';
import * as Location from 'expo-location';
import styles from './styles/authStyles';
import ScreenTitle from '../components/ScreenTitle';
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import axios from '../config/axios';
import { SIGNUP_URL } from '../config/urls';


function SignUpScreen(props) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        specialization: '',
        mobile: '',
        address: '',
        workingHours: '',
        userType: false,
        location: null
    });

    const [location, setLocation] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ message: null, type: '' });

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert({ message: null });
        }, 3000);


        useEffect(() => {
            (async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    return;
                }

                let location = await Location.getCurrentPositionAsync();
                setLocation(location);
            })();
        }, []);

        return () => clearTimeout(timer);
    }, [alert.message]);

    const validate = () => {
        const {
            name, email, password, specialization, address,
            workingHours, mobile, userType } = formData;
        let validationErrors = [];
        let passed = true;
        if (!name) {
            validationErrors.push('Please enter a name');
            passed = false;
        }
        if (!email) {
            validationErrors.push('Please enter a email');
            passed = false;
        }
        if (!password) {
            validationErrors.push('Please enter a password');
            passed = false;
        }
        if (userType) {
            validationErrors.push('Please enter a user type');
            passed = false;
        }
        if (!address) {
            validationErrors.push('Please enter a address');
            passed = false;
        }
        if (!workingHours) {
            validationErrors.push('Please enter a workingHours');
            passed = false;
        }
        if (!specialization) {
            validationErrors.push('Please enter a specialization');
            passed = false;
        }
        if (!mobile) {
            validationErrors.push('Please enter a mobile');
            passed = false;
        }

        if (validationErrors.length > 0) {
            setAlert({ message: validationErrors, type: 'danger' });
        }

        return passed;
    }

    const changeFormValue = (key, value) => {
        setFormData({ ...formData, [key]: value });
    }

    const _signUp = () => {
        if (!validate()) return;
        (async () => {
            setLoading(true);
            const {
                name, email, password, specialization, address,
                workingHours, mobile, userType } = formData;
            const body = {
                name,
                email,
                password,
                userType: userType ? 'doctor' : 'normal',
                specialization,
                address,
                mobile,
                workingHours,
                location: {
                    latitude: location ? location.coords.latitude : null,
                    longitude: location ? location.coords.longitude : null,
                }
            }

            try {
                const response = axios.post(SIGNUP_URL, body);
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    specialization: '',
                    phone: '',
                    address: '',
                    workingHours: '',
                    userType: false,
                    location: null
                });
                setLoading(false);

                props.navigation.navigate('SignIn');
            } catch (e) {
                setAlert({ message: e.response.data.message, type: 'error' });
                setLoading(false);
            }
        })();
    }

    const {
        name, email, password, specialization, address,
        workingHours, mobile, userType } = formData;

    return (
        <ScrollView contentContainerStyle={{ paddingVertical: 40 }}>
            <Loader title="Acount creating" loading={isLoading} />
            <Alert message={alert.message} type={alert.type} />
            <View style={styles.container}>
                <ScreenTitle title="Add User" icon="md-person-add" />
                <KeyboardAvoidingView behavior="padding" enabled>
                    <Input
                        placeholder="Name"
                        value={name}
                        onChangeText={(text) => changeFormValue('name', text)}
                    />
                    <Input
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => changeFormValue('email', text)}
                    />
                    <Input
                        secureTextEntry
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => changeFormValue('password', text)}
                    />
                    <View style={styles.checkBoxContainer}>
                        <CheckBox
                            style={styles.checkBox}
                            value={userType}
                            onChange={() => changeFormValue('userType', !userType)}
                        />
                        <Text style={styles.checkBoxLabel}>Doctor</Text>
                    </View>
                    {userType && (
                        <React.Fragment>
                            <Input
                                placeholder="Spcialization"
                                value={specialization}
                                onChangeText={(text) => changeFormValue('specialization', text)}
                            />
                            <Input
                                placeholder="Working Hours"
                                value={workingHours}
                                onChangeText={(text) => changeFormValue('workingHours', text)}
                            />
                            <Input
                                placeholder="Address"
                                value={address}
                                onChangeText={(text) => changeFormValue('address', text)}
                            />
                            <Input
                                placeholder="Mobile"
                                value={mobile}
                                onChangeText={(text) => changeFormValue('mobile', text)}
                            />

                        </React.Fragment>
                    )}
                    <Button
                        text="Create"
                        onPress={_signUp}
                    />
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    )
}



export default SignUpScreen;