import { Viewer } from "../../../../shared"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { GMath, loadImage, Point, RigidBody2D, SmoothDampVelocity, Time } from "smallgame"

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })
  const telemetry = builders.telemetry().open()
  const goal = telemetry.def('Goal', Point.zero)
  const angle = telemetry.def('Angle', 0)
  const car = await loadImage('topdown/car-top-view/car.png')
  car.rect.absCenter = viewer.surface.rect.center
  const currentVelocity = new SmoothDampVelocity()
  const rb = new RigidBody2D()
  rb.inertia = 10
  rb.angularDrag = 0.2
  rb.angularSpeed = 10.10
  rb.angle = 0

  viewer.onKeyPressed = key => {
    rb.addTorque(key.horizontalAxisRaw * Math.min(currentVelocity.point.length, 100))
    const pos = Point
      .fromAngle((rb.angle + 90) * GMath.rad)
      .scaleSelf(key.verticalAxisRaw * 4)
    goal.value.shiftSelf(pos)
  }

  viewer.onFrameChanged = surface => {
    surface.clear()
    surface.blit(car, car.rect, { angle: rb.angle, pivote: 'center-center', pivoteOwner: 'self' })
    rb.update()
    viewer.offset = GMath.smoothDamp(viewer.offset.negY(), goal.value, currentVelocity, 4, Time.deltaTime).negY()
    displayFps(fps)
    angle.value = rb.angle
  }

  const ui = builders.ui()
  return {
    ui: ui.build(),
    telemetry: telemetry.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
