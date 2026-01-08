<script setup lang="ts">
import type { ReviewFormEmits } from "~/types";
import * as z from "zod";
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

const emit = defineEmits<ReviewFormEmits>();
const {
  name,
  nameError,
  nameBlur,
  email,
  emailError,
  emailBlur,
  rating,
  ratingError,
  comment,
  commentError,
  commentBlur,
  saveData,
  isSubmitting,
  onSubmit,
} = useValidateFrom();

function useValidateFrom() {
  const validationSchema = toTypedSchema(
    z.object({
      name: z
        .string({ required_error: "Name is required" })
        .min(2, "Name must be at least 2 characters long"),
      email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email address"),
      rating: z
        .number({ required_error: "Please provide a rating" })
        .min(1, "Please provide a rating"),
      comment: z
        .string({ required_error: "Feedback is required" })
        .min(10, "Feedback must be at least 10 characters long")
        .max(1000, "Feedback must not exceed 1000 characters"),
      saveData: z.boolean().default(false),
    })
  );

  const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema,
    initialValues: {
      name: "",
      email: "",
      rating: 0,
      comment: "",
      saveData: false,
    },
  });

  const {
    value: name,
    errorMessage: nameError,
    handleBlur: nameBlur,
  } = useField<string>("name");

  const {
    value: email,
    errorMessage: emailError,
    handleBlur: emailBlur,
  } = useField<string>("email");

  const { value: rating, errorMessage: ratingError } =
    useField<number>("rating");

  const {
    value: comment,
    errorMessage: commentError,
    handleBlur: commentBlur,
  } = useField<string>("comment");

  const { value: saveData } = useField<boolean>("saveData");

  const onSubmit = handleSubmit((values) => {
    try {
      emit("submit", {
        name: values.name,
        email: values.email,
        rating: values.rating,
        comment: values.comment,
        saveData: values.saveData,
      });

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
    nameError,
    nameBlur,
    email,
    emailError,
    emailBlur,
    rating,
    ratingError,
    comment,
    commentError,
    commentBlur,
    saveData,
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
      <UiFormField label="Your Rating" required :error="ratingError">
        <UiStarRating v-model="rating" interactive size="32px" />
      </UiFormField>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UiFormField label="Your Name" required :error="nameError">
          <UiInput
            v-model="name"
            variant="form"
            placeholder="Enter your name"
            autocomplete="name"
            @blur="nameBlur"
          />
        </UiFormField>

        <UiFormField label="Your Email" required :error="emailError">
          <UiInput
            v-model="email"
            variant="form"
            type="email"
            placeholder="example@mail.com"
            autocomplete="email"
            @blur="emailBlur"
          />
        </UiFormField>
      </div>

      <UiFormField
        label="Your feedback"
        required
        :error="commentError"
        hint="Minimum 10 characters"
      >
        <UiFormTextarea
          v-model="comment"
          :rows="5"
          :maxlength="1000"
          placeholder="Share your thoughts about the product..."
          @blur="commentBlur"
        />
      </UiFormField>

      <div class="flex justify-between items-center">
        <UiCheckbox v-model="saveData" label="Save data for future reviews" />

        <UiButton
          type="submit"
          :disabled="isSubmitting"
          class="w-full md:w-auto"
        >
          {{ isSubmitting ? "Submitting..." : "Submit Review" }}
        </UiButton>
      </div>
    </UiForm>
  </div>
</template>
