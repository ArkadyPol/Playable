class IndexedMap {
  _map = new Map()
  _keys = []

  set(key, value) {
    if (!this.has(key)) {
      this._keys.push(key)
    }
    this._map.set(key, value)
    return this
  }
  has(key) {
    return this._map.has(key)
  }
  hasIndex(index) {
    return index < this.size()
  }
  get(key) {
    return this._map.get(key)
  }
  getByIndex(index) {
    return this._map.get(this._keys[index])
  }
  remove(key) {
    this._map.delete(key)
    const index = this._keys.indexOf(key)
    this._keys.splice(index, 1)
    return this
  }
  size() {
    return this._map.size
  }
  forEach(fn) {
    this._keys.forEach((key, index) => {
      fn(this.get(key), key, index)
    })
    return this
  }
  union(...maps) {
    maps.forEach(map => {
      map.forEach((value, key) => {
        this.set(key, value)
      })
    })
    return this
  }
  unique() {
    const values = new Set()
    this.forEach(value => values.add(value))
    return [...values]
  }
  uniqueKeys() {
    return this._keys
  }
  sort(fn) {
    const values = this._keys.map(key => [this.get(key), key])
    values.sort((a, b) => fn(a[0], b[0], a[1], b[1]))
    this._keys = values.map(value => value[1])
    return this
  }
  sortIndexes(fn) {
    const indexes = this._keys.map((_, i) => i)
    indexes.sort(fn)
    const sorted = indexes.map(i => this._keys[i])
    this._keys = sorted
    return this
  }
  setTo(index, value) {
    if (this.hasIndex(index)) {
      this.set(this._keys[index], value)
    }
    return this
  }
  removeAt(index, count = 1) {
    for (let i = 0; i < count; i++) {
      if (!this.hasIndex(index + i)) {
        break
      }
      this.remove(this._keys[index + i])
      index--
    }
    return this
  }
}
