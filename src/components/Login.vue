<template>
  <div class="login">
    <h3>Sign in</h3>
    <form @submit.prevent="login">
      <div>
        <p>
          <input required v-model="username" type="text" placeholder="Username">
        </p>
      </div>
      <div>
        <p>
          <input required v-model="password" type="password" placeholder="Password">
        </p>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      const username = this.username;
      const password = this.password;
      this.$store.dispatch("login", { username, password });
    }
  }
};
</script>

<style>
</style>
