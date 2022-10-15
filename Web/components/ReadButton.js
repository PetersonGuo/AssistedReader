import React from 'react';
import {Text, View, SafeAreaView, Button, Alert} from 'react-native';

const ReadButton = () => {
  return (
    <SafeAreaView>
      <Button title="READ" onPress={() => Alert.alert('Read Available Text')} />
    </SafeAreaView>
  );
};

export default ReadButton;
