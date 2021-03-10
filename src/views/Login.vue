<template>
  <div class="login">
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
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import ValidateForm from "@/components/ValidateForm.vue";
export default defineComponent({
  name: "Login",
  components: {
    ValidateInput,
    ValidateForm
  },
  setup() {
    const store = useStore();
    const router = useRouter();
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
    const onFormSubmit = (result: boolean) => {
      console.log(result);
      if (result) {
        router.push("/");
        store.commit("login");
        // router.push({ name: "column", params: { id: 1 } });
      }
    };
    return {
      emailRules,
      passwordRules,
      emailVal,
      passwordVal,
      onFormSubmit
    };
  }
});
</script>