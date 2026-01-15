<script setup lang="ts">
import type { CheckoutFormData } from "~/types/forms/checkout";

const emit = defineEmits<{
  submit: [data: CheckoutFormData];
}>();

const formData = reactive<CheckoutFormData>({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  address: "",
  zipCode: "",
  deliveryMethod: "nova-poshta",
  paymentMethod: "card",
  comment: "",
  subscribe: false,
});

const { errors, validateAll, clearErrors, touchField, isValid } =
  useFormValidation({
    firstName: {
      value: toRef(formData, "firstName"),
      rules: {
        required: true,
        minLength: {
          value: 2,
          message: "Ім'я повинно містити мінімум 2 символи",
        },
      },
      validateOn: "blur",
    },
    lastName: {
      value: toRef(formData, "lastName"),
      rules: {
        required: true,
        minLength: {
          value: 2,
          message: "Прізвище повинно містити мінімум 2 символи",
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
    phone: {
      value: toRef(formData, "phone"),
      rules: {
        required: true,
        pattern: {
          value: /^(\+38)?0\d{9}$/,
          message: "Введіть коректний номер телефону (наприклад, 0501234567)",
        },
      },
      validateOn: "blur",
    },
    city: {
      value: toRef(formData, "city"),
      rules: {
        required: true,
        minLength: {
          value: 2,
          message: "Назва міста повинна містити мінімум 2 символи",
        },
      },
      validateOn: "blur",
    },
    address: {
      value: toRef(formData, "address"),
      rules: {
        required: true,
        minLength: {
          value: 5,
          message: "Адреса повинна містити мінімум 5 символів",
        },
      },
      validateOn: "blur",
    },
    zipCode: {
      value: toRef(formData, "zipCode"),
      rules: {
        required: true,
        pattern: {
          value: /^\d{5}$/,
          message: "Введіть коректний індекс (5 цифр)",
        },
      },
      validateOn: "blur",
    },
  });

const isSubmitting = ref(false);

const deliveryOptions = [
  { value: "nova-poshta", label: "Нова Пошта" },
  { value: "ukrposhta", label: "Укрпошта" },
  { value: "courier", label: "Кур'єрська доставка" },
] as const;

const paymentOptions = [
  { value: "card", label: "Оплата карткою онлайн" },
  { value: "cash", label: "Готівкою при отриманні" },
  { value: "online", label: "Оплата через LiqPay" },
] as const;

const handleSubmit = async () => {
  if (!(await validateAll())) {
    // Scroll to first error
    const firstErrorField = Object.keys(errors.value).find(
      (key) => errors.value[key]
    );
    if (firstErrorField) {
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }

  isSubmitting.value = true;

  try {
    emit("submit", { ...formData });

    // Don't reset form on success - user might want to edit
  } catch (error) {
    console.error("Checkout error:", error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="checkout-form">
    <h2 class="checkout-form__title">Оформлення замовлення</h2>

    <UiForm :loading="isSubmitting" @submit="handleSubmit">
      <!-- Personal Information -->
      <section class="checkout-form__section">
        <h3 class="checkout-form__section-title">Особисті дані</h3>

        <div class="checkout-form__row">
          <UiFormField label="Ім'я" required :error="errors.firstName">
            <UiInput variant="form"
              v-model="formData.firstName"
              placeholder="Іван"
              autocomplete="given-name"
              @blur="touchField('firstName')"
            />
          </UiFormField>

          <UiFormField label="Прізвище" required :error="errors.lastName">
            <UiInput variant="form"
              v-model="formData.lastName"
              placeholder="Іваненко"
              autocomplete="family-name"
              @blur="touchField('lastName')"
            />
          </UiFormField>
        </div>

        <div class="checkout-form__row">
          <UiFormField label="Email" required :error="errors.email">
            <UiInput variant="form"
              v-model="formData.email"
              type="email"
              placeholder="example@mail.com"
              autocomplete="email"
              @blur="touchField('email')"
            />
          </UiFormField>

          <UiFormField
            label="Телефон"
            required
            :error="errors.phone"
            hint="Формат: 0501234567"
          >
            <UiInput variant="form"
              v-model="formData.phone"
              type="tel"
              placeholder="0501234567"
              autocomplete="tel"
              @blur="touchField('phone')"
            />
          </UiFormField>
        </div>
      </section>

      <!-- Delivery Address -->
      <section class="checkout-form__section">
        <h3 class="checkout-form__section-title">Адреса доставки</h3>

        <UiFormField label="Місто" required :error="errors.city">
          <UiInput variant="form"
            v-model="formData.city"
            placeholder="Київ"
            autocomplete="address-level2"
            @blur="touchField('city')"
          />
        </UiFormField>

        <UiFormField label="Адреса" required :error="errors.address">
          <UiInput variant="form"
            v-model="formData.address"
            placeholder="вул. Хрещатик, буд. 1, кв. 5"
            autocomplete="street-address"
            @blur="touchField('address')"
          />
        </UiFormField>

        <UiFormField
          label="Поштовий індекс"
          required
          :error="errors.zipCode"
          hint="5 цифр"
        >
          <UiInput variant="form"
            v-model="formData.zipCode"
            placeholder="01001"
            autocomplete="postal-code"
            @blur="touchField('zipCode')"
          />
        </UiFormField>
      </section>

      <!-- Delivery Method -->
      <section class="checkout-form__section">
        <h3 class="checkout-form__section-title">Спосіб доставки</h3>

        <div class="checkout-form__radio-group">
          <label
            v-for="option in deliveryOptions"
            :key="option.value"
            class="checkout-form__radio"
            :class="{
              'checkout-form__radio--active':
                formData.deliveryMethod === option.value,
            }"
          >
            <input
              v-model="formData.deliveryMethod"
              type="radio"
              :value="option.value"
              name="deliveryMethod"
            />
            <span>{{ option.label }}</span>
          </label>
        </div>
      </section>

      <!-- Payment Method -->
      <section class="checkout-form__section">
        <h3 class="checkout-form__section-title">Спосіб оплати</h3>

        <div class="checkout-form__radio-group">
          <label
            v-for="option in paymentOptions"
            :key="option.value"
            class="checkout-form__radio"
            :class="{
              'checkout-form__radio--active':
                formData.paymentMethod === option.value,
            }"
          >
            <input
              v-model="formData.paymentMethod"
              type="radio"
              :value="option.value"
              name="paymentMethod"
            />
            <span>{{ option.label }}</span>
          </label>
        </div>
      </section>

      <!-- Additional Info -->
      <section class="checkout-form__section">
        <UiFormField label="Коментар до замовлення" hint="Необов'язково">
          <UiFormTextarea
            v-model="formData.comment"
            :rows="3"
            :maxlength="500"
            placeholder="Додаткова інформація для кур'єра..."
          />
        </UiFormField>

        <UiCheckbox
          v-model="formData.subscribe"
          label="Отримувати новини та спеціальні пропозиції на email"
        />
      </section>

      <div class="checkout-form__footer">
        <UiButton
          type="submit"
          :disabled="isSubmitting || !isValid"
          size="large"
          block
        >
          {{ isSubmitting ? "Обробка..." : "Оформити замовлення" }}
        </UiButton>

        <p class="checkout-form__footer-note">
          Натискаючи кнопку, ви погоджуєтесь з
          <NuxtLink to="/privacy">політикою конфіденційності</NuxtLink>
        </p>
      </div>
    </UiForm>
  </div>
</template>

<style scoped>
.checkout-form {
  max-width: 800px;
  margin: 0 auto;
}

.checkout-form__title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 32px;
  color: var(--color-black);
}

.checkout-form__section {
  margin-bottom: 32px;
  padding: 24px;
  background-color: #fff;
  border: 1px solid var(--color-gray);
  border-radius: 8px;
}

.checkout-form__section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--color-black);
}

.checkout-form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.checkout-form__radio-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.checkout-form__radio {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 2px solid var(--color-gray);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.checkout-form__radio input[type="radio"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.checkout-form__radio span {
  font-size: 15px;
  color: var(--color-black);
}

.checkout-form__radio:hover {
  border-color: var(--color-dark-gray);
  background-color: #f9f9f9;
}

.checkout-form__radio--active {
  border-color: var(--color-accent);
  background-color: rgba(0, 0, 0, 0.02);
}

.checkout-form__footer {
  margin-top: 32px;
  text-align: center;
}

.checkout-form__footer-note {
  margin-top: 16px;
  font-size: 13px;
  color: var(--color-dark-gray);
}

.checkout-form__footer-note a {
  color: var(--color-accent);
  text-decoration: underline;
}

@media (max-width: 768px) {
  .checkout-form__row {
    grid-template-columns: 1fr;
  }

  .checkout-form__section {
    padding: 16px;
  }

  .checkout-form__title {
    font-size: 24px;
  }
}
</style>
