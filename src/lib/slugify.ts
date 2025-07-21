export const slugify = (text: string): string => {
    return text
        .toLowerCase()
        .normalize('NFD') // chuẩn hóa ký tự Unicode
        .replace(/[\u0300-\u036f]/g, '') // xóa dấu tiếng Việt
        .replace(/[^a-z0-9]+/g, '-') // thay khoảng trắng & ký tự đặc biệt bằng "-"
        .replace(/^-+|-+$/g, ''); // xóa dấu "-" ở đầu/cuối
};
