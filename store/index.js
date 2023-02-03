import Localbase from 'localbase'
const db = new Localbase('db')

export const state = () => ({
  tasks: [
    // {
    //   id: 1,
    //   title: 'Wake up',
    //   done: true,
    //   dueDate: '2023-01-25',
    // },
    // {
    //   id: 2,
    //   title: 'Take a shower',
    //   done: false,
    //   dueDate: '2023-01-26',
    // },
    // {
    //   id: 3,
    //   title: 'Have breakfast',
    //   done: true,
    //   dueDate: null,
    // },
  ],
  snackbar: {
    show: false,
    text: '',
  },
  search: null,
})

export const mutations = {
  addTask(state, newTask) {
    state.tasks.push(newTask)
  },
  deleteTask(state, id) {
    state.tasks = state.tasks.filter((task) => task.id !== id)
  },
  updateTaskTitle(state, payload) {
    const task = state.tasks.filter((task) => task.id === payload.id)[0]
    task.title = payload.title
  },
  updateTaskDuedate(state, payload) {
    const task = state.tasks.filter((task) => task.id === payload.id)[0]
    task.dueDate = payload.dueDate
  },
  doneTask(state, id) {
    const task = state.tasks.filter((task) => task.id === id)[0]
    task.done = !task.done
  },
  showSnackbar(state, text) {
    state.snackbar.show = true
    state.snackbar.text = text
  },
  hideSnackbar(state) {
    state.snackbar.show = false
  },
  setSearch(state, value) {
    console.log(value)
    state.search = value
  },
  setTask(state, payload) {
    state.tasks = payload
  },
}
export const actions = {
  addTask({ commit }, newTaskTitle) {
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      done: false,
      dueDate: null,
    }
    db.collection('tasks')
      .add(newTask)
      .then(() => {
        commit('addTask', newTask)
        commit('showSnackbar', 'Task added')
      })
  },
  deleteTask({ commit }, id) {
    db.collection('tasks')
      .doc({ id })
      .delete()
      .then(() => {
        commit('deleteTask', id)
        commit('showSnackbar', 'Task removed')
      })
  },
  updateTaskTitle({ commit }, payload) {
    db.collection('tasks')
      .doc({ id: payload.id })
      .update({
        title: payload.title,
      })
      .then(() => {
        commit('updateTaskTitle', payload)
        commit('showSnackbar', 'Task updated')
      })
  },
  updateTaskDuedate({ commit }, payload) {
    db.collection('tasks')
      .doc({ id: payload.id })
      .update({ dueDate: payload.dueDate })
      .then(() => {
        commit('updateTaskDuedate', payload)
        commit('showSnackbar', 'Due Date updated')
      })
  },
  getTasks({ commit }) {
    db.collection('tasks')
      .get()
      .then((tasks) => {
        commit('setTask', tasks)
      })
  },
  doneTask({ state, commit }, id) {
    const task = state.tasks.filter((task) => task.id === id)[0]
    console.log(task)
    db.collection('tasks')
      .doc({ id })
      .update({
        done: !task.done,
      })
      .then(() => {
        commit('doneTask', id)
      })
  },
}

export const getters = {
  taskFiltered(state) {
    if (!state.search) {
      return state.tasks
    }
    return state.tasks.filter((task) => {
      return task.title.toLowerCase().includes(state.search.toLowerCase())
    })
  },
}
