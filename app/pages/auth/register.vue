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

const { register } = useAuth();
const favoriteStore = useFavoriteStore();

const validationSchema = toTypedSchema(
  z
    .object({
      email: z
        .string()
        .min(1, { message: VALIDATION_MESSAGES.REQUIRED_FIELD })
        .email({ message: VALIDATION_MESSAGES.INVALID_EMAIL }),
      password: z
        .string()
        .min(1, { message: VALIDATION_MESSAGES.REQUIRED_FIELD }),
      confirmPassword: z
        .string()
        .min(1, { message: VALIDATION_MESSAGES.REQUIRED_FIELD }),
      terms: z.boolean().refine((val) => val === true, {
        message: VALIDATION_MESSAGES.TERMS_REQUIRED,
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: VALIDATION_MESSAGES.PASSWORDS_NO_MATCH,
      path: ["confirmPassword"],
    })
);

const { handleSubmit } = useForm({ validationSchema });

const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: password, errorMessage: passwordError } =
  useField<string>("password");
const { value: confirmPassword, errorMessage: confirmPasswordError } =
  useField<string>("confirmPassword");
const { value: terms, errorMessage: termsError } = useField<boolean>("terms");

const onRegister = handleSubmit(async (values) => {
  await register(values.email, values.password);
  await favoriteStore.restore(values.email);
});
</script>

<template>
  <div>
    <h1 class="text-center text-[28px] font-medium mb-8">My account</h1>

    <AuthNavigation />

    <UiForm class="flex flex-col gap-6" @submit="onRegister">
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
        <UiFormField label="Repeat password" :error="confirmPasswordError">
          <template #default="{ id, error }">
            <UiInput
              :id="id"
              v-model="confirmPassword"
              variant="default"
              type="password"
              :error="!!error"
            />
          </template>
        </UiFormField>
      </div>

      <UiFormField :error="termsError">
        <template #default>
          <UiCheckbox v-model="terms" size="sm">
            I agree to the processing of personal data
          </UiCheckbox>
        </template>
      </UiFormField>

      <div class="flex flex-col gap-4 mt-2">
        <UiButton
          type="submit"
          class="w-full bg-black text-white hover:bg-gray-800 rounded-md py-3 text-base font-medium"
        >
          Register
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
