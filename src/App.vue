<template>
  <div>
    <div class="app">
      <json-form :schema="schema" :formData="formData"/>
    </div>
  </div>
</template>

<script>
import { schema, formData } from "../mockData.js";
import Form from "./Form/index.vue";

export default {
  name: "App",
  components: {
    "json-form": Form
  },
  data() {
    return {
      schema,
      formData
    };
  }
};
</script>

<style lang="less">
@import url('./app.less');
</style>
