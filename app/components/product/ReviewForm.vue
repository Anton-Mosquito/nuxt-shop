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
        message: "Ім'я повинно містити мінімум 2 символи",
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
      custom: (value) => parseInt(value) > 0 || "Будь ласка, оберіть рейтинг",
    },
  },
  comment: {
    value: toRef(formData, "comment"),
    rules: {
      required: true,
      minLength: {
        value: 10,
        message: "Відгук повинен містити мінімум 10 символів",
      },
      maxLength: {
        value: 1000,
        message: "Відгук не повинен перевищувати 1000 символів",
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
    <h3 class="review-form__title">Додати відгук</h3>
    <p class="review-form__description">
      Ваш email не буде опубліковано. Обов'язкові поля позначені *
    </p>

    <UiFormForm :loading="isSubmitting" @submit="handleSubmit">
      <UiFormFormField label="Ваша оцінка" required :error="errors.rating">
        <UiStarRating
          v-model="formData.rating"
          interactive
          size="32px"
          @update:model-value="touchField('rating')"
        />
      </UiFormFormField>

      <div class="review-form__row">
        <UiFormFormField label="Ваше ім'я" required :error="errors.name">
          <UiFormFormInput
            v-model="formData.name"
            placeholder="Введіть ваше ім'я"
            autocomplete="name"
            @blur="touchField('name')"
          />
        </UiFormFormField>

        <UiFormFormField label="Ваш email" required :error="errors.email">
          <UiFormFormInput
            v-model="formData.email"
            type="email"
            placeholder="example@mail.com"
            autocomplete="email"
            @blur="touchField('email')"
          />
        </UiFormFormField>
      </div>

      <UiFormFormField
        label="Ваш відгук"
        required
        :error="errors.comment"
        hint="Мінімум 10 символів"
      >
        <UiFormFormTextarea
          v-model="formData.comment"
          :rows="5"
          :maxlength="1000"
          placeholder="Поділіться вашою думкою про товар..."
          @blur="touchField('comment')"
        />
      </UiFormFormField>

      <UiCheckbox
        v-model="formData.saveData"
        label="Зберегти дані для наступних відгуків"
      />

      <UiButton
        type="submit"
        :disabled="isSubmitting"
        class="review-form__submit"
      >
        {{ isSubmitting ? "Відправка..." : "Відправити відгук" }}
      </UiButton>
    </UiFormForm>
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
