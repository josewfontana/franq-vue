<template>
  <div class="min-h-screen flex items-center justify-center bg-cyan-700 px-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">Create an account</h2>

      <form @submit.prevent="handleSignUp" class="space-y-4">
        <div>
          <label for="name" class="block text-gray-700 mb-1">Name:</label>
          <input
            v-model="name"
            type="text"
            id="name"
            placeholder="Enter your name"
            required
            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label for="email" class="block text-gray-700 mb-1">Email:</label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label for="password" class="block text-gray-700 mb-1">Password:</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Create a password"
            required
            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-cyan-700 text-white font-semibold py-2 rounded hover:bg-cyan-800 transition"
        >
          Sign Up
        </button>
      </form>

      <div class="mt-6 text-center text-sm text-gray-600">
        Already have an account?
        <a href="/" class="text-cyan-700 hover:underline">Login</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { register } from '@/services/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')

const handleSignUp = () => {
  if (register(name.value, email.value, password.value)) {
    router.push('/dashboard')
  } else {
    alert('User already registered')
  }
}
</script>
