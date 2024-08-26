import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Todo } from "../interfaces/Todos";
import useAPI from "../hooks/useAPI";
import { AuthContext } from "./AuthContext";

interface ITodosContext {
  todos: Todo[];
  doneTodos: Todo[];
  todoToEdit?: Todo;
  loading: boolean;
  listLoading: boolean;
  error: boolean;
  haveMore: boolean;
  addTodoToEdit(id: string): void;
  toggleDone(id: string, done: boolean): Promise<void>;
  createTodo(text: string): Promise<boolean>;
  editTodo(id: string, text: string): Promise<void>;
  deleteTodo(id: string): Promise<void>;
  loadMore(): Promise<void>;
  resetTodos(): void;
  retry(): void;
}

const PAGE_SIZE = 20;

export const TodosContext = createContext({} as ITodosContext);

export const TodosProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoToEdit, setTodoToEdit] = useState<Todo>();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);

  const { httpGet, httpPatch, httpDelete, httpPost } = useAPI();
  const { userId } = useContext(AuthContext);

  const loadTodos = useCallback(async (page: number = 1) => {
    if (listLoading) { return; }
    if (!userId) { return };

    setError(false);
    setListLoading(true);
    const { data, ok, error } = await httpGet(`/task/list/${userId}?page=${page}&pageSize=${PAGE_SIZE}`);

    if (!ok) {
      console.log('[error]', error);
      alert('Error while fetching todos!');
      setListLoading(false);
      setError(true);
      return;
    }

    if (totalPages === 0) {
      setTotalPages(Math.ceil(data.metadata.totalRegisters / PAGE_SIZE));
    }

    setTodos(currentTodos => [...currentTodos, ...data.data]);
    setListLoading(false);
  }, [userId, totalPages, listLoading]);

  const loadMore = useCallback(async () => {
    const nextPage = currentPage + 1;
    if (nextPage > totalPages) { 
      alert('No more Todos to load!');
      return; 
    }

    await loadTodos(nextPage);
    setCurrentPage(nextPage);
  }, [currentPage, loadTodos, totalPages]);

  const createTodo = useCallback(async (text: string) => {
    if (!text) { 
      alert('Input empty!');
      return false;
    }

    setLoading(true);
    const response = await httpPost('/task', { text, userId });

    if (!response.ok) {
      alert('Error while creating Todo!');
      setLoading(false);
      return false;
    }

    if (totalPages > currentPage) {
      setLoading(false);
      return true;
    }

    const newTodos = [...todos];
    newTodos.push(response.data);

    setTodos(newTodos);
    setLoading(false);
    return true;
  }, [userId, todos, currentPage, totalPages]);

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

  const resetTodos = () => {
    setTodos([]);
    setError(false);
    setCurrentPage(1);
    setTotalPages(0);
    setListLoading(false);
    setLoading(false);
    setTodoToEdit(undefined);
  }


  const doneTodos = useMemo(() => {
    return todos.filter(todo => todo.done);
  }, [todos]);

  const haveMore = useMemo(() => {
    return totalPages > currentPage;
  }, [totalPages, currentPage]);

  useEffect(() => {
    loadTodos();
  }, [userId]);

  return (
    <TodosContext.Provider value={{
      todos,
      doneTodos,
      todoToEdit,
      loading,
      listLoading,
      error,
      haveMore,
      addTodoToEdit,
      toggleDone,
      createTodo,
      editTodo,
      deleteTodo,
      loadMore,
      resetTodos,
      retry: loadTodos
    }}>
      { children }
    </TodosContext.Provider>
  )
}