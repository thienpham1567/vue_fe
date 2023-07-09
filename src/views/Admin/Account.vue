<template>
  <div class="account-management">
    <h1 class="account-management__title">Quản lý tài khoản</h1>

    <div class="account-management__stats">
      <div class="account-management__stat">
        <div class="account-management__stat-value">{{ userCount }}</div>
        <div class="account-management__stat-label">Người dùng</div>
      </div>
      <div class="account-management__stat">
        <div class="account-management__stat-value">{{ guestCount }}</div>
        <div class="account-management__stat-label">Khách vãng lai</div>
      </div>
    </div>

    <div class="account-management__admin-accounts">
      <h2 class="account-management__section-title">Quản lý tài khoản </h2>
      <div class="card flex justify-content-center">
        <input type="text" v-model="searchEmail" placeholder="Tìm kiếm email" class="md:w-20rem w-full h-10"
          @input="searchByEmail" />

      </div>
      <DataTable :value="users" :paginator="true" :rows="5" :rows-per-page-options="[5, 10, 25]" :key="tableKey">
        <Column field="userId" header="ID"></Column>
        <Column field="emailAddress" header="Email"></Column>
        <Column field="lastName" header="Họ"></Column>
        <Column field="firstName" header="Tên"></Column>
        <Column field="phoneNumber" header="Số điện thoại"></Column>
        <Column header="Hành động">
          <template #body="rowData">
            <Button class="p-button-sm p-button-secondary" label="Sửa" icon="pi pi-pencil"
              @click="showEditDialog(rowData.data)"></Button>
            <Button class="p-button-sm p-button-danger" label="Xóa" icon="pi pi-trash"
              @click="showDeleteDialog(rowData.data)"></Button>
          </template>
        </Column>
      </DataTable>
    </div>



    <div class="account-management__admin-accounts">
      <h2 class="account-management__section-title">Phân Quyền</h2>
      <div class="card flex justify-content-center">
        <Dropdown v-model="selectedRole" @update:model-value="onSelectRole" editable :options="roles" optionLabel="code"
          placeholder="Select a City" class="w-full md:w-14rem" />
      </div>
      <DataTable :value="userRoles" :paginator="true" :rows="5" :rows-per-page-options="[5, 10, 25]" :key="tableKey">

        <Column field="user.userId" header="ID User"></Column>
        <Column field="user.emailAddress" header="Email"></Column>
        <Column field="roleId" header="User">
          <template #body="rowData">
            <RadioButton v-model="rowData.data.roleId" :value="1" @click="dataUserRole(rowData.data, 1)" />
          </template>
        </Column>
        <Column field="roleId" header="Stall">
          <template #body="rowData">
            <RadioButton v-model="rowData.data.roleId" :value="2" @click="dataUserRole(rowData.data, 2)" />
          </template>
        </Column>
        <Column field="roleId" header="Admin">
          <template #body="rowData">
            <RadioButton v-model="rowData.data.roleId" :value="3" @click="dataUserRole(rowData.data, 3)" />
          </template>
        </Column>

      </DataTable>
    </div>

    <Dialog v-model="dialogVisible" :visible="dialogVisible" :header="dialogHeader"
      class="account-management__dialog w-1/2">
      <template #header>
        <div class="category-list__dialog-buttons">
          <h3>Sửa người dùng</h3>
        </div>
      </template>
      <div class="p-fluid">
        <div class="p-field">
          <label for="userId">ID</label>
          <InputText id="userId" v-model="currentUser.userId" readonly></InputText>
        </div>
        <div class="p-field">
          <label for="emailAddress">Email</label>
          <InputText id="emailAddress" v-model="currentUser.emailAddress" readonly></InputText>
        </div>
        <div class="p-field">
          <label for="phoneNumber">Số điện thoại</label>
          <InputText id="phoneNumber" v-model="currentUser.phoneNumber"></InputText>
        </div>
        <div class="p-field">
          <label for="lastName">Họ</label>
          <InputText id="lastName" v-model="currentUser.lastName"></InputText>
        </div>
        <div class="p-field">
          <label for="firstName">Tên</label>
          <InputText id="fistName" v-model="currentUser.firstName"></InputText>
        </div>
        <div class="p-field">
          <label for="password">Password</label>
          <InputText id="password" v-model="currentUser.password" type="password" readonly></InputText>
        </div>
      </div>

      <template #footer>
        <div class="account-management__dialog-buttons">
          <Button class="p-button-success" label="Lưu" @click="saveUser"></Button>
          <Button class="p-button-danger" label="Hủy" @click="cancelEdit"></Button>
        </div>
      </template>
    </Dialog>
    <!-- Delete -->
    <Dialog v-model="deleteDialogVisible" :visible="deleteDialogVisible" header="Xác nhận xóa" :closable="false"
      class="category-list__dialog">
      <p>Bạn có chắc chắn muốn xóa User này?</p>

      <template #footer>
        <div class="category-list__dialog-buttons">
          <Button class="p-button-danger" label="Xóa" @click="deleteUser"></Button>
          <Button class="p-button-secondary" label="Hủy" @click="cancelDelete"></Button>
        </div>
      </template>
    </Dialog>
  </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Dropdown from 'primevue/dropdown';
