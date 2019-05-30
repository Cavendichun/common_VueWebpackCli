<template>
  <div class="json-schema-container">
    <schema-field
        :schema="schema"
        :formData="formData"
        :idPath="`$root`"
    />
  </div>
</template>

<script>
import SchemaField from "./Fields/SchemaField.vue";

export default {
  name: "JsonSchema",
  components: {
    "schema-field": SchemaField
  },
  props: {
    schema: { type: Object, requrie: true },
    formData: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>
