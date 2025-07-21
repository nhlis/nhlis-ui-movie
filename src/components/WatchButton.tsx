import { routes } from '@/constants/routes/routes';
import { Button } from './Button';
import { formatMovie } from '@/lib/handleMovie';
import { heroSlides } from '@/data/hero-slides';

export function WatchButton({ _id, className }: { _id: string; className: string }) {
    console.log(_id);

    return (
        <Button to={routes.movieBuilder(formatMovie(heroSlides[0].original_title, heroSlides[0]._id))} className={className}>
            <span className=" block w-full truncate text-center">Watch now</span>
        </Button>
    );
}
