import { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdCheckBoxOutlineBlank, MdCheckBox, MdCreate, MdClear } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { RiCameraSwitchFill } from "react-icons/ri";
import { BiLogOut, BiHomeAlt } from "react-icons/bi";
import { AiFillCarryOut } from "react-icons/ai";
import Quotes from "./Quotes";
import "./Todo.scss";

function HeaderTodo() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
    if (confirmLogout) {
      localStorage.removeItem("username");
      navigate("/");
    }
  };

  const onNavigateHome = () => {
    navigate("/Home");
  };

  const changeBackground = () => {
    const bgChanger = document.getElementById("bg-changer");
    bgChanger.classList.add("loading");

    const apiKey = '65AKyz4SmQXmqKugBwUZ7OcmhTN-1OLkSMs8P3nx11w';
    const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const imageUrl = data.urls.regular;
        const backgroundElement = document.querySelector(".Background");
        backgroundElement.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${imageUrl})`;
        bgChanger.classList.remove("loading");
      })
      .catch((error) => {
        console.error("Error fetching background image:", error);
        bgChanger.classList.remove("loading");
      });
  };

  return (
    <div className='Header'>
      <nav>
        <button id='log-out' onClick={handleLogout}>
          <BiLogOut className='react-icon' />
        </button>
        <ul className='Navigation'>
          <li id='bg-changer' onClick={changeBackground}>
            <RiCameraSwitchFill className='react-icon' />
          </li>
          <li id='go-todo'>
            <AiFillCarryOut style={{ color: "#fff" }} className='react-icon' />
          </li>
          <li id='go-home' onClick={onNavigateHome}>
            <BiHomeAlt className='react-icon' />
          </li>
        </ul>
      </nav>
    </div>
  );
}

function Todo() {

  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const [modifiedIndex, setModifiedIndex] = useState(null);
  const [modifiedItem, setModifiedItem] = useState("");

  const onChange = (e) => setToDo(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (toDo === "") {
      return;
    }
    const newToDo = { checked: false, item: toDo };
    const updatedToDos = [...toDos, newToDo];
    setToDos(updatedToDos);
    setToDo("");
  };

  const onDelete = (index) => {
    const updatedToDos = [...toDos];
    updatedToDos.splice(index, 1);
    setToDos(updatedToDos);
  };

  const onModify = (index) => {
    const updatedToDos = [...toDos];
    updatedToDos[index].item = modifiedItem;
    setToDos(updatedToDos);
    setModifiedIndex(null);
    setModifiedItem("");
  };

  const onModifyBtnClick = (index) => {
    setModifiedIndex(index);
    setModifiedItem(toDos[index]?.item);
  };

  const onCancelBtnClick = () => {
    setModifiedIndex(null);
    setModifiedItem("");
  };

  const onLiClick = (index) => {
    const updatedToDos = [...toDos];
    updatedToDos[index].checked = !updatedToDos[index].checked;
    setToDos(updatedToDos);
  };

  const saveToLocalStorage = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const loadFromLocalStorage = () => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setToDos(JSON.parse(savedTodos));
    }
  };

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  useEffect(() => {
    saveToLocalStorage(toDos);
  }, [toDos]);

  return (
    <div className='container'>
      <HeaderTodo />
      <div className='Todo'>
        <h1>{localStorage.getItem("username")}'s Today</h1>
        <Quotes />
        <h3>TO DO LIST ({toDos.length})</h3>
        <form onSubmit={onSubmit}>
          <input onChange={onChange} value={toDo} type='text' placeholder='Write your to do...' />
          <button type='submit'>
            <IoMdAdd className='react-icon' />
          </button>
        </form>
        <ul>
          {toDos.map((item, index) => {
            const isChecked = item.checked;
            return (
              <li key={index} className='todo-list'>
                <span onClick={() => onLiClick(index)} className={isChecked ? "checked" : ""}>
                  {isChecked ? (
                    <MdCheckBox className='check-icon' />
                  ) : (
                    <MdCheckBoxOutlineBlank className='check-icon' />
                  )}
                </span>
                {index === modifiedIndex ? (
                  <>
                    <input
                      className='modify-text-wrap'
                      type='text'
                      value={modifiedItem}
                      onChange={(e) => setModifiedItem(e.target.value)}
                    />
                    <div className='btns'>
                      <button onClick={() => onModify(index)}>
                        <MdCreate className='react-icon' />
                      </button>
                      <button onClick={onCancelBtnClick}>
                        <MdClear className='react-icon' />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className='todo-item'>{item.item}</span>
                    <div className='btns'>
                      <button onClick={() => onModifyBtnClick(index)}>
                        <MdCreate className='react-icon' />
                      </button>
                      <button onClick={() => onDelete(index)}>
                        <MdClear className='react-icon' />
                      </button>
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
