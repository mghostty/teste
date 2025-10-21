<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue';
import { sub } from 'date-fns';
import type { Period, Range } from '../types';

const range = shallowRef<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date(),
});
const period = ref<Period>('daily');

const showContent = ref(false);

onMounted(() => {
  showContent.value = true;
});
</script>

<template>
  <UDashboardPanel id="home">
    <template #body>
      <Transition name="fade-left">
        <div v-if="showContent" class="pt-4">
          <UPageHeader
            title="Bom dia Thiago,"
            description="Veja o progresso e os principais indicadores da Engenharia no SCPL"
          />
          <HomeStats :period="period" :range="range" />
        </div>
      </Transition>
    </template>
  </UDashboardPanel>
</template>
