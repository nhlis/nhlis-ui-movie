/*
 * @license MIT
 * Copyright (c) 2025 Hải Lý Nguyễn
 * Repository: https://github.com/hlxlevi/ReactJS-Portfoliohttp://192.168.1.9:5173/browses/shounen
 */

import { routes } from '@/constants/routes/routes';
import { socialItems } from '@/constants/social';
import { sortsPathObject } from '@/constants/sorts';
import { Link } from 'react-router';

function Footer() {
    return (
        <footer className=" h-full bg-[var(--bg-color)] mt-10 flex items-center justify-center flex-col gap-10 py-10 text-white">
            <h1 className=" text-name flex-center flex-nowrap font-bold text-5xl">nhlis</h1>
            <nav className=" flex-center gap-5 flex-wrap px-2">
                <Link to={routes.home}>
                    <h5 className=" font-semibold">Home</h5>
                </Link>
                <Link to={routes.browsesBuilder(sortsPathObject.newest.path)}>
                    <h5 className=" font-semibold">New</h5>
                </Link>
                <Link to={routes.browsesBuilder(sortsPathObject.popularity.path)}>
                    <h5 className=" font-semibold">Popular</h5>
                </Link>
                <Link to={routes.browsesBuilder(sortsPathObject.popularity.path)}>
                    <h5 className=" font-semibold">Seasons</h5>
                </Link>
            </nav>
            <div className=" flex-center gap-5">
                {socialItems.map(({ key, href, icon: Icon }) => (
                    <a className=" hover-animation" href={href} key={key} target="_blank">
                        <Icon size={25} />
                    </a>
                ))}
            </div>
            <p className="mt-10 text-sm text-neutral-500 text-center">
                © {new Date().getFullYear()} Built by <span className="font-semisemibold text-neutral-700">nhlis</span>. Contact:{' '}
                <a href="mailto:nhly.dev@gmail.com" className=" hover:text-blue-500">
                    nhly.dev@gmail.com
                </a>
            </p>
        </footer>
    );
}

export default Footer;
