<script setup lang="ts">
interface ReviewFormData {
  name: string;
  email: string;
  rating: number;
  comment: string;
  saveData?: boolean;
}

const emit = defineEmits<{
  submit: [data: ReviewFormData];
}>();

const formData = reactive({
  name: "",
  email: "",
  rating: 0,
  comment: "",
  saveData: false,
});

const { errors, validateAll, clearErrors, touchField } = useFormValidation({
  name: {
    value: toRef(formData, "name"),
    rules: {
      required: true,
      minLength: {
        value: 2,
        message: "Name must be at least 2 characters long",
      },
    },
    validateOn: "blur",
  },
  email: {
    value: toRef(formData, "email"),
    rules: {
      required: true,
      email: true,
    },
    validateOn: "blur",
  },
  rating: {
    value: computed(() => formData.rating.toString()),
    rules: {
      custom: (value) => parseInt(value) > 0 || "Please provide a rating",
    },
  },
  comment: {
    value: toRef(formData, "comment"),
    rules: {
      required: true,
      minLength: {
        value: 10,
        message: "Feedback must be at least 10 characters long",
      },
      maxLength: {
        value: 1000,
        message: "Feedback must not exceed 1000 characters",
      },
    },
    validateOn: "blur",
  },
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
  if (!(await validateAll())) {
    return;
  }

  isSubmitting.value = true;

  try {
    emit("submit", {
      name: formData.name,
      email: formData.email,
      rating: formData.rating,
      comment: formData.comment,
      saveData: formData.saveData,
    });

    // Reset form
    Object.assign(formData, {
      name: "",
      email: "",
      rating: 0,
      comment: "",
      saveData: false,
    });
    clearErrors();
  } catch (error) {
    console.error("Submit error:", error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="review-form">
    <h3 class="review-form__title">Add feedback</h3>
    <p class="review-form__description">
      Your email will not be published. Required fields are marked *
    </p>

    <UiForm :loading="isSubmitting" @submit="handleSubmit">
      <UiFormField label="Your Rating" required :error="errors.rating">
        <UiStarRating
          v-model="formData.rating"
          interactive
          size="32px"
          @update:model-value="touchField('rating')"
        />
      </UiFormField>

      <div class="review-form__row">
        <UiFormField label="Your Name" required :error="errors.name">
          <UiInput 
            v-model="formData.name"
            variant="form"
            placeholder="Enter your name"
            autocomplete="name"
            @blur="touchField('name')"
          />
        </UiFormField>

        <UiFormField label="Your Email" required :error="errors.email">
          <UiInput 
            v-model="formData.email"
            variant="form"
            type="email"
            placeholder="example@mail.com"
            autocomplete="email"
            @blur="touchField('email')"
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
          v-model="formData.comment"
          :rows="5"
          :maxlength="1000"
          placeholder="Share your thoughts about the product..."
          @blur="touchField('comment')"
        />
      </UiFormField>

      <UiCheckbox
        v-model="formData.saveData"
        label="Save data for future reviews"
      />

      <UiButton
        type="submit"
        :disabled="isSubmitting"
        class="review-form__submit"
      >
        {{ isSubmitting ? "Submitting..." : "Submit Review" }}
      </UiButton>
    </UiForm>
  </div>
</template>

<style scoped>
.review-form {
  margin-top: 40px;
  padding: 24px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.review-form__title {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--color-black);
}

.review-form__description {
  font-size: 14px;
  color: var(--color-dark-gray);
  margin-bottom: 24px;
}

.review-form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.review-form__submit {
  margin-top: 8px;
}

@media (max-width: 768px) {
  .review-form {
    padding: 20px;
  }

  .review-form__row {
    grid-template-columns: 1fr;
  }
}
</style>
