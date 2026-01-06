<template>
  <div class="bg-[#F5F5F5] p-1 rounded-lg flex mb-8">
    <NuxtLink
      to="/auth/login"
      class="flex-1 text-center py-2 text-sm font-medium rounded-md transition-all no-underline text-[#666666] hover:text-black"
      active-class="bg-white shadow-sm text-black"
    >
      Login
    </NuxtLink>
    <NuxtLink
      to="/auth/register"
      class="flex-1 text-center py-2 text-sm font-medium rounded-md transition-all no-underline text-[#666666] hover:text-black"
      active-class="bg-white shadow-sm text-black"
    >
      Register
    </NuxtLink>
  </div>
</template>
