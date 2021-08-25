import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';



export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (tasks.find(item => item.title === newTaskTitle)) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    } else {
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }

      setTasks([...tasks, data])
    }
  }

  function handleToggleTaskDone(id: number) {
    let newTask = tasks.map<Task>(item => {
      return item.id === id
        ? { ...item, done: !item.done }
        : { ...item }
    });
    setTasks(newTask);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: () => setTasks(oldTasks => oldTasks.filter(item => item.id !== id)),
        style: 'default'
      }
    ])
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    let newTask = tasks.map<Task>(item => {
      return item.id === taskId
        ? { ...item, title: taskNewTitle }
        : { ...item }
    });
    setTasks(newTask);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})