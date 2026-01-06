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

const { success } = useToast();

const validationSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, { message: VALIDATION_MESSAGES.REQUIRED_FIELD })
      .email({ message: VALIDATION_MESSAGES.INVALID_EMAIL }),
  })
);

const { handleSubmit } = useForm({
  validationSchema,
});

const { value: email, errorMessage: emailError } = useField<string>("email");

const onRestore = handleSubmit(async (values) => {
  // TODO: Implement restore password API call
  console.log("Restore password for:", values.email);
  
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  success({
    message: "If an account exists with this email, you will receive a password reset link.",
  });
});
</script>

<template>
  <div>
    <h1 class="text-center text-[28px] font-medium mb-4">Forgot password?</h1>
    
    <p class="text-center text-sm text-[var(--color-dark-gray)] mb-8 px-4">
      If you forgot your password, enter your email and we will send you a reset link
    </p>

    <UiForm
      class="flex flex-col gap-6 max-w-[500px] mx-auto"
      @submit="onRestore"
    >
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
      </div>

      <div class="flex flex-col gap-4 mt-2">
        <UiButton
          type="submit"
          class="w-full bg-black text-white hover:bg-gray-800 rounded-md py-3 text-base font-medium"
        >
          Reset password
        </UiButton>
      </div>
    </UiForm>
  </div>
</template>
