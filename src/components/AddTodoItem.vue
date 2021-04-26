<template>
  <form @submit.prevent="handleFormSubmit">
    <label for="">Title</label>
    <input type="text" name="" id="" v-model="title" />

    <label for="">Description</label>
    <input type="text" name="" id="" v-model="description" />
    <button type="submit">add</button>
    <button @click="cancelAdding" type="button">cancel</button>
  </form>
</template>

<script>
export default {
  props: {
    addNewTodo: Function,
  },

  data() {
    return {
      id: Math.floor(Math.random * 1000000),
      title: "",
      description: "",
      done: false,
      archived: false,
    };
  },
  methods: {
    cancelAdding() {
      this.title = "";
      this.description = "";
      this.$emit("cancelAddingNewTodo", false);
    },
    handleFormSubmit() {
      const data = {
        id: this.id,
        title: this.title,
        description: this.description,
        done: this.done,
        archived: this.archived,
      };
      this.addNewTodo(data);
      this.$emit("addingNewTodoComplete", false);
    },
  },
};
</script>

<style></style>
