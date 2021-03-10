<template>
  <form action="" class="validate-form-container" autocomplete="off">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>
<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import mitt, { Handler } from "mitt";
export const emitter = mitt();
type validateFunc = () => boolean;
export default defineComponent({
  emits: ["form-submit"],
  setup(props, context) {
    let funcArr: validateFunc[] = [];
    const submitForm = () => {
      const result = funcArr.map(func => func()).every(result => result);
      context.emit("form-submit", result);
    };
    const callback: Handler = (func: validateFunc) => {
      funcArr.push(func);
    };
    emitter.on("form-item-created", callback);
    onUnmounted(() => {
      emitter.off("form-item-created", callback);
      funcArr = [];
    });
    return {
      submitForm
    };
  }
});
</script>