<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { registerSchema, type RegisterInput } from "~~/shared/schemas";
import {
  INPUT_VARIANT_OPTIONS,
  ROUTES,
  CHECKBOX_SIZE_OPTIONS,
} from "~/constants";

definePageMeta({
  layout: "auth",
  pageTransition: {
    name: "auth-fade",
    mode: "out-in",
  },
});

const { register } = useAuth();

const validationSchema = toTypedSchema(registerSchema);

const { handleSubmit, errors, defineField, isSubmitting } =
  useForm<RegisterInput>({
    validationSchema,
  });

const [email, emailProps] = defineField("email");
const [password, passwordProps] = defineField("password");
const [confirmPassword, confirmPasswordProps] = defineField("confirmPassword");
const [terms, termsProps] = defineField("terms");

const onRegister = handleSubmit(async ({ email, password }) => {
  await register(email, password);
});
</script>

<template>
  <div>
    <h1 class="text-center text-[28px] font-medium mb-8">My account</h1>

    <AuthNavigation />

    <UiForm class="flex flex-col gap-6" @submit="onRegister">
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
        <UiFormField label="Repeat password" :error="errors.confirmPassword">
          <template #default="{ id }">
            <UiInput
              :id="id"
              v-model="confirmPassword"
              v-bind="confirmPasswordProps"
              :variant="INPUT_VARIANT_OPTIONS.DEFAULT"
              type="password"
              :error="!!errors.confirmPassword"
            />
          </template>
        </UiFormField>
      </div>

      <UiFormField :error="errors.terms">
        <template #default>
          <UiCheckbox
            v-model="terms"
            v-bind="termsProps"
            :size="CHECKBOX_SIZE_OPTIONS.SM"
          >
            I agree to the processing of personal data
          </UiCheckbox>
        </template>
      </UiFormField>

      <div class="flex flex-col gap-4 mt-2">
        <UiButton
          type="submit"
          class="w-full bg-black text-white hover:bg-gray-800 rounded-md py-3 text-base font-medium"
          :disabled="isSubmitting"
        >
          <template v-if="isSubmitting">
            <span class="inline-flex items-center justify-center gap-2">
              <Icon
                name="ic:baseline-autorenew"
                size="16"
                class="animate-spin"
                aria-hidden="true"
              />
              <span>Processing...</span>
            </span>
          </template>
          <template v-else>Register</template>
        </UiButton>
        <div class="text-center">
          <NuxtLink
            :to="ROUTES.AUTH.RESTORE"
            class="text-sm text-black no-underline hover:underline"
          >
            Forgot Password?
          </NuxtLink>
        </div>
      </div>
    </UiForm>
  </div>
</template>
