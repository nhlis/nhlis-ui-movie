import { AlignLeft, Bell, Search as SearchIcon, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useFloating, offset, flip, shift, autoUpdate, useDismiss, useClick, useInteractions } from '@floating-ui/react';
import { useState } from 'react';
import { genres } from '@/constants/genres';
import { Search } from '@/components/Search';
import { cn } from '@/lib/utils';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { Link, useParams } from 'react-router';
import { routes } from '@/constants/routes/routes';
import { sortsPathObject } from '@/constants/sorts';
import { getSeason } from '@/lib/getSeason';
import { formatSeason } from '@/lib/handleSeason';
import { Button } from '@/components/Button';
import { Image } from '@/components/Image';

function Header() {
    const [isSearch, setIsSearch] = useState(false);
    const [openNavMobile, setOpenNavMobile] = useState(false);
    const isUser = false;

    const { refs: navMobileRefs, floatingStyles: navMobileStyles } = useFloating({
        open: openNavMobile,
        onOpenChange: setOpenNavMobile,
        placement: 'bottom-start',
        middleware: [offset(30), flip(), shift()],
        whileElementsMounted: autoUpdate,
    });

    const { scrollDirection, scrollY } = useScrollDirection();

    return (
        <>
            <header
                className={cn(
                    ' flex items-center justify-between gap-5 xl:gap-20 px-5 xl:px-10 h-20 xl:h-30 fixed w-full top-0 text-white z-50 lg:-translate-y-[unset]',
                    scrollY === 0 ? ' h-15 xl:h-20' : ' h-13 xl:h-15 bg-black',
                    scrollDirection === 'down' && ' -translate-y-20',
                    'transition-all duration-500'
                )}
            >
                {isSearch ? (
                    <>
                        <Search />
                        <X className=" cursor-pointer" onClick={() => setIsSearch(false)} />
                    </>
                ) : (
                    <>
                        <div className=" flex items-center justify-start gap-5 w-full" ref={navMobileRefs.setReference}>
                            <div className=" xl:hidden cursor-pointer">
                                {openNavMobile ? (
                                    <X className=" cursor-pointer" onClick={() => setOpenNavMobile(false)} />
                                ) : (
                                    <AlignLeft className=" cursor-pointer" onClick={() => setOpenNavMobile(true)} />
                                )}
                            </div>
                            <div className=" w-15">
                                <Image src={'/logo.png'} />
                            </div>
                            <div className=" hidden xl:block w-full">
                                <Search />
                            </div>
                        </div>
                        <NavDesktop className=" hidden xl:flex" />
                        <div className="w-full flex items-center justify-end">
                            <div className=" xl:hidden cursor-pointer" onClick={() => setIsSearch(true)}>
                                <SearchIcon />
                            </div>
                            <div className=" hidden xl:block">
                                {isUser ? (
                                    <div>
                                        <Bell />
                                    </div>
                                ) : (
                                    <Button>Signin</Button>
                                )}
                            </div>
                        </div>
                        {openNavMobile && <NavMobile floatingRef={navMobileRefs.setFloating} style={navMobileStyles} className=" xl:hidden" />}
                    </>
                )}
            </header>
        </>
    );
}

