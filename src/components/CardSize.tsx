'use client'

import Image from 'next/image'
import { optionsAvailable } from '@/utils/data/optionsAvailable'
import { Carousel } from 'react-responsive-carousel'

import "react-responsive-carousel/lib/styles/carousel.min.css";

export function CardSize() {
    return (
        <section>
            <Carousel
                showArrows={false}
                showStatus={false}
                transitionTime={550}
                animationHandler='slide'
                showThumbs={false}
                renderIndicator={(onClickHandler, isSelected, index) => {
                    if (isSelected) {
                        return (
                            <li
                                className='inline-block bg-secondary h-4 w-4 rounded-lg mx-2'
                                aria-label={`Tamanho ${index + 1}`}
                                title={`Tamanho ${index + 1}`}
                            />
                        );
                    }
                    return (
                        <li
                            className='inline-block bg-white h-4 w-4 rounded-lg mx-2'
                            onClick={onClickHandler}
                            onKeyDown={onClickHandler}
                            value={index}
                            key={index}
                            role="button"
                            tabIndex={0}
                            title={`Tamanho ${index + 1}`}
                            aria-label={`Tamanho ${index + 1}`}
                        />
                    );
                }}
            >
                {optionsAvailable.sizes.map((item, i) => {
                    return (
                        <div
                            key={`Size${i + 1}`}
                            className={`flex flex-col items-center justify-between ${i != 1 ? 'pt-8' : ''}`}
                        >
                            <Image
                                src={item.imageRelativePath}
                                alt={item.altImage}
                                className={`drop-shadow-card rounded-md
                                        max-w-fit ${i == 0 ? '-mt-4' : ''}`}
                            />

                            <h3 className={`text-center font-bold pt-6 ${i == 2 ? '' : 'pb-12'}`}>
                                {item.volume} | R${item.price}
                            </h3>
                        </div>
                    )
                })}
            </Carousel>
        </section>
    )
}