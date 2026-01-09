<script setup lang="ts">
import * as z from "zod";
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { VALIDATION_MESSAGES } from "~/constants";

definePageMeta({
  layout: "auth",
  pageTransition: {
    name: "auth-fade",
    mode: "out-in",
  },
});

const { login } = useAuth();

const validationSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, { message: VALIDATION_MESSAGES.REQUIRED_FIELD })
      .email({ message: VALIDATION_MESSAGES.INVALID_EMAIL }),
    password: z
      .string()
      .min(1, { message: VALIDATION_MESSAGES.REQUIRED_FIELD }),
  })
);

const { handleSubmit } = useForm({
  validationSchema,
});

const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: password, errorMessage: passwordError } =
  useField<string>("password");
const rememberMe = ref(false);

const onLogin = handleSubmit(async (values) => {
  // TODO: Handle rememberMe
  await login(values.email, values.password);
});
</script>

<template>
  <div>
    <h1 class="text-center text-[28px] font-medium mb-8">My account</h1>

    <AuthNavigation />

    <UiForm class="flex flex-col gap-6" @submit="onLogin">
      <div class="flex flex-col gap-6">
        <UiFormField label="Email" :error="emailError">
          <template #default="{ id, error }">
            <UiInput
              :id="id"
              v-model="email"
              variant="default"
              type="text"
              :error="!!error"
            />
          </template>
        </UiFormField>
        <UiFormField label="Password" :error="passwordError">
          <template #default="{ id, error }">
            <UiInput
              :id="id"
              v-model="password"
              variant="default"
              type="password"
              :error="!!error"
            />
          </template>
        </UiFormField>
      </div>

      <div class="flex items-center gap-2">
        <UiCheckbox v-model="rememberMe" size="sm">Remember me</UiCheckbox>
      </div>

      <div class="flex flex-col gap-4 mt-2">
        <UiButton
          type="submit"
          class="w-full bg-black text-white hover:bg-gray-800 rounded-md py-3 text-base font-medium"
        >
          Login
        </UiButton>
        <div class="text-center">
          <NuxtLink
            to="/auth/restore"
            class="text-sm text-black no-underline hover:underline"
          >
            Forgot Password?
          </NuxtLink>
        </div>
      </div>
    </UiForm>
  </div>
</template>

<style scoped></style>
