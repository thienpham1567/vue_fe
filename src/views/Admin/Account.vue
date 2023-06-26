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
        <h2 class="account-management__section-title">Tài khoản Admin</h2>
        <DataTable :value="adminAccounts" :paginator="true" :rows="10" :rows-per-page-options="[5, 10, 25]">
          <Column field="accountName" header="Tên tài khoản"></Column>
          <Column field="accountEmail" header="Email"></Column>
          <Column header="Hành động">
            <template #body="rowData">
              <Button class="p-button-sm p-button-secondary" label="Sửa" icon="pi pi-pencil" @click="editAccount(rowData.data)"></Button>
              <Button class="p-button-sm p-button-danger" label="Xóa" icon="pi pi-trash" @click="deleteAccount(rowData.data)"></Button>
            </template>
          </Column>
        </DataTable>
      </div>
  
      <div class="account-management__user-accounts">
        <h2 class="account-management__section-title">Tài khoản Người dùng</h2>
        <DataTable :value="userAccounts" :paginator="true" :rows="10" :rows-per-page-options="[5, 10, 25]">
          <Column field="accountName" header="Tên tài khoản"></Column>
          <Column field="accountEmail" header="Email"></Column>
          <Column header="Hành động">
            <template #body="rowData">
              <Button class="p-button-sm p-button-secondary" label="Sửa" icon="pi pi-pencil" @click="editAccount(rowData)"></Button>
              <Button class="p-button-sm p-button-danger" label="Xóa" icon="pi pi-trash" @click="deleteAccount(rowData)"></Button>
            </template>
          </Column>
        </DataTable>
      </div>
  
      <Dialog v-model="dialogVisible" :visible="dialogVisible" :header="dialogHeader" class="account-management__dialog">
        <div class="p-fluid">
          <div class="p-field">
            <label for="accountName">Tên tài khoản</label>
            <InputText id="accountName" v-model="currentAccount.accountName"></InputText>
          </div>
          <div class="p-field">
            <label for="accountEmail">Email</label>
            <InputText id="accountEmail" v-model="currentAccount.accountEmail"></InputText>
          </div>
        </div>
  
        <template #footer>
          <div class="account-management__dialog-buttons">
            <Button class="p-button-success" label="Lưu" @click="saveAccount"></Button>
            <Button class="p-button-danger" label="Hủy" @click="cancelEdit"></Button>
          </div>
        </template>
      </Dialog>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
//   import { DataTable, Column } from 'primevue/datatable';
import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import  Button  from 'primevue/button';
  import  Dialog  from 'primevue/dialog';
  import  InputText from 'primevue/inputtext';
  
  interface Account {
    accountName: string;
    accountEmail: string;
  }
  
  const dialogHeader = ref('');
  const dialogVisible = ref(false);
  const currentAccount = ref<Account>({ accountName: '', accountEmail: '' });
  const adminAccounts = ref<Account[]>([
    { accountName: 'admin1', accountEmail: 'admin1@example.com' },
    { accountName: 'admin2', accountEmail: 'admin2@example.com' },
  ]);
  const userAccounts = ref<Account[]>([
    { accountName: 'user1', accountEmail: 'user1@example.com' },
    { accountName: 'user2', accountEmail: 'user2@example.com' },
  ]);
  const userCount = ref(userAccounts.value.length);
  const guestCount = ref(10); // Số lượng khách vãng lai (mẫu)
  
  function editAccount(account: Account) {
    currentAccount.value = { ...account };
    dialogVisible.value = true;
    dialogHeader.value = 'Sửa tài khoản';
  }
  
  function deleteAccount(account: Account) {
    // Xóa tài khoản
    // ...
    // Sau khi xóa thành công, cập nhật danh sách tài khoản
    adminAccounts.value = adminAccounts.value.filter((a) => a !== account);
    userAccounts.value = userAccounts.value.filter((a) => a !== account);
    userCount.value = userAccounts.value.length;
  }
  
  function saveAccount() {
    // Lưu tài khoản
    // ...
    if (currentAccount.value.accountName && currentAccount.value.accountEmail) {
      if (dialogHeader.value === 'Sửa tài khoản') {
        // Thực hiện cập nhật tài khoản
        // ...
      } else {
        // Thực hiện thêm tài khoản mới
        // ...
      }
      cancelEdit();
    }
  }
  
  function cancelEdit() {
    currentAccount.value = { accountName: '', accountEmail: '' };
    dialogVisible.value = false;
  }
  
  onMounted(() => {
    userCount.value = userAccounts.value.length;
  });
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
    width: 400px;
  }
  
  .account-management__dialog-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  </style>
  