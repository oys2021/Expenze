import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { use, useState,useCallback } from "react";
import { SafeAreaView,Image,StyleSheet,StatusBar,View,Text, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";



export default function Wallet() {
    const [balance,setBalance]=useState(null);
    const[loading,setLoading]=useState(true)
    const [errorMessage,setError]=useState("");
    const[wallets,setWallets]=useState([]);
    const fetchbalance=async()=>{
        const uservalue=await AsyncStorage.getItem('username')
        setLoading(true)
        try{
            const response=await axios.get(`http://172.20.10.2:8080/api/user/total-balance/${uservalue}/`)
            setBalance(response.data.total_balance);
            console.log("total Balance:",response.data.total_balance)
        }catch(error){
            setError(error)
            setLoading(false)
            console.error(error)
        }
    }

    const fetchwallets=async()=>{
        const uservalue=await AsyncStorage.getItem('username')
        setLoading(true)
        try{
            const response=await axios.get(`http://172.20.10.2:8080/api/wallets/${uservalue}/`)
            setWallets(response.data);
            console.log("Wallets:",response.data)
        }catch(error){
            setError(error)
            setLoading(false)
            console.error(error)
        }
    }

    useFocusEffect(
        useCallback(()=>{
            setLoading(true)
            fetchbalance();
            fetchwallets();
        },[])
    );

    const renderItem =({item})=>{
       return(
        <View style={styles.middlemiddle}>
        <View style={{flexDirection:'row'}}>
            <View style={styles.imgcontainer}>
                <Image source={require('../../assets/track3.jpg')} style={styles.image} />
            </View>
            <View style={{paddingLeft:'10%',paddingTop:'5%'}}>
                <Text style={{fontWeight:'bold'}}>{item.name}</Text>
                <Text style={{fontWeight:'bold'}}>{item.balance}</Text>
            </View>
        </View>
        <View>
        <TouchableOpacity>
        <Ionicons name="chevron-forward-outline" size={30} color="#000" style={styles.moneyLogo} />
        </TouchableOpacity>
        </View>
    </View>
       )
    }
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.top}>
       {!loading ? (
        <Text style={{fontSize:30,fontWeight:'bold'}}>Loading...</Text>
       ):balance !==null ? (
        <Text style={{fontSize:30,fontWeight:'bold'}}>${balance}</Text>
       ):(
        <Text style={{fontSize:30,fontWeight:'bold'}}>No Balance Available</Text>
       )}
        <Text style={{fontSize:14,fontWeight:'bold'}}> Total Balance</Text>
      </View>
    <View style={styles.middle}>
      <View style={styles.middletop}>
        <Text style={{fontSize:25,fontWeight:'bold'}}>My Wallets</Text>
        <View>
        <Ionicons name="add-circle-outline" size={30} color="#601ef1" style={styles.moneyLogo} />
        </View>
      </View>

       {!loading ?(
       <Text style={{marginTop:'10%'}}>Loading....</Text> 
       ): wallets && wallets !==null ?(
        <FlatList
        data={wallets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
        style={{ flex: 1 }}
       />
       ):(
       <Text style={{marginTop:'10%'}}>No Wallets currently Available</Text> 
       )
       }
   
        
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    main: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      backgroundColor: '#c5c6d0', 
    },
    top: {
      flex: 0.2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    middle: {
      flex: 0.8,
      backgroundColor: '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: '10%',
      paddingHorizontal: '8%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    middletop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    middlemiddle: {
      paddingTop: '10%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    imgcontainer: {
      width: 65,
      height: 60,
      backgroundColor: '#fff',
      borderRadius: 13,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 13,
    },
    flatListContainer: {
    flexGrow: 1,
  },
  });
  