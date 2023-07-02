import { createPinia, type Pinia } from 'pinia';

const pinia: Pinia = createPinia();

export default pinia;

// Pinia Stores
import useProductStore from './ProductStore';
import useAccountStore from './AccountStore';
import useBrandStore from './BrandStore';
import useCategoryStore from './CategoryStore';
import useSizeStore from './SizeStore';
import useCartStore from './Cart';

export { useBrandStore, useAccountStore, useCategoryStore, useProductStore, useSizeStore, useCartStore };
