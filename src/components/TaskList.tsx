import { useState, useEffect } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [toDoTasks, setToDoTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    setCompletedTasks(tasks.filter(task => task.isComplete))
    setToDoTasks(tasks.filter(task => !task.isComplete))
  }, [tasks])

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle) return; //An empty string is by default false, the ! operator negates the current state. Being newTaskTitle = false and !newTaskTitle = true;  
    const newTask =  {
      id : Math.floor(Math.random() * 100),
      title : newTaskTitle,
      isComplete : false
    }        

    // A task cannot be saved if contains the same id then an already created task, find a way to check before saving it.     
    // if (tasks.map(task => task.id === newTask.id ?
    //   {...newTask,
    //     id : Math.random()
    //   } : task))
    console.log(tasks)
    setTasks(oldState => [...oldState, newTask])
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const toogledTasks = tasks.map(task => task.id === id ? {
      ...task, 
      isComplete: !task.isComplete
    } : task) 

    setTasks(toogledTasks)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks)
  }

  return (
    <div className='wrapper'>    
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {toDoTasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>
              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>              
            </li>        
          ))}
        </ul>
      </main>
    </section>
    <section className="task-list container">
           <header>
              <h2>Completed</h2>

      </header>
      <main>
        <ul>
          {completedTasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>
              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>              
            </li>        
          ))}
        </ul>
      </main>
    </section>
    </ div>
  )
}



// This is an alternative solution, a line of thought for future comparison
  // const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  // const [toDoTasks, setToDoTasks] = useState<Task[]>([]);

  // useEffect(() => {
  //   setCompletedTasks(tasks.map(task => task.isComplete ? task))
  // },[])