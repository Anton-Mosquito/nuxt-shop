<!-- components/UserProfile.vue -->
<script setup lang="ts">
const user = {
  name: "Олена Петренко",
  email: "olena@example.com",
  avatar: "/images/avatars/user1.jpg",
  role: "Адміністратор",
};
</script>

<template>
  <div class="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
    <UserAvatar :src="user.avatar" :alt="user.name" size="lg" />

    <div>
      <h3 class="font-bold text-lg">{{ user.name }}</h3>
      <p class="text-sm text-gray-600">{{ user.email }}</p>
      <span class="text-xs text-blue-600">{{ user.role }}</span>
    </div>
  </div>
</template>
