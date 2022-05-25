/**
 *
 * @param {{x: number, y: number}} from      - Начальные координаты {x, y}
 * @param {{x: number, y: number}} to        - Конечные координаты {x, y}
 * @param {number} duration                  - Продолжительность в секундах
 * @param {number} speed                     - Линейная скорость в м/с
 * @returns {Array<{x: number, y: number}>}  Возвращает массив изменений игрового объекта
 */

//перемещение объекта
function moveTo(from, to, duration, speed) {
  const gameObject = { ...from }

  //вычисляем вектор направления
  const vector2D = {
    x: to.x - from.x,
    y: to.y - from.y,
  }

  //находим расстояние и время
  const distance = Math.sqrt(vector2D.x * vector2D.x + vector2D.y * vector2D.y)
  const time = distance / speed

  //находим вектор скорости
  const velocity2D = {
    x: vector2D.x / time,
    y: vector2D.y / time,
  }

  const values = []

  for (let i = 0; i < duration; i++) {
    gameObject.x = round(gameObject.x + velocity2D.x)
    gameObject.y = round(gameObject.y + velocity2D.y)
    values.push({ ...gameObject })
  }

  return values
}

//console.log(moveTo({ x: 0, y: 0 }, { x: 10, y: -10 }, 20, Math.SQRT1_2))

/**
 *
 * @param {{x: number, y: number}} rotation    - Вектор направления {x,y}
 * @param {number} duration                    - Продолжительность в секундах
 * @param {number} angularVelocity             - Угловая скорость в рад/с
 * @param {boolean} isClockwise                - По часовой стрелке или против в левосторонней системе координат
 * @returns {Array<{x: number, y: number}>}    Возвращает массив изменений игрового объекта
 */

//поворот объекта
function rotate(rotation, duration, angularVelocity, isClockwise = false) {
  const gameObject = { ...rotation }

  //находим синус и косунус угла
  const cos = Math.cos(angularVelocity)
  const sin = Math.sin(angularVelocity)

  const values = []

  for (let i = 0; i < duration; i++) {
    /* умножаем на матрицу поворота
    x' = x cosθ - y sinθ
    y' = x sinθ + y cosθ */
    const { x, y } = gameObject
    if (isClockwise) {
      gameObject.x = round(x * cos - y * sin)
      gameObject.y = round(x * sin + y * cos)
    } else {
      gameObject.x = round(x * cos + y * sin)
      gameObject.y = round(-x * sin + y * cos)
    }

    values.push({ ...gameObject })
  }

  return values
}

//console.log(rotate({ x: 0, y: 1 }, 24, Math.PI / 12))
//console.log(rotate({ x: 0, y: 1 }, 24, Math.PI / 12, true))

/**
 *
 * @param {{x: number, y: number}} from      - Начальные координаты {x, y}
 * @param {{x: number, y: number}} to        - Конечные координаты {x, y}
 * @param {number} duration                  - Продолжительность в секундах
 * @param {number} speed                     - Линейная скорость в м/с
 * @param {number} acceleration              - Ускорение в м/с2
 * @returns {Array<{x: number, y: number, speed: number}>}  Возвращает массив изменений игрового объекта
 */

//перемещение с ускорением
function moveToWithAcceleration(from, to, duration, speed, acceleration) {
  const gameObject = { ...from, speed }

  const vector2D = {
    x: to.x - from.x,
    y: to.y - from.y,
  }

  const distance = Math.sqrt(vector2D.x * vector2D.x + vector2D.y * vector2D.y)

  const values = []

  for (let i = 0; i < duration; i++) {
    const time = distance / gameObject.speed
    const velocity2D = {
      x: vector2D.x / time,
      y: vector2D.y / time,
    }

    gameObject.x = round(gameObject.x + velocity2D.x)
    gameObject.y = round(gameObject.y + velocity2D.y)
    gameObject.speed = round(gameObject.speed + acceleration)
    values.push({ ...gameObject })
  }

  return values
}

//console.log(moveToWithAcceleration({ x: 0, y: 1029 }, { x: 10, y: 0 }, 15, 0, 9.8))

/**
 *
 * @param {{x: number, y: number}} from      - Начальные координаты {x, y}
 * @param {{x: number, y: number}} to        - Конечные координаты {x, y}
 * @param {number} duration                  - Продолжительность в секундах
 * @param {number} speed                     - Линейная скорость в м/с
 * @param {number} breaking                  - Коэффициент торможения 0..1
 * @returns {Array<{x: number, y: number, speed: number}>}  Возвращает массив изменений игрового объекта
 */

//перемещение с торможением
function moveToWithBreaking(from, to, duration, speed, breaking) {
  const gameObject = { ...from, speed }

  const vector2D = {
    x: to.x - from.x,
    y: to.y - from.y,
  }

  const distance = Math.sqrt(vector2D.x * vector2D.x + vector2D.y * vector2D.y)

  const values = []

  for (let i = 0; i < duration; i++) {
    const time = distance / gameObject.speed
    const velocity2D = {
      x: vector2D.x / time,
      y: vector2D.y / time,
    }

    gameObject.x = round(gameObject.x + velocity2D.x)
    gameObject.y = round(gameObject.y + velocity2D.y)
    gameObject.speed = round(gameObject.speed * breaking)
    values.push({ ...gameObject })
  }

  return values
}

//console.log(moveToWithBreaking({ x: 0, y: 0 }, { x: 60, y: 5 }, 7, 30, 0.5))

function round(x) {
  return +x.toFixed(5)
}
