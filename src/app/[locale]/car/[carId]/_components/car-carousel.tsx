"use client";

import EmblaCarousel, { EmblaOptionsType } from "embla-carousel";
import { addThumbBtnsClickHandlers, addToggleThumbBtnsActive } from "./thumb-buttons";
import "./css/base.css";
import "./css/sandbox.css";
import "./css/embla.css";

export function CarCarousel() {
  const OPTIONS: EmblaOptionsType = {};
  const OPTIONS_THUMBS: EmblaOptionsType = {
    containScroll: "keepSnaps",
    dragFree: true,
  };

  const viewportNodeMainCarousel: any = document.querySelector(".embla__viewport");
  const viewportNodeThumbCarousel: any = document.querySelector(".embla-thumbs__viewport");
  const emblaApiMain = EmblaCarousel(viewportNodeMainCarousel, OPTIONS);
  const emblaApiThumb = EmblaCarousel(viewportNodeThumbCarousel, OPTIONS_THUMBS);

  const removeThumbBtnsClickHandlers = addThumbBtnsClickHandlers(emblaApiMain, emblaApiThumb);
  const removeToggleThumbBtnsActive = addToggleThumbBtnsActive(emblaApiMain, emblaApiThumb);

  emblaApiMain.on("destroy", removeThumbBtnsClickHandlers).on("destroy", removeToggleThumbBtnsActive);

  emblaApiThumb.on("destroy", removeThumbBtnsClickHandlers).on("destroy", removeToggleThumbBtnsActive);

  return (
    <section className="sandbox__carousel">
      <div className="embla">
        <div className="embla__viewport">
          <div className="embla__container">
            <div className="embla__slide">
              <div className="embla__slide__number">
                <span>1</span>
              </div>
              <img className="embla__slide__img" src="src/images/slide-1.jpg" alt="Your alt text" />
            </div>
            <div className="embla__slide">
              <div className="embla__slide__number">
                <span>2</span>
              </div>
              <img className="embla__slide__img" src="src/images/slide-2.jpg" alt="Your alt text" />
            </div>
            <div className="embla__slide">
              <div className="embla__slide__number">
                <span>3</span>
              </div>
              <img className="embla__slide__img" src="src/images/slide-3.jpg" alt="Your alt text" />
            </div>
            <div className="embla__slide">
              <div className="embla__slide__number">
                <span>4</span>
              </div>
              <img className="embla__slide__img" src="src/images/slide-4.jpg" alt="Your alt text" />
            </div>
            <div className="embla__slide">
              <div className="embla__slide__number">
                <span>5</span>
              </div>
              <img className="embla__slide__img" src="src/images/slide-1.jpg" alt="Your alt text" />
            </div>
            <div className="embla__slide">
              <div className="embla__slide__number">
                <span>6</span>
              </div>
              <img className="embla__slide__img" src="src/images/slide-2.jpg" alt="Your alt text" />
            </div>
            <div className="embla__slide">
              <div className="embla__slide__number">
                <span>7</span>
              </div>
              <img className="embla__slide__img" src="src/images/slide-3.jpg" alt="Your alt text" />
            </div>
            <div className="embla__slide">
              <div className="embla__slide__number">
                <span>8</span>
              </div>
              <img className="embla__slide__img" src="src/images/slide-4.jpg" alt="Your alt text" />
            </div>
            <div className="embla__slide">
              <div className="embla__slide__number">
                <span>9</span>
              </div>
              <img className="embla__slide__img" src="src/images/slide-1.jpg" alt="Your alt text" />
            </div>
            <div className="embla__slide">
              <div className="embla__slide__number">
                <span>10</span>
              </div>
              <img className="embla__slide__img" src="src/images/slide-2.jpg" alt="Your alt text" />
            </div>
          </div>
        </div>
        <div className="embla-thumbs">
          <div className="embla-thumbs__viewport">
            <div className="embla-thumbs__container">
              <div className="embla-thumbs__slide embla-thumbs__slide--selected">
                <button className="embla-thumbs__slide__button" type="button">
                  <div className="embla-thumbs__slide__number">
                    <span>1</span>
                  </div>
                  <img className="embla-thumbs__slide__img" src="src/images/slide-1.jpg" alt="Your alt text" />
                </button>
              </div>
              <div className="embla-thumbs__slide">
                <button className="embla-thumbs__slide__button" type="button">
                  <div className="embla-thumbs__slide__number">
                    <span>2</span>
                  </div>
                  <img className="embla-thumbs__slide__img" src="src/images/slide-2.jpg" alt="Your alt text" />
                </button>
              </div>
              <div className="embla-thumbs__slide">
                <button className="embla-thumbs__slide__button" type="button">
                  <div className="embla-thumbs__slide__number">
                    <span>3</span>
                  </div>
                  <img className="embla-thumbs__slide__img" src="src/images/slide-3.jpg" alt="Your alt text" />
                </button>
              </div>
              <div className="embla-thumbs__slide">
                <button className="embla-thumbs__slide__button" type="button">
                  <div className="embla-thumbs__slide__number">
                    <span>4</span>
                  </div>
                  <img className="embla-thumbs__slide__img" src="src/images/slide-4.jpg" alt="Your alt text" />
                </button>
              </div>
              <div className="embla-thumbs__slide">
                <button className="embla-thumbs__slide__button" type="button">
                  <div className="embla-thumbs__slide__number">
                    <span>5</span>
                  </div>
                  <img className="embla-thumbs__slide__img" src="src/images/slide-1.jpg" alt="Your alt text" />
                </button>
              </div>
              <div className="embla-thumbs__slide">
                <button className="embla-thumbs__slide__button" type="button">
                  <div className="embla-thumbs__slide__number">
                    <span>6</span>
                  </div>
                  <img className="embla-thumbs__slide__img" src="src/images/slide-2.jpg" alt="Your alt text" />
                </button>
              </div>
              <div className="embla-thumbs__slide">
                <button className="embla-thumbs__slide__button" type="button">
                  <div className="embla-thumbs__slide__number">
                    <span>7</span>
                  </div>
                  <img className="embla-thumbs__slide__img" src="src/images/slide-3.jpg" alt="Your alt text" />
                </button>
              </div>
              <div className="embla-thumbs__slide">
                <button className="embla-thumbs__slide__button" type="button">
                  <div className="embla-thumbs__slide__number">
                    <span>8</span>
                  </div>
                  <img className="embla-thumbs__slide__img" src="src/images/slide-4.jpg" alt="Your alt text" />
                </button>
              </div>
              <div className="embla-thumbs__slide">
                <button className="embla-thumbs__slide__button" type="button">
                  <div className="embla-thumbs__slide__number">
                    <span>9</span>
                  </div>
                  <img className="embla-thumbs__slide__img" src="src/images/slide-1.jpg" alt="Your alt text" />
                </button>
              </div>
              <div className="embla-thumbs__slide">
                <button className="embla-thumbs__slide__button" type="button">
                  <div className="embla-thumbs__slide__number">
                    <span>10</span>
                  </div>
                  <img className="embla-thumbs__slide__img" src="src/images/slide-2.jpg" alt="Your alt text" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
