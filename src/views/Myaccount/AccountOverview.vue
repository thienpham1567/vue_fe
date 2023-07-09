<template>
    <div class="flex justify-center items-center h-screen ">
        <div class="w-full h-full flex">
            <TabView v-model:activeIndex="active" class="custom-tabpanel">
                <TabPanel header="My Account">
                    <div class="tabPanel-sub">
                        <h2>Tài khoản của tôi</h2>
                        <div class="form-detail">
                            <div class="form-title">
                                <label for="">{{ currentUser.userId }}</label>
                            </div>
                            <div class="form-title">
                                <label for="">{{ currentUser.emailAddress }}</label>
                            </div>
                            <div class="form-title">
                                <label for="">{{ currentUser.firstName }}</label>
                            </div>
                            <div class="form-title">
                                <label for="">{{ currentUser.lastName }}</label>
                            </div>
                            <div class="form-title">
                                <label for="">{{ currentUser.phoneNumber }}</label>
                            </div>

                            <Button label="Sửa" @click="visible = true" />
                            <Button label="Đổi mật khẩu" @click="visiblePass = true" />
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="Order">
                    <div class="tabPanel-sub">
                        <h2>My Account</h2>
                    </div>
                </TabPanel>
                <TabPanel header="Header III">
                    <div class="tabPanel-sub">
                        <h2>My Account</h2>
                    </div>
                </TabPanel>
            </TabView>
        </div>


        <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50vw' }">
            <div class="form">
                <span class="p-float-label">
                    <InputText id="userId" v-model="currentUser.userId" readonly />

                </span>
                <span class="p-float-label">
                    <InputText id="email" v-model="currentUser.emailAddress" readonly />

                </span>
                <span class="p-float-label">
                    <InputText id="lastname" v-model="currentUser.lastName" />

                </span>
                <span class="p-float-label">
                    <InputText id="firstname" v-model="currentUser.firstName" />

                </span>
                <span class="p-float-label">
                    <InputText id="username" v-model="currentUser.phoneNumber" />

                </span>

            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" @click="visible = false" text />
                <Button label="Lưu" icon="pi pi-check" @click="saveUser" autofocus />
            </template>
        </Dialog>
        <Dialog v-model:visible="visiblePass" modal header="Header" :style="{ width: '50vw' }">
            <div class="form">
                <span class="p-float-label">
                    <InputText type="password" id="oldPassword" v-model="oldPasswordValue" placeholder="Mật khẩu củ" />
                </span>
                <span class="p-float-label">
                    <InputText type="password" id="newPassword1" v-model="newPasswordValue1" placeholder="Mật khẩu mới" />
                </span>
                <span class="p-float-label">
                    <InputText type="password" id="newPassword" v-model="newPasswordValue" placeholder="Mật khẩu mới" />
                </span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" @click="visiblePass = false" text />
                <Button label="Lưu" icon="pi pi-check" @click="updatePass" autofocus />
            </template>
        </Dialog>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import useUserStore from '@/store/UserStore';
import { UserType, UserParams, CreationParams, PasswordChangeParams } from '@/types/user';
import jwt_decode from "jwt-decode";

const visiblePass = ref(false);
const visible = ref(false);
const active = ref(0);
const userStore = useUserStore();
const users = ref<UserType[]>([]);
const currentUser = ref<UserType>({});
const tableKey = ref(0);


const valueToken = localStorage.getItem('token');
const userValue = jwt_decode(valueToken!);
const email = userValue.user.email;

const oldPasswordValue = ref(null);
const newPasswordValue1 = ref(null);
const newPasswordValue = ref(null);

const updatePass = async () => {
    if (newPasswordValue.value === newPasswordValue1.value) {
        const pass: PasswordChangeParams = {
            oldPassword: oldPasswordValue.value!,
            newPassword: newPasswordValue.value!
        };
        await userStore.changePass(currentUser.value.userId, pass);
        currentUser.value = userStore.getUser.value;
        window.location.reload();
        visiblePass.value = false;
    } else {
        console.log("Sai mật khẩu mới")
    };

};

const searchByEmail = async () => {

    await userStore.fetchByEmail(email);

    currentUser.value = userStore.getUser.value;

    tableKey.value++;

};
const showEditDialog = (user: UserType) => {
    currentUser.value = { ...user };
    visible.value = true;

};

onMounted(searchByEmail);
const saveUser = async () => {
    // Thực hiện cập nhật danh mục
    try {
        await userStore.updateUser(currentUser.value.userId, currentUser.value as UserParams);
        await userStore.fetchByEmail(email);
        currentUser.value = userStore.getUser.value;
        tableKey.value++; // Force DataTable re-render
        window.location.reload();
    } catch (error) {
        console.error('Error updating user:', error);
        // Xử lý lỗi
    }
    currentUser.value = {};
    visible.value = false;

}

</script>
<style></style>
  