<template>
  <div class="flex column center">
    <div class="flex row container spaced vertical-align">
      <a-button
        class="control-btn"
        @click="isAddingNewTodo = !isAddingNewTodo"
        type="button"
        icon="plus"
        title="add new todo"
      />

      <h1 class="no-mp" v-show="currentPath === `/todos`">
        Your Todo List
      </h1>
      <h1 class="no-mp" v-show="currentPath === `/archived-todos`">
        Your Archived Todo List
      </h1>

      <!-- Вынести на отдельную страницу -->
      <AddTodoItem
        v-show="isAddingNewTodo"
        :addNewTodo="addNewTodo"
        @addingNewTodoComplete="addingNewTodoComplete"
        @cancelAddingNewTodo="cancelAddingNewTodo"
      />

      <div>
        <a-button
          class="control-btn"
          @click="increaseInSort = true"
          icon="arrow-down"
          title="sort desending"
        />
        <a-button
          class="control-btn"
          @click="increaseInSort = false"
          icon="arrow-up"
          title="sort increasing"
        />
      </div>
    </div>

    <div class="container">
      <a-list
        :data-source="increaseInSort ? sortedUpTodoList : sortedDownTodoList"
        :loading="loading"
        :split="false"
        :grid="{ suze: `middle` }"
      >
        <a-list-item
          :class="[todo.done && 'done']"
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
    log(e) {
      console.log(e.target.className);
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

.vertical-align {
  align-items: center;
}

.control-btn {
  border: none;
  box-shadow: 0 0 0;
}

.container {
  margin-top: 40px;
  min-width: 400px;
  width: 40%;
}

.no-mp {
  margin: 0;
  padding: 0;
}
</style>
