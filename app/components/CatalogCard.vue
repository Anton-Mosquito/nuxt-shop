<script setup lang="ts">
import type { IProduct } from "~/interfaces/product.interface";

const config = useRuntimeConfig();
const product = defineProps<IProduct>();
const image = computed(
  () => `url(${config.public.image_url}${product.images[0]})`
);
</script>

<template>
  <NuxtLink class="card" :to="`/catalog/${product.id}`">
    <div class="card__image">
      <span v-if="product.discount > 0" class="card__discount"
        >- {{ product.discount }}%</span
      >
      <Icon name="icon:bar-outline" size="12" />
    </div>
    <div class="card__footer">
      <div class="card__name">
        {{ product.name }}
      </div>
      <div class="card__price">{{ product.price }} $</div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  text-decoration: none;

  & .card__image {
    aspect-ratio: 1 / 1;
    border-radius: 8px;
    width: 100%;
    min-width: 320px;
    padding: 16px;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: v-bind(image);
  }

  & .card__discount {
    position: absolute;
    top: 8px;
    left: 8px;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    background: var(--color-accent);
    color: var(--color-white-light);
  }

  & .card__footer {
    display: flex;
    flex-direction: column;
    gap: 16px;

    & .card__name {
      font-size: 20px;
      line-height: 26px;
      color: var(--color-accent);
    }

    & .card__price {
      font-size: 20px;
      line-height: 26px;
      font-weight: 500;
      text-transform: capitalize;
      color: var(--color-accent);
    }
  }
}
</style>
