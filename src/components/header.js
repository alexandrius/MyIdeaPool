import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { colors } from '../styles';

const HEADER_HEIGHT = 60;

export default function Header({ showBackButton, renderRight, navigation }) {
   return (
      <View style={styles.root}>
         <View style={styles.container}>
            <View style={styles.left}>
               {showBackButton && (
                  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                     <Entypo name='chevron-thin-left' color='white' size={21} />
                  </TouchableOpacity>
               )}
               <Image
                  style={styles.logo(showBackButton)}
                  source={require('../../assets/images/lightbulb/lightbulb.png')}
               />
               {!showBackButton && <Text style={styles.title}>The Idea Pool</Text>}
            </View>
            {renderRight?.()}
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   root: {
      height: HEADER_HEIGHT + getStatusBarHeight(),
      backgroundColor: colors.primary,
   },
   left: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   container: {
      flexDirection: 'row',
      marginTop: getStatusBarHeight(),
      height: HEADER_HEIGHT,
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   back: {
      marginLeft: 17,
   },
   logo: (showBackButton) => ({
      marginLeft: showBackButton ? 16.5 : 21,
      marginRight: 18,
   }),
   title: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold',
      lineHeight: 24,
   },
});
