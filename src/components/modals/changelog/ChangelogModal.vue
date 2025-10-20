<template>
  <UModal
    v-model:open="modals.changelog"
    title="SCPL Engenharia Changelog - v1.0.0"
    :ui="{
      content: 'max-w-4xl',
      body: 'max-h-[65dvh]',
    }"
  >
    <template #body>
      <UChangelogVersions :versions="versions" :indicator="false" />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { useModalStore } from '../../../composables/useModalStore';
const { modals } = useModalStore()
import { versions } from '../../../utils/docs/changelog-versions'
</script>
