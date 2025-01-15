import React, { useState } from "react";
import { View, Text,Alert,SafeAreaView, StyleSheet, StatusBar, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function register({ navigation }) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordState, setPasswordState] = useState("");
    const [email,setEmail]=useState("")
    const [username,setUsername]=useState("")

    const [passwordVisible1, setPasswordVisible1] = useState(false);
    const [passwordState1, setPasswordState1] = useState("");
    const [errorMessage,setErrorMessage]=useState("")
    

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const togglePasswordVisibility1 = () => {
        setPasswordVisible1(!passwordVisible1);
    };
   
    const handleregister = async () => {
        try {
            const response = await axios.post(`http://172.20.10.2:8080/api/register/`, {
                username,
                password: passwordState1,
                email,
            });
    
            const { access, refresh } = response.data;
            await AsyncStorage.setItem('accesstoken', response.data.access);
            await AsyncStorage.setItem('refreshtoken', response.data.refresh);
            await AsyncStorage.setItem('username', username);
    
            Alert.alert(
                "Registration Successful",
                "You can now log in.",
                [{ text: "OK", onPress: () => navigation.replace('moretabs', { Screen: 'home' }) }],
                { cancelable: false }
            );
        } catch (error) {
            if (error.response) {
                console.error(error);
                const errorMessage = error.response.data.detail || error.response.data.email || "An error occurred";
                Alert.alert("Registration Failed", error);
            } else {
                console.error(error.message);
                Alert.alert("Network Error", "Please check your connection and try again.");
            }
        }
    };
    
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.main}>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>Sign up to your account</Text>
                </View>

                <View style={styles.formSection}>
                    <View style={styles.textbox}>
                        <View style={styles.inputContainer}>
                            <Icon name="user" size={25} color="#601ef1" />
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
                            <Icon name="envelope" size={25} color="#601ef1" />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#601ef1"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                    </View>

                    <View style={styles.textbox}>
                        <View style={styles.inputContainer}>
                            <Icon name="lock" size={25} color="#601ef1" />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#601ef1"
                                secureTextEntry={!passwordVisible}
                                onChangeText={setPasswordState}
                                value={passwordState}
                            />
                            <TouchableOpacity onPress={togglePasswordVisibility}>
                                <Icon name={passwordVisible ? "eye-slash" : "eye"} size={25} color="#601ef1" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.textbox}>
                        <View style={styles.inputContainer}>
                            <Icon name="lock" size={25} color="#601ef1" />
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm Password"
                                placeholderTextColor="#601ef1"
                                secureTextEntry={!passwordVisible1}
                                onChangeText={setPasswordState1}
                                value={passwordState1}
                            />
                            <TouchableOpacity onPress={togglePasswordVisibility1}>
                                <Icon name={passwordVisible1 ? "eye-slash" : "eye"} size={25} color="#601ef1" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.end}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleregister}
                    >
                        <Text style={styles.buttonText}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: "8%",
        justifyContent: "center",
        alignItems: "center",
    },
    heading: {
        marginBottom: 30,
        alignItems: "center",
    },
    headingText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    formSection: {
        width: "100%",
        marginTop: 20,
    },
    textbox: {
        height: 60,
        borderWidth: 2,
        borderColor:'#601ef1',
        borderRadius: 15,
        marginBottom: 20,
        backgroundColor: "#ebe7f3",
        justifyContent: "center",
        paddingHorizontal: 18,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    input: {
        fontSize: 16,
        fontWeight: "600",
        paddingLeft: 10,
        flex: 1,
    },
    end: {
        marginTop: 20,
        width: "100%",
    },
    button: {
        backgroundColor: "#601ef1",
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 14,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});
