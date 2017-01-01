import React from 'react';
import axios from 'axios';

import Question from './Question.jsx'
import Answer from './Answer.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      messages: []
    }
  }


  requestAnswers (e) {
    e.preventDefault();
    if (this.state.question.length > 0) {
      var self = this;
      this.setState({
        question: ''
      })
      this.state.messages.push(<Question message={this.state.question} key={this.state.messages.length} />)
      console.log(this.state.messages);
  
      axios.get('/getAnswers', {
          params: {
            question: self.state.question
          }
        })
        .then(function (response) {
          console.log(response);
          self.state.messages.push(<Answer message={response.data} key={self.state.messages.length}/>);
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
      <div id="appBody">
        <div id="messages">{this.state.messages}</div>

        <form onSubmit={this.requestAnswers.bind(this)} autoComplete="off">
          <input id="msgInput"
          placeholder="Ask a question..." 
          value={self.state.question} 
          onChange={(event) => {self.setState({question: event.target.value});}}
          autoComplete="off" />
        </form>

      </div>
    )
  }
}

module.exports = App;