<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <column-list :list="testData"></column-list>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules"
          v-model="emailVal"
          placeholder="请输入邮箱地址"
          type="text"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">密码</label>
        <validate-input
          type="password"
          placeholder="请输入密码"
          :rules="passwordRules"
          v-model="passwordVal"
        />
      </div>
      <template v-slot:submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import ValidateInput, { RulesProp } from "./components/ValidateInput.vue";
import ValidateForm from "./components/ValidateForm.vue";
import ColumnList, { ColumnProps } from "./components/ColumnList.vue";
import GlobalHeader, { UserProps } from "./components/GlobalHeader.vue";
const currentUser: UserProps = {
  isLogin: true,
  name: "兔子小姐"
};
const testData: ColumnProps[] = [
  {
    id: 1,
    title: "test1的专栏",
    description: "这个是test1的专栏，有一段非常有意思的简介，可以更新一下哦",
    avatar: "https://24.media.tumblr.com/tumblr_krvv7wTHnB1qa9hjso1_1280.jpg"
  },
  {
    id: 2,
    title: "test2的专栏",
    description: "这个是test2的专栏，有一段非常有意思的简介，可以更新一下哦",
    avatar: "https://images.dog.ceo/breeds/mexicanhairless/n02113978_3318.jpg"
  },
  {
    id: 3,
    title: "test3的专栏",
    description: "这个是test3的专栏，有一段非常有意思的简介，可以更新一下哦"
  }
];
const emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
export default defineComponent({
  name: "App",
  components: {
    ColumnList,
    GlobalHeader,
    ValidateInput,
    ValidateForm
  },
  setup() {
    const inputRef = ref<any>();
    const emailVal = ref("");
    const passwordVal = ref("");
    const emailRules: RulesProp = [
      { type: "required", message: "电子邮箱地址不能为空" },
      { type: "email", message: "请输入正确的电子邮箱格式" }
    ];
    const passwordRules: RulesProp = [
      { type: "required", message: "密码不能为空" },
      {
        type: "password",
        message:
          "请输入正确的密码格式，至少8个字符，至少1个字母，1个数字和1个特殊字符"
      }
    ];
    const onFormSubmit = (result: boolean) => {};
    return {
      testData,
      currentUser,
      emailRules,
      passwordRules,
      emailVal,
      passwordVal
    };
  }
});
</script>

<style lang="scss">
</style>
