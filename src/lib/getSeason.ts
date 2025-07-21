import { seasons, seasonsPathObject, type SeasonSlug } from '@/constants/seasons';

export const getSeason = (): { value: SeasonSlug; year: number } => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    let year = today.getFullYear();

    for (const season of seasons) {
        const { start, end, value } = season;

        if ((month > start.month || (month === start.month && day >= start.day)) && (month < end.month || (month === end.month && day <= end.day))) {
            return { value, year };
        }
    }
    return { value: seasonsPathObject.winter.value, year: month >= 12 ? year : year - 1 };
};
