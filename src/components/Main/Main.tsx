import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Alert, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import UserProfileCard from './UserProfileCard';
import Loader from '../common/Loader';
import ToggleSwitch from '../common/ToggleSwitch';
import { setDarkMode } from '../../actions/ThemeActions';
import { getUserData, sortUserQuestions } from '../../actions/SearchActions';
import { getThemeStyle } from '../../services/ThemeService';
import { getUserDataById } from '../../services/SearchService';
import { LocaleReducer, SearchReducer, Store, ThemeReducer } from '../../types';
import { BASIC_SHADOW_STYLES, SCREEN_WIDTH } from '../../constants/Constants';
import UserQuestions from './UserQuestions';

interface Props {
  navigation: any
}

interface StateToProps {
  locale: LocaleReducer,
  theme: ThemeReducer,
  search: SearchReducer
}

const Main = ({ navigation }: Props) => {
  const { locale: { strings: { main, theme, search, questionsData, userDetails } }, theme: { isDarkMode }, search: { userData: { questions, profileLink, displayName } } } = useSelector<Store, StateToProps>((state) => state);
  const { BACKGROUND_COLOR, TEXT_COLOR, SEARCH_BAR } = getThemeStyle(isDarkMode);

  const [idQuery, setIdQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!idQuery) {
      setShowSearchResults(false);
    }
  }, [idQuery]);

  const onSwitchToDarkMode = () => {
    dispatch(setDarkMode(!isDarkMode));
  };

  const onSearchInput = async () => {
    try {
      setShowLoader(true);
      const userDataResults = await getUserDataById(idQuery);
      dispatch(getUserData(userDataResults));
      setTimeout(() => {
        setShowSearchResults(true);
        setShowLoader(false);
      }, 300);
    } catch (e) {
      setShowLoader(false);
      Alert.alert(search?.idError);
    }
  };

  const renderSortByButton = (sortByText: string, action: () => void) => {
    return (
      <TouchableOpacity onPress={action}>
        <View style={[styles.sortByButton, { borderColor: SEARCH_BAR, shadowColor: TEXT_COLOR, backgroundColor: BACKGROUND_COLOR }]}>
          <Text style={{ color: TEXT_COLOR, fontSize: 15 }}>{sortByText}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderUserData = () => {
    const profileHeaderTitle = `${displayName} ${userDetails?.profileTitle}`;
    const { date, answers, views } = questionsData;

    return (
      <>
        <UserProfileCard onProfileImageClicked={() => navigation.navigate('WebviewPage', { url: profileLink, headerTitle: profileHeaderTitle })} />

        <Text style={[styles.totalText, { color: TEXT_COLOR }]}>{`${questionsData?.total} ${questions.length} ${questionsData?.found}`}</Text>

        <View style={styles.sortContainer}>
          <Text style={{ marginRight: 5, color: TEXT_COLOR }}>{`${questionsData.sortBy}: `}</Text>
          {renderSortByButton(date, () => dispatch(sortUserQuestions('creation_date')))}
          {renderSortByButton(answers, () => dispatch(sortUserQuestions('answer_count')))}
          {renderSortByButton(views, () => dispatch(sortUserQuestions('view_count')))}
        </View>

        <UserQuestions questions={questions} navigation={navigation} />
      </>
    );
  };

  return (
    <SafeAreaView style={[styles.mainContainer, { backgroundColor: BACKGROUND_COLOR }]}>

      <View style={styles.toggleSwitchContainer}>
        <ToggleSwitch isOn={isDarkMode} action={onSwitchToDarkMode} />
        <Text style={[styles.modeText, { color: TEXT_COLOR }]}>{isDarkMode ? theme?.darkMode : theme?.lightMode}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: TEXT_COLOR }]}>{main?.title}</Text>
      </View>

      <>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.idInput, { borderBottomColor: SEARCH_BAR, color: TEXT_COLOR }]}
            value={idQuery}
            placeholder={search?.placeholder}
            placeholderTextColor={TEXT_COLOR}
            onChangeText={setIdQuery}
            onSubmitEditing={onSearchInput}
          />
          <TouchableOpacity onPress={() => setIdQuery('')}>
            <Image source={require('../../assets/close.png')} style={[styles.inputClearButton, { tintColor: TEXT_COLOR }]} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        {showSearchResults ? renderUserData() : null}
      </>

      <Loader showLoader={showLoader} />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
  },
  toggleSwitchContainer: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10
  },
  modeText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 3
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  inputClearButton: {
    width: 20,
    height: 20,
    right: 40
  },
  idInput: {
    width: SCREEN_WIDTH / 1.5,
    fontSize: 18,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  totalText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    opacity: 0.8
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  sortByButton: {
    ...BASIC_SHADOW_STYLES,
    borderWidth: 2,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 5
  }
});

export default React.memo(Main, (prevProps: Props, nextProps:Props) => {
  return !nextProps?.navigation?.isFocused();
});
