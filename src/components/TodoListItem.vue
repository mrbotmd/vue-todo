<template>
  <a-card
    @click.prevent="expandCard"
    hoverable
    :class="[isSelected && `selected`, `relative`]"
  >
    <a-card-meta
      :title="curTodo.title"
      :description="curTodo.description"
      v-show="!isEditable"
    >
    </a-card-meta>

    <div v-show="isEditable">
      <form>
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
        <a-button
          @click="handleTodoAction(`updateTodo`, curTodo)"
          type="submit"
        >
          Save
        </a-button>
        <a-button @click="cancelEdit" type="button">
          Cancel
        </a-button>
      </form>
    </div>

    <a-button
      class="expand"
      v-show="isSelected"
      icon="fullscreen"
      title="expand todo"
    />
    <div v-show="isSelected">
      <a-space>
        <a-button
          :class="[todo.done && `complete`, `over-complete control-btn`]"
          @click="handleTodoAction(`updateTodo`, { done: !curTodo.done })"
          icon="check"
          title="complete todo"
        />

        <a-button
          class="control-btn"
          v-if="currentPath !== '/archived-todos'"
          @click="
            handleTodoAction(`archiveTodo`, { archived: !curTodo.archived })
          "
          icon="download"
          title="archive todo"
        />

        <a-button
          class="control-btn"
          v-else
          @click="
            handleTodoAction(`unArchiveTodo`, { archived: !curTodo.archived })
          "
          icon="upload"
          title="unarchive todo"
        />

        <a-button
          class="over-danger control-btn"
          @click="handleTodoAction(`deleteTodo`)"
          icon="delete"
          title="delete todo"
        />

        <a-button
          :class="[isEditable && `edit`, `over-edit control-btn`]"
          @click="isEditable = !isEditable"
          icon="edit"
          title="edit todo"
        />
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
      console.log(data);
      this[action](this.curTodo.id, { ...this.curTodo, ...data });
      this.isEditable ? (this.isEditable = false) : this.isEditable;
    },
  },
};
</script>

<style scoped>
.selected {
  border: 1px solid lightblue;
}

.bigger-btn {
  font-size: 1.5rem;
}

.control-btn {
  border: none;
  box-shadow: 0 0 0;
}

.complete,
.complete:focus {
  color: rgb(78, 194, 78);
}

.over-complete:hover {
  color: rgb(78, 194, 78);
}

.danger,
.danger:focus {
  color: rgb(219, 64, 64);
}

.over-danger:hover {
  color: rgb(219, 64, 64);
}

.edit,
.edit:focus {
  color: rgb(207, 169, 42);
}

.over-edit:hover {
  color: rgb(207, 169, 42);
}

.expand {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 1.5rem;
  border: none;
  text-align: center;
}
</style>
