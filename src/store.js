import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)


export const store = new Vuex.Store({
  state: {
    todoList: [],
    clicked: false,
    selectedIndex: null,
  },
  getters: {
    todoList(state) {
      return state.todoList;
    },
    updated(state) {
      return state.clicked;
    },
    selectIndex(state) {
      return state.selectedIndex;
    },
    todoLength(state) {
      return state.todoList.length
    },
  },
  mutations: {
    addTodo(state, todo) {
      state.todoList.push(todo);
    },
    removeTodo(state, index) {
      state.todoList.splice(index, 1);
    },
    editTodo(state, index) {
      state.clicked = true;
      state.selectIndex = index;
    },
    updateTodo(state, todo) {
      state.todoList.splice(state.selectIndex, 1, todo);
    },
    removeTodos(state, todo) {
      state.todoList.splice(todo)
    },
  },
  actions: {
    addNewTodoItem({
      commit
    }, todo) {
      commit("addTodo", todo);
    },
    removeTodoItem({
      commit
    }, index) {
      commit("removeTodo", index);
    },
    editTodoItem({
      commit
    }, index) {
      commit("editTodo", index)
    },
    updateTodoItem({
      commit
    }, todo) {
      commit("updateTodo", todo)
    },
    removeTodos({
      commit
    }, todo) {
      commit("removeTodos", todo)
    }
  }
})
