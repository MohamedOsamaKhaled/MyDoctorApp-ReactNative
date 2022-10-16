import React, { useState, useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, View } from 'react-native';
import styles from './styles/authStyles';
import ScreenTitle from '../components/ScreenTitle';
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import axios from '../config/axios';
import { SIGNIN_URL } from '../config/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';




function SignIn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ message: null, type: '' });

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert({ message: null });
        }, 3000)

        return () => clearTimeout(timer);
    }, [alert.message]);

    const changeEmailHandler = (value) => {
        setEmail(value);
    }

    const changePasswordHandler = (value) => {
        setPassword(value);
    }

    const validate = () => {
        let validationErrors = [];
        let passed = true;

        if (!email) {
            validationErrors.push('Please enter a email');
            passed = false;
        }
        if (!password) {
            validationErrors.push('Please enter a password');
            passed = false;
        }

        if (validationErrors.length > 0) {
            setAlert({ message: validationErrors, type: 'danger' });
        }

        return passed;
    }

    _signIn = () => {
        (async () => {
            if (!validate()) return;
            setLoading(true);

            try {
                const response = await axios.post(SIGNIN_URL, { email, password });
                setLoading(false);
                setEmail('');
                setPassword('');
                AsyncStorage.setItem('accessToken', response.date.accessToken);
                props.navigation.navigate('Home');
            } catch (error) {
                setLoading(false);
                setAlert({ message: error.response.data.message, type: 'danger' });
            }
        })();
    }

    return (

        <ScrollView contentContainerStyle={{ paddingVertical: 40 }}>
            <View style={styles.container}>
                <Loader title="Acount creating" loading={isLoading} />
                <Alert message={alert.message} type={alert.type} />
                <ScreenTitle title="SignIn" icon="md-log-in" />
                <KeyboardAvoidingView behavior="padding" enabled>
                    <Input
                        placeholder="Email"
                        value={email}
                        onChangeText={changeEmailHandler}
                    />
                    <Input
                        placeholder="Password"
                        value={password}
                        onChangeText={changePasswordHandler}
                        secureTextEntry
                    />
                    <Button text="Enter" onPress={_signIn} />
                </KeyboardAvoidingView>
            </View>
        </ScrollView>

    )
}


export default SignIn;