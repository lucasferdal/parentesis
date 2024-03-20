import {   View, Text, Image,TouchableOpacity,StyleSheet } from 'react-native';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

function SpecificVideo() {
  return (
    <View style={style.container}>
      <View style={style.containerTitle}>
        <Text> titulo</Text>
      </View>
      <View style={style.containerImg}>
      <Image
         style={style.img}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
       <MaterialCommunityIcons name="clock-time-five-outline" size={24} color="black" />
       <Text>10 seg</Text>
      </View>
      <View style={style.containerDescription}>
      <Text> Descripcion</Text>
      </View>
      <TouchableOpacity style={style.containerStopwatch} >
      <MaterialCommunityIcons name="clock-time-five-outline" size={100} color="black" />
      <View style={style.controllerPlay}><Entypo name="controller-play" size={24} color="black" /></View>
      </TouchableOpacity>

    </View>
  );
}
export default SpecificVideo;
const style = StyleSheet.create({
    container: {      
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },    
      containerTitle:{
        marginBottom: 15,
      },
      containerImg:{
        alignItems: "center",
        marginBottom: 15,
      }, 
     img:{
        width: 100,
        height:100,
        marginBottom: 5,

      },
      containerDescription:{
        marginBottom: 15,
      },
      containerStopwatch:{ 
        alignItems: "center",
      },
      controllerPlay:{
        borderRadius:50,
        backgroundColor: '#D9D9D9',
        paddingHorizontal:15,
        paddingVertical:5
      },    
  });
  