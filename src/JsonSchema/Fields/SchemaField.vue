<template>
  <div class="schema-field">
    <component
      :is="renderField"
      :schema="schema"
      :formData="formData"
      :idPath="idPath"
    />
  </div>
</template>

<script>
import propsInterfacce from "./propsInterface.js";
import { getTargetFieldBySchema } from "./field.parser.js";

export default {
  name: "SchemaField",
  props: propsInterfacce,
  data() {
    return {
      'renderField': getTargetFieldBySchema(this.schema.type)  //生成动态组件
    }
  },
  mounted() {
    console.log(this.schema);
  }
};
</script>

<style lang="less" scoped>
</style>
