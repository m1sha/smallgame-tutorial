import { EntityListBuilder } from "./enity-list";
import { TelemetryBuilder } from "./telemetry";
import { UIBuilder } from "./ui";

export class Builders {
  private _ui: UIBuilder | null = null
  private _telemetry: TelemetryBuilder | null = null
  private _entities: EntityListBuilder | null = null

  ui () {
    if (this._ui) return this._ui
    return this._ui = new UIBuilder()
  }
  telemetry () {
    if (this._telemetry) return this._telemetry
    return this._telemetry = new TelemetryBuilder()
  }
  entities () {
    if (this._entities) return this._entities
    return this._entities = new EntityListBuilder()
  }
}