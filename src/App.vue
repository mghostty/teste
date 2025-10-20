<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStorage } from '@vueuse/core'
import type { NavigationMenuItem } from '@nuxt/ui'
import AppModals from './components/modals/AppModals.vue'
import { useModalStore } from './composables/useModalStore'

const toast = useToast()
const route = useRoute()
const open = ref(false)
const { modals, openModal, closeModal } = useModalStore()

const links = [[
  {
    label: 'Home',
    icon: 'i-lucide-house',
    to: '/',
  },
  {
    label: 'Solicitações',
    icon: 'i-lucide-file-text',
    children: [
      {
        label: 'Etiquetas',
        to: '/teste'
      },
      {
        label: 'Material',
        to: '/teste'
      }
    ],
  },
  {
    label: 'Defeito de Fabricação',
    icon: 'i-lucide-alert-triangle',
    to: '/defeitos',
    onSelect: () => { open.value = false }
  },
  {
    label: 'Estruturas',
    icon: 'i-lucide-layers',
    to: '/estruturas',
    onSelect: () => { open.value = false }
  },
  {
    label: 'Firmwares',
    icon: 'i-lucide-cpu',
    to: '/firmwares',
    onSelect: () => { open.value = false }
  },
  {
    label: "Instruções Operacionais",
    icon: 'i-lucide-file-cog',
    to: '/ios',
    onSelect: () => { open.value = false }
  },
  {
    label: 'Insumos / Produtos',
    icon: 'i-lucide-box',
    to: '/insumos',
    onSelect: () => { open.value = false }
  },
  {
    label: 'Licenças',
    icon: 'i-lucide-badge-check',
    to: '/licencas',
    onSelect: () => { open.value = false }
  },
  {
    label: 'Pedidos',
    icon: 'i-lucide-shopping-cart',
    to: '/pedidos',
    onSelect: () => { open.value = false }
  },
  {
    label: 'Projetos',
    icon: 'i-lucide-folder-kanban',
    to: '/projetos',
    onSelect: () => { open.value = false }
  },
  {
    label: 'SENDERO',
    icon: 'i-lucide-circle-gauge',
    to: '/sendero',
    children: [
      {
        label: 'Relatório',
        to: '/utilitarios/drive'
      },
    ],
    onSelect: () => { open.value = false }
  },
  {
    label: 'Solda SMD',
    icon: 'i-lucide-sparkles',
    children: [
      {
        label: 'Relatório',
        to: '/utilitarios/drive'
      },
    ],
    onSelect: () => { open.value = false }
  },
  {
    label: 'Utilitários',
    icon: 'i-lucide-wrench',
    children: [
      {
        label: 'Drive',
        to: '/utilitarios/drive'
      },
    ],
    onSelect: () => { open.value = false }
  }
], [
  {
    label: 'Ajuda & Suporte',
    icon: 'i-lucide-info',
    to: 'https://github.com/nuxt/ui',
    target: '_blank'
  }
]] satisfies NavigationMenuItem[][]

const groups = computed(() => [{
  id: 'links',
  label: 'Navegação',
  items: links.flat()
}])
</script>

<style scoped>
@keyframes hover-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
.hover-bounce:hover {
  animation: hover-bounce 0.4s ease;
}
</style>

<template>
  <Suspense>
    <UApp>
      <UDashboardGroup unit="rem" storage="local">
        <UDashboardSidebar
          id="default"
          v-model:open="open"
          collapsible
          resizable
          mode="slideover"
          toggle-side="right"
          :default-size="17"
          class="bg-[#18181B] transition-all duration-500 ease-in-out"
          :ui="{ footer: 'lg:border-t border-neutral-700 dark:border-default', header: 'mt-9 mb-3' }"
        >
          <template #resize-handle="{ onMouseDown, onTouchStart, onDoubleClick }">
            <UDashboardResizeHandle
              class="after:absolute after:inset-y-0 after:right-0 after:w-px hover:after:bg-(--ui-border-accented) after:transition"
              @mousedown="onMouseDown"
              @touchstart="onTouchStart"
              @dblclick="onDoubleClick"
            />
          </template>

          <template #header="{ collapsed }">
            <div class="relative w-full">
              <a v-if="!collapsed" href="/" class="px-1 inline-block transition-transform duration-300 hover:brightness-110 hover-bounce">
               <img src="/logo_scpl.png" class="w-40" alt="Logo" />
             </a>
             <UDashboardSidebarCollapse class="absolute -top-6 right-0" :size="!collapsed ? 'lg' : 'md'" variant="link" color="neutral"  />
            </div>
          </template>

          <template #default="{ collapsed }">
            <UDashboardSearchButton
              :collapsed="collapsed"
              class="bg-transparent rounded-lg ring-zinc-600 hover:bg-zinc-800 active:bg-zinc-800 !border-gray-800 py-2"
              :class="{'px-3': !collapsed}"
              :ui="{
                base: '!border-gray-800 text-gray-300'
              }"
            />

            <UNavigationMenu
              :collapsed="collapsed"
              :items="links[0]"
              orientation="vertical"
              class="mt-1"
              tooltip
              popover
            />
          </template>

          <template #footer="{ collapsed }">
            <UserMenu
              :collapsed="collapsed"
              @changelog-modal-open="openModal('changelog')"
              @settings-modal-open="openModal('settings')"
            />
          </template>
        </UDashboardSidebar>

        <UDashboardSearch placeholder="Digite para pesquisar..." :groups="groups" />

        <UContainer>
          <RouterView />
        </UContainer>

        <AppModals />
      </UDashboardGroup>
    </UApp>
  </Suspense>
</template>
