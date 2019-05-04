<template>
  <div class="list">
    <h4>
      <input type="text" v-model="newName" @change="updateList">
    </h4>
    <ul>
      <li v-for="record in records" v-bind:key="record.id">
        <button @click="deleteRecord(record.id)">X</button>
        <input type="text" name="content" v-model="record.content" @change="updateRecord(record)">
        <input
          type="checkbox"
          name="is_done"
          v-model="record.is_done"
          @change="updateRecord(record)"
        >
      </li>
      <button @click="deleteList">Delete list</button>
      <button @click="createRecord">Add record</button>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";

export default {
  props: ["id", "name"],
  data() {
    return {
      records: [],
      newName: ""
    };
  },
  methods: {
    updateList() {
      const recordsUrl = `todo/list/${this.id}`;
      const name = this.newName;
      axios
        .put(recordsUrl, { name })
        .then(res => {})
        .catch(err => {
          console.error(err.response);
        });
    },
    deleteList() {
      const recordsUrl = `todo/list/${this.id}`;
      axios
        .delete(recordsUrl)
        .then(res => {
          this.$emit("list-deleted");
        })
        .catch(err => {
          console.error(err.response);
        });
    },
    getRecords(vm) {
      const recordsUrl = `todo/list/${vm.id}/records`;
      axios
        .get(recordsUrl)
        .then(res => {
          vm.records = res.data;
          vm.newName = vm.name;
        })
        .catch(err => {
          console.error(err.response);
        });
    },
    createRecord() {
      const recordUrl = `todo/list/${this.id}/record`;
      axios
        .post(recordUrl, {})
        .then(result => {
          this.getRecords(this);
        })
        .catch(err => {
          console.error(err.response);
        });
    },
    deleteRecord(id) {
      const recordUrl = `todo/list/${this.id}/record/${id}`;
      axios
        .delete(recordUrl)
        .then(result => {
          this.getRecords(this);
        })
        .catch(err => {
          console.error(err.response);
        });
    },
    updateRecord(record) {
      const recordUrl = `todo/list/${this.id}/record/${record.id}`;
      const content = record.content;
      const is_done = record.is_done;
      axios
        .put(recordUrl, { content, is_done })
        .then(result => {
          this.getRecords(this);
        })
        .catch(err => {
          console.error(err.response);
        });
    }
  },
  mounted: function() {
    const vm = this;

    Vue.nextTick(function() {
      vm.getRecords(vm);
    });
  }
};
</script>

<style>
</style>
