import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import ThumbImage from "./thumb-image";

type CarCarouselProps = {
  slides: string[];
  options?: EmblaOptionsType;
};

export const CarCarousel = ({ slides, options }: CarCarouselProps): ReactElement => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <Image
                src={slide}
                alt={""}
                width={1080}
                height={1080}
                className="h-auto w-full"
                id="carousel-selected-image"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map((slide, index) => (
              <ThumbImage
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                slide={slide}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCarousel;
