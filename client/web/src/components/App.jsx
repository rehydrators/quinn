import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render () {
    return (
      <div>
        <div id="messages">Messages!</div>
        <div id="msgInput"></div>
      </div>
    )
  }
}

module.exports = App;