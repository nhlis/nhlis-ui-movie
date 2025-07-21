import { Button } from '@/components/Button';
import { Image } from '@/components/Image';
import { PosterCards } from '@/components/PosterCards';
import { WatchButton } from '@/components/WatchButton';
import { images } from '@/constants';
import { actions } from '@/constants/actions';
import { genresSlugObject, type GenreSlug } from '@/constants/genres';
import { routes } from '@/constants/routes/routes';
import { crossTimeLove } from '@/data/cross-time-love';
import { episodesInukai } from '@/data/episodes-inukai';
import { heroSlides } from '@/data/hero-slides';
import { dateToString } from '@/lib/dateToString';
import { formatMovie } from '@/lib/handleMovie';
import { cn } from '@/lib/utils';
import type { THeroSlides } from '@/types/hero-slide';
import { Calendar, EllipsisVertical, Play } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

function Movie() {
    const overview = heroSlides[4];

    return (
        <>
            <article>
                <title>Suzume</title>
            </article>
            <div className=" space-y-20 overflow-hidden">
                <Header overview={overview} />
                <div className=" space-y-10 relative z-10">
                    <Overview overview={overview} />
                    <Episodes overview={overview} />
                </div>
                <MoreLikeThis />
            </div>
        </>
    );
}

function Header({ overview }: { overview: THeroSlides }) {
    return (
        <div className=" relative w-full h-full">
            <div className=" absolute w-full">
                <Image
                    src={`${overview.backdrop}=s3000`}
                    sources={[{ maxWidth: 40, srcSet: `${overview.poster}=s1000` }]}
                    className=" relative h-full w-full inset-0 sm:aspect-[4/3] lg:aspect-[5/3] xl:aspect-video 2xl:aspect-auto object-cover object-top sm:object-left"
                    fallback="assets/oops.png"
                />
                <div className=" block sm:hidden absolute inset-[-1px] bg-overlay-gradient-b-to-t pointer-events-none" />
                <div className=" hidden sm:block absolute inset-[-1px] bg-overlay-gradient-b-l-to-t-r pointer-events-none" />
                <div className=" hidden lg:block absolute inset-[-1px] opacity-20 bg-repeat bg-center pointer-events-none" style={{ backgroundImage: `url(${images.dotted})` }} aria-hidden="true" />
            </div>
            <div className=" relative grid grid-cols-12 grid-rows-[100px_100px_1fr] sm:grid-rows-[100px_1fr] pt-[50%] sm:pt-[17%] gap-5 padding-page">
                <div className=" col-start-4 col-span-6 sm:col-start-1 sm:col-span-4 md:col-span-3 row-start-2 sm:row-start-1 w-full h-full">
                    <Image src={`${overview.logo}=s800`} sources={[{ maxWidth: 30, srcSet: `${overview.logo}=s800` }]} className=" h-full w-full sm:w-auto object-contain" fallback="assets/oops.png" />
                </div>
                <div className=" col-start-2 col-span-10 row-start-3 sm:row-start-2 sm:col-start-1 sm:col-span-8 md:col-span-7 lg:col-span-6 xl:col-span-5 2xl:col-span-4 flex flex-col gap-5 text-center sm:text-start text-white text-xs">
                    <h1 className=" text-purple-300 text-base truncate min-h-5">{overview.original_title}</h1>
                    <div className=" overflow-hidden">
                        <div className=" flex flex-wrap items-start justify-center sm:justify-start gap-2 text-xs overflow-hidden  font-medium">
                            <span className=" border border-purple-300 px-2 leading-normal rounded-sm">
                                <span className=" text-purple-300">IMDb:</span> 9.0
                            </span>
                            <span className=" flex-center h-5 px-2 leading-normal rounded-sm bg-linear-gradient text-black">Uncensored</span>
                            <span className=" border border-white px-2 leading-normal rounded-sm bg-white text-black">18+</span>
                            <span className=" border border-white px-2 leading-normal rounded-sm">Subtitled</span>
                            <span className=" border border-white px-2 leading-normal rounded-sm">Dubbed</span>
                        </div>
                    </div>
                    <div className=" flex gap-7 sm:gap-10 items-center justify-center sm:justify-start">
                        {actions.map((action, index) => {
                            const Icon = action.icon;

                            return (
                                <button key={index} className=" flex flex-col items-center justify-center gap-1 text-base font-semibold  transition-all duration-300">
                                    <Icon size={25} strokeWidth={2} />
                                </button>
                            );
                        })}
                    </div>
                    <div className=" w-full flex items-center justify-center sm:justify-start">
                        <WatchButton _id={overview._id} className=" main-button h-13 px-5 w-70" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function Overview({ overview }: { overview: THeroSlides }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className=" padding-page">
            <div
                className={cn(
                    ' grid grid-cols-1 sm:grid-cols-12 gap-10 text-white text-sm overflow-hidden',
                    expanded
                        ? 'max-h-[100vh]'
                        : 'max-h-25 [--fade-size:2.5rem] [mask-image:linear-gradient(to_bottom,black_calc(100%_-_var(--fade-size)),transparent)] [--tw-webkit-mask-image:linear-gradient(to_bottom,black_calc(100%_-_var(--fade-size)),transparent)]'
                )}
            >
                <p className=" sm:col-start-1 sm:col-span-7 lg:col-span-6 xl:col-span-5">{overview.description}</p>
                <div className=" sm:col-start-8 sm:col-span-4 flex flex-col gap-2">
                    <div>
                        <strong className="font-normal">Audio: </strong>
                        {overview.dub_languages?.length > 0 ? (
                            <span className="text-neutral-400 italic">{overview.dub_languages.map((dub) => dub.charAt(0).toUpperCase() + dub.slice(1)).join(', ')}</span>
                        ) : (
                            <span className="text-neutral-400 italic">Raw</span>
                        )}
                    </div>
                    <div>
                        <strong className="font-normal">Subtitles: </strong>
                        {overview.subtitle_languages?.length > 0 ? (
                            <span className="text-neutral-400 italic">{overview.subtitle_languages.map((sub) => sub.charAt(0).toUpperCase() + sub.slice(1)).join(', ')}</span>
                        ) : (
                            <span className="text-neutral-400 italic">None</span>
                        )}
                    </div>
                    <div>
                        <strong className="font-normal">Content Advisory: </strong>
                        <span className="text-neutral-400 italic">{overview.age_rating}+</span>
                    </div>
                    <div>
                        <strong className="font-normal">Genres: </strong>
                        {(overview.genres as GenreSlug[])?.map((slug, index, arr) => (
                            <span key={index} className="text-neutral-400 italic">
                                {genresSlugObject[slug]?.label ?? slug}
                                {index !== arr.length - 1 && ', '}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className=" flex items-center justify-center sm:justify-start">
                <button className=" text-xs font-semibold text-violet-400 hover:text-violet-500 py-3 uppercase cursor-pointer" onClick={() => setExpanded((prev) => !prev)}>
                    {expanded ? 'Fewer Details' : 'More Details'}
                </button>
            </div>

            <div className="border-b border-white/25" />
        </div>
    );
}

function Episodes({ overview }: { overview: THeroSlides }) {
    return (
        <div className=" text-white space-y-5">
            <div className=" flex flex-col xs:flex-row gap-3 items-center justify-between padding-page">
                <h2 className=" flex-1 truncate text-xl font-semibold">DARLING in the FranXX</h2>
                <div className=" flex items-center justify-between gap-3 text-xs">
                    <Button>Season 1</Button>
                    <Button>Oldest</Button>
                </div>
            </div>
            <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 px-2 lg:px-7 xl:px-12 gap-y-3">
                {episodesInukai.slice(0, 24).map((episode, index) => {
                    return <EpisodeCard episode={episode} overview={overview} key={index} />;
                })}
            </div>
        </div>
    );
}

function EpisodeCard({ overview, episode }: { overview: THeroSlides; episode: any }) {
    return (
        <div className=" relative group h-full w-full flex flex-col justify-between gap-2 hover:bg-neutral-800 rounded-lg p-2 sm:p-3">
            <Link to={routes.watchBuilder(formatMovie(overview.original_title, overview._id), formatMovie(episode.title, episode._id))}>
                <div className=" relative flex flex-col gap-3 group-hover:invisible">
                    <div className=" h-full w-full relative">
                        <Image
                            src={`${episode.img}=s400`}
                            sources={[{ maxWidth: 30, srcSet: `${episode.img}=s400` }]}
                            className=" h-full w-full object-contain rounded-lg"
                            fallback="assets/oops.png"
                        />
                        <div className=" absolute bottom-0 right-0 text-[0.6rem] m-1 sm:m-2 py-0.5 px-2 bg-neutral-800/50 rounded-sm">{episode.duration}m</div>
                    </div>
                    <div className=" space-y-2">
                        <h3 className=" text-[0.65rem] text-neutral-400 font-semibold uppercase truncate">DARLING in the FranXX</h3>
                        <h4 className=" text-sm font-medium">
                            E{episode.episode_number} - {episode.title}
                        </h4>
                    </div>
                </div>
                <div className=" absolute top-0 left-0 p-3 invisible group-hover:visible space-y-2 w-full">
                    <h3 className=" text-[0.65rem] text-neutral-400 font-bold uppercase truncate">DARLING in the FranXX DARLING</h3>
                    <h4 className=" text-sm font-medium">
                        E{episode.episode_number} - {episode.title}
                    </h4>
                    <div className=" flex items-center justify-start text-neutral-400 text-xs gap-1">
                        <Calendar size={12} />
                        <span className=" leading-none">{dateToString(episode.release_date.$date)}</span>
                    </div>
                    <p className=" text-xs line-clamp-2 xs:line-clamp-4">{episode.description}</p>
                </div>
            </Link>
            <div className=" flex items-center justify-between text-neutral-400">
                <div className=" h-5 flex items-center justify-start">
                    <div className=" text-xs block group-hover:hidden text-amber-300">Ads</div>
                    <Link
                        to={routes.watchBuilder(formatMovie(overview.original_title, overview._id), formatMovie(episode.title, episode._id))}
                        className=" text-sm hidden group-hover:flex items-center justify-start gap-1 font-semibold uppercase text-purple-400"
                    >
                        <Play size={15} strokeWidth={5} />
                        <span>Play E{episode.episode_number}</span>
                    </Link>
                </div>
                <button>
                    <EllipsisVertical size={20} />
                </button>
            </div>
        </div>
    );
}

function MoreLikeThis() {
    return (
        <section className=" relative text-white padding-page">
            <h2 className=" text-lg md:text-2xl font-bold mb-10">More Like This</h2>
            <PosterCards overviews={crossTimeLove} />
        </section>
    );
}

export default Movie;
