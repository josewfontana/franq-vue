<template>
  <div class="min-h-screen flex items-center justify-center bg-cyan-700 px-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-gray-700 mb-1">Email:</label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Enter email"
            required
            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label for="password" class="block text-gray-700 mb-1">Password:</label>
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            placeholder="Enter password"
            required
            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div class="flex items-center">
          <input type="checkbox" id="showPassword" v-model="showPassword" class="mr-2" />
          <label for="showPassword" class="text-sm text-gray-700">Show Password</label>
        </div>

        <button
          type="submit"
          class="w-full bg-cyan-700 text-white font-semibold py-2 rounded hover:bg-cyan-800 transition"
        >
          SIGN IN
        </button>

        <div v-if="errorMessage" class="mt-2 text-sm text-red-600 text-center">
          {{ errorMessage }}
        </div>
      </form>

      <div class="mt-6 text-center text-sm text-gray-600 space-y-1">
        <p>
          Don't have an account?
          <a href="/signup" class="text-cyan-700 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { login } from '@/services/auth'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')

const handleLogin = () => {
  const success = login(email.value, password.value)

  if (success) {
    router.push('/dashboard')
  } else {
    errorMessage.value = `User doesn't exist or password is incorrect. Please sign up.`
  }
}

onMounted(() => {
  const user = localStorage.getItem('user')
  if (user) {
    router.push('/dashboard')
  }
})
</script>
