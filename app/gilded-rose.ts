export class Item {
  name: string
  sellIn: number
  quality: number

  constructor (name, sellIn, quality) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }
}

interface Item2 {
  name: string
  sellIn: number
  quality: number

  updateQuality(): Item
}

class RegularItem implements Item2 {
  constructor (public name: string, public sellIn: number, public quality: number) {
  }

  updateQuality (): Item {
    if (this.quality > 0) {
      this.quality = this.quality - 1
    }
    this.sellIn = this.sellIn - 1

    if (this.sellIn < 0 && this.quality > 0) {
      this.quality = this.quality - 1
    }
    return this
  }
}

class Sulfuras implements Item2 {
  name: string
  quality: number

  constructor (public sellIn: number) {
    this.name = 'Sulfuras, Hand of Ragnaros'
    this.quality = 80
  }

  updateQuality (): Item {
    return this
  }
}

class AgedBrie implements Item2 {
  name: string

  constructor (public sellIn: number, public quality: number) {
    this.name = 'Aged Brie'
  }

  updateQuality (): Item {
    if (this.quality < 50 && this.sellIn > 0) {
      this.quality = this.quality + 1
    } else if (this.quality < 50 && this.sellIn < 0) {
      this.quality = this.quality + 2
    }
    this.sellIn = this.sellIn - 1
    return this
  }
}

export class GildedRose {
  items: Array<Item>

  constructor (items = [] as Array<Item>) {
    this.items = items
  }

  updateQuality () {
    const sulfuras = 'Sulfuras, Hand of Ragnaros'
    const agedBrie = 'Aged Brie'
    const backstagePasses = 'Backstage passes to a TAFKAL80ETC concert'

    for (let i = 0; i < this.items.length; i++) {
      const name = this.items[i].name
      const quality = this.items[i].quality
      const sellIn = this.items[i].sellIn

      if (name === sulfuras) {
        const updatedSulfuras = new Sulfuras(sellIn)
        this.items = [updatedSulfuras]
        continue
      }

      if (name === backstagePasses) {
        this.items[i].sellIn = sellIn - 1

        if (this.items[i].sellIn < 0) {
          this.items[i].quality = quality - quality
          continue
        }

        if (quality < 50 && sellIn < 6) {
          this.items[i].quality = this.items[i].quality + 3
          continue
        }

        if (quality < 50 && sellIn < 11) {
          this.items[i].quality = this.items[i].quality + 2
          continue
        }

        continue
      }

      if (name === agedBrie) {
        const updatedAgedBrie = new AgedBrie(sellIn, quality).updateQuality()
        this.items = [updatedAgedBrie]
        continue
      }

      if (name !== agedBrie && name !== backstagePasses) {
        const regularItemUpdated = new RegularItem(name, sellIn, quality).updateQuality()
        this.items = [regularItemUpdated]
      }
    }

    return this.items
  }
}
