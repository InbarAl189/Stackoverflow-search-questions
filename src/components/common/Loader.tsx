import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { getThemeStyle } from '../../services/ThemeService';
import { Store, ThemeReducer } from '../../types';

interface Props {
  showLoader: boolean
}

const Loader = ({ showLoader }: Props) => {
  const { isDarkMode } = useSelector<Store, ThemeReducer>((state) => state.theme);
  const { TEXT_COLOR, SEARCH_BAR } = getThemeStyle(isDarkMode);

  return (
    <Modal
      visible={showLoader}
      transparent
      onRequestClose={() => {}}
    >
      <View style={[styles.container, { backgroundColor: SEARCH_BAR }]}>
        <ActivityIndicator size="large" color={TEXT_COLOR} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
