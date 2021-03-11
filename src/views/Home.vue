<template>
  <div class="home">
    <column-list :list="listData"></column-list>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store";
import ColumnList from "../components/ColumnList.vue";

export default defineComponent({
  components: {
    ColumnList
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    onMounted(() => {
      store.dispatch("fetchColumns");
    });
    const list = computed(() => store.state.columns);
    return {
      listData: list
    };
  }
});
</script>