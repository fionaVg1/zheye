<template>
  <div class="container">
    <column-list :list="testData"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import ColumnList, { ColumnProps } from "./components/ColumnList.vue";
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
  }
];
export default defineComponent({
  name: "App",
  components: {
    ColumnList
  },
  setup() {
    return {
      testData
    };
  }
});
</script>

<style lang="scss">
</style>
