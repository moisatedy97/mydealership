import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Main() {
  return (
    <>
      <CardSection />
    </>
  );
}

const CardSection = () => {
  type Card = {
    image: {
      src: string;
      alt: string;
    };
    title: string;
    sentence: string;
    link: {
      title: string;
      href: string;
    };
  };

  const cards: Card[] = [
    {
      image: {
        src: "",
        alt: "dd",
      },
      title: "Shoes",
      sentence: "If a dog chews shoes whose shoes does he choose?",
      link: {
        title: "ddd",
        href: "fff",
      },
    },
    {
      image: {
        src: "",
        alt: "dd",
      },
      title: "Shoes",
      sentence: "If a dog chews shoes whose shoes does he choose?",
      link: {
        title: "ddd",
        href: "fff",
      },
    },
  ];

  return (
    <div className="grid gap-4 p-4 md:grid-cols-2">
      {cards.map((element: Card, index: number) => (
        <div className="card image-full bg-base-100 shadow-xl" key={index}>
          <figure>
            <Image src={element.image.src} width={1080} height={1080} alt={element.image.alt} />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-5xl  font-extrabold">{element.title}</h2>
            <p className="text-xl">{element.sentence}</p>
            <div className="card-actions justify-end">
              <Link className="btn btn-primary" href={element.link.href} rel="canonical">
                {element.link.title}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
