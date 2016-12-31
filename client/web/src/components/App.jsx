import React from 'react';
import axios from 'axios';

import Message from './Message.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      messages: []
    }
  }


  requestAnswers (e) {
    var self = this;
    e.preventDefault();
    console.log(this.state.messages)
    this.setState({
      question: ''
    })
    this.state.messages.push(this.state.question)
    console.log(this.state.question);

    axios.get('/getAnswers', {
        params: {
          question: self.state.question
        }
      })
      .then(function (response) {
        console.log(response);
        self.state.messages.push(response.data);
        self.setState({
          messages: self.state.messages
        })
        console.log(self.state.messages)

      })
      .catch(function (error) {
        console.log(error);
      });


  }
 
  render () {
    var self = this;
    var messages = this.state.messages.map(function(message, index) {
      return <Message message={message} key={index} />
    });
    return (
      <div>
        <div id="messages">{messages}</div>

        <form onSubmit={this.requestAnswers.bind(this)}>
          <input id="msgInput" value={self.state.question} onChange={(event) => {self.setState({question: event.target.value});}}/>
        </form>

      </div>
    )
  }
}

module.exports = App;