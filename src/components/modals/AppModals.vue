<template>
  <SettingsModal />
  <ChangelogModal />
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useModalStore } from '../../composables/useModalStore'
import ChangelogModal from './changelog/ChangelogModal.vue'
import SettingsModal from './settings/SettingsModal.vue'

const { modals } = useModalStore()

watch(
  modals,
  (newVal) => console.log('modals changed ->', newVal),
  { deep: true }
)
</script>
