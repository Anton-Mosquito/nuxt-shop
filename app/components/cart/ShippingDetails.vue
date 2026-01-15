<script setup lang="ts">
interface Props {
  nameProps?: Record<string, unknown>;
  phoneProps?: Record<string, unknown>;
  addressProps?: Record<string, unknown>;
  errors?: Record<string, string | undefined>;
}

const name = defineModel<string>("name");
const phone = defineModel<string>("phone");
const address = defineModel<string>("address");
const props = defineProps<Props>();
</script>

<template>
  <div class="space-y-4">
    <UiFormField label="Full Name" :error="props.errors?.name">
      <UiInput
        v-model="name"
        v-bind="props.nameProps"
        placeholder="John Doe"
        :error="!!props.errors?.name"
      />
    </UiFormField>

    <UiFormField label="Phone" :error="props.errors?.phone">
      <UiInput
        v-model="phone"
        v-bind="props.phoneProps"
        placeholder="+1234567890"
        :error="!!props.errors?.phone"
      />
    </UiFormField>

    <UiFormField label="Delivery Address" :error="props.errors?.address">
      <UiInput
        v-model="address"
        v-bind="props.addressProps"
        placeholder="123 Main St, City"
        :error="!!props.errors?.address"
      />
    </UiFormField>
  </div>
</template>
