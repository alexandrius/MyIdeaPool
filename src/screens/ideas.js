import { Entypo } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import Header from '../components/header';
import useIdeas from '../hooks/useIdeas';
import { colors } from '../styles';

function ScoreKeyValue({ top, bottom }) {
   return (
      <View style={styles.score}>
         <Text style={styles.scoreValue}>{top.toString()}</Text>
         <Text style={styles.scoreKey}>{bottom.toString()}</Text>
      </View>
   );
}

function Idea({ content, impact, ease, confidence, average_score }) {
   return (
      <View style={styles.idea}>
         <Text style={styles.ideaContent}>{content}</Text>
         <View style={styles.divider} />
         <View style={styles.rowJustify}>
            <View style={styles.row}>
               <ScoreKeyValue bottom='Impact' top={impact} />
               <ScoreKeyValue bottom='Ease' top={ease} />
               <ScoreKeyValue bottom='Confidence' top={confidence} />
            </View>
            <ScoreKeyValue bottom='Avg.' top={average_score} />
         </View>
      </View>
   );
}

export default function Ideas({ navigation }) {
   const { ideas, fetchIdeas, loading } = useIdeas();

   useEffect(() => {
      fetchIdeas();
   }, []);

   return (
      <View style={styles.flex}>
         <Header
            renderRight={() => (
               <TouchableOpacity>
                  <Text style={styles.logout}>Log out</Text>
               </TouchableOpacity>
            )}
         />
         <FlatList
            data={ideas}
            contentContainerStyle={styles.listContent}
            refreshing={loading}
            onRefresh={() => fetchIdeas(1)}
            ListEmptyComponent={
               <View style={styles.emptyContainer}>
                  {!loading && (
                     <>
                        <Image
                           source={require('../../assets/images/lightbulb_big/lightbulb_big.png')}
                        />
                        <Text style={styles.gotIdeas}>Got Ideas?</Text>
                     </>
                  )}
               </View>
            }
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => <Idea {...item} />}
         />

         <TouchableOpacity
            onPress={() => navigation.navigate('AddIdea')}
            style={styles.addContainer}
            activeOpacity={0.8}>
            <Entypo color='white' size={50} name='plus' />
         </TouchableOpacity>
      </View>
   );
}

const styles = StyleSheet.create({
   flex: {
      flex: 1,
   },
   row: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   rowJustify: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   listContent: {
      flexGrow: 1,
      paddingHorizontal: 12,
   },
   emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
   },
   gotIdeas: {
      marginTop: 21,
      color: colors.text,
      fontSize: 20,
   },
   logout: {
      color: 'white',
      marginRight: 19,
      fontSize: 17,
      letterSpacing: -0.41,
   },
   addContainer: {
      position: 'absolute',
      right: 29,
      bottom: getBottomSpace() + 33,
      height: 60,
      width: 60,
      borderRadius: 30,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
   },
   idea: {
      shadowColor: '#000000',
      shadowOffset: {
         width: 0,
         height: 1,
      },
      shadowOpacity: 0.33,
      shadowRadius: 1.41,
      elevation: 2,

      marginVertical: 7.5,
      paddingRight: 11,
      paddingTop: 12,
      paddingBottom: 18,
      backgroundColor: 'white',
      borderRadius: 5,
   },
   ideaContent: {
      fontSize: 16,
      lineHeight: 18,
      color: colors.text,
      marginLeft: 17,
   },
   divider: {
      marginTop: 13,
      marginBottom: 9,
      height: 1,
      backgroundColor: 'border: 1px solid rgba(151,151,151,0.17);',
   },
   score: {
      alignItems: 'center',
      marginLeft: 20,
   },
   scoreKey: {
      fontSize: 14,
      marginTop: 1,
      lineHeight: 17,
   },
   scoreValue: {
      lineHeight: 18,
      fontSize: 16,
   },
});
