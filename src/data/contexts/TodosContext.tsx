import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Todo } from "../interfaces/Todos";
import useAPI from "../hooks/useAPI";
import { AuthContext } from "./AuthContext";

interface ITodosContext {
  todos: Todo[];
  doneTodos: Todo[];
  todoToEdit?: Todo;
  loading: boolean;
  addTodoToEdit(id: string): void;
  toggleDone(id: string, done: boolean): Promise<void>;
  createTodo(text: string): Promise<void>;
  editTodo(id: string, text: string): Promise<void>;
  deleteTodo(id: string): Promise<void>;
}

export const TodosContext = createContext({} as ITodosContext);

export const TodosProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoToEdit, setTodoToEdit] = useState<Todo>();
  const [loading, setLoading] = useState<boolean>(false);

  const { httpGet, httpPatch, httpDelete } = useAPI();
  const { userId } = useContext(AuthContext);

  const loadTodos = useCallback(async () => {
    if (!userId) { return };

    setLoading(true);
    const response = await httpGet(`/task/list/${userId}`);

    if (!response.ok) {
      alert('Error while fetching todos! 123');
      setLoading(false);
      return;
    }

    setTodos(response.data.data);
    setLoading(false);
  }, [userId]);

  const createTodo = useCallback(async (text: string) => {

  }, [userId]);

  const editTodo = useCallback(async (id: string, text: string) => {
    setLoading(true);
    const response = await httpPatch(`/task/${id}`, { text });
    
    if (!response.ok) {
      alert('Error while editing Todo!');
      setLoading(false);
      return;
    }
    
    const idx = todos.findIndex(todo => todo.id === id);
    const newTodos = [...todos];

    newTodos[idx].text = response.data.text;
    
    setTodos(newTodos);
    setLoading(false);
  }, [todos]);

  const deleteTodo = useCallback(async (id: string) => {
    setLoading(true);
    const response = await httpDelete(`/task/${id}`);

    if (!response.ok) {
      alert('Error while deleting Todo!');
      setLoading(false);
      return;
    }
    const newTodos = todos.filter(todo => todo.id !== id);

    setTodos(newTodos);
    setLoading(false);
  }, [todos]);

  const toggleDone = useCallback(async (id: string, done: boolean) => {
    setLoading(true);
    const response = await httpPatch(`/task/${id}`, { done });

    if (!response.ok) {
      alert('Error while finishing Todo!');
      setLoading(false);
      return;
    }
    
    const idx = todos.findIndex(todo => todo.id === id);
    const newTodos = [...todos];
    newTodos[idx].done = response.data.done;

    setTodos(newTodos);
    setLoading(false);
  }, [todos]);

  const addTodoToEdit = useCallback((id: string) => {
    const todo = todos.find(t => t.id === id);

    setTodoToEdit(todo);
  }, [todos]);


  const doneTodos = useMemo(() => {
    return todos.filter(todo => todo.done);
  }, [todos]);

  useEffect(() => {
    loadTodos();
  }, [userId]);

  return (
    <TodosContext.Provider value={{
      todos,
      doneTodos,
      todoToEdit,
      loading,
      addTodoToEdit,
      toggleDone,
      createTodo,
      editTodo,
      deleteTodo,
    }}>
      { children }
    </TodosContext.Provider>
  )
}