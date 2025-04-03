<template>
  <div class="min-h-screen bg-gray-100 p-4 sm:p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white rounded-lg shadow p-4 sm:p-6 mb-6 gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Welcome, {{ user?.name || 'User' }}!</h1>
          <p class="text-gray-600 text-sm">You're now logged into your dashboard.</p>
        </div>
        <button
          @click="logout"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition w-full sm:w-auto"
        >
          Logout
        </button>
      </div>

      <!-- Content -->
      <div v-if="isLoading" class="flex items-center justify-center py-12">
        <svg
          class="animate-spin h-8 w-8 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      </div>

      <div v-else class="w-full overflow-x-auto">
        <p class="text-base text-blue-700 mb-4">
          Base currency: <span class="font-bold">{{ moneySource }}</span>
        </p>

        <div class="bg-white rounded-lg shadow p-4 sm:p-6 min-w-[600px]">
          <ResponsiveTable
            :headers="tableHeaders"
            :data="tableData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ResponsiveTable from '@/components/ResponsiveTable.vue';
import { getCurrentUser } from '@/services/auth';
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { fetchRates } from '@/services/rates';
import { CurrencyQuote } from '@/models/rates';

const router = useRouter()
const user = ref<{ name: string; email: string } | null>(null)
const isLoading = ref(true)
const tableHeaders = ref<string[]>([])
const tableData = ref([])
const moneySource = ref('')

const getData = async () => {
  try {
    const data = await fetchRates()
    const currencies = data.results.currencies
    moneySource.value = currencies.source

    const entries = Object.entries(currencies).filter(([key]) => key !== 'source')

    if (entries.length > 0) {
      const [, firstCurrency] = entries[0]
      tableHeaders.value = ['Code', ...Object.keys(firstCurrency)]

      tableData.value = entries.map(([code, currency]) => ({
        Code: code,
        ...(currency as CurrencyQuote)
      }))
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    isLoading.value = false
  }
}

const logout = () => {
  localStorage.removeItem('user')
  router.push('/')
}

onMounted(async () => {
  user.value = getCurrentUser()
  if (!user.value) {
    router.push('/')
  }

  await getData()
})
</script>
