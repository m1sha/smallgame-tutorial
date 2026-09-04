import { uuidv4 } from "../../../utils";

export class Asset {
  id: string = uuidv4()

  constructor (readonly name: string, readonly preview) {}
}