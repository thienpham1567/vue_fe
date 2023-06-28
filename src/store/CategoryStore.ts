import Category from "@/models/Category";
import type {
	CategoryType,
	CreationParams,
	UpdateParams,
} from "@/types/category";
import { ref, } from "vue";
import { computed } from "vue";

const useCategoryStore = () => {
	// State
	const categories = ref<CategoryType[]>([]);
	const category = ref<CategoryType>({});

	// Getters
	const getCategories = computed(() => categories);
	const getCategory = computed(() => category);
	const getMainCategories = computed(() =>
		categories.value.filter((category) => category.parentCategory?.name === "")
	);
	const getMainSubCategories = computed(() =>
		categories.value.filter((category) => category.categoryId && category.categoryId >= 4)
	);

	// Action
	const fetchCategories = async () => {
		const { data } = await new Category().list();
		setCategories(data);
	};

	const addCategory = async (category: CreationParams) => {
		const { data } = await new Category().create(category);
		categories.value.push(data);
	};

	const updateCategory = async (id: number, category: UpdateParams) => {
		await new Category().update(id, category);
		setCategory({});
		fetchCategories();
	};

	const deleteCategory = async (id: number) => {
		await new Category().delete(id);
		setCategory({});
		fetchCategories();
	};

	const setCategory = (newCategory: CategoryType) =>
		(category.value = newCategory);

	const setCategories = (newCategories: CategoryType[]) =>
		(categories.value = newCategories);

	return {
		getCategory,
		getCategories,
		getMainCategories,
		getMainSubCategories,
		fetchCategories,
		addCategory,
		updateCategory,
		deleteCategory,
		setCategory,
	};
};

export default useCategoryStore;
