export const fakeMenu = [
    { label: "Trang chủ", path: "/" },
    { label: "Sự kiện", path: "/event" },
    { label: "Tin tức", path: "/news" },
    { label: "Về chúng tôi", path: "/about-us" },
    { label: "Yêu thích", path: "/following" },
    { label: "Lịch trình", path: "/schedule" },
    { label: "Danh sách quán cà phê", path: "/shopList" },
    { label: "Quản lý", path: "/user/event" },
];
export interface IMenu {
    label: string;
    path: string
}