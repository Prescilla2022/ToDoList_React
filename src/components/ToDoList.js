import React from "react";
export default function ToDoList(props, index) {
  return (
    <section key={index} className="todolist">
      {props.toDoList}
    </section>
  );
}
