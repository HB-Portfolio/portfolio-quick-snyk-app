<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = useSupabaseUser();
const client = useSupabaseClient();
const email = ref('');
const password = ref('');
const errorMessage = ref('');

onMounted(() => {
  if (user.value) {
    router.push('/user-profile');
  }
});

async function signIn() {
  try {
    const { error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });

    if (error) {
      throw error;
    }

    router.push('/user-profile');
  } catch (error) {
    errorMessage.value = error.message;
  }
}
</script>

<template>
  <div class="flex flex-col justify-start mx-auto px-4 py-8 mt-10 max-w-xl font-mono">
    <div class="bg-emerald-500 shadow-md rounded px-4 pt-6 pb-6 mb-4">
      <img src="/public/images/logo.svg" alt="logo" class="mx-auto max-w-44 mb-6 mt-2">
      <form @submit.prevent="signIn" class="bg-gray-900 p-8 rounded">
        <h1 class="text-center font-mono text-white mb-8 mt-2 text-2xl">Log In</h1>
        <div class="mb-6">
          <label class="block text-white text-sm font-mono mb-2" for="email">Email:</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            type="email" id="email" name="email" required v-model="email">
        </div>

        <div class="mb-6">
          <label class="block text-white text-sm font-mono mb-2" for="password">Password:</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password" id="password" name="password" required v-model="password">
        </div>

        <div v-if="errorMessage"
          class="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-8 rounded relative"
          role="alert">
          <span class="block sm:inline">{{ errorMessage }}</span>
        </div>

        <div class="flex items-center justify-between">
          <button
            class="flex flex-col font-mono text-base mx-auto justify-center py-2 px-4 border border-transparent shadow-lg rounded-md text-gray-900 bg-emerald-500 sm:hover:bg-emerald-300 sm:hover:scale-110 transition duration-150 ease-in"
            @click="signIn">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>
