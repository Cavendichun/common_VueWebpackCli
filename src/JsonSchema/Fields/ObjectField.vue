<template>
  <div class="object-field">
    <!-- <schema-field  
      v-for="item in Object.keys(schema.properties)"
      :key="item"
      :schema="schema.properties[item]"
      :formData="formData"
      :idPath="`${idPath}.item`"
    /> -->
    <div
      v-for="item in Object.keys(schema.properties)"
      v-bind:key="item"
      v-bind:item="item"
    >
      <schema-field
        :schema="schema.properties[item]"
        :idPath="`121212`"
      />
      {{schema.properties[item]}}
    </div>
  </div>
</template>

<script>
import propsInterface from './propsInterface.js';
import SchemaField from './SchemaField.vue';

export default {
  name: "ObjectField",
  components: {
    'schema-field': SchemaField
  },
  props:  propsInterface
};
</script>

<style lang="less" scoped>
</style>
