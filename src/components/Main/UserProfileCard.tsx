import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { getThemeStyle } from '../../services/ThemeService';
import { LocaleReducer, SearchReducer, Store, ThemeReducer } from '../../types';

interface Props {
  onProfileImageClicked(): void
}
interface StateToProps {
  locale: LocaleReducer,
  search: SearchReducer,
  theme: ThemeReducer
}

const UserProfileCard = ({ onProfileImageClicked }: Props) => {
  const {
    search: { userData: { profileImage, displayName, reputation, acceptRate } },
    locale: { strings: { userDetails } },
    theme: { isDarkMode }
  } = useSelector<Store, StateToProps>((state) => state);

  const { TEXT_COLOR, SEARCH_BAR } = getThemeStyle(isDarkMode);

  const renderDetailText = (key: string, value: string) => {
    return (
      <Text style={{ fontWeight: 'bold', color: TEXT_COLOR }}>
        {key}
        {': '}
        <Text style={{ fontWeight: 'normal', color: TEXT_COLOR }}>{value || '-'}</Text>
      </Text>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={onProfileImageClicked}>
        <Image style={[styles.profileImage, { borderColor: SEARCH_BAR }]} source={{ uri: profileImage }} />
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
        {renderDetailText(userDetails?.name, displayName)}
        {renderDetailText(userDetails?.reputation, reputation)}
        {renderDetailText(userDetails?.acceptRate, acceptRate)}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40
  },
  detailsContainer: {
    marginHorizontal: 20,
    justifyContent: 'space-evenly'
  },
  profileImage: {
    width: 90,
    height: 90,
    borderWidth: 1,
    borderRadius: 10,
  }
});

export default UserProfileCard;
