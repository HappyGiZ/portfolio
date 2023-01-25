import { getResource } from '../services/services';

function cards() {
  // Используем классы для создание карточек меню
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      // src картинки
      this.src = src;
      // alt текст если картинка не прогрузилась
      this.alt = alt;
      // заголовок карточки
      this.title = title;
      // описание
      this.descr = descr;
      // цена (в руб.)
      this.price = price;
      // массив классов, переданный через rest-оператор
      this.classes = classes;
      // курс доллар/рубль
      this.parent = document.querySelector(parentSelector);
      this.transfer = 60;
      this.changeToRUB();
    }

    changeToRUB() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
              <img src=${this.src} alt=${this.alt}>
              <h3 class="menu__item-subtitle">${this.title}</h3>
              <div class="menu__item-descr">${this.descr}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
              </div>
          `;
      this.parent.append(element);
    }
  }

  // из базы данных берётся массив с объектами и для каждого элемента массива (объекта) создаётся карточка
  getResource('http://localhost:3000/menu')
    .then(data => {
      // с использованием деструктуризации объекта
      data.forEach(({ img, altimg, title, descr, price }) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
      });
    });


  // axios.get('http://localhost:3000/menu')
  //   .then(data => data.data.forEach(({ img, altimg, title, descr, price }) => {
  //     new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
  //   })
  //   );
}

export default cards;