<template>
    <div class="flex justify-center px-4" @click="router.push('/')">
        <Image :src="Logo" alt="Image" width="150" />
    </div>
    <div class="mx-auto flex justify-center">
        <Card style="width: 33rem;">
            <template #title> Create account </template>
            <template #content>
                <!-- Firt name & Last name -->
                <div class="flex mb-4">
                    <span class="mr-4">
                        <label for="firtname">{{ $t('firstname') }}</label>
                        <InputText v-model="firstNameValue" class="w-full" placeholder="First Name"
                            :class="{ 'is-invalid': firstNameError }" />
                        <span v-if="firstNameError" class="text-red-500">{{ firstNameError }}</span>
                    </span>
                    <span class="">
                        <label for="lastname">{{ $t('lname') }}</label>
                        <InputText v-model="lastNameValue" :class="{ 'is-invalid': lastNameError }" class="w-full"
                            placeholder="Last Name" />
                        <span v-if="lastNameError" class="text-red-500">{{ lastNameError }}</span>
                    </span>
                </div>
                <!-- Phone Number -->
                <div class="mb-4">
                    <label for="phonenumber"> {{ $t('pnum') }}</label>
                    <InputText v-model="phoneNumberValue" :class="{ 'is-invalid': phoneNumberError }" inputId="phonenumber"
                        :useGrouping="false" placeholder="0123456789" class="w-full w-inherit" />
                    <span v-if="phoneNumberError" class="text-red-500">{{ phoneNumberError }}</span>
                </div>
                <!-- Email -->
                <div class="mb-4">
                    <label for="email">Email</label>
                    <InputText id="email" v-model="emailValue" placeholder="example@gmail.com"
                        :class="{ 'is-invalid': emailError }" class="w-full" />
                    <span v-if="emailError" class="text-red-500">{{ emailError }}</span>
                </div>
                <!-- Password -->
                <div class="mb-4">
                    <label for="password">{{ $t('pass') }}</label>
                    <Password v-model="passwordValue" placeholder="Password" :feedback="false"
                        :class="{ 'is-invalid': passwordError }" class="w-full w-inherit" />
                    <span v-if="passwordError" class="text-red-500">{{ passwordError }}</span>
                </div>
                <!-- Re-Password -->
                <div class="mb-4">
                    <label for="re-password">{{ $t('repass') }}</label>
                    <Password v-model="rePasswordValue" :class="{ 'is-invalid': rePasswordError }" placeholder="Re-Password"
                        :feedback="false" class="w-full w-inherit" />
                    <span v-if="rePasswordError" class="text-red-500">{{ rePasswordError }}</span>
                </div>
                <div>
                    <label class="inline-flex items-center">
                        <input type="checkbox" v-model="termsAccepted"
                            class="text-indigo-600 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" />
                        <span class="mx-2 text-sm text-gray-600">{{ $t('term') }}</span>
                    </label>
                    <div>
                        <a class="block text-sm text-indigo-700 fontme hover:underline" href="#">{{ $t('alreadyhave') }}</a>
                    </div>
                    <span v-if="termsError" class="text-red-500">{{ termsError }}</span>
                </div>
                <label v-if="check === true" class="italic text-rose-500">Đăng ký thành công</label>
            </template>
            <template #footer>
                <Button type="submit" :label="$t('create')" @click="validateForm()"
                    class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500" />
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Logo from "@/assets/images/logo.png";
import Image from 'primevue/image';
import { useRouter } from 'vue-router';
import { ref, Ref } from 'vue';
import useUserStore from '@/store/UserStore';
import { CreationParams } from '@/types/user';
import { useLanguageStore } from '@/store/language';
import { translate } from '@/i18n';

const $t = translate;
const languageStore = useLanguageStore();


const router = useRouter();
const firstNameValue = ref(null);
const lastNameValue = ref(null);
const rePasswordValue = ref(null);
const passwordValue = ref(null);
const phoneNumberValue = ref(null);
const emailValue = ref(null);
const termsAccepted = ref(false);

const firstNameError = ref('');
const lastNameError = ref('');
const phoneNumberError = ref('');
const emailError = ref('');
const passwordError = ref('');
const rePasswordError = ref('');
const termsError = ref('');


const { addUser } = useUserStore();


const check = ref(false);

// Kiểm tra các điều kiện bổ sung (ví dụ: định dạng phone)
function validatePhoneNumber() {
    const phoneNumberRegex = /^(0[2-9]|84[2-9])(\d{8})$/;
    if (!phoneNumberValue.value) {
        phoneNumberError.value = 'Phone Number is required.';
    } else if (!phoneNumberRegex.test(phoneNumberValue.value)) {
        phoneNumberError.value = 'Invalid phone number format.';
    } else {
        phoneNumberError.value = '';
    }
}

function validateForm() {
    // Kiểm tra lỗi cho từng trường
    firstNameError.value = firstNameValue.value ? '' : 'First Name is required.';
    lastNameError.value = lastNameValue.value ? '' : 'Last Name is required.';
    emailError.value = emailValue.value ? '' : 'Email is required.';
    passwordError.value = passwordValue.value ? '' : 'Password is required.';
    rePasswordError.value = rePasswordValue.value ? '' : 'Re-Password is required.';
    termsError.value = termsAccepted.value ? '' : 'You must accept the terms and conditions.';

    validatePhoneNumber();

    // Kiểm tra các điều kiện bổ sung (ví dụ: định dạng email)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue.value && !emailRegex.test(emailValue.value)) {
        emailError.value = 'Invalid email format.';
    }

    // Kiểm tra mật khẩu và xác nhận mật khẩu khớp nhau
    if (passwordValue.value && rePasswordValue.value && passwordValue.value !== rePasswordValue.value) {
        passwordError.value = 'Passwords do not match.';
        rePasswordError.value = 'Passwords do not match.';
    }

    // Kiểm tra xem có lỗi không
    if (
        firstNameError.value ||
        lastNameError.value ||
        phoneNumberError.value ||
        emailError.value ||
        passwordError.value ||
        rePasswordError.value ||
        termsError.value
    ) {
        return false;
    }

    const creationParams: CreationParams = {
        firstName: firstNameValue.value!,
        lastName: lastNameValue.value!,
        emailAddress: emailValue.value!,
        phoneNumber: phoneNumberValue.value!,
        password: passwordValue.value!
    };

    addUser(creationParams);

    check.value = true;
    return true;
}


</script>
