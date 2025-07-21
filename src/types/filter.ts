export type FilterValue = {
    type?: string | undefined;
    tag?: string | undefined;
    genres?: string[] | undefined;
    language?: string | undefined;
    start_date?: Date | undefined;
    end_date?: Date | undefined;
    sort?: string | undefined;
};

export type FilterItem = {
    label: string;
    slug: string;
};
