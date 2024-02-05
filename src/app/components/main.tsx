import React from "react";

const Main = () => {
  return (
    <>
      <div className="grid gap-4 p-4 md:grid-cols-2 ">
        <div className="card image-full bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/CH-local/2023/Unternehmen/Auslieferungen-2023/Macan-GTS.jpeg/jcr:content/Macan%20GTS.jpeg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
        <div className="card image-full bg-base-100 shadow-xl">
          <figure>
            <img src="https://www.autotecnica.org/wp-content/uploads/2016/09/A169159_medium.jpg" alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
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
};

export default Main;
