<template>
  <nav class="flex justify-between items-center p-4 pr-8 pl-8 bg-emerald-500 z-50">
    <a href="/">
      <img src="public/images/logo.svg" alt="Quick-Snyk Logo"
        class="w-16 h-16 sm:hover:scale-110 transition duration-150 ease-in" />
    </a>

    <div @click="openNav" class="sm:hover:scale-125 transition duration-150 ease-in cursor-pointer">
      <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="28.853" height="24" viewBox="0 0 18.853 12">
        <g id="Icon_feather-menu" data-name="Icon feather-menu" transform="translate(-4.5 -8)">
          <path id="Path_3" data-name="Path 3" d="M4.5,18H23.353" transform="translate(0 -4)" fill="none" stroke="#000"
            stroke-linejoin="round" stroke-width="2" />
          <path id="Path_4" data-name="Path 4" d="M4.5,9H23.353" transform="translate(0)" fill="none" stroke="#000"
            stroke-linejoin="round" stroke-width="2" />
          <path id="Path_5" data-name="Path 5" d="M4.5,27H23.353" transform="translate(0 -8)" fill="none" stroke="#000"
            stroke-linejoin="round" stroke-width="2" />
        </g>
      </svg>
    </div>

    <div v-show="sideNavOpen" class="fixed font-mono inset-0 bg-transparent z-10 transition-opacity duration-500"
      :class="{ 'opacity-0 pointer-events-none': !sideNavOpen }">
      <div
        class="fixed top-0 right-0 bg-emerald-500 text-gray-900 h-full flex flex-col justify-center items-center overflow-hidden duration-500 font-bold z-20"
        :class="{ 'translate-x-0': sideNavOpen, 'translate-x-full': !sideNavOpen, 'w-full md:w-3/5': true }">
        <a href="javascript:void(0)" @click="exitNav"
          class="text-4xl absolute top-0 right-0 mr-9 mt-7 sm:hover:scale-125 transition duration-150 ease-in">&times;</a>

        <ul class="text-xl sm:text-2xl mt-2 mr-10 ml-10 text-center">
          <li class="mb-2 text-m text-white">Welcome,</li>
          <li class="mb-8 text-xl bg-gray-900 text-emerald-500 p-4">{{ username }}</li>
          <li class="p-2 sm:hover:scale-110 transition duration-150 ease-in sm:hover:text-white">
            <a href="/">Home</a>
          </li>
          <li class="p-2 sm:hover:scale-110 transition duration-150 ease-in sm:hover:text-white">
            <a href="/about-page">About</a>
          </li>
          <li class="p-2 sm:hover:scale-110 transition duration-150 ease-in sm:hover:text-white">
            <a href="/user-dashboard">Dashboard</a>
          </li>
          <li class="p-2 sm:hover:scale-110 transition duration-150 ease-in sm:hover:text-white">
            <a href="/user-profile">Profile</a>
          </li>
          <ul class="flex flex-row justify-center text-center items-center">
            <li class="p-2 sm:hover:scale-110 transition duration-150 ease-in sm:hover:text-white">
              <a href="/signup">Signup</a>
            </li>
            <li>/</li>
            <li class="p-2 sm:hover:scale-110 transition duration-150 ease-in sm:hover:text-white">
              <a href="/login">Login</a>
            </li>
          </ul>
          <li><button @click="logout" type="button"
              class="flex flex-col font-mono text-base mx-auto mt-8 justify-center py-2 px-4 border border-transparent shadow-lg rounded-md text-gray-900 bg-emerald-300 sm:hover:scale-110 transition duration-150 ease-in">Log
              Out</button></li>
        </ul>
      </div>
    </div>

  </nav>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const sideNavOpen = ref(false);

const openNav = () => {
  sideNavOpen.value = true;
};

const exitNav = () => {
  sideNavOpen.value = false;
};

const user = useSupabaseUser();
const client = useSupabaseClient();
const router = useRouter();
const username = ref('');

watchEffect(() => {
  if (user.value && user.value.user_metadata) {
    username.value = user.value.user_metadata.username;
  } else {
    username.value = "Unauthenticated User";
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

router.afterEach(() => {
  sideNavOpen.value = false;
});

</script>