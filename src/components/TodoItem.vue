<template>
  <a-card
    @click.prevent="expandCard"
    hoverable
    :class="[isSelected && `selected`]"
    style="width: 500px"
  >
    <a-card-meta
      :title="curTodo.title"
      :description="curTodo.description"
      v-show="!isEditable"
    >
    </a-card-meta>

    <!-- <h1>{{ curTodo.title }}</h1>
    <p>{{ curTodo.description }}</p> -->

    <div v-show="isEditable">
      <form @submit.prevent="updateTodo(curTodo.id, todo)">
        <a-input
          v-model="curTodo.title"
          type="text"
          :placeholder="curTodo.title"
        />
        <a-textarea
          :rows="4"
          v-model="curTodo.description"
          type="text"
          :placeholder="curTodo.description"
        />
        <a-button @click="isEditable = !isEditable" type="submit"
          >Save</a-button
        >
        <a-button @click="cancelEdit" type="button">
          Cancel
        </a-button>
      </form>
    </div>

    <a-icon v-show="isSelected" type="fullscreen" />
    <div v-show="isSelected" class="ant-card-actions">
      <a-space>
        <a-button
          @click="handleTodoAction(`updateTodo`, { done: !curTodo.done })"
        >
          <a-icon type="check" />
        </a-button>

        <a-button
          v-if="currentPath !== '/archived-todos'"
          @click="
            handleTodoAction(`archiveTodo`, { archived: !curTodo.archived })
          "
        >
          <a-icon type="download" />
        </a-button>

        <a-button
          v-else
          @click="
            handleTodoAction(`unArchiveTodo`, { archived: !curTodo.archived })
          "
        >
          <a-icon type="upload" title="unarchive" />
        </a-button>

        <a-button @click="handleTodoAction(`deleteTodo`)">
          <a-icon type="delete" />
        </a-button>

        <a-button @click="isEditable = !isEditable">
          <a-icon type="edit" />
        </a-button>
      </a-space>
    </div>
  </a-card>
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
      curTodo: { ...this.todo },
      isEditable: false,
      isSelected: false,
    };
  },

  watch: {
    todo: function() {
      this.curTodo = { ...this.todo };
    },
  },

  methods: {
    expandCard(e) {
      const targets = [
        "ant-card-meta-detail",
        "ant-card-meta-title",
        "ant-card-meta-description",
        "ant-card-body",
      ];
      if (targets.includes(e.target.className))
        this.isSelected = !this.isSelected;
    },

    cancelEdit() {
      this.curTodo = { ...this.todo };
      this.isEditable = false;
    },

    handleTodoAction(action, data) {
      this[action](this.curTodo.id, { ...this.curTodo, ...data });
    },
  },
};
</script>

<style scoped>
.selected {
  border: 1px solid lightblue;
}
</style>