function NavDesktop({ className }: { className?: string }) {
    const [openGenres, setOpenGenres] = useState(false);
    const { value, year } = getSeason();

    const {
        refs: genresRefs,
        context: genresContext,
        floatingStyles: genresStyles,
    } = useFloating({
        open: openGenres,
        onOpenChange: setOpenGenres,
        placement: 'bottom-start',
        middleware: [offset(17), flip(), shift({ padding: 40 })],
        whileElementsMounted: autoUpdate,
    });

    const { getReferenceProps: getGenresRefProps, getFloatingProps: getGenresFloatingProps } = useInteractions([useClick(genresContext), useDismiss(genresContext)]);

    return (
        <nav className={cn(' flex items-center justify-center w-full text-md gap-10', className)}>
            <Link to={routes.home}>
                <h5 className=" font-semibold">Home</h5>
            </Link>
            <Link to={routes.browsesBuilder(sortsPathObject.newest.path)}>
                <h5 className=" font-semibold">New</h5>
            </Link>
            <Link to={routes.browsesBuilder(sortsPathObject.popularity.path)}>
                <h5 className=" font-semibold">Popular</h5>
            </Link>
            <Link to={routes.seasonsBuilder(formatSeason(value, year))}>
                <h5 className=" font-semibold">Seasons</h5>
            </Link>
            <div ref={genresRefs.setReference} {...getGenresRefProps()} className="text-base font-semibold flex-center gap-1 cursor-pointer">
                <h5>Genres</h5>
                {openGenres ? <ChevronUp /> : <ChevronDown />}
            </div>

            {openGenres && <Genres floatingRef={genresRefs.setFloating} {...getGenresFloatingProps()} style={genresStyles} onSelect={() => setOpenGenres(false)} />}
        </nav>
    );
}

function NavMobile({ floatingRef, style, className }: { floatingRef: (node: HTMLElement | null) => void; style: React.CSSProperties; className?: string }) {
    const [openGenres, setOpenGenres] = useState(false);
    const { value, year } = getSeason();

    const {
        refs: genresRefs,
        context: genresContext,
        floatingStyles: genresStyles,
    } = useFloating({
        open: openGenres,
        onOpenChange: setOpenGenres,
        placement: 'bottom-start',
        middleware: [offset(10), flip(), shift()],
        whileElementsMounted: autoUpdate,
    });

    const { getReferenceProps: getGenresRefProps, getFloatingProps: getGenresFloatingProps } = useInteractions([useClick(genresContext), useDismiss(genresContext)]);

    return (
        <nav className={cn(' bg-violet-500 rounded-2xl p-10 w-[90vw] xs:w-75 space-y-5', className)} ref={floatingRef} style={style}>
            <div className=" w-full flex-center">
                {false ? (
                    <div>
                        <Bell />
                    </div>
                ) : (
                    <Button>Signin</Button>
                )}
            </div>
            <div className=" grid grid-cols-2 gap-5">
                <Link to={routes.home}>
                    <h5 className=" font-semibold">Home</h5>
                </Link>
                <Link to={routes.browsesBuilder(sortsPathObject.newest.path)}>
                    <h5 className=" font-semibold">New</h5>
                </Link>
                <Link to={routes.browsesBuilder(sortsPathObject.popularity.path)}>
                    <h5 className=" font-semibold">Popular</h5>
                </Link>
                <Link to={routes.seasonsBuilder(formatSeason(value, year))}>
                    <h5 className=" font-semibold">Seasons</h5>
                </Link>
                <div ref={genresRefs.setReference} {...getGenresRefProps()} className="text-base flex items-center justify-start gap-1 cursor-pointer">
                    <h5 className=" font-semibold">Genres</h5>
                    {openGenres ? <ChevronUp /> : <ChevronDown />}
                </div>

                {openGenres && <Genres floatingRef={genresRefs.setFloating} {...getGenresFloatingProps()} style={genresStyles} onSelect={() => setOpenGenres(false)} />}
            </div>
        </nav>
    );
}

function Genres({ floatingRef, style, onSelect }: { floatingRef: (node: HTMLElement | null) => void; style: React.CSSProperties; onSelect: () => void }) {
    const { browses } = useParams<{ browses: string }>();

    return (
        <ul ref={floatingRef} style={style} className=" bg-neutral-800 min-w-[max-content] rounded-lg w-75 grid grid-cols-2 sm:grid-cols-4 p-4 gap-1">
            {genres.map((genre) => (
                <li
                    key={genre.slug}
                    onClick={onSelect}
                    className={cn(' w-full h-full text-sm whitespace-nowrap rounded-md hover:text-purple-300 hover:bg-neutral-700 cursor-pointer', browses === genre.path && ' text-purple-300')}
                >
                    <Link to={routes.browsesBuilder(genre.path)} className=" block py-2 px-3">
                        {genre.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default Header;
