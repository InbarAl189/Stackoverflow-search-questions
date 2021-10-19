import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

interface Props {
  navigation: any,
  route: any
}

const WebviewPage = ({ navigation, route }: Props) => {
  const { url, headerTitle } = route.params;

  useEffect(() => {
    navigation.setOptions({ headerTitle });
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <WebView
        style={styles.webView}
        source={{ uri: url }}
        startInLoadingState
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  }
});

export default WebviewPage;
