import { cn } from '@/lib/utils';
import type { Ref } from 'react';
import type React from 'react';
import { Link } from 'react-router';

export function Button({
    children,
    onClick,
    to,
    href,
    ref,
    className,
    disabled,
}: {
    children: React.ReactNode;
    onClick?: () => void;
    to?: string;
    href?: string;
    ref?: Ref<HTMLButtonElement> | null;
    className?: string;
    disabled?: boolean;
}) {
    const Component: React.ElementType = to ? Link : href ? 'a' : 'button';

    const props: React.HTMLProps<HTMLButtonElement> | React.AnchorHTMLAttributes<HTMLAnchorElement> = {
        onClick,
        ref,
        ...(href ? { href } : {}),
        ...(to ? { to } : {}),
    };

    if (disabled) {
        props.onClick = undefined;
    }

    const classes = cn(' border border-white/50 rounded-md bg-neutral-900/50 hover:bg-neutral-800/50 px-4 py-[6px]', disabled && ' cursor-not-allowed opacity-50', className);

    return (
        <Component className={classes} {...props}>
            {children}
        </Component>
    );
}
