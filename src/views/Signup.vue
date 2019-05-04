<template>
  <form class="signup" @submit.prevent="signup">
    <h3>Sign up</h3>
    <p>
      <input
        v-validate="'required|min:4'"
        name="username"
        type="text"
        v-model="username"
        placeholder="Username"
      >
      <i v-show="errors.has('username')" class="fa fa-warning"></i>
      <span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>
    </p>
    <p>
      <input
        v-validate="'required|email'"
        name="email"
        type="email"
        v-model="email"
        placeholder="Email"
      >
      <i v-show="errors.has('email')" class="fa fa-warning"></i>
      <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
    </p>
    <p>
      <input
        v-validate="'required|min:4'"
        name="password"
        type="password"
        v-model="password"
        placeholder="Password"
        ref="password"
      >
      <i v-show="errors.has('password')" class="fa fa-warning"></i>
      <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
    </p>
    <p>
      <input
        v-validate="'required|confirmed:password'"
        name="password_confirmation"
        v-model="password_confirmation"
        type="password"
        placeholder="Confirm password"
        data-vv-as="password"
      >
      <i v-show="errors.has('password_confirmation')" class="fa fa-warning"></i>
      <span
        v-show="errors.has('password_confirmation')"
        class="help is-danger"
      >{{ errors.first('password_confirmation') }}</span>
    </p>
    <button type="submit">Signup</button>
  </form>
</template>

<script>
import axios from "axios";

const SIGNUP_URL = "auth/signup";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  },
  methods: {
    signup: function() {
      this.$validator.validateAll().then(res => {
        if (!res) {
          return;
        }

        const username = this.username;
        const email = this.email;
        const password = this.password;

        axios
          .post(SIGNUP_URL, { username, email, password })
          .then(result => {
            this.$router.push("/");
          })
          .catch(err => {
            console.error(err.response);
          });
      });
    }
  }
};
</script>

<style>
</style>
