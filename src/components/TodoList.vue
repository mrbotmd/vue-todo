<template>
  <div>
    <div>
      <div>
        <a-button @click="isAddingNewTodo = !isAddingNewTodo" type="button">
          <a-icon type="plus" title="add new todo" />
        </a-button>
        <p>Add new Todo</p>
      </div>
      <AddTodoItem
        v-show="isAddingNewTodo"
        :addNewTodo="addNewTodo"
        @addingNewTodoComplete="addingNewTodoComplete"
        @cancelAddingNewTodo="cancelAddingNewTodo"
      />
    </div>
    <a-icon @click="increaseInSort = false" type="arrow-up" />
    <a-icon @click="increaseInSort = true" type="arrow-down" />

    <a-list
      :data-source="increaseInSort ? sortedUpTodoList : sortedDownTodoList"
      :loading="loading"
      :split="false"
      :grid="{ suze: `middle` }"
    >
      <a-list-item
        :class="[todo.done && 'done', `red todo-container`]"
        slot="renderItem"
        slot-scope="todo"
        :key="todo.id"
      >
        <TodoItem
          :log="log"
          :getTodos="getTodos"
          :unArchiveTodo="unArchiveTodo"
          :archiveTodo="archiveTodo"
          :updateTodo="updateTodo"
          :deleteTodo="deleteTodo"
          :currentPath="currentPath"
          :todo="todo"
        />
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import axios from "axios";
import TodoItem from "./TodoItem";
import AddTodoItem from "./AddTodoItem";

export default {
  name: "ToDoList",
  components: { TodoItem, AddTodoItem },

  data() {
    return {
      increaseInSort: true,
      isAddingNewTodo: false,
      loading: false,
      todoList: [],
      currentPath: this.$router.history.current.path,
    };
  },

  created() {
    console.log(this.$router.history.current.path);
    this.getTodos(`http://localhost:3000${this.$router.history.current.path}/`);
  },

  computed: {
    sortedUpTodoList() {
      return [...this.todoList].sort((a, b) => a.id - b.id);
    },

    sortedDownTodoList() {
      return [...this.todoList].sort((a, b) => b.id - a.id);
    },
  },

  methods: {
    log(item) {
      console.log(item);
    },

    cancelAddingNewTodo(state) {
      this.isAddingNewTodo = state;
    },

    addingNewTodoComplete(state) {
      this.isAddingNewTodo = state;
    },

    getTodos(url) {
      console.log("run");
      this.loading = true;

      axios.get(url).then((res) => {
        this.loading = false;
        this.todoList = res.data;
      });
    },

    getTodo(url, id) {
      this.loading = true;
      axios.get(url, id).then((res) => {
        this.loading = false;
        this.todoList = res.data;
        console.log(this.todoList);
      });
    },

    deleteTodo(id) {
      axios
        .delete(`http://localhost:3000${this.currentPath}/${id}`)
        .then(
          (res) =>
            res.status === 200 &&
            this.getTodos(`http://localhost:3000${this.currentPath}`)
        );
    },

    updateTodo(id, data) {
      console.log(data);
      axios
        .put(`http://localhost:3000/todos/${id}`, data)
        .then(
          (res) =>
            res.status === 200 &&
            this.getTodos(`http://localhost:3000${this.currentPath}`)
        );
    },

    addNewTodo(data) {
      axios
        .post(`http://localhost:3000/todos/`, {
          ...data,
        })
        .then(
          (res) =>
            res.status >= 200 &&
            res.status < 300 &&
            this.getTodos(`http://localhost:3000${this.currentPath}/`)
        );
    },

    archiveTodo(id, data) {
      console.log(data);
      axios
        .post(`http://localhost:3000/archived-todos/`, { ...data })
        .then(
          (res) => res.status >= 200 && res.status < 300 && this.deleteTodo(id)
        );
    },
    unArchiveTodo(id, data) {
      console.log(data);
      axios
        .post(`http://localhost:3000/todos/`, { ...data })
        .then(
          (res) => res.status >= 200 && res.status < 300 && this.deleteTodo(id)
        );
    },
  },
};
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
.red {
  color: red;
}
.todo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
