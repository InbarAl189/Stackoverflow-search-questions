import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { getThemeStyle } from '../../services/ThemeService';
import { LocaleReducer, Store, ThemeReducer } from '../../types';
import { BASIC_SHADOW_STYLES } from '../../constants/Constants';

interface Props {
  title: string,
  answersCount: number,
  creationDateTimestamp: number,
  viewsCount: number
}

interface StateToProps {
  locale: LocaleReducer,
  theme: ThemeReducer
}

const QuestionListItem = ({ title, answersCount, creationDateTimestamp, viewsCount }: Props) => {
  const { locale: { strings: { questionsData: { create, answers, views } } }, theme: { isDarkMode } } = useSelector<Store, StateToProps>((state) => state);

  const { TEXT_COLOR, BACKGROUND_COLOR } = getThemeStyle(isDarkMode);
  const formattedDate = moment(creationDateTimestamp).format('DD/MM/YYYY');

  return (
    <View style={[styles.itemContainer, { backgroundColor: BACKGROUND_COLOR, shadowColor: TEXT_COLOR }]}>

      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: TEXT_COLOR }]}>{title}</Text>
        <Text style={[styles.textStyle, { color: TEXT_COLOR }]}>{`${answers}: ${answersCount}`}</Text>
        <Text style={[styles.textStyle, { color: TEXT_COLOR }]}>{`${views}: ${viewsCount}`}</Text>
        <Text style={[styles.textStyle, { color: TEXT_COLOR }]}>{`${create}: ${formattedDate}`}</Text>
      </View>

      <Image style={[styles.arrowIcon, { tintColor: TEXT_COLOR }]} source={require('../../assets/next.png')} />
    </View>

  );
};

const styles = StyleSheet.create({
  itemContainer: {
    ...BASIC_SHADOW_STYLES,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 5
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  textStyle: {
    paddingVertical: 2
  },
  arrowIcon: {
    width: 20,
    height: 20,
    opacity: 0.6
  }
});

export default QuestionListItem;
