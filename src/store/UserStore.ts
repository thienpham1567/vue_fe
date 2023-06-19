import User from "@/models/User";
import type { UserType, CreationParams } from "@/types/UserType";
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
    //add
    const addUser = async (user: CreationParams) => {
        const { data } = await new User().create(user);
        users.value.push(data);
    }

    return { getUsers, getUser, addUser }
});

export default useUserStore;
