import { routes } from '@/constants/routes/routes';
import { tagColors, tags } from '@/constants/tags';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

function Tags() {
    const randomColors = [...tagColors].sort(() => Math.random() - 0.5);

    return (
        <>
            <article>
                <title>Tags</title>
            </article>
            <div className=" my-20 xl:my-30 padding-page text-white">
                <h2 className=" text-lg md:text-2xl font-bold">Tags</h2>
                <div className=" grid py-5 sm:py-7 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-5">
                    {tags.map((tag, index) => {
                        return (
                            <div className=" hover-animation px-1 sm:px-0" key={index}>
                                <Link
                                    to={routes.browsesBuilder(tag.path)}
                                    className=" relative flex items-center justify-start px-3 sm:p-5 h-30 sm:min-h-[unset] sm:min-w-[unset] rounded-lg sm:rounded-2xl overflow-hidden cursor-pointer"
                                >
                                    <div className=" mask" style={{ backgroundColor: randomColors[index].color }} />
                                    <div className="relative w-full h-full flex sm:flex-col items-center sm:items-start justify-start sm:justify-between z-10">
                                        <div className="h-full flex items-center sm:items-start">
                                            <h3 className="font-bold text-sm sm:text-lg w-full line-clamp-2">{tag.label}</h3>
                                        </div>
                                        <div className=" hidden sm:flex items-center justify-start gap-2 text-base">
                                            <span className=" text-xs">View tag</span>
                                            <ChevronRight size={15} />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Tags;
