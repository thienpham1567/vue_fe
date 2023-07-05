import { ref, computed, type Ref } from 'vue';
import Category from '@/models/Category';
import type { CategoryType, CreationParams, UpdateParams } from '@/types/category';

const useCategoryStore = () => {
  // State
  const categories: Ref<CategoryType[]> = ref([]);
  const category: Ref<CategoryType> = ref({});

  // Getters
  const getCategories = computed(() => categories);
  const getCategory = computed(() => category);

  const getMainCategories = computed(() =>
    categories.value.filter((category) => !category.parentCategory)
  );
  const getMainSubCategories = computed(() =>
		categories.value.filter((category) => category.categoryId && category.categoryId >= 4)
	);
	const getSubCategories = computed(() =>
	categories.value.filter((category) => category.categoryId && category.categoryId < 4)
  );

  // Actions
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

  const setCategory = (newCategory: CategoryType) => {
    category.value = newCategory;
  };

  const setCategories = (newCategories: CategoryType[]) => {
    categories.value = newCategories;
  };

  return {
    categories,
    category,
    getCategory,
    getCategories,
    getMainCategories,
	getMainSubCategories,
	getSubCategories,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    setCategory,
  };
};

export default useCategoryStore;
