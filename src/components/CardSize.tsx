"use client";

import Image from "next/image";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import Stripe from "stripe";

interface CardProps {
  products: Stripe.Price[];
}

export function CardSize({ products }: CardProps) {
  return (
    <section>
      <Carousel
        showArrows={false}
        showStatus={false}
        transitionTime={550}
        animationHandler="slide"
        showThumbs={false}
        emulateTouch
        renderIndicator={(onClickHandler, isSelected, index) => {
          if (isSelected) {
            return (
              <li
                className="mx-2 inline-block h-4 w-4 rounded-lg bg-secondary"
                title={`${products[index].nickname} ml = R$ ${
                  products[index].unit_amount! / 100
                }`}
                aria-label={`${products[index].nickname} ml = R$ ${
                  products[index].unit_amount! / 100
                }`}
              />
            );
          }
          return (
            <li
              className="mx-2 inline-block h-4 w-4 rounded-lg bg-white"
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex={0}
              title={`${products[index].nickname} ml = R$ ${
                products[index].unit_amount! / 100
              }`}
              aria-label={`${products[index].nickname} ml = R$ ${
                products[index].unit_amount! / 100
              }`}
            />
          );
        }}
      >
        {products.map((item, i) => {
          return (
            <div
              key={item.id}
              className={`flex h-full flex-col items-center justify-center px-5 pb-12`}
            >
              <Image
                src={(item.product as Stripe.Product).metadata[`cover-${item.id}`]}
                alt={
                  (item.product as Stripe.Product).metadata[`altCover${i + 1}`]
                }
                width={660}
                height={510}
                quality={100}
                priority={i == 1 ? true : false}
                className={`h-auto max-h-96 w-auto rounded-md object-cover drop-shadow-card`}
              />

              <h3 className={`pt-6 text-center font-bold`}>
                {item.nickname} {(item.product as Stripe.Product).unit_label} |
                R${item.unit_amount! / 100}
              </h3>
            </div>
          );
        })}
      </Carousel>
    </section>
  );
}
