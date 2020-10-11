import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import Header from '../components/header';
import TextInput from '../components/textInput';
import useAddIdea from '../hooks/useAddIdea';

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

   return (
      <View style={styles.flex}>
         <Header showBackButton navigation={navigation} />
         <ScrollView contentContainerStyle={styles.scrollContent}>
            <TextInput value={content} onChangeText={setContent} />
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
});
