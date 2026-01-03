<script setup lang="ts">
import * as z from "zod";
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { FOOTER_NAV_LINKS, SOCIAL_LINKS } from "~/constants";

const { success, error } = useToast();

const validationSchema = toTypedSchema(
  z.object({
    email: z.string().email("Invalid email address").or(z.literal("")),
  })
);

const { handleSubmit, resetForm } = useForm({
  validationSchema,
});

const { value: email, errorMessage: emailError } = useField<string>("email");

const handleSubscribe = handleSubmit((values) => {
  if (!values.email) {
    error({ message: "Please enter your email" });
    return;
  }

  success({
    message: "Your email has been subscribed to news and notifications",
  });
  resetForm();
});
</script>

<template>
  <section class="max-w-screen-xl mx-auto flex flex-col gap-6 py-5 px-4">
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
        <UiFormField class="min-w-3xs h-full" :error="emailError">
          <template #default="{ id, error, errorClass }">
            <UiInput
              :id="id"
              v-model="email"
              variant="form"
              placeholder="Your email for offers and news"
              type="email"
              :error="error"
              :class="['h-full', error ? errorClass : '']"
              :aria-invalid="error"
            />
          </template>
        </UiFormField>
        <UiButton
          aria-label="subscribe"
          type="submit"
          variant="primary"
          class="h-auto p-[10px]"
          size="small"
        >
          <Icon name="ic:sharp-arrow-right-alt" size="25" />
        </UiButton>
      </UiForm>
    </div>
    <div class="flex justify-between items-center pt-2">
      <div class="text-sm text-[var(--color-dark-gray)]">
        &copy; <NuxtTime :datetime="new Date()" year="numeric" /> My Company
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
  </section>
</template>

<style scoped>
section :deep(.form-field__error) {
  position: absolute;
}
</style>