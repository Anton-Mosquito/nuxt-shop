<script setup lang="ts">
interface Activity {
  id: string;
  type: "created" | "updated" | "deleted" | "commented";
  user: {
    name: string;
    avatar: string;
  };
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

const props = defineProps<{
  activities: Activity[];
}>();

const typeConfig = {
  created: {
    icon: "ic:baseline-add",
    color: "bg-green-500",
    label: "створив",
  },
  updated: {
    icon: "ic:baseline-edit",
    color: "bg-blue-500",
    label: "оновив",
  },
  deleted: {
    icon: "ic:baseline-delete",
    color: "bg-red-500",
    label: "видалив",
  },
  commented: {
    icon: "ic:outline-chat-bubble-outline",
    color: "bg-purple-500",
    label: "прокоментував",
  },
};

const groupedActivities = computed(() => {
  const groups: Record<string, Activity[]> = {};

  props.activities.forEach((activity) => {
    const date = new Date(activity.timestamp).toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
  });

  return groups;
});
</script>

<template>
  <div class="space-y-8">
    <div v-for="(activities, date) in groupedActivities" :key="date">
      <!-- Date header -->
      <h3
        class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4"
      >
        {{ date }}
      </h3>

      <!-- Timeline -->
      <div class="relative pl-8 space-y-6">
        <!-- Vertical line -->
        <div class="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        <div v-for="activity in activities" :key="activity.id" class="relative">
          <!-- Timeline dot -->
          <div
            class="absolute -left-8 w-8 h-8 rounded-full flex items-center justify-center text-sm"
            :class="typeConfig[activity.type].color"
          >
            <Icon
              :name="typeConfig[activity.type].icon"
              class="w-4 h-4 text-white"
              aria-hidden="true"
            />
          </div>

          <!-- Activity card -->
          <div
            class="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <UiAvatar
                    :src="activity.user.avatar"
                    :alt="activity.user.name"
                    size="sm"
                  />
                  <span class="font-medium text-gray-900">
                    {{ activity.user.name }}
                  </span>
                  <span class="text-gray-600 text-sm">
                    {{ typeConfig[activity.type].label }}
                  </span>
                </div>

                <p class="text-gray-700 text-sm mb-2">
                  {{ activity.description }}
                </p>

                <!-- Metadata -->
                <div v-if="activity.metadata" class="text-xs text-gray-500">
                  <pre class="bg-gray-50 rounded p-2 overflow-auto">{{
                    activity.metadata
                  }}</pre>
                </div>
              </div>

              <!-- Timestamp -->
              <div class="text-right">
                <div class="text-xs text-gray-500">
                  <NuxtTime
                    :datetime="activity.timestamp"
                    type="relative"
                    locale="uk-UA"
                  />
                </div>
                <div class="text-xs text-gray-400 mt-1">
                  <NuxtTime
                    :datetime="activity.timestamp"
                    locale="uk-UA"
                    hour="2-digit"
                    minute="2-digit"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
