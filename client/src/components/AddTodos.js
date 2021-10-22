import React,{useState,useRef,useEffect,useContext} from 'react';
import {useMutation} from '@apollo/client';
import {ADD_TODO,UPDATE_TODO} from '../graphql/Mutation';
import {GET_TODOS,GET_TODO} from '../graphql/Query';
import {TodoContext} from '../TodoContext';
import {useQuery} from '@apollo/client';
import moment from 'moment';

const AddTodos = () =>{

	const {selected,setSelected} = useContext(TodoContext)

	const inputAreaRef = useRef();

	const [todo,setTodo] = useState({
		title:'',
		detail:'',
		date:''
	})	


	const [addTodo] = useMutation(ADD_TODO)
	const [updateTodo] = useMutation(UPDATE_TODO);
	const {loading,error,data} = useQuery(GET_TODO,{
		variables:{id:selected},onCompleted:(data)=>setTodo(data.getTodo)
	});

	console.log(data)

	const onSubmit = e =>{
		e.preventDefault();
		if(!todo.title) return alert('Title is required');
		if(!todo.detail) return alert('Provide the description');
		if(!todo.date) return alert('Please provide the date')
		if(selected === 0){
		addTodo({
			variables:{
				title:todo.title,
				detail:todo.detail,
				date:todo.date
			},
			refetchQueries:[
			{
				query:GET_TODOS
			}
			]
		})
	}else{
		updateTodo({
			variables:{
				id:selected,
				title:todo.title,
				detail:todo.detail,
				date:todo.date
			},
			refetchQueries:[
			{
				query:GET_TODOS
			}
			]
		})
	}
	}


	useEffect(()=>{
		const checkIfClickedOutside = e =>{
			if(!inputAreaRef.current.contains(e.target)){
				setSelected(0)
			}else{
				console.log('Inside');
			}
		}
		document.addEventListener('mousedown',checkIfClickedOutside);
		return ()=>{
			document.removeEventListener('mousedown',checkIfClickedOutside);
		}
	},[])

	return(
			<>
			    <form onSubmit={onSubmit} ref={inputAreaRef}>
			      <div className="mb-3">
			        <label htmlFor="title" className="form-label">Title</label>
			        <input type="text" className="form-control" id="title"  placeholder="enter title"
			        value={todo.title}
			        onChange={e=>setTodo({...todo,title:e.target.value})}/>
			      </div>
			      <div className="mb-3">
			        <label htmlFor="details" className="form-label">Detail</label>
			        <input type="text" className="form-control" id="details" placeholder="enter description."
			        value={todo.detail}
			        onChange={e=>setTodo({...todo,detail:e.target.value})}/>
			      </div>

			      <div className="mb-3">
			        <label htmlFor="date" className="form-label">Date</label>
			        <input type="date" className="form-control" id="date" 
			        value={moment(todo.date).format('yyyy-MM-DD')}
			        onChange={e=>setTodo({...todo,date:e.target.value})}/>
			      </div>      

			      <button type="submit" className="btn btn-primary">{selected === 0 ? 'Add' : 'Update'}</button>
			    </form> 
			</>
		)
}

export default AddTodos;