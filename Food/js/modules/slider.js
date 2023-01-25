function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
  // Slider

  const
    slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prevSlide = document.querySelector(prevArrow),
    nextSlide = document.querySelector(nextArrow),
    total = document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
    // для карусели
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;

  let
    slideIndex = 1,
    offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  // скрытие слайдов не попадающих в ширину враппера
  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  });

  slider.style.position = 'relative';

  // добавление кнопок (точек) на слайдер
  const
    indicators = document.createElement('ol'),
    dots = [];

  indicators.classList.add('courusel-indicators');
  indicators.style.cssText = `  
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 15;
  display: flex;
  justify-content: center;
  margin-right: 15%;
  margin-left: 15%;
  list-style: none;
`;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: 0.5;
    transition: opacity 0.6s ease;
  `;

    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  function widthDigits(str) {
    return +str.replace(/\D/g, '');
  }

  nextSlide.addEventListener('click', () => {
    // получение значения width из строки без 'px'
    if (offset == widthDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += widthDigits(width);
    }

    // смещение на один слайд
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    currentSlide();
    dotSelector();
  });

  prevSlide.addEventListener('click', () => {
    // получение значения width из строки без 'px'
    if (offset == 0) {
      offset = widthDigits(width) * (slides.length - 1);
    } else {
      offset -= widthDigits(width);
    }

    // смещение на один слайд
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    currentSlide();
    dotSelector();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = widthDigits(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      currentSlide();
      dotSelector();
    });
  });

  function dotSelector() {
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = '1';
  }

  function currentSlide() {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }
}

export default slider;