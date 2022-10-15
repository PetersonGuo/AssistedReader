import React from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView, Text} from 'react-native';

const styles = StyleSheet.create({
  subtitleStyle: {
    flex: 1,
    marginLeft: 20,
    fontSize: 30,
    fontWeight: 'bold',
    top: 20,
  },
  descriptionStyle: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    fontSize: 20,
    marginTop: 30,
    marginBottom: 10,
  },
});

const Description = props => {
  return (
    <SafeAreaView>
      <Text style={styles.subtitleStyle}>{props.subtitle}</Text>
      <Text style={styles.descriptionStyle}>{props.desc}</Text>
    </SafeAreaView>
  );
};

export default Description;
