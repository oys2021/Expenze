import React from "react";
import { View,Text,Image, StyleSheet,SafeAreaView,StatusBar} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function onbording({navigation}){

    return(
        <SafeAreaView style={styles.main}>
             <View style={styles.hero}>
            <Image source={require('../assets/track2.jpg')} style={styles.image}/>
            </View>
            <View style={styles.body}>
                <View style={styles.welcome}>
                <Text style={styles.heading}>Welcome</Text>
                </View>
                <Text style={{marginBottom:5,color:'grey'}}>we are here to help you spend smarter,save</Text>
                <Text  style={{marginBottom:5,color:'grey'}}>more and invest in your future</Text>
                <View style={styles.container}>

                     {/* Dot 1 */}
                <View style={[styles.dot, styles.activeDot]} />

                {/* Dot 2 */}
                <View style={styles.dot} />

                {/* Dot 3 */}
                <View style={styles.dot} />
     
    </View>
    
            </View>
            
            <View style={styles.end}>
                <TouchableOpacity style={styles.button} onPress={()=>{
                        navigation.navigate('onbording1')
                }}>
                    <Text style={{color:'white',fontSize:17,fontWeight:'bold'}}>Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}

const styles=StyleSheet.create({
main:{
flex:1,
paddingTop:StatusBar.currentHeight
// marginHorizontal:15
},
hero:{
    height:'45%',
    width:'100%',
    // marginBottom:100
},
image:{
    width:'100%',
    height:'100%'
},
body:{
marginHorizontal:20,
alignItems:'center',
justifyContent:'center',
height:'35%'
},
welcome:{
   marginBottom:15
},
heading:{
    fontSize:32,
    fontWeight:'bold'
},
end:{
marginTop:5,
marginHorizontal:'10%',
},
button:{
    // backgroundColor:'#197fe6',
    backgroundColor:'#601ef1',
    height:60,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:14

},container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#bbb',
    marginHorizontal: 5,
  },
  activeDot: {
    // backgroundColor: '#007BFF', // Blue for the active dot
    backgroundColor: '#601ef1',
  },

});