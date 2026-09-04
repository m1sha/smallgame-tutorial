import { Asset } from "./asset";
import { SpriteAsset } from "./sprite-asset";

export class AssetCollection {
  items: Asset[] = []

  async addSprite (name: string, url: string) {
    const asset = new SpriteAsset(name, url)
    this.items.push(asset)
  }

  find (id: string) {
    return this.items.find(p => p.id === id)
  }
}