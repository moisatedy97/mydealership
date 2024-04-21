import React, { ReactElement } from "react";
import Image from "next/image";

type ThumbImageProps = {
  selected: boolean;
  onClick: () => void;
  slide: string;
};

export default function ThumbImage({ selected, onClick, slide }: ThumbImageProps): ReactElement {
  return (
    <div className={"embla-thumbs__slide".concat(selected ? " embla-thumbs__slide--selected" : "")}>
      <button onClick={onClick} type="button" className="embla-thumbs__slide__number">
        <Image src={slide} alt={`${slide}`} priority={true} width={1080} height={1080} className="h-auto w-full" />
      </button>
    </div>
  );
}
