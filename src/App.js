import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

class Message extends React.Component{
	render(){
		return (<div className="Message"> <p> {this.props.message.sender}: { this.props.message.body } </p>
				</div>);
	}
}

class Thread extends React.Component{
	constructor(props)
	{
		super(props);
		
		this.state = { thread: props.thread, isCollapsed: true, newMessageBody: "", newMessageSender: "" };
	}
	
	toggleCollapse(){
		this.setState({isCollapsed: !this.state.isCollapsed});
	}
	
	postMessage(){
		var input = this.state.newMessageBody;
		if(input.length == 0) return;
		
		var sender = this.state.newMessageSender;
		
		if(sender.length == 0) sender = "Anon";
		
		let thread = this.state.thread;
		const msgs = this.state.thread.messages;
		thread.messages = thread.messages.concat({sender:sender, body: input});
		this.setState( {thread: thread, newMessageBody: "" });
	}
	
	render(){
		
		var msgArr = [];
		var newMsg = "";
		
		if(!this.state.isCollapsed)
		{
			for(var i = 0; i < this.props.thread.messages.length; i++)
			{
				msgArr.push(<Message message={this.props.thread.messages[i] } />);
			}
			
			newMsg = (<div className="Message">
						New Message<br/>
						Your Name: <input onChange={(e) => {this.setState({newMessageSender: e.target.value});}} value={this.state.newMessageSender} /> <br/>
						Message Body: <input onChange={(e) => {this.setState({newMessageBody: e.target.value});}} value={this.state.newMessageBody} /> <br/>
						<button onClick={() => {this.postMessage()}}>Post</button>
					</div>);
		}
	
		return (<div> 
					<h2> <button onClick={() => {this.toggleCollapse()}} > {this.state.isCollapsed ? "+" : "-"} </button> {this.state.thread.title} (posted by {this.state.thread.sender}) </h2> 
					{msgArr} {newMsg}
				</div>
				);
	}
}

class Board extends React.Component{
	constructor(props){
		super(props);
		
		this.state = {
						threads: [ { sender: "jim", title: "does this work?", messages: [ { sender: "bob", body: "test1234" }, { sender: "dave", body: "yes, it does work jim!" } ]},
									{ sender: "susan", title: "What are your hobbies?", messages: [ { sender: "brian", body: "I like swords" }, { sender: "steve", body: "me too" }]}
								 ], 
						newThreadTitle: "", newThreadSender: ""};
	}
	
	
	
	postThread(){
		var input = this.state.newThreadTitle;
		if(input.length == 0) return;
		
		var sender = this.state.newThreadSender;
		
		if(sender.length == 0) sender = "Anon";
		
		let threads = this.state.threads;
		threads = threads.concat({sender:sender, title: input, messages: []});
		this.setState( {threads: threads, newThreadTitle: "" });
	}

	render(){
		const threads = this.state.threads;
	
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
		  
		  <div>
			<h2>New Thread</h2>
			  <div>
					Your Name: <input onChange={(e) => {this.setState({newThreadSender: e.target.value});}} value={this.state.newThreadSender} /> <br/>
					Message Body: <input onChange={(e) => {this.setState({newThreadTitle: e.target.value});}} value={this.state.newThreadTitle} /> <br/>
					<button onClick={() => {this.postThread()}}>Post</button>
				</div>
		  </div>
		  
		  </div>
	  );	
	}
}

function App() {
	/*const threads = [ { sender: "jim", title: "does this work?", messages: [ { sender: "bob", body: "test1234" }, { sender: "dave", body: "yes, it does work jim!" } ]},
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
  );*/
  return (<Board />);
}

export default App;
