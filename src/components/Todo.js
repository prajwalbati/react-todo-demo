import React, {Component} from 'react';
import axios from 'axios';
import Input from './Input';
import ListTodo from './ListTodo';
class Todo extends Component {
  state = {
    todos: []
  }
  componentDidMount(){
    this.getTodos();
  }
  getTodos = () => {
    axios.get('https://express-todo-mway.onrender.com/api/todos')
      .then(res => {
        if(res.data){
          this.setState({
            todos: res.data
          })
        }
      })
      .catch(err => console.log(err))
  }
  deleteTodo = (id) => {
    axios.delete(`/api/todos/${id}`)
      .then(res => {
        if(res.data){
          this.getTodos()
        }
      })
      .catch(err => console.log(err))
  }
  render() {
    let { todos } = this.state;
    return(

        <div className="card-body">
          <h4 className="card-title">Awesome Todo list</h4>
          <div className="add-items d-flex"> <input type="text" className="form-control todo-list-input" placeholder="What do you need to do today?" /> <button className="add btn btn-primary font-weight-bold todo-list-add-btn">Add</button> </div>
          <div className="list-wrapper">
              <ul className="d-flex flex-column-reverse todo-list">
                  <li>
                      <div className="form-check"> <label className="form-check-label"> <input className="checkbox" type="checkbox" /> For what reason would it be advisable. <i className="input-helper"></i></label> </div> <i className="remove mdi mdi-close-circle-outline"></i>
                  </li>
                  <li className="completed">
                      <div className="form-check"> <label className="form-check-label"> <input className="checkbox" type="checkbox" checked="" /> For what reason would it be advisable for me to think. <i className="input-helper"></i></label> </div> <i className="remove mdi mdi-close-circle-outline"></i>
                  </li>
                  <li>
                      <div className="form-check"> <label className="form-check-label"> <input className="checkbox" type="checkbox" /> it be advisable for me to think about business content? <i className="input-helper"></i></label> </div> <i className="remove mdi mdi-close-circle-outline"></i>
                  </li>
                  <li>
                      <div className="form-check"> <label className="form-check-label"> <input className="checkbox" type="checkbox" /> Print Statements all <i className="input-helper"></i></label> </div> <i className="remove mdi mdi-close-circle-outline"></i>
                  </li>
                  <li className="completed">
                      <div className="form-check"> <label className="form-check-label"> <input className="checkbox" type="checkbox" checked="" /> Call Rampbo <i className="input-helper"></i></label> </div> <i className="remove mdi mdi-close-circle-outline"></i>
                  </li>
                  <li>
                      <div className="form-check"> <label className="form-check-label"> <input className="checkbox" type="checkbox" /> Print bills <i className="input-helper"></i></label> </div> <i className="remove mdi mdi-close-circle-outline"></i>
                  </li>
              </ul>
          </div>
      </div>
    )
  }
}
export default Todo;