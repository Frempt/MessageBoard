import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

class Message extends React.Component{
	render(){
		return (<div className="Message"> <p> User: {this.props.message.sender} </p>
						<p> { this.props.message.body } </p>
				</div>);
	}
}

class Thread extends React.Component{
	constructor(props)
	{
		super(props);
		
		this.state = { thread: props.thread, isCollapsed: true };
	}
	
	toggleCollapse(){
		this.setState({isCollapsed: !this.state.isCollapsed});
	}
	
	render(){
		
		var msgArr = [];
	
		if(!this.state.isCollapsed)
		{
			for(var i = 0; i < this.props.thread.messages.length; i++)
			{
				msgArr.push(<Message message={this.props.thread.messages[i] } />);
			}
		}
	
		return (<div> <h2> <button onClick={() => {this.toggleCollapse()}} >+/-</button> {this.state.thread.title} posted by {this.state.thread.sender} </h2>
			{msgArr} 
			</div>);
	}
}

function App() {
	const threads = [ { sender: "jim", title: "does this work?", messages: [ { sender: "bob", body: "test1234" }, { sender: "dave", body: "yes, it does work jim!" } ]},
					  { sender: "susan", title: "What are your hobbies?", messages: [ { sender: "brian", body: "I like swords" }, { sender: "steve", body: "me too" } ]}];
	
	var threadArr = [];
	
	for(var i = 0; i < threads.length; i++)
	{
		threadArr.push(<Thread thread={threads[i] } />);
	}
	
  return (
    <div className="App">
      <header className="App-header">
        <p>
          React Message Board
        </p>
      </header>
	  
	  <div>
	  {threadArr}
	  </div>
    </div>
  );
}

export default App;
