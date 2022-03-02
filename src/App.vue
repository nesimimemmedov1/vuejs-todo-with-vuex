<template>
  <div id="app">
    <div class="container">
      <div class="todos">
        <h1 class="heading">TODO LIST</h1>
        <div class="wrapper">
          <input
            @input="$v.todoItem.$touch()"
            id="input"
            type="text"
            v-model="todoItem"
            placeholder="Add task"
          />
          <div class="buttons">
            <button
              :disabled="$v.$invalid"
              class="btn add-btn"
              v-if="isEditing !== true"
              @click="addList"
            >
              <i class="fas fa-plus"></i></button
            ><button
              id="remove-btn"
              disabled
              title="Remove All"
              class="btn remove-btn"
              v-show="isEditing !== true"
              @click="removeAllTodos"
            >
              <i class="fas fa-trash-alt" aria-hidden="true"></i>
            </button>
            <button v-show="isEditing === true" @click="updateTodo" class="completed-btn">
              <i class="fas fa-check" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <h3 v-if="todoLength > 0">Todos</h3>
        <ul class="todo-list">
          <transition-group name="slide" mode="out-in">
            <li
              class="todo-item"
              v-for="(todoItem, index) in todoList"
              :key="index"
            >
              {{ todoItem }}
              <div class="buttons">
                <button class="edit" @click="editList(todoItem, index)">
                  <i class="far fa-edit" aria-hidden="true"></i></button
                ><button class="remove" @click="removeList(index)">
                  <i class="fas fa-trash" aria-hidden="true"></i>
                </button>
              </div>
            </li>
          </transition-group>
        </ul>
        <p v-if="todoLength > 0">Number of todo: {{ todoLength }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  name: "app",
  data() {
    return {
      todoItem: "",
      completed: false,
      isEditing: null,
    };
  },
  created() {},
  methods: {
    addList() {
      this.$store.dispatch("addNewTodoItem", this.todoItem);
      if (this.todoLength > 0) {
        document.getElementById("remove-btn").disabled = false;
      }
      this.todoItem = "";
    },
    removeList(index) {
      this.$store.dispatch("removeTodoItem", index);
      document.getElementById("remove-btn").disabled = true;
    },
    editList(todoItem, index) {
      this.todoItem = todoItem;
      this.$store.dispatch("editTodoItem", index);
      this.isEditing = true;
    },
    updateTodo() {
      this.$store.dispatch("updateTodoItem", this.todoItem);
      this.isEditing = false;
      this.todoItem = "";
    },
    removeAllTodos() {
      this.$store.dispatch("removeTodos");
      document.getElementById("remove-btn").disabled = true;
    },
  },
  computed: {
    ...mapGetters(["todoList", "todoLength"]),
  },
  validations: {
    todoItem: {
      required,
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");
body {
  background: linear-gradient(160deg, #c13e3e, #e6b332);
  overflow-x: auto;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100%;
  font-family: "Poppins", sans-serif;
}

input,
button {
  outline: none;
  border: none;
  box-shadow: none !important;
}

#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .container {
    display: flex;
    .todos {
      width: 600px;
      margin: 0 auto;
      padding: 20px;

      button {
        color: white;
        width: 42px;
        font-size: 14px;
        border-radius: 0;
        transition: 0.3s;
      }
      .heading {
        color: white;
        font-weight: 700;
        position: relative;
        margin-bottom: 30px;
        &::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          margin: 0 auto;
          bottom: -6px;
          width: 40px;
          height: 2px;
          background-color: white;
          transition: 0.5s;
        }
      }
      h3 {
        color: white;
        margin-bottom: 10px;
      }
      .wrapper {
        display: flex;
        margin-bottom: 20px;
        position: relative;
        #input {
          width: 100%;
          border: none;
          padding: 8px;
        }
        .add-btn {
          background-color: rgb(233, 153, 61);
        }
        .remove-btn {
          background-color: #e72727;
        }
        .completed-btn {
          background-color: #3ec282;
        }
      }
      .todo-list {
        list-style-type: none;
        padding: 0;
        .todo-item {
          display: flex;
          justify-content: space-between;
          width: 100%;
          background-color: white;
          color: black;
          padding: 8px 88px 8px 10px;
          margin-top: 10px;
          overflow: hidden;
          position: relative;
          line-break: anywhere;
          text-align: left;
        }
      }
      p {
        text-align: right;
        color: white;
        font-weight: 500;
      }
      .buttons {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        button {
          height: 100%;
        }
        .edit {
          background-color: rgb(86, 62, 193);
        }
        .remove {
          background-color: #e72727;
        }
        .completed {
          background-color: #3ec282;
        }
      }
    }
  }
}
.slide-enter {
  opacity: 0;
}

.slide-enter-active {
  animation: slide-in 0.5s ease-out forwards;
  transition: opacity 0.5s;
}

.slide-leave {
  animation: slide-out 0.5s ease-out forwards;
  transition: 0.5s;
}

.slide-leave-active {
  animation: slide-out 0.5s ease-out forwards;
  transition: opacity 0.5s;
  opacity: 0;
}

.slide-move {
  transition: 0.5s;
}

.line_through {
  text-decoration: line-through;
  opacity: 0.7;
  transition: 0.3s;
}
// mediq-queries
@media (max-width: 767.9px) {
  #app {
    .container {
      .todos {
        width: 100%;
      }
    }
  }
}

@media (max-width: 576.9px) {
  #app {
    .container {
      .todos {
        padding: 0;
        .wrapper {
          #input {
            font-size: 14px;
          }
        }
        .heading {
          font-size: 24px;
        }
        h3 {
          font-size: 20px;
        }
        i {
          font-size: 12px;
        }
        .buttons {
          button {
            width: 35px;
          }
        }
        .todo-list {
          .todo-item {
            font-size: 14px;
          }
        }
        p {
          font-size: 14px;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
