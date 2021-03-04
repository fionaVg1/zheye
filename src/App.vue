<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <column-list :list="testData"></column-list>
    <form action="">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          v-model="emailRef.val"
          @blur="validateEmail"
        />
        <div class="form-text" v-if="emailRef.error">
          {{ emailRef.message }}
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">密码</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
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
    GlobalHeader
  },
  setup() {
    const emailRef = reactive({
      val: "",
      error: false,
      message: ""
    });
    const validateEmail = () => {
      if (emailRef.val.trim() === "") {
        emailRef.error = true;
        emailRef.message = "can not be empty";
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true;
        emailRef.message = "shoule be valid email format";
      }
    };
    return {
      testData,
      currentUser,
      emailRef,
      validateEmail
    };
  }
});
</script>

<style lang="scss">
</style>
