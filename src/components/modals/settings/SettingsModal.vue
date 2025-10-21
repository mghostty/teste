<template>
  <UModal
    v-model:open="modals.settings"
    title="Configurações"
    description="Gerencie suas preferências"
    :ui="{
      content: 'max-w-5xl',
      body: 'min-h-[60dvh] p-0',
    }"
  >
    <template #body>
      <div class="flex h-[60dvh]">
        <!-- Sidebar -->
        <div class="w-64 border-r border-gray-200 dark:border-gray-800 pr-6">
          <nav class="space-y-1">
            <button
              v-for="item in items"
              :key="item.slot"
              @click="activeTab = item.slot"
              :class="[
                'w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors',
                activeTab === item.slot
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
              ]"
            >
              <UIcon :name="item.icon" class="w-4 h-4" />
              <span>{{ item.label }}</span>
            </button>
          </nav>
        </div>

        <!-- Content -->
        <div class="flex-1 p-6 pt-0">
          <!-- Conta -->
          <div v-if="activeTab === 'account'" class="max-w-2xl space-y-4">
            <!-- Imagem do usuário -->
            <div class="flex items-center gap-4 mb-4">
              <img
                :src="state.avatar"
                alt="Foto de perfil"
                class="w-18 h-18 rounded-full border border-gray-200 dark:border-gray-800 object-cover"
              />
              <div>
                <UAlert
                  icon="i-lucide-info"
                  color="info"
                  variant="soft"
                  title="Esta imagem está sendo carregada diretamente da API do RocketChat."
                />
              </div>
            </div>

            <UForm :state="state" class="flex flex-col gap-4 mt-4">
              <UFormField label="Nome" name="name">
                <UInput v-model="state.name" class="w-full" />
              </UFormField>

              <UFormField label="Nome de usuário" name="username">
                <UInput v-model="state.username" class="w-full" />
              </UFormField>
            </UForm>

            <USeparator
              class="mt-6"
              :avatar="{
                src: 'https://github.com/nuxt.png',
              }"
            />

            <UForm :state="state" class="flex flex-col gap-4">
              <UFormField label="Senha atual" name="current" required>
                <UInput
                  v-model="state.currentPassword"
                  type="password"
                  placeholder="Digite sua senha atual"
                  required
                  class="w-full"
                />
              </UFormField>

              <UFormField label="Nova senha" name="new" required>
                <UInput
                  v-model="state.newPassword"
                  type="password"
                  placeholder="Digite sua nova senha"
                  required
                  class="w-full"
                />
                <template #hint>
                  <span class="text-xs text-gray-500">
                    Mínimo de 8 caracteres com letras e números
                  </span>
                </template>
              </UFormField>

              <UFormField label="Confirmar nova senha" name="confirm" required>
                <UInput
                  v-model="state.confirmPassword"
                  type="password"
                  placeholder="Confirme sua nova senha"
                  required
                  class="w-full"
                />
              </UFormField>
            </UForm>
          </div>

          <!-- Notificações -->
          <div v-if="activeTab === 'notifications'" class="max-w-2xl">
            <h2
              class="text-lg font-semibold text-gray-900 dark:text-white mb-1"
            >
              Notificações
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Configure suas preferências de notificação
            </p>

            <div class="space-y-4">
              <div class="flex items-center justify-between py-3">
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    Email de marketing
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    Receba emails sobre novidades e promoções
                  </p>
                </div>
                <UToggle v-model="notifications.marketing" />
              </div>

              <div class="flex items-center justify-between py-3">
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    Notificações de segurança
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    Alertas sobre atividades na sua conta
                  </p>
                </div>
                <UToggle v-model="notifications.security" />
              </div>
            </div>
          </div>

          <!-- Segurança -->
          <div v-if="activeTab === 'security'" class="max-w-2xl">
            <h2
              class="text-lg font-semibold text-gray-900 dark:text-white mb-1"
            >
              Segurança
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Gerencie as configurações de segurança da sua conta
            </p>

            <div class="space-y-4">
              <div
                class="border border-gray-200 dark:border-gray-800 rounded-lg p-4"
              >
                <div class="flex items-start gap-3">
                  <UIcon
                    name="i-lucide-smartphone"
                    class="w-5 h-5 text-gray-700 dark:text-gray-300 mt-0.5"
                  />
                  <div class="flex-1">
                    <p
                      class="text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Autenticação de dois fatores
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Adicione uma camada extra de segurança à sua conta
                    </p>
                    <UButton
                      label="Configurar"
                      variant="soft"
                      size="xs"
                      class="mt-3"
                    />
                  </div>
                </div>
              </div>

              <div
                class="border border-gray-200 dark:border-gray-800 rounded-lg p-4"
              >
                <div class="flex items-start gap-3">
                  <UIcon
                    name="i-lucide-monitor"
                    class="w-5 h-5 text-gray-700 dark:text-gray-300 mt-0.5"
                  />
                  <div class="flex-1">
                    <p
                      class="text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Sessões ativas
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Gerencie os dispositivos conectados à sua conta
                    </p>
                    <UButton
                      label="Ver sessões"
                      variant="soft"
                      size="xs"
                      class="mt-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useModalStore } from '../../../composables/useModalStore';

const { modals } = useModalStore();

const activeTab = ref('account');

const state = reactive({
  name: 'Thiago Ferreira',
  username: 'thiago.f',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  avatar: 'https://rocketchat.lohr.com.br/avatar/thiago.f',
});

const notifications = reactive({
  marketing: false,
  security: true,
});

const items = [
  {
    label: 'Meu Perfil',
    icon: 'i-lucide-user',
    slot: 'account' as const,
  },
  {
    label: 'Notificações',
    icon: 'i-lucide-bell',
    slot: 'notifications' as const,
  },
  {
    label: 'Membros',
    icon: 'i-lucide-users',
    slot: 'security' as const,
  },
];
</script>
