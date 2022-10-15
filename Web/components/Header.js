import React from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView, Text} from 'react-native';

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'yellow',
    flex: 1,
  },
  titleStyle: {
    fontSize: 40,
    fontWeight: 'bold',
    alignItems: 'flex-start',
    marginLeft: 20,
  },
});

const Header = () => {
  return (
    <SafeAreaView style={styles.headerStyle}>
      <Text style={styles.titleStyle}>Assistant Reader</Text>
    </SafeAreaView>
  );
};

export default Header;
