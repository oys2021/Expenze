import React, { useState } from "react";
import { View, Text, Image, SafeAreaView, StyleSheet, StatusBar, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import Toast from 'react-native-toast-message';
import Spinner from 'react-native-loading-spinner-overlay';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordState, setPasswordState] = useState("");
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [errorMessage,setErrorMessage]=useState("")
    const [loading, setLoading] = useState(false);


    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };


const handlelogin = async () => {
    try {
        const response = await axios.post(`http://172.20.10.2:8080/api/api/token/`, {
            "username": username,
            "password": password
        });
        
        const { access, refresh } = response.data;
        console.log('Access Token:', access);
        console.log('Refresh Token:', refresh);

        await AsyncStorage.setItem('accesstoken',access)
        await AsyncStorage.setItem('refreshtoken',refresh)
        await AsyncStorage.setItem('username',username)


        Alert.alert(
            "Login Successful",
            "You are now logged in.",
            [
                { text: "OK", onPress: () => navigation.replace('moretabs', { Screen: 'home' }) }
            ],
            { cancelable: false }
        );

    } catch (error) {
        if (error.response) {
            setErrorMessage(error.response.data.detail || "An error occurred");
            Alert.alert("Login Failed", error.response.data.detail || "An error occurred");
        } else {
            console.error(error.message);
            setErrorMessage("Network error. Please try again.");
            Alert.alert("Network Error", "Please check your connection and try again.");
        }
    }
};



    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.main}>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>Sign in to your account</Text>
                </View>

                <View style={styles.formsection}>
                    <View style={styles.textbox}>
                        <View style={styles.inputContainer}>
                            <Icon
                                name="user"
                                size={25}
                                color="#601ef1"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Username"
                                placeholderTextColor="#601ef1"
                                value={username}
                                onChangeText={setUsername}
                            />
                        </View>
                    </View>

                    <View style={styles.textbox}>
                        <View style={styles.inputContainer}>
                            <Icon
                                name="lock"
                                size={25}
                                color="#601ef1"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#601ef1"
                                secureTextEntry={!passwordVisible}
                                onChangeText={setPassword}
                                value={password}
                            />
                            <TouchableOpacity onPress={togglePasswordVisibility}>
                                <Icon
                                    name={passwordVisible ? "eye-slash" : "eye"}
                                    size={25}
                                    color="#601ef1"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {errorMessage && 
                        <Text style={styles.errorText}>{errorMessage}</Text>
                }


                {/* {errorMessage ? (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                ) : null} */}


                <View style={styles.passreset}>
                    <Text style={styles.passtext}>Forgot Password?</Text>
                </View>

                <View style={styles.end}>
                    <TouchableOpacity style={styles.button} onPress={handlelogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.lastend}>
                    <Text>Don't have an account? <Text style={styles.signup} onPress={() => navigation.navigate("register")} >Signup</Text></Text>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: '8%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        marginBottom: 30,
        alignItems: 'center',
    },
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    formsection: {
        width: '100%',
        marginTop: 20,
    },
    textbox: {
        height: 60,
        borderWidth: 2,
        borderColor: '#601ef1',
        borderRadius: 15,
        marginBottom: 20,
        backgroundColor: '#ebe7f3',
        justifyContent: 'center',
        paddingHorizontal: 18,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        fontSize: 16,
        fontWeight: '600',
        paddingLeft: 10,
        flex: 1,
    },
    passreset: {
        alignSelf: 'flex-end',
        marginBottom: 10,
        paddingRight: 10,
    },
    passtext: {
       
    },
    end: {
        marginTop: 20,
        width: '100%',
    },
    button: {
        backgroundColor: '#601ef1',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    lastend: {
        marginTop: 30,
        fontSize: 18,
        fontWeight: 'bold',
        flexDirection: 'row', 
        alignItems: 'center',  
    },
    signup: {
        fontWeight: 'bold',
        fontSize:19,
        color: '#601ef1',
        marginLeft: 5,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
});
