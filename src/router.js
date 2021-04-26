import Vue from "vue";
import VueRouter from "vue-router";
import TodoList from "./components/TodoList.vue";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
    },
    {
      path: "/todos",
      name: "todoList",
      component: TodoList,
    },
    {
      path: "/archived-todos",
      name: "archivedTodos",
      component: TodoList,
    },
  ],
});
