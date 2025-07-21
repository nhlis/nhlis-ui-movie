export const tags = [
    { label: 'Time Travel', slug: 'time_travel', path: 'time-travel' }, // Du hành thời gian
    { label: 'Time Loop', slug: 'time_loop', path: 'time-loop' }, // Vòng lặp thời gian
    { label: 'Parallel Worlds', slug: 'parallel_worlds', path: 'parallel-worlds' }, // Thế giới song song
    { label: 'Memory Loss', slug: 'memory_loss', path: 'memory-loss' }, // Mất trí nhớ
    { label: 'Unrequited Love', slug: 'unrequited_love', path: 'unrequited-love' }, // Tình đơn phương
    { label: 'Forbidden Love', slug: 'forbidden_love', path: 'forbidden-love' }, // Tình yêu bị cấm đoán
    { label: 'Found Family', slug: 'found_family', path: 'found-family' }, // Gia đình do lựa chọn
    { label: 'Parent-Child Bond', slug: 'parent_child_bond', path: 'parent-child-bond' }, // Gắn kết cha mẹ – con cái
    { label: 'Siblings Bond', slug: 'siblings_bond', path: 'siblings-bond' }, // Gắn kết anh em
    { label: 'Love Across Time', slug: 'love_across_time', path: 'love-across-time' }, // Tình yêu vượt thời gian
    { label: 'Regret & Second Chance', slug: 'regret_and_second_chance', path: 'regret-and-second-chance' }, // Hối tiếc và cơ hội thứ hai
    { label: 'Identity Crisis', slug: 'identity_crisis', path: 'identity-crisis' }, // Khủng hoảng bản sắc
    { label: 'Overcoming the Past', slug: 'overcoming_the_past', path: 'overcoming-the-past' }, // Vượt qua quá khứ
    { label: 'Loss & Growth', slug: 'loss_and_growth', path: 'loss-and-growth' }, // Mất mát và trưởng thành
    { label: 'Betrayal', slug: 'betrayal', path: 'betrayal' }, // Phản bội
    { label: 'Revenge', slug: 'revenge', path: 'revenge' }, // Trả thù
    { label: 'Redemption', slug: 'redemption', path: 'redemption' }, // Chuộc lỗi
    { label: 'Tragic Romance', slug: 'tragic_romance', path: 'tragic-romance' }, // Tình yêu bi kịch
    { label: 'Tragic Hero', slug: 'tragic_hero', path: 'tragic-hero' }, // Anh hùng bi kịch
];

export type TagSlug = (typeof tags)[number]['path'];

export const tagsPathObject: Record<TagSlug, { label: string; slug: TagSlug; path: string }> = Object.fromEntries(tags.map((s) => [s.path, s])) as Record<
    TagSlug,
    { label: string; slug: TagSlug; path: string }
>;

export const tagColors = [
    { label: 'Pink Neon', color: 'rgb(250, 79, 209)' },
    { label: 'Sky Blue', color: 'rgb(79, 172, 250)' },
    { label: 'Mint Green', color: 'rgb(123, 237, 159)' },
    { label: 'Sunset Orange', color: 'rgb(255, 186, 90)' },
    { label: 'Coral Red', color: 'rgb(255, 107, 129)' },
    { label: 'Purple Haze', color: 'rgb(165, 94, 234)' },
    { label: 'Lemon Yellow', color: '#FFE66D' },
    { label: 'Ocean Teal', color: '#17BEBB' },
    { label: 'Deep Violet', color: '#6A4C93' },
    { label: 'Steel Grey', color: '#556B8C' },
    { label: 'Mango', color: '#FF9F1C' },
    { label: 'Emerald', color: '#2ECC71' },
    { label: 'Crimson', color: '#D7263D' },
    { label: 'Royal Blue', color: '#4169E1' },
    { label: 'Lavender', color: '#C084FC' },
    { label: 'Saffron', color: '#FFA41B' },
    { label: 'Forest Green', color: '#228B22' },
    { label: 'Chocolate', color: '#D2691E' },
    { label: 'Slate', color: '#708090' },
    { label: 'Turquoise', color: '#1ABC9C' },
    { label: 'Ruby', color: '#E0115F' },
    { label: 'Indigo', color: '#4B0082' },
    { label: 'Periwinkle', color: '#A7C7E7' },
    { label: 'Chartreuse', color: '#7FFF00' },
    { label: 'Rose', color: '#FF66CC' },
    { label: 'Amber', color: '#FFBF00' },
    { label: 'Deep Sea', color: '#006994' },
    { label: 'Fuchsia', color: '#FF00FF' },
    { label: 'Peach', color: '#FFBCB3' },
    { label: 'Maroon', color: '#800000' },
    { label: 'Ice Blue', color: '#AFDBF5' },
    { label: 'Olive', color: '#808000' },
    { label: 'Gunmetal', color: '#2a3439' },
] as const;
