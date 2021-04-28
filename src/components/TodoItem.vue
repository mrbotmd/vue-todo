<template>
  <a-card
    @click="isSelected = !isSelected"
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
          <label :for="`unArchiveTodo${curTodo.id}`" class="pointer">
            <a-icon type="upload" title="unarchive" />
          </label>
        </a-button>

        <div>
          <a-button>
            <label :for="`deleteTodo${curTodo.id}`" class="pointer">
              <a-icon type="delete" />
            </label>
          </a-button>
          <input
            @change="deleteTodo(curTodo.id)"
            style="display: none"
            type="checkbox"
            :name="`deleteTodo${curTodo.id}`"
            :id="`deleteTodo${curTodo.id}`"
          />
        </div>

        <div>
          <a-button>
            <label :for="`editTodo${curTodo.id}`">
              <a-icon type="edit" />
            </label>
          </a-button>
          <input
            @change="isEditable = !isEditable"
            style="display: none"
            type="checkbox"
            :name="`editTodo${curTodo.id}`"
            :id="`editTodo${curTodo.id}`"
          />
        </div>
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

  methods: {
    cancelEdit() {
      this.curTodo = { ...this.todo };
      this.isEditable = false;
    },

    handleTodoAction(action, data) {
      this[action](this.todo.id, { ...this.curTodo, ...data });
    },
  },
};
</script>

<style scoped>
.selected {
  border: 1px solid lightblue;
}
</style>
