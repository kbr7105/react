import React,{ useContext, useRef, useState } from "react";
import "./TodoEditor.css";
import { TodoContext } from "../App";
import { TodoDispatchContext } from "../App";

const TodoEditor = () => {
    const {onCreate} = useContext(TodoDispatchContext);
    const [content,setContent] = useState("");
    const inputRef = useRef();
    const onChangeContent = (e) =>{
        setContent(e.target.value);
    }
    const onSubmit = () => {
        if(!content){
            inputRef.current.focus();
            return;
        }
        onCreate(content);
        setContent("");
    };
    const onKeyDown = (e) => {
        if(e.keyCode === 13){ //엔터
            onSubmit();
        }
    }
    return(
        <div className="TodoEditor">
            <h4>새로운 To do 작성하기 🖍</h4>
            <div className="editor_wrapper">
                <input ref={inputRef} value = {content} onChange={onChangeContent} onKeyDown={onKeyDown} placeholder="새로운 To do"/>
                <button onClick={onSubmit}>추가</button>
            </div>
        </div>
    );
}
export default TodoEditor;