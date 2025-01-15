import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState,useCallback } from "react";
import { SafeAreaView, Image, StyleSheet, StatusBar,Alert, View, Text, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";
export default function profile({navigation}) {
    const [loading,setLoading]=useState(true)
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [errorMessage,setError]=useState("")
    

    const handleLogout = async () => {
       
        Alert.alert(
            'Logout Confirmation', 
            'Are you sure you want to logout?', 
            [
                {
                    text: 'Cancel', 
                    style: 'cancel', 
                },
                {
                    text: 'Logout', 
                    onPress: async () => {
                        await AsyncStorage.removeItem('accesstoken');
                        await AsyncStorage.removeItem('username');
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'login' }], 
                        });
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: false } 
        );
    };
    
    const handleprofile=async()=>{
        setLoading(true);
        const uservalue=await AsyncStorage.getItem('username')
        console.log('freshuser',uservalue)
        try{
            const response=await axios.get(`http://172.20.10.2:8080/api/user/${uservalue}/`)
        setUsername(response.data.username)
        console.log(response.data)
        setEmail(response.data.email)
        }catch(error){
            setError(error)
            setLoading(true); 
        }
        

    }

    useFocusEffect(
        useCallback(() => {
            setLoading(true); 
            handleprofile();
        }, [])
    );
    


    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.top}>
                <Text style={styles.profiletext}>Profile</Text>
                <Image source={require('../../assets/track3.jpg')} style={styles.image} />
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.email}>{email}</Text>
            </View>

            <View style={styles.bottom}>
                <View style={styles.bottominner}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{
                            height: 42, width: 45, backgroundColor: 'blue', borderRadius: 10, justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Ionicons name="person" size={30} color="#fff" style={styles.moneyLogo} />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontSize: 20 }}>Edit Profile</Text>
                        </View>
                    </View>
                    <View>
                    <TouchableOpacity>
                        <Ionicons name="chevron-forward-outline" size={25} color="#000" style={styles.moneyLogo} />
                    </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.bottominner}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{
                            height: 42, width: 45, backgroundColor: 'red', borderRadius: 10, justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Ionicons name="log-out-outline" size={30} color="#fff" style={styles.moneyLogo} />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontSize: 20 }}>Logout</Text>
                        </View>
                    </View>
                    <View>
                    <TouchableOpacity onPress={handleLogout}>
                    <Ionicons name="chevron-forward-outline" size={25} color="#000" style={styles.moneyLogo} />
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    top: {
        flex: 1, 
        marginTop:'20%',
        justifyContent: 'center', // Vertically center content
        alignItems: 'center', // Horizontally center content
    },
    image: {
        width: 140,
        height: 140,
        marginBottom: '10%',
        borderRadius: 70,
    },
    profiletext: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: '10%',
    },
    username: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: '2%',
    },
    email: {
        fontSize: 16,
        color: 'gray',
    },
    bottom: {
        flex: 1, // This will make the bottom section take the other half of the screen
        justifyContent: 'center', // Vertically center content
        paddingHorizontal: '10%', // Optional, adds some padding to the sides
    },
    bottominner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom:'10%'
    },
});
