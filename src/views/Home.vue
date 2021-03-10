<template>
  <div class="home">
    <column-list :list="listData"></column-list>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store";
import ColumnList from "../components/ColumnList.vue";

export default defineComponent({
  components: {
    ColumnList
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const list = computed(() => store.state.columns);
    const biggerColumnsLen = computed(() => store.getters.biggerColumnsLen);
    return {
      listData: list,
      biggerColumnsLen
    };
  }
});
</script>