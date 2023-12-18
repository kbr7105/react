import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';
// import {useRef, useState} from "react";
// import TestComp from './component/TestComp';
import React, { useMemo, useCallback, useReducer, useRef } from 'react';

function reducer(state, action){
  switch(action.type){
    case "CREATE" : {
      return [action.newItem, ...state];
    }
    case "UPDATE" : {
      return state.map((it) => it.id === action.targetId?{...it,isDone : !it.isDone} : it);
    }
    case "DELETE" : {
      return state.filter((it) => it.id !== action.targetId);
    }
    default : return state;
  }
  return state;
}

//export 해야 사용 가능
export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

function App() {
  
  const mockTodo = [
    {
      id : 0,
      isDone : false,
      content : "React 공부하기",
      createDate : new Date().getTime(),
    },
    {
      id : 1,
      isDone : false,
      content : "정처기 공부하기",
      createDate : new Date().getTime(),
    },
  ];
  // const [todo, setTodo] = useState([mockTodo]);
  const [todo, dispatch] = useReducer(reducer, mockTodo); //함수, 초기값
  const idRef = useRef(3);
  const onCreate = (content) => {
    dispatch({
      type : "CREATE",
      newItem : {
        id : idRef.current,
        content,
        isDone : false,
        createDate : new Date().getTime(),
      },
    })
    idRef.current +=1;
  }
  const onUpdate = useCallback((targetId) => {
    dispatch({
      type : "UPDATE",
      targetId,
    });
  },[]);
  const onDelete = useCallback((targetId) => {
    dispatch({
      type : "DELETE",
      targetId,
    });
  },[]);
  const memoizedDispatches = useMemo(()=>{
    return {onCreate, onUpdate, onDelete};
  },[]);
  return (
    <div className="App">
      {/* <TestComp/> */}
      <Header/>
      <TodoStateContext.Provider value={{todo}}> {/*totostate->todo변화 dispatch->crud */}
        <TodoDispatchContext.Provider value={memoizedDispatches}>
          <TodoEditor /> {/*context를 통해 props 전달받음(기존 props 제거) */}
          <TodoList />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
