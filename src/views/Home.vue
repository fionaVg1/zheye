<template>
  <div class="home">
    <column-list :list="listData"></column-list>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ColumnList from "../components/ColumnList.vue";
import { testData,ColumnProps } from "@/testData";
const listData: ColumnProps[] = testData;
export default defineComponent({
  components: {
    ColumnList
  },
  setup() {
    return {
      listData
    };
  }
});
</script>