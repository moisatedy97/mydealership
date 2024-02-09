import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Main() {
  return (
    <>
      <CardSection />
      <div className="container mx-auto max-w-2xl space-y-10 py-20 text-center">
        <div>
          <h1 className="text-4xl font-extrabold">Garlic bread with cheese: What the science tells us</h1>
        </div>
        <div>
          <p>
            For years parents have espoused the health benefits of eating garlic bread with cheese to their children,
            with the food earning such an iconic status in our culture that kids will often dress up as warm, cheesy
            loaf for Halloween.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-5">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Total Page Views</div>
              <div className="stat-value">89,400</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Total Page Views</div>
              <div className="stat-value">89,400</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Total Page Views</div>
              <div className="stat-value">89,400</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mb-20">
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://coreui.io/images/templates/coreui_pro_default_v3_1440.webp"
            className="rounded-md"
            alt="Shoes"
          />
          <img src="https://i.ytimg.com/vi/6dc6RFSbgew/maxresdefault.jpg" alt="Shoes" className="rounded-md" />
        </div>
      </div>
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
