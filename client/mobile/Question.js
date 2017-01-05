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

  <View style={props.styles.questionContainer}>
    <Text style={props.styles.question}>
      {props.message}
    </Text>
  </View>
);
