import React,{useState} from 'react';
import './App.css'
import {GET_TODOS} from './graphql/Query';
import {useQuery} from '@apollo/client';
import AddTodos from './components/AddTodos';
import Todo from './components/Todo';
import {TodoContext} from './TodoContext';


function App() {

  const [selected,setSelected] = useState(0);


  const {loading,error,data} = useQuery(GET_TODOS);
  if(loading) return <p>loading...</p>
  if(error) return <p>{error.message}</p>  

  return (
    <TodoContext.Provider value={{selected,setSelected}}>
    <div className="container todobox">
    <AddTodos />  

    <div className="list-group mt-1">
    {
      data.getTodos.map((todo) =>(
        <Todo key={todo.id} todo={todo}/>
      ))
    }
    </div>

        </div>
    </TodoContext.Provider>
  );
}

export default App;
