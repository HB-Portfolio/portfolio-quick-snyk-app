<template>
  <div class="min-h-dvh flex flex-col font-mono items-center justify-start text-center m-8">
    <h1 class="flex justify-center text-center text-4xl font-bold bg-emerald-500 text-gray-900 p-4 mb-8 mt-8 rounded">
      Scanning
      Dashboard</h1>
    <p class="mx-auto max-w-4xl rounded p-2 mb-8 text-white text-md sm:text-lg">
      <a href="/about-page" class="text-emerald-500">Quick-Snyk</a> utilizes the Snyk Command Line Interface (CLI) to
      scan
      public GitHub repositories for security
      vulnerabilities. Enter the URL of a public GitHub repo and <a href="/about-page"
        class="text-emerald-500">Quick-Snyk</a> will examine its dependencies against Snyk's
      database of known vulnerabilities. The scan results will provide an overview of the security issues found, along
      with their severity levels. This tool is designed to be a first step in securing your open-source projects by
      identifying weaknesses without any installation required.
    </p>
    <form @submit.prevent="scanRepository" class="flex flex-col">
      <input type="text"
        class="text-center border-emerald-500 border-2 mb-4 h-10 sm:max-w-96 sm:w-screen w-96 mx-8 text-sm sm:text-md"
        v-model="repoUrl" required placeholder="Enter a Public Github Repository URL" />
      <button type="submit"
        class="flex flex-col font-mono text-sm mx-auto my-4 justify-center py-2 px-4 border border-transparent shadow-sm rounded-md text-gray-900 bg-emerald-500 sm:hover:scale-110 transition duration-150 ease-in sm:hover:bg-emerald-300">Scan
        Repository</button>
    </form>
    <div class="flex flex-row justify-center items-center text-center mt-4">
      <div v-if="loading" role="status"> <svg aria-hidden="true"
          class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-emerald-500" viewBox="0 0 100 101"
          fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor" />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill" />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
      <div v-else-if="scanResult" class="flex flex-col m-4 mt-0 bg-emerald-500 rounded mx-auto max-w-5xl">
        <h2
          class="flex justify-center text-center text-4xl font-bold text-emerald-500 rounded bg-gray-900 max-w-md mx-auto mt-8 p-4">
          Scan
          Result
        </h2>
        <pre
          class="flex flex-col text-gray-900 mx-auto text-sm sm:text-lg whitespace-pre-wrap p-4 pb-0">{{ scanResult }}</pre>
        <div class="mx-4">
          <a href="/about-page"
            class="flex flex-col font-mono text-base mx-auto max-w-sm justify-center py-2 px-4 mb-14 border border-transparent shadow-sm rounded-md text-white bg-gray-900 sm:hover:scale-105 transition duration-150 ease-in">I
            Have a Vulnerability, Now What?</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const repoUrl = ref('')
const scanResult = ref(null)
const loading = ref(false)
const user = useSupabaseUser();
const router = useRouter();

onMounted(() => {
  if (user.value === null) {
    router.push('/please-login');
  }
});

async function scanRepository() {
  loading.value = true;
  try {
    const response = await fetch('/api/scanRepo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: repoUrl.value })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.text();
    scanResult.value = result;
  } catch (error) {
    console.error('Error scanning repository:', error);
    scanResult.value = `Error: ${error.message}`;
  } finally {
    loading.value = false;
  }
}
</script>