import TreeSelect from 'primevue/treeselect';
// import { DataTable, Column } from 'primevue/datatable';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import useUserStore from '@/store/UserStore';
import useUserRoleStore from '@/store/UserRoleStore';
import useRoleStore from '@/store/RoleStore';
import { UserType, UserParams, CreationParams } from '@/types/user';
import { UserRoleType, UpdateUserRoleParams } from '@/types/userrole';
import { RoleType } from '@/types/role';
import RadioButton from 'primevue/radiobutton';

const deleteDialogVisible = ref(false);
const userStore = useUserStore();
const userRoleStore = useUserRoleStore();
const roleStore = useRoleStore();
const dialogHeader = ref('');
const dialogVisible = ref(false);
const tableKey = ref(0);

const users = ref<UserType[]>([]);
const currentUser = ref<UserType>({});

const userRoles = ref<UserRoleType[]>([]);
const currentUserRole = ref<UserRoleType>({});

const roles = ref<RoleType[]>([]);
const currentRole = ref<RoleType>({});

const selectedRole = ref();

const onSelectRole = () => {
  userRoles.value = userRoles.value.filter((role) => role.role?.code === selectedRole.value.code);
}

onMounted(async () => {
  if (searchEmail.value === '') {
    try {
      await userStore.fetchUsers();
      users.value = userStore.getUsers.value;

    } catch (error) {

    }
  } else {
    await userStore.fetchByKey(searchEmail.value);

    users.value = userStore.getUsers.value;
    console.log(users.value);
    tableKey.value++;
  };



  try {
    await userRoleStore.fetchUserRoles();
    userRoles.value = userRoleStore.getUserRoles.value;
  } catch (error) {

  };
  try {
    await roleStore.fetchRoles();
    roles.value = roleStore.getRoles.value;
  } catch (error) {

  }

});
//search
const searchEmail = ref('');


const searchByEmail = async () => {

  if (searchEmail.value === '') {
    try {
      await userStore.fetchUsers();
      users.value = userStore.getUsers.value;

    } catch (error) {

    }
  } else {
    await userStore.fetchByKey(searchEmail.value);

    users.value = userStore.getUsers.value;
    console.log(users.value);
    tableKey.value++;
  }
};






const dataUserRole = async (updateUserRole: UserRoleType, newRoleId: number) => {

  currentUserRole.value = { ...updateUserRole, roleId: newRoleId };
  const roleId = currentUserRole.value.role?.roleId;
  console.log(currentUserRole.value.user?.userId);
  console.log(roleId);
  console.log(currentUserRole.value);
  console.log("UserRoleID   " + JSON.stringify(currentUserRole.value));
  const newUserRole: UpdateUserRoleParams = {
    userRoleId: currentUserRole.value.userRoleId,
    userId: currentUserRole.value.user?.userId,
    user: currentUserRole.value.user!,
    roleId: currentUserRole.value.roleId!,
    role: currentUserRole.value.role!
  }

  saveUserRole(newUserRole, currentUserRole.value.userRoleId);
};


//Update user role
const saveUserRole = async (newUserRole: UpdateUserRoleParams, newUserRoleId: number) => {
  await userRoleStore.updateUserRole(newUserRoleId, newUserRole);
  await userRoleStore.fetchUserRoles();
  userRoles.value = userRoleStore.getUserRoles.value;
  console.log("save tc")
  currentUserRole.value = {};
  dialogVisible.value = false;
}


// show edit
const showEditDialog = (user: UserType) => {
  currentUser.value = { ...user };
  dialogVisible.value = true;

};


// show delete
const showDeleteDialog = (user: UserType) => {
  currentUser.value = { ...user };

  deleteDialogVisible.value = true;
};

// update user
const saveUser = async () => {
  // Thực hiện cập nhật danh mục
  try {
    await userStore.updateUser(currentUser.value.userId, currentUser.value as UserParams);
    await userStore.fetchUsers();
    users.value = userStore.getUsers.value;
    tableKey.value += 1; // Force DataTable re-render
  } catch (error) {
    console.error('Error updating user:', error);
    // Xử lý lỗi
  }
  currentUser.value = {};
  dialogVisible.value = false;
  await userStore.fetchUsers();
}

//Delete User
const deleteUser = async () => {
  try {
    await userStore.deleteUser(currentUser.value.userId);
    await userStore.fetchUsers();
    users.value = userStore.getUsers.value;
    tableKey.value += 1; // Force DataTable re-render
  } catch (error) {
    console.error('Error deleting category:', error);
    // Xử lý lỗi
  }

  currentUser.value = {};
  deleteDialogVisible.value = false;
  await userStore.fetchUsers();
};

function cancelDelete() {
  deleteDialogVisible.value = false;
}
function cancelEdit() {
  dialogVisible.value = false;
}




</script>
  
<style scoped>
.account-management {
  padding: 20px;
}

.account-management__title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.account-management__stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.account-management__stat {
  text-align: center;
}

.account-management__stat-value {
  font-size: 20px;
  font-weight: bold;
}

.account-management__stat-label {
  font-size: 14px;
  color: gray;
}

.account-management__admin-accounts,
.account-management__user-accounts {
  margin-bottom: 20px;
}

.account-management__section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.account-management__dialog {
  width: 1000px;
}

.account-management__dialog-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
  