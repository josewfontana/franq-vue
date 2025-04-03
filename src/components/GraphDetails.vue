<template>
  <div>
    <button @click="toggle" class="text-blue-600 hover:text-blue-800 transition">
      See item
    </button>

    <transition name="fade">
      <div
        v-if="show"
        class="fixed inset-0 bg-black bg-opacity-40 z-40"
        @click.self="toggle"
      />
    </transition>

    <transition name="slide">
      <div
        v-if="show"
        class="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-lg z-50 overflow-y-auto p-6 text-sm text-gray-700"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-800">Currency Details</h2>
          <button @click="toggle" class="text-gray-500 hover:text-red-500 text-xl">×</button>
        </div>

        <BarChart :data="chartData" />

        <div class="mt-6 space-y-2">
          <p><span class="font-medium">Buy:</span> {{ formatNumber(props.buy) }}</p>
          <p><span class="font-medium">Sell:</span> {{ formatNumber(props.sell) }}</p>
          <p :class="variationColor">
            <span class="font-medium">Variation:</span> {{ formatVariation(props.variation) }}
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{
  buy: number | null
  sell: number | null
  variation: number
}>()

const show = ref(false)

const toggle = () => {
  show.value = !show.value
}

const formatNumber = (val: number | null): string => {
  if (val === null || isNaN(val)) return '-'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(val)
}

const formatVariation = (val: number): string => {
  return `${val.toFixed(2)}%`
}

const variationColor = computed(() => {
  if (props.variation < 0) return 'text-red-500'
  if (props.variation > 0) return 'text-green-500'
  return ''
})

const chartData = computed(() => ({
  labels: ['Buy', 'Sell', 'Variation %'],
  datasets: [
    {
      label: 'Quote',
      backgroundColor: ['#60a5fa', '#34d399', props.variation >= 0 ? '#10b981' : '#ef4444'],
      data: [
        props.buy ?? 0,
        props.sell ?? 0,
        props.variation ?? 0
      ]
    }
  ]
}))

const BarChart = Bar
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
