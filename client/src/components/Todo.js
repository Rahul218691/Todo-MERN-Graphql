import React,{useContext} from 'react';
import moment from 'moment';
import {useMutation} from '@apollo/client';
import {DELETE_TODO} from '../graphql/Mutation';
import {GET_TODOS} from '../graphql/Query';
import {TodoContext} from '../TodoContext';

const Todo = ({todo}) =>{

  const [deleteTodo] = useMutation(DELETE_TODO)

  const {selected,setSelected} = useContext(TodoContext)

  const removeTodo = (id) =>{
    deleteTodo({
      variables:{
        id:id
      },
      refetchQueries:[
      {query:GET_TODOS}
      ]
    })
  }

	return(
      <div onClick={()=>setSelected(todo.id)} className="list-group-item list-group-item-action" aria-current="true">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{todo.detail}</h5>
          <small>{moment(todo.date).format("MMMM DD YYYY")}</small>
        </div>
        <p className="mb-1">{todo.title}</p>
        <i className="fas fa-trash-alt" onClick={()=>removeTodo(todo.id)}></i>
      </div>
		)
}

export default Todo;