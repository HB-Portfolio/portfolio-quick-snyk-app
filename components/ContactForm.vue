<template>
    <div class="pb-4">
        <h1 class="flex justify-center text-center text-4xl font-mono text-emerald-500 pt-10">Contact Us</h1>
        <h3 class="flex justify-center text-center text-m text-white pl-8 pr-8 mx-auto mt-2 pb-6">Reach out to us with
            any
            questions or
            feedback using the form below.</h3>
        <form action="https://formspree.io/f/xyyrbrnb" method="POST">
            <div class="flex flex-col mt-0 m-8 max-w-2xl mx-auto pt-4">
                <div class="mb-4 pr-6 pl-6">
                    <label for="name" class="block text-sm font-medium text-emerald-500">Name</label>
                    <input v-model="name" type="text" id="name" name="name" required
                        class="mt-1 block w-full rounded-md shadow-sm sm:text-sm min-h-10"
                        :class="{ 'border-red-500': errors.name }" />
                    <span class="text-red-500 font-bold text-xs" v-if="errors.name">{{ errors.name }}</span>
                </div>

                <div class="mb-4 pr-6 pl-6">
                    <label for="email" class="block text-sm font-medium text-emerald-500">Email</label>
                    <input v-model="email" type="email" id="email" name="email" required
                        class="mt-1 block w-full rounded-md shadow-sm sm:text-sm min-h-10"
                        :class="{ 'border-red-500': errors.email }" />
                    <span class="text-red-500 font-bold text-xs" v-if="errors.email">{{ errors.email }}</span>
                </div>

                <div class="mb-8 pr-6 pl-6">
                    <label for="message" class="block text-sm font-medium text-emerald-500">Your Message</label>
                    <textarea v-model="message" id="message" name="message" required
                        class="mt-1 block w-full rounded-md shadow-sm sm:text-sm min-h-10"
                        :class="{ 'border-red-500': errors.message }"></textarea>
                    <span class="text-red-500 font-bold text-xs" v-if="errors.message">{{ errors.message }}</span>
                </div>

                <button type="submit"
                    class="inline-flex font-mono text-md mx-auto mt-4 justify-center py-2 px-4 border border-transparent shadow-sm rounded-md text-gray-900 bg-emerald-500 sm:hover:scale-110 transition duration-150 ease-in sm:hover:bg-emerald-300">
                    Send Message
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Must be a valid email').required('Email is required'),
    message: yup.string().required('Message is required'),
});

const { handleSubmit, errors } = useForm({
    validationSchema: schema,
});

const { value: name } = useField('name');
const { value: email } = useField('email');
const { value: message } = useField('message');

const onSubmit = handleSubmit((values) => {
    if (Object.keys(errors.value).length === 0) {
        console.log('Form values:', values);
        // You said form didnt have to work soooo :)
    } else {
        console.log('Form has errors:', errors.value);
    }
});
</script>