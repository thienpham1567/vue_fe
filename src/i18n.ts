import { ref } from 'vue';
import { useLanguageStore } from '@/store/language';

const translations = {
    en: {
        //Cart-View
        hello: 'Hello!',
        item: 'Item',
        price: 'Price',
        quantity: 'Quantity',
        'Proceed-to-checkout': 'PROCEED TO CHECKOUT',
        'cart-summary': 'Cart summary',
        subtotal: 'Subtotal',
        remove: 'Remove',
        color: 'Color',
        size: 'Size',
        //Cart-View-End

        //Header
        'my-cart': 'My Cart',
        'search-placehoder': 'Search for shoes, clothes, etc...',
        'product-detail': 'Product Detail',
        'product-list': 'Product List',
        'sign-in': 'Sign In',
        'register': 'Register',
        'sign-in/register': 'Sign In / Register',
        'my-account': 'My Account',
        'view-order': 'View order',
        'logout': 'Logout',
        //Heder-End
    },
    vi: {
        //Cart-View
        hello: 'Xin chào!',
        item: 'Sản phẩm',
        price: 'Giá',
        quantity: 'Số lượng',
        'Proceed-to-checkout': 'Thanh toán',
        'cart-summary': 'Giỏ hàng',
        subtotal: 'Tổng cộng',
        remove: 'Xóa',
        color: 'Màu',
        size: 'Kích cỡ',
        //Cart-View-End

        //Header
        'sign-in/register': 'Đăng nhập / Đăng ký',
        'sign-in': 'Đăng nhập',
        'register': 'Đăng ký',
        'product-list': 'Danh sách sản phẩm',
        'product-detail': 'Chi tiết sản phẩm',
        'my-cart': 'Giỏ hàng',
        'search-placehoder': 'Tìm kiếm giày, áo, phụ kiện...',
        'my-account': 'Tài khoản',
        'view-order': 'Hiển thị đơn hàng',
        'logout': 'Đăng xuất',
        //Heder-End
    },
};


export function translate(key: string): string {
    // Lấy bản dịch tương ứng dựa trên ngôn ngữ hiện tại và khóa
    const languageStore = useLanguageStore();
    const translation = translations[languageStore.currentLanguage][key];

    // Trả về bản dịch hoặc khóa nếu không tìm thấy bản dịch
    return translation || key;
}

