import React from 'react'
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const data = [
  // ... your data
];
const Home2 = () => {
  const [order, setOrder] = useState([0, 1, 2, 3, 4, 5]);
  const [detailsEven, setDetailsEven] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const cardWidth = 200;
  const cardHeight = 300;
  const gap = 40;
  const numberSize = 50;
  const ease = 'sine.inOut';

  useEffect(() => {
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    };

    const loadImages = async () => {
      const promises = data.map(({ image }) => loadImage(image));
      try {
        await Promise.all(promises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('One or more images failed to load', error);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const initializeAnimations = () => {
      const [active, ...rest] = order;
      const detailsActive = detailsEven ? '#details-even' : '#details-odd';
      const detailsInactive = detailsEven ? '#details-odd' : '#details-even';
      const { innerHeight: height, innerWidth: width } = window;
      const offsetTop = height - 430;
      const offsetLeft = width - 830;

      gsap.set('#pagination', {
        top: offsetTop + 330,
        left: offsetLeft,
        y: 200,
        opacity: 0,
        zIndex: 60,
      });
      gsap.set('nav', { y: -200, opacity: 0 });

      gsap.set(`#card${active}`, {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      });
      gsap.set(`#card-content-${active}`, { x: 0, y: 0, opacity: 0 });
      gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
      gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
      gsap.set(`${detailsInactive} .text`, { y: 100 });
      gsap.set(`${detailsInactive} .title-1`, { y: 100 });
      gsap.set(`${detailsInactive} .title-2`, { y: 100 });
      gsap.set(`${detailsInactive} .desc`, { y: 50 });
      gsap.set(`${detailsInactive} .cta`, { y: 60 });

      gsap.set('.progress-sub-foreground', {
        width: 500 * (1 / order.length) * (active + 1),
      });

      rest.forEach((i, index) => {
        gsap.set(`#card${i}`, {
          x: offsetLeft + 400 + index * (cardWidth + gap),
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: 10,
        });
        gsap.set(`#card-content${i}`, {
          x: offsetLeft + 400 + index * (cardWidth + gap),
          zIndex: 40,
          y: offsetTop + cardHeight - 100,
        });
        gsap.set(`#slide-item${i}`, { x: (index + 1) * numberSize });
      });

      gsap.set('.indicator', { x: -window.innerWidth });

      const startDelay = 0.6;

      gsap.to('.cover', {
        x: width + 400,
        delay: 0.5,
        ease,
        onComplete: () => {
          setTimeout(() => {
            loop();
          }, 500);
        },
      });
      rest.forEach((i, index) => {
        gsap.to(`#card${i}`, {
          x: offsetLeft + index * (cardWidth + gap),
          zIndex: 30,
          delay: 0.05 * index,
          ease,
          delay: startDelay,
        });
        gsap.to(`#card-content${i}`, {
          x: offsetLeft + index * (cardWidth + gap),
          zIndex: 40,
          delay: 0.05 * index,
          ease,
          delay: startDelay,
        });
      });
      gsap.to('#pagination', { y: 0, opacity: 1, ease, delay: startDelay });
      gsap.to('nav', { y: 0, opacity: 1, ease, delay: startDelay });
      gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
    };

    initializeAnimations();
  }, [imagesLoaded]);

  const step = async () => {
    const newOrder = [...order.slice(1), order[0]];
    setOrder(newOrder);
    setDetailsEven(!detailsEven);

    const detailsActive = detailsEven ? '#details-even' : '#details-odd';
    const detailsInactive = detailsEven ? '#details-odd' : '#details-even';

    document.querySelector(`${detailsActive} .place-box .text`).textContent = data[newOrder[0]].place;
    document.querySelector(`${detailsActive} .title-1`).textContent = data[newOrder[0]].title;
    document.querySelector(`${detailsActive} .title-2`).textContent = data[newOrder[0]].title2;
    document.querySelector(`${detailsActive} .desc`).textContent = data[newOrder[0]].description;

    gsap.to(detailsInactive, { opacity: 0, x: -200, zIndex: 12, ease });

    gsap.set(detailsActive, { zIndex: 22 });
    gsap.to(detailsActive, { opacity: 1, x: 0, ease });
  };

  const loop = () => {
    step();
    setTimeout(() => {
      loop();
    }, 3000); // Adjust the interval time as needed
  };
  return (
    <div>
      <div className="indicator"></div>

      <nav>
        <div>
          <div className="svg-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
          </div>
          <div>Globe Express</div>
        </div>
        <div>
          <div className="active">Home</div>
          <div>Holidays</div>
          <div>Destinations</div>
          <div>Flights</div>
          <div>Offers</div>
          <div>Contact</div>
          <div className="svg-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>
      </nav>

      <div id="pagination">
        <div className="progress-background">
          <div className="progress-foreground"></div>
          <div className="progress-sub-foreground"></div>
        </div>
        <div className="slide-numbers">
          {order.map((_, i) => (
            <div id={`slide-item${i}`} key={i}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <div id="card-container">
        {order.map((i, index) => (
          <div id={`card${i}`} className="card" key={index}>
            <img src={data[i].image} alt="" />
            <div id={`card-content${i}`} className="card-content">
              <div className="card-text">{data[i].title}</div>
            </div>
          </div>
        ))}
      </div>

      <div id="details-even" className="details">
        <div className="place-box">
          <div className="text">{data[0].place}</div>
        </div>
        <div className="title-1">{data[0].title}</div>
        <div className="title-2">{data[0].title2}</div>
        <div className="desc">{data[0].description}</div>
        <div className="cta">Learn More</div>
      </div>

      <div id="details-odd" className="details">
        <div className="place-box">
          <div className="text">{data[1].place}</div>
        </div>
        <div className="title-1">{data[1].title}</div>
        <div className="title-2">{data[1].title2}</div>
        <div className="desc">{data[1].description}</div>
        <div className="cta">Learn More</div>
      </div>

      <div className="cover"></div>
    </div>
  )
}

export default Home2;