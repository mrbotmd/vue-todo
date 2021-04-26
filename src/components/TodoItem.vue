<template>
  <div>
    <!-- <input
      @change="log(todo)"
      type="checkbox"
      :name="`selectedTodo${todo.id}`"
      :id="`selectedTodo${todo.id}`"
      v-model="todo.selected"
      aria-label="todo-select"
    /> -->

    <div v-show="!isEditable">
      <h4>{{ todo.title }}</h4>
      <p>{{ todo.description }}</p>
    </div>
    <div v-show="isEditable">
      <form @submit.prevent="updateTodo(todo.id, todo)">
        <input v-model="todo.title" type="text" :placeholder="todo.title" />
        <input
          v-model="todo.description"
          type="text"
          :placeholder="todo.description"
        />
        <button @click="isEditable = !isEditable" type="submit">Save</button>
        <button @click="cancelEdit" type="button">
          Cancel
        </button>
      </form>
    </div>

    <div>
      <label :for="`completeTodo${todo.id}`"> complete </label>
      <input
        @change="updateTodo(todo.id, todo)"
        style="display: none"
        type="checkbox"
        :name="`completeTodo${todo.id}`"
        :id="`completeTodo${todo.id}`"
        v-model="todo.done"
      />

      <label
        v-show="currentPath !== '/archived-todos'"
        :for="`archiveTodo${todo.id}`"
      >
        archive
      </label>
      <input
        @change="archiveTodo(todo.id, todo)"
        style="display: none"
        type="checkbox"
        :name="`archiveTodo${todo.id}`"
        :id="`archiveTodo${todo.id}`"
        v-model="todo.archived"
      />

      <label
        v-show="currentPath === '/archived-todos'"
        :for="`unArchiveTodo${todo.id}`"
      >
        unarchive
      </label>
      <input
        @change="unArchiveTodo(todo.id, todo)"
        style="display: none"
        type="checkbox"
        :name="`unArchiveTodo${todo.id}`"
        :id="`unArchiveTodo${todo.id}`"
        v-model="todo.archived"
      />

      <label :for="`deleteTodo${todo.id}`"> delete </label>
      <input
        @change="deleteTodo(todo.id)"
        style="display: none"
        type="checkbox"
        :name="`deleteTodo${todo.id}`"
        :id="`deleteTodo${todo.id}`"
      />

      <label :for="`editTodo${todo.id}`"> edit </label>
      <input
        @change="isEditable = !isEditable"
        style="display: none"
        type="checkbox"
        :name="`editTodo${todo.id}`"
        :id="`editTodo${todo.id}`"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todo: Object,
    currentPath: String,
    getTodos: Function,
    updateTodo: Function,
    deleteTodo: Function,
    archiveTodo: Function,
    unArchiveTodo: Function,
    log: Function,
  },

  data() {
    return {
      isEditable: false,
    };
  },
  methods: {
    cancelEdit() {
      this.getTodos(`http://localhost:3000${this.currentPath}`).then((res) => {
        console.log(res);
        this.isEditable = !this.isEditable;
      });
    },
  },
};
</script>

<style></style>
