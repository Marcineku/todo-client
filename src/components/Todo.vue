<template>
  <div class="todo">
    <div>
      <List
        v-for="list in lists"
        v-bind:key="list.id"
        v-bind:id="list.id"
        v-bind:name="list.name"
        v-on:list-deleted="getLists"
      />
    </div>
    <input type="text" v-model="newListName" name="newListName">
    <button @click="createList">Create new list</button>
  </div>
</template>

<script>
import axios from "axios";
import List from "@/components/List.vue";

const LISTS_URL = "todo/lists";

export default {
  components: {
    List
  },
  data() {
    return {
      lists: [],
      newListName: ""
    };
  },
  methods: {
    getLists() {
      axios
        .get(LISTS_URL)
        .then(res => {
          this.lists = res.data;
        })
        .catch(err => {
          console.error(err.response);
        });
    },
    createList() {
      const listUrl = `todo/list`;
      const name = this.newListName;
      axios
        .post(listUrl, { name })
        .then(res => {
          this.newListName = "";
          this.getLists();
        })
        .catch(err => {
          console.error(err.response);
        });
    }
  },
  mounted: function() {
    this.getLists();
  }
};
</script>

<style>
</style>
