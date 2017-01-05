import React from 'react';
import Exponent from 'exponent';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions
} from 'react-native';

export default props => (

  <View style={props.styles.answerContainer}>
    <Text style={props.styles.answer}>
      {props.message}
    </Text>
  </View>
);
