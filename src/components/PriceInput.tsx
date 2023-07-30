"use client";

import Image from "next/image";
import { useForm, UseFormSetValue } from "react-hook-form";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import Stripe from "stripe";

interface PriceInputProps {
  products: Stripe.Price[];
  setValue: UseFormSetValue<OrderProps>;
}

interface CradInputProps {
  item: Stripe.Price;
  index: number;
}

const Card = ({ item, index }: CradInputProps) => {
  return (
    <div
      key={item.id}
      className={`flex h-full flex-col items-center justify-center px-5 pb-12`}
    >
      <Image
        src={(item.product as Stripe.Product).metadata[`cover-${item.id}`]}
        alt={(item.product as Stripe.Product).metadata[`altCover${index + 1}`]}
        width={660}
        height={510}
        quality={100}
        className={`h-auto max-h-96 w-auto rounded-md object-cover drop-shadow-card`}
      />

      <h3 className={`pt-6 text-center font-bold`}>
        {item.nickname} {(item.product as Stripe.Product).unit_label} | R$
        {item.unit_amount! / 100}
      </h3>
    </div>
  );
};

export function PriceInput({ products, setValue }: PriceInputProps) {
  const { register } = useForm();

  return (
    <section>
      <Carousel
        showArrows={false}
        showStatus={false}
        transitionTime={550}
        animationHandler="slide"
        emulateTouch
        showThumbs={false}
        onChange={(index, item) => {
          const value = (item as { props: { item: Stripe.Price } })?.props.item.id;

          setValue("priceId", value);
        }}
        renderIndicator={(onClickHandler, isSelected, index) => {
          if (isSelected) {
            return (
              <input
                className="mx-2 inline-block h-4 w-4 rounded-lg bg-secondary checked:bg-image-none focus:ring-transparent focus:ring-offset-transparent"
                type="radio"
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                tabIndex={0}
                title={`${products[index].nickname} ml = R$ ${
                  products[index].unit_amount! / 100
                }`}
                aria-label={`${products[index].nickname} ml = R$ ${
                  products[index].unit_amount! / 100
                }`}
                value={products[index].nickname!}
                {...register("priceId")}
              />
            );
          }
          return (
            <input
              className="mx-2 inline-block h-4 w-4 rounded-lg bg-white focus:ring-transparent focus:ring-offset-transparent"
              type="radio"
              role="button"
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              tabIndex={0}
              title={`R$ ${products[index].unit_amount! / 100}`}
              aria-label={`R$ ${products[index].unit_amount! / 100}`}
              value={products[index].unit_amount!}
              {...register("priceId")}
            />
          );
        }}
      >
        {products.map((item, i) => {
          return <Card key={item.id} item={item} index={i} />;
        })}
      </Carousel>
    </section>
  );
}
