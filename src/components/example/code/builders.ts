import { EntityListBuilder } from "./enity-list";
import { TelemetryBuilder } from "./telemetry";
import { UIBuilder } from "./ui";

export class Builders {
  ui () {
    return new UIBuilder()
  }
  telemetry () {
    return new TelemetryBuilder()
  }
  entities () {
    return new EntityListBuilder()
  }
}