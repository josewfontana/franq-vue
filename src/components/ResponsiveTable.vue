<template>
  <div class="w-full">
    <div class="hidden md:grid w-full border-t border-gray-300 text-sm text-gray-800">
      <div
        class="grid bg-gray-100 font-semibold border-b border-gray-300"
        :style="{ gridTemplateColumns: `repeat(${columns}, minmax(120px, 1fr))` }"
      >
        <div
          v-for="(header, i) in headers"
          :key="'header-' + i"
          class="p-3 text-left border-r last:border-r-0"
        >
          {{ header }}
        </div>
      </div>

      <div
        v-for="(row, rowIndex) in props.data"
        :key="'row-' + rowIndex"
        class="grid border-b border-gray-200"
        :style="{ gridTemplateColumns: `repeat(${columns}, minmax(120px, 1fr))` }"
      >
        <div
          v-for="(header, colIndex) in props.headers"
          :key="`cell-${rowIndex}-${colIndex}`"
          class="p-3 border-r last:border-r-0 flex items-center gap-1"
        >
          <span
            :class="{
              'text-green-500': checkNumber(row[header]) === 'isPositive' && header.toLowerCase() === 'variation',
              'text-red-500': checkNumber(row[header]) === 'isNegative' && header.toLowerCase() === 'variation'
            }"
            class="flex items-center gap-1"
          >
            {{ formatNumber(row[header]) }}
            <span v-if="header.toLowerCase() === 'variation'" class="flex gap-4">
              {{ checkNumber(row[header]) === 'isPositive' ? '📈' : '📉' }}
              <GraphDetails
                :buy="row['buy']"
                :sell="row['sell']"
                :variation="row['variation']"
              />
            </span>
          </span>
        </div>
      </div>
    </div>

    <div class="md:hidden flex flex-col gap-4">
      <div
        v-for="(row, rowIndex) in props.data"
        :key="'mobile-row-' + rowIndex"
        class="bg-white rounded border border-gray-300 shadow-sm p-4"
      >
        <div
          v-for="(header, i) in props.headers"
          :key="`mobile-cell-${rowIndex}-${i}`"
          class="flex justify-between py-1 border-b last:border-b-0"
        >
          <span class="font-medium text-gray-600">{{ header }}</span>
          <span class="text-gray-800 flex items-center gap-1">
            <span
              :class="{
                'text-green-500': checkNumber(row[header]) === 'isPositive' && header.toLowerCase() === 'variation',
                'text-red-500': checkNumber(row[header]) === 'isNegative' && header.toLowerCase() === 'variation'
              }"
              class="flex items-center gap-1"
            >
              {{ formatNumber(row[header]) }}
              <span v-if="header.toLowerCase() === 'variation'" class="flex gap-4">
                {{ checkNumber(row[header]) === 'isPositive' ? '📈' : '📉' }}
                <GraphDetails
                  :buy="row['buy']"
                  :sell="row['sell']"
                  :variation="row['variation']"
                />
              </span>
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import GraphDetails from '@/components/GraphDetails.vue'

interface CurrencyRow {
  name: string;
  buy: number | null;
  sell: number | null;
  variation: number;
  [key: string]: string | number | null;
}

const props = defineProps<{
  headers: string[]
  data: CurrencyRow[]
}>()

const checkNumber = (variation: string | number | null): 'isNegative' | 'isPositive' | 'invalid' => {
  if (variation === null) return 'invalid'
  const value = typeof variation === 'string' ? parseFloat(variation) : variation
  if (isNaN(value)) return 'invalid'
  return value < 0 ? 'isNegative' : 'isPositive'
}


const formatNumber = (value: string | number | null): string => {
  if (value === null) return '—'

  const number = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(number)) return value as string

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(number)
}

const columns = computed(() => props.headers.length)
</script>
