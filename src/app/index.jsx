import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import { Redirect, useRootNavigationState } from 'expo-router';
import { Asset, useAssets } from 'expo-asset';
import { corporal, visual } from '@/assets'

export default function Page() {
  const [logged, setLogged] = useState(true);

  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return <ActivityIndicator color={'#67397E'} size={'large'} />;

  if (logged) return <Redirect href={'homeScreen'}></Redirect>;
  return <Redirect href={'loginscreen'}></Redirect>;

  // const [assets, error] = useAssets([visual, corporal]);

  // // return assets ? <Image source={assets[1]} style={{width: 200, height: 200}}/> : null;

  // return (
  //   <View>
  //     <Text>Holaa</Text>
  //     <Image
  //        style={{
  //         height: 200,
  //         width: 200,
  //         backgroundColor: 'lightgray',
  //     }}
  //       source={assets[1]}
  //     />
  //   </View>
  // )

}
