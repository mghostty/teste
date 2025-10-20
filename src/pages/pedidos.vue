<template>
  <UMain>
    <UDashboardPanel id="pedidos" class="flex flex-col">
      <template #body>
        <Transition name="fade-left">
          <div v-if="showContent" class="flex flex-col">
            <UPageHeader
              title="Pedidos"
              description="Gerencie e acompanhe os pedidos LOHR"
              class="mb-1"
            />

            <div class="flex-1 overflow-auto">
              <UTable
                ref="table"
                v-model:column-filters="columnFilters"
                v-model:column-visibility="columnVisibility"
                v-model:pagination="pagination"
                :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }"
                class="shrink-0"
                :data="data ?? []"
                :columns="columns"
                :ui="{
                  base: 'table-fixed border-separate border-spacing-0',
                  thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
                  tbody: '[&>tr]:last:[&>td]:border-b-0',
                  th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
                  td: 'border-b border-default'
                }"
              >
              </UTable>
            </div>
          </div>
        </Transition>
      </template>
      <template #footer>
        <Transition name="fade-left">
          <div class="flex items-center justify-between gap-3 border-t border-default p-5">
            <div class="text-sm text-muted flex items-center gap-2">
              <p>Por página:</p>
              <USelect
                v-model="pagination.pageSize"
                :items="[5, 10, 12, 20, 50]"
              />
            </div>

            <div class="flex items-center gap-3">
              <UPagination
                :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
                :items-per-page="table?.tableApi?.getState().pagination.pageSize"
                :total="table?.tableApi?.getFilteredRowModel().rows.length"
                @update:page="(p: number) => table?.tableApi?.setPageIndex(p - 1)"
              />
            </div>
          </div>
        </Transition>
      </template>
    </UDashboardPanel>
  </UMain>
</template>

<script setup lang="ts">
import { useTemplateRef, h, ref, watch, resolveComponent, onMounted, computed } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { refDebounced, useFetch } from '@vueuse/core'
import { Column, getPaginationRowModel, type Row } from '@tanstack/table-core'
import type { User } from '../types'
import pedidos from '../mocks/pedidos'

const UAvatar = resolveComponent('UAvatar')
const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')
const UInput = resolveComponent('UInput')
const data = ref<any[]>(pedidos)
const anchor = ref({ x: 0, y: 0 })

const toast = useToast()
const table = useTemplateRef('table')

const columnFilters = ref([{
  id: 'email',
  value: ''
}])

const searchingMap = ref<Record<string, boolean>>({})

const columnFiltersMap = ref<Record<string, string>>({
  id: '',
  email: '',
  status: ''
})

function getHeader(column: Column<any>, label: string, position: 'left' | 'right') {
  const colId = column.id
  const isSearching = computed(() => searchingMap.value[colId])
  const searchValue = ref(columnFiltersMap.value[colId] || '')

  const toggleSearch = () => {
    searchingMap.value[colId] = !searchingMap.value[colId]
    console.log('search', colId, searchingMap.value[colId])
    if (!searchingMap.value[colId]) {
      searchValue.value = ''
      columnFiltersMap.value[colId] = ''
      onFilterChange(colId)
    }
  }

  // 🔥 Renderização condicional — mostra EITHER label OU input
  return h('div', { class: 'gap-2' }, [
    isSearching.value
      ? h(UInput, {
          modelValue: searchValue.value,
          placeholder: `Buscar...`,
          size: 'xs',
          autofocus: true,
          class: 'flex items-center justify-start w-fit',
          onInput: (e: any) => {
            searchValue.value = e.target.value
            columnFiltersMap.value[colId] = searchValue.value
            onFilterChange(colId)
          },
          onBlur: toggleSearch // opcional: fecha ao sair do foco
        })
      : h('div', { class: 'flex items-center justify-start w-full' }, [
          h('span', { class: 'font-medium text-sm truncate' }, label),
          h(UButton, {
            color: 'neutral',
            variant: 'ghost',
            icon: 'i-fa-solid:search',
            size: 'xs',
            class: 'ml-2 cursor-pointer',
            onClick: toggleSearch
          })
        ])
  ])
}


// Aplica o filtro à tabela quando o input muda
function onFilterChange(columnId: string) {
  if (!table?.value?.tableApi) return
  const val = columnFiltersMap.value[columnId] || undefined
  table.value.tableApi.getColumn(columnId)?.setFilterValue(val)
}

const columnVisibility = ref()
const statusFilter = ref('all')

watch(() => statusFilter.value, (newVal) => {
  if (!table?.value?.tableApi) return

  const statusColumn = table.value.tableApi.getColumn('status')
  if (!statusColumn) return

  if (newVal === 'all') {
    statusColumn.setFilterValue(undefined)
  } else {
    statusColumn.setFilterValue(newVal)
  }
})

const pagination = ref({
  pageIndex: 0,
  pageSize: 12
})

const showContent = ref(false)

onMounted(() => {
  showContent.value = true
})

const columns: TableColumn<any>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => getHeader(column, '#', 'right'),
    cell: ({ row }) => `#${row.getValue('id')}`
  },
  {
    accessorKey: 'date',
    header: ({ column }) => getHeader(column, 'Date', 'right'),
    cell: ({ row }) => {
      return new Date(row.getValue('date')).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => getHeader(column, 'Status', 'right'),
    cell: ({ row }) => {
      const color = {
        paid: 'success' as const,
        failed: 'error' as const,
        refunded: 'neutral' as const
      }[row.getValue('status') as string]

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.getValue('status')
      )
    }
  },
  {
    accessorKey: 'email',
    header: ({ column }) => getHeader(column, 'Email', 'right'),
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => getHeader(column, 'Amount', 'right'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    }
  }
]

const reference = computed(() => ({
  getBoundingClientRect: () =>
    ({
      width: 0,
      height: 0,
      left: anchor.value.x,
      right: anchor.value.x,
      top: anchor.value.y,
      bottom: anchor.value.y,
      ...anchor.value
    }) as DOMRect
}))

const open = ref(false)
const openDebounced = refDebounced(open, 10)
const selectedRow = ref<any>(null)

function onHover(_e: Event, row: any) {
  selectedRow.value = row
  open.value = !!row
}

watch(() => pagination.value.pageSize, (newSize) => {
  if (!table?.value?.tableApi) return
  table.value.tableApi.setPageSize(newSize)
})
</script>
