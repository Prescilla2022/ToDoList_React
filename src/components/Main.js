import { React, useEffect, useState } from "react";
import Image from "../images/delete.png";
import ToDoList from "./ToDoList";

export default function Main() {
  //Set state
  const [toDoArray, setToDoArray] = useState([]);
  const [itemName, setItemName] = useState(null);
  const [toDoList, setToDoList] = useState([""]);
  const [count, setCount] = useState(0);

  //function to be called on change in the input field
  function setItem(event) {
    //setItemName((prev) => (prev = event.target.value));
    setItemName(event.target.value);
  }
  useEffect(() => {
    displayItem();

    console.log(toDoArray);
  }, []);

  //function to be called onclicking the add button
  async function displayItem() {
    let todoarray = [];

    const url = "https://todo-back-p4uy.onrender.com/show";
    const requestOptions = {
      method: "POST",

      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json",
      },
      // body: JSON.stringify({ todo: itemName }),
    };

    await fetch(url, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((value) => {
        todoarray = value.map((item) => {
          setToDoArray((prev) => [...prev, item.item]);

          return item.item;
        });
      });

    showList(todoarray);
  }
  async function addItem() {
     if (itemName !== "" && itemName !== null) {
      
    const url = "https://todo-back-p4uy.onrender.com/add";
    const requestOptions = {
      method: "POST",

      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json",
      },
      body: JSON.stringify({ todo: itemName }),
    };

    await fetch(url, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((value) => {
        return value;
      });

    const todoarray = toDoArray;
    todoarray.push(itemName);
    setCount((prev) => ++prev);
    setToDoArray((prev) => [...prev, itemName]);
    setToDoList((prev) => [
      ...prev,
      <p className="todo" key={count}>
        {itemName}
        <img
          style={{
            height: 20,
            width: 20,
            marginRight: 10,
            marginTop: 4,
          }}
          src={Image}
          alt="Delete icon"
          onClick={
            //removing the item on clicking the delete icon

            deleteOne
          }
        ></img>
      </p>,
    ]);
  } else {
      document.getElementById("search").placeholder = "* required";
    }

}

  async function clearList() {
    const todoarray = [];
    const url = "https://todo-back-p4uy.onrender.com/delete";
    const requestOptions = {
      method: "POST",

      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json",
      },
    };

    await fetch(url, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((value) => {
        return value;
      });
    //setToDoArray([]);
    setToDoList([]);
    // displayItem();
    setCount(0);
    console.log(count);
  }

  async function deleteOne(e) {
    const value = e.target.parentNode.innerText;

    //console.log(value);
    const todoarray = [];
    const url = "https://todo-back-p4uy.onrender.com/deleteOne";
    const requestOptions = {
      method: "POST",

      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json",
      },
      body: JSON.stringify({ item: value }),
    };

    await fetch(url, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((value) => {
        console.log(value);
        e.target.parentNode.style.display = "none";
        return value;
      });

    console.log(count);
  }

  //iterating through the todo Array
  function showList(todoarray) {
    console.log(todoarray);

    const toDoList = todoarray.map((item) => {
      if (item !== "" && item != null) {
        setCount((prev) => ++prev);
        return (
          <p className="todo" key={count}>
            {item}
            <img
              style={{
                height: 20,
                width: 20,
                marginRight: 20,
                marginTop: 4,
              }}
              src={Image}
              alt="Delete icon"
              onClick={
                //removing the item on clicking the delete icon

                deleteOne
              }
            ></img>
          </p>
        );
      }
    });
    setToDoList(toDoList);
  }

  return (
    <div>
      <div className="header">
        <p className="Heading">ToDo List</p>
      </div>
      <div className="formContainer">
        <div className="container">
          <div className="userinput">
            <input
              type="search"
              className="inputItem"
              placeholder="Enter Item"
              onChange={setItem}
            ></input>
            <button className="main-button" onClick={addItem}>
              +
            </button>
          </div>

          <ToDoList toDoList={toDoList} />
          <button className="clear-button" onClick={clearList}>
            ClearList
          </button>
        </div>
      </div>
    </div>
  );
}
