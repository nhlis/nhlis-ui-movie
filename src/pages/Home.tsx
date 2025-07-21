import { BackdropCards } from '@/components/BackdropCards';
import { Slides } from '@/components/Slides';
import { routes } from '@/constants/routes/routes';
import { tagColors, tags, tagsPathObject } from '@/constants/tags';
import { cn } from '@/lib/utils';
import { Link } from 'react-router';
import { ChevronRight, Medal, HeartPlus, Clapperboard, Zap } from 'lucide-react';
import { TopCommentCards } from '@/components/TopCommentCards';
import { TrendingCards } from '@/components/TrendingCards';
import { NewCommentCards } from '@/components/NewCommentCards';

import { heroSlides } from '@/data/hero-slides';
import { topPicks } from '@/data/top-picks';
import { topComments } from '@/data/top-comments';
import { topTrending } from '@/data/top-trending';
import { mostFavourites } from '@/data/most-favorites';
import { newComments } from '@/data/new-comments';
import { PosterCards } from '@/components/PosterCards';
import { crossTimeLove } from '@/data/cross-time-love';
import { TopPosterCards } from '@/components/TopPosterCards';
import { timeTravel } from '@/data/time-travel';
import { newSeasons } from '@/data/new-seasons';
import { getSeason } from '@/lib/getSeason';
import { lastReleases } from '@/data/last-releases';

function Home() {
    return (
        <>
            <article>
                <title>nhlis</title>
            </article>
            <div className=" space-y-20 overflow-hidden">
                <Slides overviews={heroSlides} />
                <Tags />
                <GroupBackdropCards />
                <Interaction />
                <CrossTimeLove />
                <Top10PosterCard />
                <TimeTravel />
            </div>
        </>
    );
}

