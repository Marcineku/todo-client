<template>
  <div id="nav">
    <span v-if="!isLoggedIn">
      <router-link to="/">Home</router-link>|
      <router-link to="/signup">Signup</router-link>
    </span>
    <span v-if="isLoggedIn">
      <button @click="logout">Logout</button>
    </span>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style lang="scss">
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
