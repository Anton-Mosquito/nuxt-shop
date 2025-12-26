<script setup lang="ts">
import type { Product } from "~/types";

const { id, discount, images, name, price } = defineProps<Product>();
const isHovered = ref(false);
</script>

<template>
  <NuxtLink
    class="card"
    :to="`/catalog/${id}`"
    prefetch-on="interaction"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="card__image">
      <NuxtImg
        :src="useImageUrl(images?.[0])"
        :alt="name"
        provider="ipx"
        format="webp"
        quality="80"
        width="600"
        height="600"
        sizes="sm:100vw md:50vw lg:33vw"
        loading="lazy"
        class="card__image-bg"
      />
      <span v-if="discount > 0" class="card__discount">- {{ discount }}%</span>
      <AddFavorite :id="id" :is-shown="isHovered" />
    </div>
    <div class="card__footer">
      <div class="card__name">
        {{ name }}
      </div>
      <div class="card__price">{{ price }} $</div>
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
    position: relative;
    aspect-ratio: 1 / 1;
    border-radius: 8px;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 16px;
  }

  & .card__image-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }

  & .card__discount {
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 12px;
    background: var(--color-accent);
    color: var(--color-white-light);
    z-index: 20;
    transition: opacity 0.12s ease, transform 0.12s ease;
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
