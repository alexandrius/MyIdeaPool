import { useActionSheet } from '@expo/react-native-action-sheet';
import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';

import Button from '../components/button';
import Header from '../components/header';
import TextInput from '../components/textInput';
import useAddIdea from '../hooks/useAddIdea';
import { colors } from '../styles';

function ScoreKeyValue({ left, value, onPress }) {
   return (
      <TouchableOpacity onPress={onPress} style={styles.scoreContainer}>
         <Text style={styles.scoreKey}>{left}</Text>
         <View style={styles.valueContainer}>
            <Text>{value.toString()}</Text>
            <Entypo name='triangle-down' color={onPress ? '#D8D8D8' : 'transparent'} />
         </View>
      </TouchableOpacity>
   );
}

const options = ['Cancel', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export default function AddIdea({ route, navigation }) {
   const {
      content,
      setContent,
      impact,
      setImpact,
      ease,
      setEase,
      confidence,
      setConfidence,
      avg,
      loading,
      createOrUpdateIdea,
   } = useAddIdea(route?.params?.idea);

   const { showActionSheetWithOptions } = useActionSheet();

   return (
      <View style={styles.flex}>
         <Header showBackButton navigation={navigation} />
         <ScrollView contentContainerStyle={styles.scrollContent}>
            <TextInput
               value={content}
               onChangeText={setContent}
               numberOfLines={3}
               maxLength={255}
               multiline
            />

            <ScoreKeyValue
               left='Impact'
               value={impact}
               onPress={() => {
                  showActionSheetWithOptions(
                     { options, cancelButtonIndex: 0, title: 'Impact' },
                     (i) => {
                        setImpact(i);
                     }
                  );
               }}
            />
            <ScoreKeyValue
               left='Ease'
               value={ease}
               onPress={() => {
                  showActionSheetWithOptions(
                     { options, cancelButtonIndex: 0, title: 'Impact' },
                     (i) => {
                        setEase(i);
                     }
                  );
               }}
            />
            <ScoreKeyValue
               left='Confidence'
               value={confidence}
               onPress={() => {
                  showActionSheetWithOptions(
                     { options, cancelButtonIndex: 0, title: 'Impact' },
                     (i) => {
                        setConfidence(i);
                     }
                  );
               }}
            />
            <ScoreKeyValue left='Avg.' value={avg} />

            <Button
               onPress={createOrUpdateIdea}
               loading={loading}
               style={styles.save}
               title='SAVE'
            />
            <Button onPress={() => navigation.goBack()} style={styles.cancel} title='CANCEL' />
         </ScrollView>
      </View>
   );
}

const styles = StyleSheet.create({
   flex: {
      flex: 1,
   },
   scrollContent: {
      paddingTop: 35,
      paddingHorizontal: 34,
   },
   save: {
      marginTop: 38,
   },
   cancel: {
      backgroundColor: colors.disabled,
      marginTop: 15,
   },
   scoreContainer: {
      borderBottomColor: 'rgb(212, 215, 217)',
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 33,
   },
   valueContainer: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   scoreKey: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 9,
   },
   scoreValue: {
      marginRight: 10,
      fontSize: 16,
      color: colors.text,
   },
});
