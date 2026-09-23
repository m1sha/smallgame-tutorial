import { Point } from "smallgame"
import { Panel } from "../../../../components/example"
import RemoteStore from "./components/remote-store.vue"

export class RemoteStorePanel extends Panel<any> {
  constructor () {
    super('Remote Store', RemoteStore, new Point(8, 8))
  }
}