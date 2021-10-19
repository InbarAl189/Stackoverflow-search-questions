import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import QuestionListItem from './QuestionListItem';

interface Props {
  questions: any,
  navigation: any
}
const UserQuestions = ({ navigation, questions }: Props) => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        data={questions}
        renderItem={(question: any) => {
          const { title, answer_count, creation_date, view_count, link } = question?.item;
          return (
            <TouchableOpacity style={styles.questionItemButton} onPress={() => navigation.navigate('WebviewPage', { url: link, headerTitle: title })}>
              <QuestionListItem title={title} answersCount={answer_count} creationDateTimestamp={creation_date} viewsCount={view_count} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 20,
    flex: 1
  },
  questionItemButton: {
    paddingVertical: 5,
    paddingHorizontal: 10
  }
});

export default UserQuestions;
