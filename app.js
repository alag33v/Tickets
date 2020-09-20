// Находим все места
const [...place] = document.querySelectorAll('.place')
const totalCost = document.querySelector('.price')

// Цена на билеты
const price = {
  basic: 100,
  vip: 200
}

// При нажатии на место всплывает pop-up, если сумма не была введена
place.forEach((element) => {
  element.addEventListener('click', addSurfacingPopup)
})

// При нажатии на кнопку всплывает pop-up
const orderBtn = document.querySelector('.order__btn')
const modal = document.querySelector('.modal')
const buyBtn = document.querySelector('.buy__btn')
const modalEndBtn = document.querySelector('.modal-end__btn')

orderBtn.addEventListener('click', () => {
  addSurfacingPopup()
})

// Скрываем pop-up
document.addEventListener('mouseup', (e) => {
  if (e.target.closest('.modal') === null) {
    removeSurfacingPopup()
  }
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    removeSurfacingPopup()
  }
});

// Находим input и задаем условие в зависимости от суммы
const input = document.querySelector('.modal__input')
const modalBtn = document.querySelector('.modal__btn')
const inputValue = document.querySelector('.input__value')
const modalEnd = document.querySelector('.modal-end')

modalBtn.addEventListener('click', () => {
  let result = Number(input.value)
  // Сохраняем сумму введенную человеком
  inputValue.value = result

  // Делаем проверку хватает ли покупателю на покупку билета
  if (result < price.basic) {
    alert('У вас недостаточно денежных средств')
  } else {
    place.map((element) => {
      if (element.classList.contains('vip__place')) {
        if (result >= price.vip) {
          element.classList.remove('place--disabled')
        } else {
          element.classList.add('place--disabled')
        }
      } else {
        if (result >= price.basic) {
          element.classList.remove('place--disabled')
        } else {
          element.classList.add('place--disabled')
        }
      }
    })

    // Удаляется pop-up при нажатии на место, и теперь оно становится заблокированным

    let totalCostSum = null
    place.map((element) => {
      element.removeEventListener('click', addSurfacingPopup)
      element.addEventListener('click', () => {
        if (element.classList.contains('vip__place') && inputValue.value >= price.vip) {
          if (element.classList.contains('place--disabled')) {
            alert('Место уже занято')
          } else {
            let buyerMoney = Number(inputValue.value) - price.vip
            inputValue.value = buyerMoney
            element.classList.add('place--disabled')
            totalCostSum = totalCostSum + price.vip
            totalCost.innerHTML = totalCostSum
          }
        } else if (element.classList.contains('ordinary__place') && inputValue.value >= price.basic) {
          if (element.classList.contains('place--disabled')) {
            alert('Место уже занято')
          } else {
            let buyerMoney = Number(inputValue.value) - price.basic
            inputValue.value = buyerMoney
            element.classList.add('place--disabled')
            totalCostSum = totalCostSum + price.basic
            totalCost.innerHTML = totalCostSum
          }
        } else {
          alert('У вас недостаточно денежных средств')
        }
      })
    })

    // Добавляем новый input с бюджетом покупателя, добавляем кнопку купить, удаляем обработчик событий, и очищаем старый input
    inputValue.classList.add('input__value--active')
    buyBtn.classList.add('buy__btn--active')
    removeSurfacingPopup()
    input.value = ''
    orderBtn.classList.add('order__btn--disable')
  }
})

buyBtn.addEventListener('click', () => {
  modalEnd.classList.add('modal-end--active')

  // Скрываем pop-up
  modalEndBtn.addEventListener('click', () => {
    modalEnd.classList.remove('modal-end--active')
  })
})

// Добавляется класс чтобы pop-up всплыл
function addSurfacingPopup() {
  modal.classList.add('modal--active')
}

// Добавляется класс чтобы pop-up исчез
function removeSurfacingPopup() {
  modal.classList.remove('modal--active')
}