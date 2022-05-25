/**
 *
 * @param {{x: number, y: number, z: number}} from      - Начальные координаты {x, y, z}
 * @param {{x: number, y: number, z: number}} to        - Конечные координаты {x, y, z}
 * @param {number} duration                             - Продолжительность в секундах
 * @param {number} speed                                - Линейная скорость в м/с
 * @returns {Array<{x: number, y: number, z: number}>}  Возвращает массив изменений игрового объекта
 */

//перемещение объекта
function moveTo(from, to, duration, speed) {
  const gameObject = { ...from }

  //вычисляем вектор направления
  const vector3D = calculateVector(from, to)
  //находим расстояние
  const distance = calculateDistance(vector3D)
  //находим вектор скорости
  const velocity3D = calculateVelocity(vector3D, distance, speed)

  const values = []

  for (let i = 0; i < duration; i++) {
    gameObject.x = round(gameObject.x + velocity3D.x)
    gameObject.y = round(gameObject.y + velocity3D.y)
    gameObject.z = round(gameObject.z + velocity3D.z)
    values.push({ ...gameObject })
  }

  return values
}

//console.log(moveTo({ x: 0, y: 0, z: 0 }, { x: 10, y: -10, z: 10 }, 20, Math.sqrt(3) / 2))

/**
 *
 * @param {{x: number, y: number, z: number}} rotation    - Вектор направления {x,y,z}
 * @param {number} duration                               - Продолжительность в секундах
 * @param {number} angularVelocity                        - Угловая скорость в рад/с
 * @param {'x' | 'y' | 'z'} axis                          - Вращение вокруг оси
 * @returns {Array<{x: number, y: number}>}               Возвращает массив изменений игрового объекта
 */

//поворот объекта
function rotate(rotation, duration, angularVelocity, axis) {
  const gameObject = { ...rotation }

  //находим синус и косунус угла
  const cos = Math.cos(angularVelocity)
  const sin = Math.sin(angularVelocity)

  const values = []

  for (let i = 0; i < duration; i++) {
    //умножаем на матрицу поворота
    const { x, y, z } = gameObject
    switch (axis) {
      case 'x':
        gameObject.y = round(y * cos - z * sin)
        gameObject.z = round(y * sin + z * cos)
        break
      case 'y':
        gameObject.x = round(x * cos + z * sin)
        gameObject.z = round(-x * sin + z * cos)
        break
      case 'z':
        gameObject.x = round(x * cos - y * sin)
        gameObject.y = round(x * sin + y * cos)
        break
    }

    values.push({ ...gameObject })
  }

  return values
}

//console.log(rotate({ x: 0, y: 1, z: 0 }, 24, Math.PI / 12, 'x'))
//console.log(rotate({ x: 0, y: 0, z: 1 }, 24, Math.PI / 12, 'y'))
//console.log(rotate({ x: 0, y: 1, z: 0 }, 24, Math.PI / 12, 'z'))

/**
 *
 * @param {{x: number, y: number, z: number}} from      - Начальные координаты {x, y, z}
 * @param {{x: number, y: number, z: number}} to        - Конечные координаты  {x, y, z}
 * @param {number} duration                             - Продолжительность в секундах
 * @param {number} speed                                - Линейная скорость в м/с
 * @param {number} acceleration                         - Ускорение в м/с2
 * @returns {Array<{x: number, y: number, z: number speed: number}>}  Возвращает массив изменений игрового объекта
 */

//перемещение с ускорением
function moveToWithAcceleration(from, to, duration, speed, acceleration) {
  const gameObject = { ...from, speed }

  const vector3D = calculateVector(from, to)
  const distance = calculateDistance(vector3D)

  const values = []

  for (let i = 0; i < duration; i++) {
    const velocity3D = calculateVelocity(vector3D, distance, gameObject.speed)

    gameObject.x = round(gameObject.x + velocity3D.x)
    gameObject.y = round(gameObject.y + velocity3D.y)
    gameObject.z = round(gameObject.z + velocity3D.z)
    gameObject.speed = round(gameObject.speed + acceleration)
    values.push({ ...gameObject })
  }

  return values
}

//console.log(moveToWithAcceleration({ x: 0, y: 0, z: 1029 }, { x: 10, y: -10, z: 0 }, 15, 0, 9.8))

/**
 *
 * @param {{x: number, y: number, z: number}} from      - Начальные координаты {x, y, z}
 * @param {{x: number, y: number, z: number}} to        - Конечные координаты {x, y, z}
 * @param {number} duration                             - Продолжительность в секундах
 * @param {number} speed                                - Линейная скорость в м/с
 * @param {number} breaking                             - Коэффициент торможения 0..1
 * @returns {Array<{x: number, y: number, z: number, speed: number}>}  Возвращает массив изменений игрового объекта
 */

//перемещение с торможением
function moveToWithBreaking(from, to, duration, speed, breaking) {
  const gameObject = { ...from, speed }

  const vector3D = calculateVector(from, to)
  const distance = calculateDistance(vector3D)

  const values = []

  for (let i = 0; i < duration; i++) {
    const velocity3D = calculateVelocity(vector3D, distance, gameObject.speed)

    gameObject.x = round(gameObject.x + velocity3D.x)
    gameObject.y = round(gameObject.y + velocity3D.y)
    gameObject.z = round(gameObject.z + velocity3D.z)
    gameObject.speed = round(gameObject.speed * breaking)
    values.push({ ...gameObject })
  }

  return values
}

//console.log(moveToWithBreaking({ x: 0, y: 0, z: 0 }, { x: 60, y: 5, z: 10 }, 7, 30, 0.5))

function round(x) {
  return +x.toFixed(5)
}

/**
 *
 * @param {{x: number, y: number, z: number}} from
 * @param {{x: number, y: number, z: number}} to
 * @returns {{x: number, y: number, z: number}}
 */
function calculateVector(from, to) {
  return {
    x: to.x - from.x,
    y: to.y - from.y,
    z: to.z - from.z,
  }
}

/**
 *
 * @param {{x: number, y: number, z: number}} vector3D
 * @returns {number}
 */
function calculateDistance(vector3D) {
  return Math.sqrt(
    vector3D.x * vector3D.x + vector3D.y * vector3D.y + vector3D.z * vector3D.z
  )
}

/**
 *
 * @param {{x: number, y: number, z: number}} vector3D
 * @param {number} distance
 * @param {number} speed
 * @returns {{x: number, y: number, z: number}}
 */
function calculateVelocity(vector3D, distance, speed) {
  const time = distance / speed
  return {
    x: vector3D.x / time,
    y: vector3D.y / time,
    z: vector3D.z / time,
  }
}
