import { createPinia, type Pinia } from 'pinia';

const pinia: Pinia = createPinia();

export default pinia;

// Pinia Stores
import useProductStore from './ProductStore';
import useAccountStore from './AccountStore';
import useBrandStore from './BrandStore';
import useCategoryStore from './CategoryStore';

export { useProductStore, useAccountStore, useBrandStore, useCategoryStore };
