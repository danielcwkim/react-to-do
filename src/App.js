import React, { Component } from 'react';
import './App.css';
import ToDo from './components/ToDo.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick= this.handleClick.bind(this);
    this.state = {
      todos: [
        { description: 'walk the cat', isCompleted: true},
        { description: 'Throw the dishes away', isCompleted: false },
        { description: 'Buy new dishes', isCompleted: false }
      ],
      newTodoDescription: '',
    }
  }
  handleChange(e) {
    this.setState({newTodoDescription: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
    if (!this.state.newTodoDescription) { return }
    const newTodo = { description: this.state.newTodoDescription, isCompleted: false};
    this.setState({todos: [...this.state.todos, newTodo], newTodoDescription: '' });
  }
  toggleComplete(index){
    const todos = this.state.todos.slice();
    const todo = todos[index];
    todo.isCompleted = todo.isCompleted ? false : true;
    this.setState({todos: todos});
  }
  deleteTodo(index){
    const toDoList = this.state.todos.filter(x => x !== this.state.todos[index] );
    this.setState({todos: toDoList});
  }
  handleClick(e){
    this.deleteTodo(e)
  }
  render() {
    return (
      <div className="App">
        <ul>
          { this.state.todos.map((todo,index) =>
            <ToDo key={index} description={ todo.description } isCompleted={todo.isCompleted} toggleComplete={() => this.toggleComplete(index)} deleteTodo={() => this.deleteTodo(index)} handleClick={() => this.handleClick(index)}/>
          )}
        </ul>
        <form onSubmit={ (e) => this.handleSubmit(e)}>
          <input type="text" value={ this.state.newTodoDescription} onChange={(e) => this.handleChange(e)}/>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default App;