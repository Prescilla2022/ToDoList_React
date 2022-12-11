import React from "react";
import Image from "../images/delete.jpg";

export default function Main() {
  //Set state
  const [toDoArray, setToDoArray] = React.useState([""]);
  const [itemName, setItemName] = React.useState(null);

  //function to be called on change in the input field
  function setItem(event) {
    setItemName((prev) => (prev = event.target.value));
  }

  //function to be called onclicking the add button
  function addItem() {
    setToDoArray((prev) => [...prev, itemName]);
  }

  //iterating through the todo Array
  const toDoList = toDoArray.map((item) => {
    if (item !== "" && item != null) {
      return (
        <p className="todo" key={item}>
          {item}
          <img
            style={{
              height: 20,
              width: 20,
              marginRight: 10,
              marginTop: 4,
            }}
            src={Image}
            onClick={(e) => {
              //removing the item on clicking the delete icon
              e.target.parentNode.remove();

              console.log(toDoArray);
            }}
          ></img>
        </p>
      );
    }
  });
  return (
    <div>
      <p className="Heading">ToDo List</p>
      <div className="container">
        <div className="userinput">
          <input
            className="inputItem"
            placeholder="Enter Item"
            onChange={setItem}
          ></input>
          <button className="main-button" onClick={addItem}>
            +
          </button>
        </div>
        <section className="todolist">{toDoList}</section>
      </div>
    </div>
  );
}
