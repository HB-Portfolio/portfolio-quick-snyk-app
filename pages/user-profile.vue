<script setup>
const user = useSupabaseUser();
const client = useSupabaseClient();
const router = useRouter();
const username = ref('');

onMounted(() => {
  if (user.value === null) {
    router.push('/please-login');
  }
});

async function logout() {
  try {
    const { error } = await client.auth.signOut();

    if (error) {
      throw error;
    }

    else {
      router.push('/login');
    }
  }

  catch (error) {
    console.error(error);
  }
};

const email = () => {
  if (!user.value) {
    return "User not logged in";
  } else {
    return user.value.email;
  }
};

if (user.value && user.value.user_metadata) {
  username.value = user.value.user_metadata.username;
} else {
  username.value = "Username not available";
};
</script>

<template>
  <div class="flex flex-col items-center justify-start text-center mt-10">
    <section class="flex flex-col font-mono bg-emerald-500 p-8 m-8 rounded min-w-96">
      <img src="/public/images/logo.svg" alt="logo" class="mx-auto max-w-44 mb-6 mt-2">
      <h1 class="text-2xl font-bold text-emerald-500 bg-gray-900 p-4 mb-8">User Profile</h1>
      <h2 class="text-xl text-gray-900 mb-2 underline underline-offset-4 font-bold">Your Username:</h2>
      <h3 class="text-xl text-white mb-6">{{ username }}</h3>
      <h2 class="text-xl text-gray-900 mb-2 underline underline-offset-4 font-bold">Your Email:</h2>
      <h3 class="text-xl text-white mb-8">{{ email() }}</h3>
      <div class="flex flex-col gap-4">
        <a href="/user-dashboard"
          class="flex flex-col font-mono text-base mx-auto justify-center py-2 px-4 border border-transparent shadow-lg rounded-md text-emerald-500 bg-gray-900 sm:hover:scale-110 transition duration-150 ease-in">Dashboard</a>
        <button @click="logout" type="button"
          class="flex flex-col font-mono text-base mx-auto justify-center py-2 px-4 border border-transparent shadow-lg rounded-md text-emerald-500 bg-gray-900 sm:hover:scale-110 transition duration-150 ease-in">Log
          Out</button>
      </div>
    </section>
  </div>
</template>