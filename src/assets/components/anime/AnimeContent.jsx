import React, { useState } from 'react'
import FButton from '../buttons/FButton';

function AnimeContent ({animeData}) {
    const anime = {
        title: animeData.data.title_english ? animeData.data.title_english : animeData.data.title,
        status: animeData.data.status,
        genres: animeData.data.genres,
        themes: animeData.data.themes,
        synopsis: animeData.data.synopsis,
        score: animeData.data.score,
        rating: animeData.data.rating,
        year: animeData.data.year,
        trailer: animeData.data.trailer.embed_url,
        trailerImage: animeData.data.trailer.images.medium_image_url
    }

    const [expandSynopsis, toggleSynopsis] = useState(false);
    const synopsisMaxLength = 150;

    function TagsElement ({ children }) {
        return (
            <button className="px-5 py-1 rounded bg-border-primary bg-opacity-30 hover:bg-opacity-20 transition duration-150 text-sm">{children}</button>
        );
    }

    return (
    <section className='flex flex-row gap-8'>
        <div className="relative w-[560px] h-[315px]">
            <iframe
                className="rounded-xl absolute z-10 w-full h-full"
                src={anime.trailer}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            >    
            </iframe>
            <div
                className={`
                    absolute
                    top-0
                    left-0
                    scale-110
                    w-full
                    h-full
                    blur-xl
                    opacity-30
                `}
                style={{
                    background: `url('${anime.trailerImage}')`
                }}
            ></div>
        </div>
        <div className="text-white flex flex-col gap-4">
            <header className='font-bold font-montserrat'>
                <div className="text-3xl">
                    {anime.title}
                </div>
                <div className="text-xl text-primary">{animeData.data.status}</div>
            </header>
            <div className="font-noto-sans">
                <article className="relative">
                    <p className={expandSynopsis && `
                        before:content-['']
                        before:absolute
                        before:bottom-0
                        before:left-0
                        before:w-full
                        before:h-1/2
                        before:from-transparent
                        before:to-yawn-primary
                        before:bg-gradient-to-b
                    `}>
                        {!expandSynopsis ? 
                            anime.synopsis.length > synopsisMaxLength ? anime.synopsis.slice(0, synopsisMaxLength) + "..." : anime.synopsis :
                            anime.synopsis
                        }
                    </p>
                </article>
                {anime.synopsis.length > synopsisMaxLength && <button className="text-primary" onClick={() => { toggleSynopsis(!expandSynopsis) }}>
                    {expandSynopsis ? "Read Less" : "Read More"}
                </button>}
            </div>
            <div className="flex flex-row items-center gap-4">
                <div className="border-2 flex flex-row font-bold p-1 w-20 justify-center border-gold text-gold rounded-md">{anime.score}</div>
                <div className="font-bold font-noto-sans text-lg">{anime.rating} | {anime.year}</div>
            </div>
            <div className="flex flex-row items-center gap-4">
                {anime.genres.map(g => {
                    return <TagsElement>{g.name}</TagsElement>
                })}
                {anime.themes.map(t => {
                    return <TagsElement>{t.name}</TagsElement>
                })}
            </div>
            <div className="flex flex-row items-center gap-4">
                <FButton mode="original">Watch</FButton>
                <FButton mode="invert">Add to list</FButton>
            </div>
        </div>
    </section>
    )
}

export default AnimeContent;