function Tags() {
    const randomTags = [...tags].sort(() => Math.random() - 0.5).slice(0, 6);
    const randomColors = [...tagColors].sort(() => Math.random() - 0.5);

    return (
        <section className=" relative text-white z-1">
            <h2 className=" text-lg md:text-2xl font-bold  padding-page">What are you interested in?</h2>
            <div className=" padding-page scrollbar-tracking grid py-5 sm:py-7 overflow-x-scroll sm:overflow-x-visible grid-flow-col sm:grid-flow-row auto-cols-auto sm:auto-cols-fr snap-x snap-mandatory sm:snap-none h-max sm:h-auto hide-scrollbar sm:scrollbar sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 sm:gap-3">
                {randomTags.map((tag, index) => {
                    const isFirst = index === 0;

                    return (
                        <div className={cn(' snap-start sm:snap-none min-w-0 sm:min-w-full hover-animation', ' px-1 sm:px-0', isFirst && ' pl-0 sm:pl-0')} key={index}>
                            <Link
                                to={routes.browsesBuilder(tag.path)}
                                className=" relative flex items-center justify-start px-3 sm:p-5 sm:h-30 min-h-18 sm:min-h-[unset] sm:min-w-[unset] rounded-lg sm:rounded-2xl overflow-hidden cursor-pointer"
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

                {/* Extra div for remaining themes */}
                {tags.length > 6 && (
                    <div className=" snap-start sm:snap-none min-w-0 sm:min-w-full hover-animation pl-1 sm:pl-0">
                        <Link to={routes.tags} className=" relative flex-center p-5 h-full min-h-18 sm:min-h-[unset] sm:min-w-[unset] rounded-lg sm:rounded-2xl overflow-hidden cursor-pointer">
                            <div className=" mask" />
                            <h3 className=" text-center font-bold text-sm sm:text-lg truncate">+{tags.length - 6} Tags</h3>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}

function GroupBackdropCards() {
    const { value } = getSeason();

    return (
        <section className=" text-white sm:px-5 lg:px-10 xl:px-15">
            <div className=" relative z-1 py-10 px-5 sm:px-8 bg-gradient-neutral-to-black rounded-2xl space-y-10">
                <div className=" flex flex-col xl:flex-row gap-5 items-start xl:items-center justify-between">
                    <h2 className=" flex-1 text-lg md:text-2xl xl:text-center font-bold bg-clip-text text-transparent bg-[linear-gradient(235deg,_rgb(255,255,255)_30%,_rgb(103,65,150)_130%)]">
                        Top Picks for You
                    </h2>
                    <div className=" w-full xl:w-[85%]">
                        <BackdropCards overviews={topPicks} />
                    </div>
                </div>
                {newSeasons.length > 0 && (
                    <div className=" flex flex-col xl:flex-row gap-5 items-start xl:items-center justify-between">
                        <h2 className=" flex-1 text-lg md:text-2xl xl:text-center font-bold bg-clip-text text-transparent capitalize bg-[linear-gradient(235deg,_rgb(255,255,255)_30%,_rgb(180,65,150)_130%)]">
                            The {value} Season
                        </h2>
                        <div className=" w-full xl:w-[85%]">
                            <BackdropCards overviews={newSeasons} />
                        </div>
                    </div>
                )}
                <div className=" flex flex-col xl:flex-row gap-5 items-start xl:items-center justify-between">
                    <h2 className=" flex-1 text-lg md:text-2xl xl:text-center font-bold bg-clip-text text-transparent bg-[linear-gradient(235deg,_rgb(255,255,255)_30%,_rgb(30,65,150)_130%)]">
                        Lasted Release
                    </h2>
                    <div className=" w-full xl:w-[85%]">
                        <BackdropCards overviews={lastReleases} />
                    </div>
                </div>
            </div>
        </section>
    );
}

function Interaction() {
    return (
        <section className=" margin-page border rounded-3xl border-neutral-500/50 text-white flex flex-col overflow-hidden">
            <div className=" px-5 sm:px-10 py-10 border-b-1 border-neutral-500/50">
                <h2 className=" mb-5 flex items-center justify-start gap-2 text-base md:text-lg font-bold">
                    <Medal stroke="	#D9C6FF" />
                    Top Comment
                </h2>
                <TopCommentCards comments={topComments} />
            </div>
            <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[minmax(0,450px)_minmax(0,450px)_minmax(500px,1fr)]">
                <div className=" border-b-1 border-neutral-500/50">
                    <div className=" py-10 px-5 sm:px-10 xl:px-10 w-full">
                        <div className=" flex items-center justify-start gap-2 mb-5">
                            <Clapperboard stroke="	#D9C6FF" />
                            <h2 className=" text-base md:text-lg font-bold"> Top Trending</h2>
                        </div>
                        <TrendingCards overviews={topTrending} />
                    </div>
                </div>

                <div className=" border-b-1 sm:border-l-1 border-neutral-500/50">
                    <div className=" py-10 px-5 sm:px-10 xl:px-10 w-full">
                        <div className=" mb-5 flex items-center justify-start gap-2">
                            <HeartPlus stroke="	#D9C6FF" />
                            <h2 className=" text-base md:text-lg font-bold">Most Favourites</h2>
                        </div>
                        <TrendingCards overviews={mostFavourites} />
                    </div>
                </div>

                <div className=" hidden lg:block col-span-2 xl:col-span-1 border-l-1 border-neutral-500/50">
                    <div className=" py-10 px-5 sm:px-10 xl:px-10 w-full">
                        <div className=" mb-5 flex items-center justify-start gap-2">
                            <Zap stroke="	#D9C6FF" />
                            <h2 className=" text-base md:text-lg font-bold">New Comments</h2>
                        </div>
                        <NewCommentCards comments={newComments} />
                    </div>
                </div>
            </div>
        </section>
    );
}

function CrossTimeLove() {
    return (
        <section className=" relative text-white padding-page">
            <h2 className=" text-lg md:text-2xl font-bold mb-10">{tagsPathObject['love-across-time'].label}</h2>
            <PosterCards overviews={crossTimeLove} />
        </section>
    );
}

function Top10PosterCard() {
    return (
        <section className=" relative text-white padding-page">
            <h2 className=" text-lg md:text-2xl font-bold mb-10">Top 10 Highest Viewed Platform</h2>
            <TopPosterCards overviews={crossTimeLove} />
        </section>
    );
}

function TimeTravel() {
    return (
        <section className=" relative text-white padding-page">
            <h2 className=" text-lg md:text-2xl font-bold mb-10">{tagsPathObject['time-travel'].label}</h2>
            <PosterCards overviews={timeTravel} />
        </section>
    );
}

export default Home;
