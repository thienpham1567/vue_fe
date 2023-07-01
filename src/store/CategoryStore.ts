import Category from "@/models/Category";
import type {
	CategoryType,
	CreationParams,
	UpdateParams,
} from "@/types/category";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { computed } from "vue";

const useCategoryStore = defineStore("category", () => {
	// State
	const categories: Ref<CategoryType[]> = ref([]);
	const category: Ref<CategoryType> = ref({});

	// Getters
	const getCategories = computed(() => categories);
	const getCategory = computed(() => category);

	// Action
	const fetchCategories = async () => {
		const { data } = await new Category().list();
		categories.value = data;
	};

	const addCategory = async (category: CreationParams) => {
		const { data } = await new Category().create(category);
		categories.value.push(data);
	};

	const updateCategory = async (id: number, category: UpdateParams) => {
		await new Category().update(id, category);
		category = {};
		fetchCategories();
	};

	const deleteCategory = async (id: number) => {
		await new Category().delete(id);
		setCategory({});
		fetchCategories();
	};

	return {
		getCategory,
		getCategories,
		fetchCategories,
		addCategory,
		updateCategory,
		deleteCategory,
	};
});

export default useCategoryStore;
