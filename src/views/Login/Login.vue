<template>
    <div class="mx-auto flex justify-center">
        <Card style="width: 25rem;">
            <template #title> Sign-In </template>
            <template #content>
                <div class="mb-4">
                    <label for="email">Email</label>
                    <InputText id="email" placeholder="example@gmail.com" class="w-full" />
                </div>
                <div class="mb-4">
                    <label for="password">Password</label>
                    <Password v-model="value" placeholder="Password" :feedback="false" class="w-full w-inherit" />
                </div>
                <a href="">Forgot your password?</a>
            </template>
            <template #footer>
                <Button type="submit" label="Submit" />
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import Password from 'primevue/password';
// import InlineMessage from 'primevue/inlinemessage';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';

import { ref } from 'vue';

const value = ref(null);
</script>
