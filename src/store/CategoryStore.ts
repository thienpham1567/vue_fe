import { ref, computed } from 'vue';
import Category from '@/models/Category';
import type { CategoryType, CreationParams, UpdateParams } from '@/types/category';
import { defineStore } from 'pinia';

const useCategoryStore = defineStore("category", () => {
	// State
	const categories = ref<CategoryType[]>([]);
	const category = ref<CategoryType>({});

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

	const updateCategory = async (id: number, updatedCategory: UpdateParams) => {
		await new Category().update(id, updatedCategory);
		category.value = {};
		fetchCategories();
	};

	const deleteCategory = async (id: number) => {
		await new Category().delete(id);
		category.value = {};
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
