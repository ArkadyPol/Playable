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
}
