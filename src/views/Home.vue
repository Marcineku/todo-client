<template>
  <div class="home">
    <span v-if="!isLoggedIn">
      <h1>To-do</h1>
      <img alt="Vue logo" src="../assets/logo.png">
      <Login/>
    </span>

    <span v-if="isLoggedIn">
      <Todo/>
    </span>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";
import Todo from "@/components/Todo.vue";

export default {
  name: "home",
  components: {
    Login,
    Todo
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
  }
};
</script>
