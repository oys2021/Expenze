import React from "react";
import { SafeAreaView,StyleSheet,StatusBar,View,Text} from "react-native";


export default function settings(){
    return( 
    <SafeAreaView style={styles.main}>
          <View>
              <Text>Settings</Text>
          </View>
      </SafeAreaView>
      )
}

const styles=StyleSheet.create({
    main:{
    flex:1,
    paddingTop:StatusBar.currentHeight
    }
})