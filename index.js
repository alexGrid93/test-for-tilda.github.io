// Определяем элементы, с которыми собираемся работать
const title = document.querySelector(".card__title");
const description = document.querySelector(".card__description");
const priceOld = document.querySelector(".card__price_old");
const priceNew = document.querySelector(".card__price_new");
const quantityValue = document.querySelector(".card__quantity span");
const quantityArea = document.querySelector(".card__quantity");
const mainImg = document.querySelector(".card__main-image img");
const miniatures = document.querySelectorAll(".card__miniature-item img");
const cartCounter = document.querySelector(".cart__counter");
const addButton = document.querySelector(".card__button_add");
let cart = document.querySelector(".cart");

//Определяем функцию, которая заблокирует кнопку сделает серый фон поля quantityArea
function zeroGoods() {
  addButton.disabled = true;
  quantityArea.style = "background: var(--card-disabled-color)";
}

// Определяем функцию, которая будет подгружать данные о товаре и корзине в разметку
function LoadGoods() {
  fetch("https://store.tildacdn.com/api/tgetproduct/")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Разбираем строку с путями к картинкам
      let imagesArr = JSON.parse(data.images);

      // Загружаем в разметку "простые" данные о товаре
      title.innerHTML = data.title;
      description.innerHTML = data.descr;
      priceOld.innerHTML = `${data.priceold} р.`;
      priceNew.innerHTML = `${data.price} р.`;
      mainImg.src = imagesArr[0].img;
      quantityValue.innerHTML = data.quantity;
      cartCounter.innerHTML = "0";

      // Если товара нет, блокируем кнопку
      if (data.quantity == 0) {
        zeroGoods();
      }

      // Загружаем в разметку миниатюры товара
      imagesArr.forEach((element, index) => {
        miniatures[index].src = element.img;
      });
    });
}

// Определяем функцию, которая выводит миниатюру в mainImg
function showMiniature(event) {
  mainImg.src = event.target.src;
}

// Определяем функцию, которая имитирует добавление товара в корзину и уменьшает quantityValue
function addGood() {
  cartCounter.innerHTML = `${+cartCounter.innerHTML + 1}`;
  quantityValue.innerHTML = `${+quantityValue.innerHTML - 1}`;
  if (quantityValue.innerHTML == "0") {
    zeroGoods();
  }
}

// Навешиваем обработчики
document.addEventListener("DOMContentLoaded", LoadGoods);
miniatures.forEach((el) => el.addEventListener("click", showMiniature));
addButton.addEventListener("click", addGood);
