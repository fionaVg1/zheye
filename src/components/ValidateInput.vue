<template>
  <div class="validate-input-container pb-3 position-relative">
    <input
      v-if="tag !== 'textarea'"
      type="text"
      class="form-control"
      autocomplete="off"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    />
    <textarea
      v-else
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    >
    </textarea>
    <span v-if="inputRef.error" class="invalid-feedback">{{
      inputRef.message
    }}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, PropType, onMounted } from "vue";
import { emitter } from "./ValidateForm.vue";
const emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
interface RuleProp {
  type: "required" | "email" | "password" | "custom" | "range";
  message?: string;
  validator?: () => boolean;
  min?: { length: number; message: string };
  max?: { length: number; message: string };
}
export type RulesProp = RuleProp[];
export type TagType = "input" | "textarea";
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: "input"
    }
  },
  inheritAttrs: false,
  setup(props, context) {
    const inputRef = reactive({
      val: props.modelValue || "",
      error: false,
      message: ""
    });
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value;
      inputRef.val = targetValue;
      context.emit("update:modelValue", targetValue);
    };
    const validateInput = () => {
      if (props.rules) {
        const value = inputRef.val;
        const allPassed = props.rules.every(rule => {
          let passed = true;
          inputRef.message = rule.message || "";
          switch (rule.type) {
            case "required":
              passed = value.trim() != "";
              break;
            case "email":
              passed = emailReg.test(value);
              break;
            case "range": {
              const { min, max } = rule;
              if (min && value.trim().length < min.length) {
                passed = false;
                inputRef.message = min.message;
              }
              if (max && value.trim().length > max.length) {
                passed = false;
                inputRef.message = max.message;
              }
              break;
            }
            case "password":
              passed = passwordReg.test(value);
              break;
            case "custom":
              passed = rule.validator ? rule.validator() : true;
              break;
            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allPassed;
        return allPassed;
      }
      return true;
    };
    onMounted(() => {
      emitter.emit("form-item-created", validateInput);
    });
    return {
      inputRef,
      validateInput,
      updateValue
    };
  }
});
</script>