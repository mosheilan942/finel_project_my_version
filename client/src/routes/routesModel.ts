const ROUTES = {
    HOME: '/store',
    LOGIN: '/store/login',
    REGISTER: '/store/register',
    CATEGORY: '/store/category/:cname',
    PRODUCT: '/store/product/:pid',
    CART: '/store/cart',
    COMPARE: '/store/compare/:pid1/:pid2',
    DEFAULT: '*',
    ACCOUNT:'/store/account',
    ADDRESS:'/store/address',
    SERVICE:'/store/service',
    ORDERS:'/store/orders',
    SETTINGS:'/store/settings',
    CHECKOUT: "/store/checkout/:totalAmount",
    CONNECT: "/store/connect",
    WISHLIST: "/store/wishlist",
    PROFILE: "/store/profile",
    SEARCH: "/store/search",
    RESET: "/store/resetPassword",
    CHAT: "/store/chat",
};

export default ROUTES;