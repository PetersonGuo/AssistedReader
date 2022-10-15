/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Header from './components/Header';
import Description from './components/Description';
import ReadButton from './components/ReadButton';

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{backgroundColor: '#00ffff'}}>
        <Header />
        <Description
          subtitle="What Is Assistant Reader?"
          desc="Assistant Reader is an app designed to allow blind individuals to read text, by transforming text recognized through a camera into speech"
        />
        <Description
          subtitle="How To Use Assistant Reader"
          desc="All you need to do is to put on the pair of glasses, and whenever you want to read any text in front of you, just press and hold and button and it will translate any text it sees into speech"
        />
        <Description
          subtitle="Now Try It!"
          desc="Click the 'Read' button with your camera facing some text, and listen as the text gets read out loud! "
        />
        <ReadButton />
      </ScrollView>
    </SafeAreaView>
  );
}
