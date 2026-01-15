<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import {
  FOOTER_NAV_LINKS,
  SOCIAL_LINKS,
  FOOTER_STRINGS,
  MESSAGES,
} from "~/constants";
import { VALIDATION_MESSAGES } from "~~/shared/constants";
import { subscribeSchema, type SubscribeInput } from "~~/shared/schemas";

const { success, error } = useToast();

const validationSchema = toTypedSchema(subscribeSchema);
const { handleSubmit, resetForm, errors, defineField, isSubmitting } =
  useForm<SubscribeInput>({
    validationSchema,
  });

const [email, emailProps] = defineField("email");

const handleSubscribe = handleSubmit(({ email }) => {
  if (!email) {
    error({ message: VALIDATION_MESSAGES.EMAIL_REQUIRED });
    return;
  }

  success({
    message: MESSAGES.SUBSCRIBE_SUCCESS,
  });
  resetForm();
});
</script>

<template>
  <hr class="border-b border-[var(--color-gray)] m-0" />
  <div class="flex justify-between items-center gap-6 py-3">
    <ul class="flex gap-6 items-center list-none p-0 m-0">
      <li v-for="{ name, path } in FOOTER_NAV_LINKS" :key="name">
        <NuxtLink
          class="no-underline uppercase text-sm text-[var(--color-dark-gray)] hover:text-[var(--color-black)]"
          :to="path"
          :prefetch="false"
          >{{ name }}</NuxtLink
        >
      </li>
    </ul>
    <UiForm
      class="flex-1 flex items-stretch gap-3 min-w-3xs justify-end"
      @submit="handleSubscribe"
    >
      <UiFormField class="min-w-3xs h-full" :error="errors.email">
        <template #default="{ id, errorClass }">
          <UiInput
            :id="id"
            v-model="email"
            v-bind="emailProps"
            variant="form"
            :placeholder="VALIDATION_MESSAGES.INPUT_PLACEHOLDER"
            type="email"
            :error="!!errors.email"
            :class="['h-full', errors.email ? errorClass : '']"
            :aria-invalid="!!errors.email"
          />
        </template>
      </UiFormField>
      <UiButton
        :aria-label="FOOTER_STRINGS.BUTTON_SUBSCRIBE_ARIA"
        type="submit"
        variant="primary"
        class="h-auto p-[10px]"
        size="small"
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
          </span>
        </template>
        <template v-else>
          <Icon name="ic:sharp-arrow-right-alt" size="25" />
        </template>
      </UiButton>
    </UiForm>
  </div>
  <div class="flex justify-between items-center pt-2">
    <div class="text-sm text-[var(--color-dark-gray)]">
      &copy; <NuxtTime :datetime="new Date()" year="numeric" />
      {{ FOOTER_STRINGS.COPYRIGHT_OWNER }}
    </div>
    <div class="flex items-center gap-4">
      <NuxtLink
        v-for="{ name, url, icon } in SOCIAL_LINKS"
        :key="name"
        :to="url"
        :title="name"
        target="_blank"
        rel="noopener noreferrer"
        external
        :prefetch="false"
        class="flex justify-center items-center text-[var(--color-dark-gray)] hover:text-[var(--color-black)]"
      >
        <Icon :name="icon" size="30" />
      </NuxtLink>
    </div>
  </div>
</template>
