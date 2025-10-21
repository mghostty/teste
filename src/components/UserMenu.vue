<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import type { DropdownMenuItem } from '@nuxt/ui';
import { useColorMode } from '@vueuse/core';

defineProps<{
  collapsed?: boolean;
}>();

const emits = defineEmits<{
  (e: 'settings-modal-open'): void;
  (e: 'changelog-modal-open'): void;
}>();

const colorMode = useColorMode();
const appConfig = useAppConfig();
const systemVersion = 'v2.3.1';

const colors = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
];
const neutrals = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'ash',
  'sand',
  'mist',
  'lavender',
  'sepia',
];

const user = ref({
  name: 'Thiago Ferreira',
  username: 'thiago.f',
  avatar: {
    src: 'https://rocketchat.lohr.com.br/avatar/thiago.f',
    alt: 'Thiago Ferreira',
  },
});

onMounted(() => {
  const savedPrimary = localStorage.getItem('theme:primary');
  const savedNeutral = localStorage.getItem('theme:neutral');

  if (savedPrimary) appConfig.ui.colors.primary = savedPrimary;
  if (savedNeutral) appConfig.ui.colors.neutral = savedNeutral;
});

watch(
  () => appConfig.ui.colors.primary,
  (newVal) => localStorage.setItem('theme:primary', newVal)
);
watch(
  () => appConfig.ui.colors.neutral,
  (newVal) => localStorage.setItem('theme:neutral', newVal)
);
const themeButton = ref<HTMLElement | null>(null);

const startViewTransition = (event: MouseEvent, newTheme: 'light' | 'dark') => {
  if (!document.startViewTransition) {
    colorMode.value = newTheme;
    return;
  }

  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  const transition = document.startViewTransition(() => {
    colorMode.value = newTheme;
  });

  transition.ready.then(() => {
    const duration = 600;
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: duration,
        easing: 'cubic-bezier(.76,.32,.29,.99)',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  });
};

// 🧩 Itens do dropdown
const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      type: 'label',
      label: user.value.name,
      avatar: user.value.avatar,
    },
  ],
  [
    {
      label: `Changelog - ${systemVersion}`,
      icon: 'i-lucide-git-branch',
      onSelect: () => emits('changelog-modal-open'),
    },
    {
      label: 'Criar Chamado - TI',
      icon: 'i-lucide-info',
      to: 'https://servicedesk.lohr.com.br/front/helpdesk.public.php?create_ticket=1',
      target: '_blank',
    },
    {
      label: 'Configurações',
      icon: 'i-lucide-settings',
      onSelect: () => emits('settings-modal-open'),
    },
  ],
  [
    {
      label: 'Aparência',
      icon: 'i-lucide-palette',
      children: [
        {
          label: 'Cor Primária',
          slot: 'chip',
          chip: appConfig.ui.colors.primary,
          content: { align: 'center', collisionPadding: 16 },
          children: colors.map((color) => ({
            label: color,
            chip: color,
            slot: 'chip',
            checked: appConfig.ui.colors.primary === color,
            type: 'checkbox',
            onSelect: (e) => {
              e.preventDefault();
              appConfig.ui.colors.primary = color;
            },
          })),
        },
        {
          label: 'Cor Neutra',
          slot: 'chip',
          chip:
            appConfig.ui.colors.neutral === 'neutral'
              ? 'old-neutral'
              : appConfig.ui.colors.neutral,
          content: { align: 'end', collisionPadding: 16 },
          children: neutrals.map((color) => ({
            label: color,
            chip: color === 'neutral' ? 'old-neutral' : color,
            slot: 'chip',
            type: 'checkbox',
            checked: appConfig.ui.colors.neutral === color,
            onSelect: (e) => {
              e.preventDefault();
              appConfig.ui.colors.neutral = color;
            },
          })),
        },
      ],
    },
    {
      label: 'Modo de Exibição',
      icon: 'i-lucide-sun-moon',
      children: [
        {
          label: 'Claro',
          icon: 'i-lucide-sun',
          type: 'checkbox',
          checked: colorMode.value === 'light',
          slot: 'theme',
          onSelect: (e) => {
            e.preventDefault();
            colorMode.value = 'light';
          },
        },
        {
          label: 'Escuro',
          icon: 'i-lucide-moon',
          type: 'checkbox',
          checked: colorMode.value === 'dark',
          slot: 'theme',
          onSelect: (e) => {
            e.preventDefault();
            colorMode.value = 'dark';
          },
        },
      ],
    },
  ],
  [
    {
      label: 'Sair do Sistema',
      icon: 'i-lucide-log-out',
    },
  ],
]);
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'end' }"
    :ui="{
      content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)',
    }"
    :itemLabel="'text-base'"
  >
    <UButton
      v-bind="{
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down',
      }"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="transition-all duration-300 ease-in-out data-[state=open]:bg-slate-800 hover:bg-slate-800 active:bg-slate-800 text-base py-1.5 text-gray-200"
      :ui="{ trailingIcon: 'text-gray-500' }"
    >
      <template #leading>
        <UAvatar
          :size="!collapsed ? 'md' : 'xs'"
          class="rounded-none squircle transition-all duration-300 ease-in-out relative"
          :class="[
            !collapsed
              ? '-left-1 scale-100 opacity-100'
              : 'scale-90 opacity-80',
          ]"
          :src="user.avatar.src"
          :alt="user.avatar.alt"
        />
      </template>

      <template #default>
        <Transition name="fade-slide">
          <div>
            <div
              v-if="!collapsed"
              class="flex flex-col flex-start text-left -ml-0.5 overflow-x-hidden transition-all duration-300 ease-in-out"
            >
              <span>{{ user.name }}</span>
              <p class="text-xs text-muted ml-0.5">{{ user.username }}</p>
            </div>
          </div>
        </Transition>
      </template>
    </UButton>

    <template #chip-leading="{ item }">
      <span
        :style="{
          '--chip-light': `var(--color-${(item as any).chip}-500)`,
          '--chip-dark': `var(--color-${(item as any).chip}-400)`,
        }"
        class="ms-0.5 size-2 rounded-full bg-(--chip-light) dark:bg-(--chip-dark)"
      />
    </template>
  </UDropdownMenu>
</template>

<style scoped>
/* Suporte ao efeito de transição de tema */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-new(root) {
  z-index: 9999;
}

::view-transition-old(root) {
  z-index: 1;
}

/* Avatar e animação suave */
.squircle {
  mask-image: url("data:image/svg+xml,%3csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M100 0C20 0 0 20 0 100s20 100 100 100 100-20 100-100S180 0 100 0Z'/%3e%3c/svg%3e");
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s ease-in-out;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-6px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
