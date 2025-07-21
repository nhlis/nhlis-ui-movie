import { useState } from 'react';

interface SourceConfig {
    maxWidth: number;
    srcSet: string;
}

interface ImageProps {
    src: string;
    alt?: string;
    sources?: SourceConfig[];
    className?: string;
    loading?: 'lazy' | 'eager';
    fallback?: string;
}

export const Image = ({ src, alt = '', sources = [], className = '', loading = 'lazy', fallback }: ImageProps) => {
    const [errored, setErrored] = useState(false);

    return (
        <picture>
            {!errored && sources.map((source, i) => <source key={i} media={`(max-width: ${source.maxWidth}rem)`} srcSet={source.srcSet} />)}

            <img
                src={errored && fallback ? fallback : src}
                alt={alt}
                className={className}
                loading={loading}
                draggable={false}
                onError={() => {
                    if (fallback && !errored) {
                        setErrored(true);
                    }
                }}
            />
        </picture>
    );
};
