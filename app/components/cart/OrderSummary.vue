<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import {
  guestOrderSchema,
  shippingDetailsRequiredSchema,
  shippingDetailsSchema,
  type OrderFormInput,
} from "~~/shared/schemas";
import { API_ENDPOINTS, MESSAGES, ERROR_MESSAGES } from "~/constants";

const { items, clear, finalPrice } = useCart();
const { loggedIn, user } = useAuth();
const { success, error } = useToast();
const shipToDifferent = ref(false);
const {
  email,
  emailProps,
  password,
  passwordProps,
  name,
  nameProps,
  phone,
  phoneProps,
  address,
  addressProps,
  errors,
  isSubmitting,
  onSubmit,
} = useValidate();
const price = computed(() => finalPrice.value.toFixed(2));

function useValidate() {
  const validationSchema = computed(() => {
    if (!loggedIn.value) {
      return toTypedSchema(guestOrderSchema);
    }

    return toTypedSchema(
      shipToDifferent.value
        ? shippingDetailsRequiredSchema
        : shippingDetailsSchema
    );
  });

  const { handleSubmit, errors, defineField, isSubmitting } =
    useForm<OrderFormInput>({
      validationSchema,
    });

  const [email, emailProps] = defineField("email");
  const [password, passwordProps] = defineField("password");
  const [name, nameProps] = defineField("name");
  const [phone, phoneProps] = defineField("phone");
  const [address, addressProps] = defineField("address");

  const onSubmit = handleSubmit(async (values) => {
    if (items.value.length === 0) return;

    try {
      const endpoint = loggedIn.value
        ? API_ENDPOINTS.ORDERS_AUTH
        : API_ENDPOINTS.ORDERS;

      const payload = {
        items: items.value.map(({ product_id, quantity }) => ({
          productId: product_id,
          quantity,
        })),
        ...(loggedIn.value ? {} : { customer: values }),
      };

      const { id } = await $fetch<{ id: number }>(endpoint, {
        method: "POST",
        body: payload,
      });

      success({ message: MESSAGES.ORDER_CREATED(id) });
      clear();
      await navigateTo(`${API_ENDPOINTS.CHECKOUT_SUCCESS}/${id}`);
    } catch (e: unknown) {
      if (e instanceof Error) {
        error({ message: e.message || ERROR_MESSAGES.FAILED_TO_CREATE_ORDER });
      } else {
        error({ message: ERROR_MESSAGES.FAILED_TO_CREATE_ORDER });
      }
    }
  });

  return {
    email,
    emailProps,
    password,
    passwordProps,
    name,
    nameProps,
    phone,
    phoneProps,
    address,
    addressProps,
    errors,
    isSubmitting,
    shipToDifferent,
    onSubmit,
  };
}
</script>

<template>
  <div class="w-full flex-shrink-0 lg:w-[400px]">
    <div class="sticky top-4 space-y-6 rounded-xl border bg-gray-50 p-6">
      <div class="flex justify-between border-b pb-4 text-lg font-medium">
        <span>Subtotal</span>
        <span>${{ price }}</span>
      </div>

      <form class="space-y-4" @submit.prevent="onSubmit">
        <template v-if="!loggedIn">
          <div class="space-y-4">
            <h3 class="border-b pb-2 font-semibold text-gray-900">
              Contact Information
            </h3>

            <UiFormField label="Email" :error="errors.email">
              <UiInput
                v-model="email"
                v-bind="emailProps"
                type="email"
                placeholder="john@example.com"
                :error="!!errors.email"
              />
            </UiFormField>

            <UiFormField label="Password" :error="errors.password">
              <UiInput
                v-model="password"
                v-bind="passwordProps"
                type="password"
                placeholder="Create a password"
                :error="!!errors.password"
              />
            </UiFormField>

            <h3 class="border-b pb-2 pt-2 font-semibold text-gray-900">
              Shipping Details
            </h3>

            <CartShippingDetails
              v-model:name="name"
              v-model:phone="phone"
              v-model:address="address"
              :name-props="nameProps"
              :phone-props="phoneProps"
              :address-props="addressProps"
              :errors="errors"
            />
          </div>
        </template>

        <template v-else>
          <div class="space-y-3">
            <div class="rounded-md bg-blue-50 p-4 text-sm text-blue-800">
              Logged in as <strong>{{ user?.email }}</strong
              >. <br />Proceeding to payment with your saved details.
            </div>

            <UiFormField>
              <template #default>
                <UiCheckbox v-model="shipToDifferent"
                  >Ship to a different address</UiCheckbox
                >
              </template>
            </UiFormField>

            <Transition
              enter-from-class="transform -translate-y-1 opacity-0"
              enter-active-class="transition transform duration-200 ease-out"
              enter-to-class="transform translate-y-0 opacity-100"
              leave-from-class="transform translate-y-0 opacity-100"
              leave-active-class="transition transform duration-200 ease-in"
              leave-to-class="transform -translate-y-1 opacity-0"
              appear
            >
              <CartShippingDetails
                v-if="shipToDifferent"
                v-model:name="name"
                v-model:phone="phone"
                v-model:address="address"
                :name-props="nameProps"
                :phone-props="phoneProps"
                :address-props="addressProps"
                :errors="errors"
                class="space-y-4"
              />
            </Transition>
          </div>
        </template>

        <UiButton
          type="submit"
          class="h-12 w-full text-lg"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">Processing...</span>
          <span v-else>Pay ${{ price }}</span>
        </UiButton>
      </form>
    </div>
  </div>
</template>
