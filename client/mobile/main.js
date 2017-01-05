import Exponent from 'exponent';
import React from 'react';
import axios from 'axios';
import KeyboardSpacer from 'react-native-keyboard-spacer';


import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';

import Answer from './Answer.js';
import Question from './Question.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      messages: []
    }
  }

  componentDidMount () {
    this.state.messages.push(<Answer styles={styles} message={'Hi, I\'m Quinn, what would you like to know?'} key={this.state.messages.length}/>)
    this.setState({
      messages: this.state.messages
    })
  }


  requestAnswers (e) {
    e.preventDefault();
    if (this.state.question.length > 0) {
      var self = this;
      this.setState({
        question: ''
      })
      this.state.messages.push(<Question styles={styles} message={this.state.question} key={this.state.messages.length} />)
      console.log(this.state.messages);
  
      axios.get('http://104.236.160.117/getAnswers', {
          params: {
            question: self.state.question
          }
        })
        .then(function (response) {
          console.log(response);
          self.state.messages.push(<Answer styles={styles} message={response.data} key={self.state.messages.length}/>);
          self.setState({
            messages: self.state.messages
          })
          console.log(self.state.messages)
          var objDiv = document.getElementById("messages");
          objDiv.scrollTop = objDiv.scrollHeight;
  
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
 
  render () {
    var self = this;
    // var messages = this.state.messages.map(function(message, index) {
    //   return <Message message={message} key={index} />
    // });
    return (
      <View style={styles.appBody}>
        <View style={styles.topBar}></View>
        <ScrollView style={styles.messages} ref='messages'>{this.state.messages}</ScrollView>
        <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          placeholder="Ask a question..."
          autoCorrect={true}
          onChangeText={(text) => {self.setState({question: text}); console.log(text)}}
          onSubmitEditing={this.requestAnswers.bind(this)}
          value={self.state.question}
          style={styles.msgInput}
        />
        </View>
        <KeyboardSpacer/>
      </View>
    )
  }
}

let { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  topBar: {
    width: width,
    height: 0.03*height,
    backgroundColor: 'black'
  },
  inputContainer: {
    width: width,
    borderTopWidth: 1,
    borderTopColor: '#cccccc'
  },
  msgInput: {
    // alignSelf: 'stretch',
    width: width,
    height: 0.075*height,
    paddingLeft: 10,
    paddingTop: 8,
    paddingBottom: 8
  //   position: fixed,
  //   width: 97%,
  //   height: 40px,
  //   position: absolute,
  //   bottom: 7.5%,
  //   border: none,

  //   borderTop: 1px solid #cccccc,
  //   resize: none,
  //   overflow: auto,
  //   margin: 0,

  //   fontFamily: sansSerif,
  //   fontWeight: 300,
  //   fontSize: 20px,

  //   padding: 0 10px
  },
  appBody: {
    width: width,
    height: height
    // margin: 0
  },
  messages: {
    width: width,
    height: 0.925*height,
    paddingTop: 20
    // padding: 20px,
    // margin: 0,
    // /*border: 1px solid black;*/
    // border: none,
    // width: 93%,
    // height: 80%,
    // overflow: scroll
  },
  answerContainer: {
    width: 0.75*width,

    margin: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'transparent',
    backgroundColor: '#f1f0f0'

  },
  answer: {
    backgroundColor: 'transparent',
    fontFamily: 'AppleSDGothicNeo-Light',
    fontWeight: '300',
    fontSize: 20,
    padding: 10
    

  },
  questionContainer: {
    alignSelf: 'flex-end',
    width: 0.75*width,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 20,
    margin: 20,
    backgroundColor: '#0084ff',
    marginRight: 30


  },
  question: {
    backgroundColor: 'transparent',

    fontFamily: 'AppleSDGothicNeo-Light',
    fontWeight: '300',
    fontSize: 20,
    color: 'white',

    padding: 10
  }
})

Exponent.registerRootComponent(App);
