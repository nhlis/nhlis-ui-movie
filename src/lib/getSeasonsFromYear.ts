import { seasons, type SeasonSlug } from '@/constants/seasons';

export const getSeasonsFromYear = (startYear: number): { season: SeasonSlug; year: number }[] => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const result: { season: SeasonSlug; year: number }[] = [];

    for (let year = startYear; year <= currentYear; year++) {
        for (const { value: season, start, end } of seasons) {
            let seasonYear = year;

            // Mùa đông kết thúc năm sau → năm gốc phải trừ 1
            if (end.month < start.month) {
                seasonYear = year - 1;
            }

            if (seasonYear < startYear) continue;

            const seasonStartDate = new Date(seasonYear, start.month - 1, start.day);

            // Nếu đang ở năm hiện tại, chỉ push những mùa đã bắt đầu
            if (seasonYear < currentYear || seasonStartDate <= currentDate) {
                result.push({ season, year: seasonYear });
            }
        }
    }

    // Sắp xếp giảm dần theo năm → theo thứ tự mùa
    return result.sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;

        const seasonOrder = ['spring', 'summer', 'fall', 'winter'];
        return seasonOrder.indexOf(b.season) - seasonOrder.indexOf(a.season);
    });
};
