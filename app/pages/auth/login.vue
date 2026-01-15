<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import {
  emailPasswordSchema,
  type EmailPasswordInput,
} from "~~/shared/schemas";
import { INPUT_VARIANT_OPTIONS } from "~/constants";

definePageMeta({
  layout: "auth",
  pageTransition: {
    name: "auth-fade",
    mode: "out-in",
  },
});

const { login } = useAuth();

const validationSchema = toTypedSchema(emailPasswordSchema);
const { handleSubmit, errors, defineField, isSubmitting } =
  useForm<EmailPasswordInput>({
    validationSchema,
  });

const [email, emailProps] = defineField("email");
const [password, passwordProps] = defineField("password");
const rememberMe = ref(false);

const onLogin = handleSubmit(async ({ email, password }) => {
  // TODO: Handle rememberMe
  await login(email, password);
});
</script>

<template>
  <div>
    <h1 class="text-center text-[28px] font-medium mb-8">My account</h1>

    <AuthNavigation />

    <UiForm class="flex flex-col gap-6" @submit="onLogin">
      <div class="flex flex-col gap-6">
        <UiFormField label="Email" :error="errors.email">
          <template #default="{ id }">
            <UiInput
              :id="id"
              v-model="email"
              v-bind="emailProps"
              :variant="INPUT_VARIANT_OPTIONS.DEFAULT"
              type="text"
              :error="!!errors.email"
            />
          </template>
        </UiFormField>
        <UiFormField label="Password" :error="errors.password">
          <template #default="{ id }">
            <UiInput
              :id="id"
              v-model="password"
              v-bind="passwordProps"
              :variant="INPUT_VARIANT_OPTIONS.DEFAULT"
              type="password"
              :error="!!errors.password"
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
          :disabled="isSubmitting"
        >
          <template v-if="isSubmitting">
            <span class="inline-flex items-center gap-2">
              <Icon
                name="ic:baseline-autorenew"
                size="16"
                class="animate-spin"
                aria-hidden="true"
              />
              <span>Processing...</span>
            </span>
          </template>
          <template v-else>Login</template>
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
