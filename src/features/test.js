import { Component } from "react";

export default class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      updatedInputValue: "",
      todoList: [
        { isDone: false, task: "First Task" },
        { isDone: true, task: "Second Task" },
      ],
    };
  }

  handleAdd = () => {
    this.setState({
      ...this.state,
      todoList: [
        ...this.state.todoList,
        { isDone: false, task: this.state.updatedInputValue },
      ],
    });
  };

  inputChangeHandler = (e) => {
    this.setState({
      ...this.state,
      updatedInputValue: e.target.value,
    });
  };

  handleDelete = (index) => {
    const { todoList } = this.state;

    let updatableObj = todoList[index];
    updatableObj.isDone = !updatableObj.isDone;

    todoList.splice(index, 1, updatableObj);

    this.setState({
      ...this.state,
      todoList: [...todoList],
    });
  };

  render() {
    return (
      <>
        <div>
          <h2>
            Todo List
            <br />
            <input
              value={this.state.updatedInputValue}
              onChange={this.inputChangeHandler}
            />{" "}
            <button onClick={this.handleAdd}>Add</button>
          </h2>
        </div>
        <ul>
          {this.state.todoList.map((todo, index) => {
            return (
              <li
                key={index}
                onClick={() => this.handleDelete(index)}
                className={todo.isDone && "is-done"}
              >
                {todo.task}{" "}
              </li>
            );
          })}
        </ul>

        <style>{`
                    .is-done {
                        text-decoration: line-through;
                    }
                `}</style>
      </>
    );
  }
}
