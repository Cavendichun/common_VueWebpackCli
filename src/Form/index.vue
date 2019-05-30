<template>
  <div class="json-schema-form-container" v-if="componentInit">
    <json-schema 
      :schema="mainSchema"
      :formData="mainFormData"
    />
  </div>
</template>

<script>
import FormDataInit from './formdata.init.js';
import JsonSchema from '../JsonSchema/index.vue';

export default {
  name: "JsonForm",
  components: {
    'json-schema': JsonSchema
  },
  props: {
    schema: {
      type: Object,
      require: true
    },
    formData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      mainSchema: null,
      mainFormData: null,
      componentInit: false
    };
  },
  mounted() {
    this.getInitFormConfig();
  },
  methods: {
    /**
     * 根据props的schema和formData进行数据初始化
     */
    getInitFormConfig() {
      const { schema, formData } = this;
      let initFormData = new FormDataInit({
        schema,
        formData
      }).getDefaultFormDataBySchema();
      (this.$data.mainSchema = schema),
        (this.$data.mainFormData = initFormData),
        (this.$data.componentInit = true);
    },
    /**
     * 整表单值域改变时调用
     */
    onChange(value, path) {}
  }
};
</script>

<style lang="less">
@import url("../Styles/commom.less");
</style>

<style lang="less" scoped>
@import url("../Styles/form.less");
</style>
