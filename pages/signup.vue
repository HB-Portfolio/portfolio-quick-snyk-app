<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = useSupabaseUser();
const client = useSupabaseClient();
const email = ref('');
const password = ref('');
const username = ref('');
const errorMessage = ref('');

onMounted(() => {
    if (user.value) {
        router.push('/user-profile');
    }
});

async function signUp() {
    try {
        const { error } = await client.auth.signUp({
            email: email.value,
            password: password.value,
            options: {
                data: {
                    username: username.value,
                },
            },
        });

        if (error) {
            throw error;
        }

        router.push('/signup-confirm');
    } catch (error) {
        errorMessage.value = error.message;
    }
}
</script>

<template>
    <div class="flex flex-col justify-center mx-auto px-4 py-8 mt-4 max-w-xl min-h-screen font-mono">
        <div class="bg-emerald-500 shadow-md rounded px-4 pt-6 pb-6 mb-4">
            <img src="/public/images/logo.svg" alt="logo" class="mx-auto max-w-44 mb-6 mt-2">
            <form @submit.prevent="signIn" class="bg-gray-900 p-8 rounded">
                <h1 class="text-center font-mono text-white mb-8 mt-2 text-2xl">Sign Up</h1>
                <div class="mb-6">
                    <label class="block text-white text-sm font-mono mb-2" for="username">Create Your
                        Username:</label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                        type="username" id="username" name="username" required v-model="username">
                </div>

                <div class="mb-6">
                    <label class="block text-white text-sm font-mono mb-2" for="email">Enter Your Email
                        Address:</label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                        type="email" id="email" name="email" required v-model="email">
                </div>

                <div class="mb-8">
                    <label class="block text-white text-sm font-mono mb-2" for="password">Set a New Password:</label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
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
                        @click="signUp">Sign Up</button>
                </div>
            </form>
            <div>
                <h2 class="text-center font-mono text-lg mt-8 mb-2 text-white">Privacy Notice for Sign-Up</h2>
                <p class="text-center px-6 font-mono text-sm mb-4">
                    Please note that the username and email address you provide will be stored in our system to create
                    and manage your account. Your password will be encrypted, and we will not have access to it. By
                    proceeding, you agree to this use of your information.
                </p>
            </div>
        </div>
    </div>
</template>
