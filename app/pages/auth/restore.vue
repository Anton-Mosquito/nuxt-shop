<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { restoreSchema, type RestoreInput } from "~~/shared/schemas";
import { MESSAGES, INPUT_VARIANT_OPTIONS } from "~/constants";

definePageMeta({
  layout: "auth",
  pageTransition: {
    name: "auth-fade",
    mode: "out-in",
  },
});

const { success } = useToast();

const validationSchema = toTypedSchema(restoreSchema);

const { handleSubmit, errors, defineField, isSubmitting } =
  useForm<RestoreInput>({
    validationSchema,
  });

const [email, emailProps] = defineField("email");

const onRestore = handleSubmit(async ({ email }) => {
  // TODO: Implement restore password API call
  console.log("Restore password for:", email);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  success({
    message: MESSAGES.PASSWORD_RESET_LINK,
  });
});
</script>

<template>
  <div>
    <h1 class="text-center text-[28px] font-medium mb-4">Forgot password?</h1>

    <p class="text-center text-sm text-[var(--color-dark-gray)] mb-8 px-4">
      If you forgot your password, enter your email and we will send you a reset
      link
    </p>

    <UiForm
      class="flex flex-col gap-6 max-w-[500px] mx-auto"
      @submit="onRestore"
    >
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
      </div>

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
          <template v-else>Reset password</template>
        </UiButton>
      </div>
    </UiForm>
  </div>
</template>
