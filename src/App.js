//import logo from './logo.svg';
import React,{ Component } from 'react';
import Todos from './component/Todos';
import {BrowserRouter as Router, Route}  from 'react-router-dom';
import AddTodo from './component/AddTodo';
import About from './component/pages/About';
import Header from './component/layout/Header';
import './App.css';
//import {v4} from 'uuid';
import axios from 'axios';

class App extends Component{

  state = {
    todos:[]
      //[{
        //id :v4(),
      //title : 'Take out the trash',
      //completed : false
      //}]
    
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res =>this.setState({todos: res.data}) )
  }
  //changes the value of completetd once button checked
  markComplete = (id) =>{
    //console.log('Hello From app.js')
    //console.log(id)
    this.setState({todos: this.state.todos.map(todo => {
      if(todo.id === id){
        todo.completed=!todo.completed
      }
      return todo;
    })});
}

//detlete todo
delTodo = (id) => {
  console.log(id)
  axios.delete('https://jsonplaceholder.typicode.com/todos/${id}')
  .then(res => this.setState({todos : [...this.state.todos.filter(todo => todo.id !== id)]}));
}
//Add Todo
addTodo = (title) => {
  //console.log(title) we have now to add it to our state variable
  //const newTodo = {
     //id :v4(),
     //title, 
     //completed : false
  //}
  //add todo usig API with post request
  axios.post('https://jsonplaceholder.typicode.com/todos', {
    title,
    completed : false
  }). then (res => this.setState({todos : [...this.state.todos, res.data]}));
  

}


render(){
  //console.log(this.state.todos)

  return (
    <Router>
      <div className="App">
        <div className="container">
          <Header />
          <Route exact path="/" render = {props =>(
            <React.Fragment>
                <AddTodo addTodo={this.addTodo}/>
                <Todos todos= {this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
            </React.Fragment>
          )} />
          <Route  path="/about" component={About}
          />
          
        </div> 
      </div>
    </Router>
  );
}
}

export default App;
