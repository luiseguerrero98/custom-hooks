import { todoReducer } from "./todoReducer";
import { useCallback, useReducer, useEffect } from "react"

const init = () => {
    return JSON.parse(localStorage.getItem( 'todos' )) || [];
}

export const useTodo = () => {
    const [todos, dispatchTodo] = useReducer(todoReducer, [], init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify( todos ));
    }, [todos])
    
    

    const handleNewTodo = useCallback(
      (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        dispatchTodo(action);
      },
      [],
    )

    const handleDeleteTodo = (id) => {
        dispatchTodo({
            type: '[TODO] Remove Todo',
            payload: id
        })
    }

    const onToggleTodo = (id) => {
        dispatchTodo({
            type: '[TODO] Toggle Todo',
            payload: id
        });
    }
  return {
    todos,
    dispatchTodo,
    handleDeleteTodo,
    handleNewTodo,
    onToggleTodo,
    pendingTodos: todos.filter((todo)=> !todo.done).length,
    todosCount: todos.length
  }
}
