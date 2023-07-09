import User from "@/models/User";
import type { UserType, CreationParams, UserParams, PasswordChangeParams } from "@/types/UserType";
import { ref, type Ref } from "vue";
import { defineStore } from "pinia"
import { computed } from "vue";

const useUserStore = defineStore("user", () => {
    // state
    const users: Ref<UserType[]> = ref([]);
    const user: Ref<UserType> = ref({});
    // getters
    const getUsers = computed(() => users);
    const getUser = computed(() => user);

    //Get User
    const fetchUsers = async () => {
        const { data } = await new User().list();
        setUsers(data);
    };
    const fetchWithUsers = async () => {
        const { data } = await new User().listUser();
        setUsers(data);
    };
    //add
    const addUser = async (user: CreationParams) => {
        const { data } = await new User().create(user);
        users.value.push(data);
    }
    //
    const fetchByEmail = async (email: String) => {
        const { data } = await new User().findByEmail(email);
        setUser(data);
    }
    //Find by key
    const fetchByKey = async (key: String) => {
        const { data } = await new User().findByKey(key);
        setUsers(data);
    }
    //update
    const updateUser = async (id: number, user: UserParams) => {
        await new User().update(id, user);
        setUser({});
        fetchUsers();
    };
    //ChangePass
    const changePass = async (id: number, password: PasswordChangeParams) => {
        await new User().changePass(id, password);
        setUser({});
    };
    //Delete
    const deleteUser = async (id: number) => {
        await new User().delete(id);
        setUser({});
        fetchUsers();
    };
    //Search Users



    const setUser = (newUser: UserType) =>
        (user.value = newUser);

    const setUsers = (newUsers: UserType[]) =>
        (users.value = newUsers);

    return {
        getUsers,
        getUser,
        addUser,
        fetchUsers,
        updateUser,
        deleteUser,
        fetchWithUsers,
        fetchByKey,
        fetchByEmail,
        changePass
    }
});

export default useUserStore;
