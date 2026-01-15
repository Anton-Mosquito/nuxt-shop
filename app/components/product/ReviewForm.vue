<script setup lang="ts">
import type { ReviewFormEmits } from "~/types";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { reviewSchema, type ReviewInput } from "~~/shared/schemas";

const emit = defineEmits<ReviewFormEmits>();
const {
  name,
  nameProps,
  email,
  emailProps,
  rating,
  ratingProps,
  comment,
  commentProps,
  saveData,
  saveDataProps,
  errors,
  isSubmitting,
  onSubmit,
} = useValidateFrom();

function useValidateFrom() {
  const validationSchema = toTypedSchema(reviewSchema);

  const { handleSubmit, isSubmitting, resetForm, errors, defineField } =
    useForm<ReviewInput>({
      validationSchema,
      initialValues: {
        name: "",
        email: "",
        rating: 0,
        comment: "",
        saveData: false,
      },
    });
  const [name, nameProps] = defineField("name");
  const [email, emailProps] = defineField("email");
  const [rating, ratingProps] = defineField("rating");
  const [comment, commentProps] = defineField("comment");
  const [saveData, saveDataProps] = defineField("saveData");

  const onSubmit = handleSubmit((values) => {
    try {
      emit("submit", values);
      // $fetch("/api/submit-review", {
      //   method: "POST",
      //   body: values,
      // });

      resetForm();
    } catch (error) {
      console.error("Submit error:", error);
    }
  });

  return {
    name,
    nameProps,
    email,
    emailProps,
    rating,
    ratingProps,
    comment,
    commentProps,
    saveData,
    saveDataProps,
    errors,
    isSubmitting,
    onSubmit,
  };
}
</script>

<template>
  <div class="mt-10 p-6 bg-[#f9f9f9] rounded-lg">
    <h3 class="text-xl font-medium mb-2 text-[var(--color-black)]">
      Add feedback
    </h3>
    <p class="text-sm text-[var(--color-dark-gray)] mb-6">
      Your email will not be published. Required fields are marked *
    </p>

    <UiForm :loading="isSubmitting" @submit="onSubmit">
      <UiFormField label="Your Rating" required :error="errors.rating">
        <UiStarRating
          v-model="rating"
          v-bind="ratingProps"
          interactive
          size="32px"
        />
      </UiFormField>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UiFormField label="Your Name" required :error="errors.name">
          <UiInput
            v-model="name"
            v-bind="nameProps"
            variant="form"
            placeholder="Enter your name"
            autocomplete="name"
          />
        </UiFormField>

        <UiFormField label="Your Email" required :error="errors.email">
          <UiInput
            v-model="email"
            v-bind="emailProps"
            variant="form"
            type="email"
            placeholder="example@mail.com"
            autocomplete="email"
          />
        </UiFormField>
      </div>

      <UiFormField
        label="Your feedback"
        required
        :error="errors.comment"
        hint="Minimum 10 characters"
      >
        <UiFormTextarea
          v-model="comment"
          v-bind="commentProps"
          :rows="5"
          :maxlength="1000"
          placeholder="Share your thoughts about the product..."
        />
      </UiFormField>

      <div class="flex justify-between items-center">
        <UiCheckbox
          v-model="saveData"
          v-bind="saveDataProps"
          label="Save data for future reviews"
        />

        <UiButton
          type="submit"
          :disabled="isSubmitting"
          class="w-full md:w-auto"
        >
          <template v-if="isSubmitting">
            <span class="inline-flex items-center gap-2">
              <Icon
                name="ic:baseline-autorenew"
                size="16"
                class="animate-spin"
                aria-hidden="true"
              />
              <span>Submitting...</span>
            </span>
          </template>
          <template v-else>Submit Review</template>
        </UiButton>
      </div>
    </UiForm>
  </div>
</template>
