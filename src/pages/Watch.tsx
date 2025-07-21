import { Button } from '@/components/Button';
import { CommentEditor } from '@/components/CommentEditor';
import { CommentView } from '@/components/CommentView';
import { Image } from '@/components/Image';
import { cn } from '@/lib/utils';
import { Bookmark, Heart, Share, ThumbsDown } from 'lucide-react';
import { useState } from 'react';

function Watch() {
    return (
        <div className=" min-h-screen my-15 xl:my-20 space-y-10">
            <div className=" w-full max-w-350 mx-auto overflow-hidden rounded-2xl">
                <iframe src={'https://stream.knite.online/embed/176607868580012322'} allow="fullscreen" allowFullScreen className=" w-full aspect-video" />
            </div>
            <div className="padding-page text-white">
                <div className="max-w-350 mx-auto grid grid-cols-12 gap-x-5 gap-y-10">
                    <div className="col-span-12">
                        <Overview />
                    </div>
                    <div className=" row-start-2 col-span-12">
                        <div className="flex flex-col sm:flex-row gap-5">
                            <div className="space-y-2">
                                <h3 className="font-medium text-lg">Next Episode</h3>
                                <EpisodeCard />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-medium text-lg">Previous Episode</h3>
                                <EpisodeCard />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <Comments />
                    </div>
                </div>
            </div>
        </div>
    );
}

function Overview() {
    const [expanded, setExpanded] = useState(false);

    const languages = [
        'english',
        'vietnamese',
        'arabic',
        'german',
        'russian',
        'italian',
        'spanish',
        'chinese',
        'korean',
        'japanese',
        'indonesian',
        'thai',
        'french',
        'malay',
        'turkish',
        'portuguese',
        'dutch',
        'hindi',
        'danish',
        'persian',
        'finnish',
        'greek',
        'kannada',
        'norwegian',
        'polish',
        'swedish',
        'ukrainian',
    ];

    return (
        <>
            <div
                className={cn(
                    ' space-y-5 overflow-hidden',
                    expanded
                        ? 'max-h-full'
                        : 'max-h-55 [--fade-size:2.5rem] [mask-image:linear-gradient(to_bottom,black_calc(100%_-_var(--fade-size)),transparent)] [--tw-webkit-mask-image:linear-gradient(to_bottom,black_calc(100%_-_var(--fade-size)),transparent)]'
                )}
            >
                <div className=" flex items-center justify-between">
                    <h2 className=" font-semibold text-purple-400">My Life as Inukai-san's Dog</h2>
                    <Bookmark />
                </div>
                <h3 className=" text-xl">E3 - Scaredy - Cat.</h3>
                <div className=" text-sm text-neutral-300">
                    <span>Release on </span>
                    <span>
                        {new Date().toLocaleString('en-US', {
                            timeZone: 'UTC',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour12: true,
                        })}
                    </span>
                </div>
                <div className=" flex items-center justify-between">
                    <div className=" flex items-center gap-5">
                        <button className=" flex items-center justify-start gap-2">
                            <Heart />1
                        </button>
                        <button className=" flex items-center justify-start gap-2">
                            <ThumbsDown />1
                        </button>
                    </div>
                    <div>
                        <button>
                            <Share />
                        </button>
                    </div>
                </div>
                <p>{'Pochita finds himself transformed into a dog and adopted by his school crush, Inukai-san! Plus, bath time makes Pochita doggone uncomfortable.'}</p>
                <div className=" text-sm space-y-3">
                    <div className=" border-b border-white/30 flex items-start justify-between py-2 gap-10">
                        <strong className=" font-medium w-fit">Audio</strong>
                        <p className=" text-neutral-300 text-xs text-end italic">Raw</p>
                    </div>
                    <div className=" border-b border-white/30 flex items-start justify-between py-2 gap-10">
                        <strong className=" font-medium w-fit">Subtitles</strong>
                        <p className=" text-neutral-300 text-xs text-end italic">{languages.map((dub) => dub.charAt(0).toUpperCase() + dub.slice(1)).join(', ')}</p>
                    </div>
                    <div className=" border-b border-white/30 flex items-start justify-between py-2 gap-10">
                        <strong className=" font-medium w-fit">Content Advisory</strong>
                        <p className=" text-neutral-300 text-xs text-end italic">18+</p>
                    </div>
                </div>
            </div>
            <div className=" flex items-center justify-center sm:justify-start">
                <button className=" text-xs font-semibold text-violet-400 hover:text-violet-500 py-3 uppercase cursor-pointer" onClick={() => setExpanded((prev) => !prev)}>
                    {expanded ? 'Show less' : 'Show more'}
                </button>
            </div>
        </>
    );
}

function EpisodeCard() {
    return (
        <div className=" flex gap-2 items-stretch">
            <div className=" relative w-30 xs:w-35 h-full">
                <Image
                    src="https://image.knite.online/15_JGMMSzZvZFDitpekSHDFu-uRhQMfTA=s400"
                    sources={[{ maxWidth: 30, srcSet: 'https://image.knite.online/15_JGMMSzZvZFDitpekSHDFu-uRhQMfTA=s400' }]}
                    className=" h-full w-full object-contain rounded-lg"
                    fallback="assets/oops.png"
                />
                <div className=" absolute bottom-0 right-0 text-[0.6rem] m-1 py-0.5 px-2 bg-neutral-800/50 rounded-sm">24m</div>
            </div>
            <div className=" flex-1 flex flex-col items-start justify-between py-0.5">
                <h4 className=" text-sm font-medium">Shake.</h4>
                <p className=" text-[0.6rem] text-amber-300">Ads</p>
                <p className=" text-xs line-clamp-2 text-neutral-300">
                    {'Pochita finds himself transformed into a dog and adopted by his school crush, Inukai-san! Plus, bath time makes Pochita doggone uncomfortable.'}
                </p>
            </div>
        </div>
    );
}

function Comments() {
    return (
        <div className=" space-y-10">
            <div className=" flex items-center justify-between">
                <h2 className=" text-lg md:text-2xl font-bold">5 Comments</h2>
                <Button className=" text-xs">Sort by</Button>
            </div>
            <CommentEditor />
            <CommentView text="Hello <@1> nice to meet you😆" parentId="1" replyId="1" replyName="makima" />
        </div>
    );
}

export default Watch;
