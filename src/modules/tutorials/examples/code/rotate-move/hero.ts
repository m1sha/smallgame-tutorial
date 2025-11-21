import { setSegment, Sketch, Sprite, Surface, rad, Point, Time, GMath, type TPoint, PolyRect, Rect, RigidBody2D, loadImage } from "smallgame"

export class Hero extends Sprite {
  currentVelocity = {
    x: { value: 0 },
    y: { value: 0 }
  }
  goal = Point.zero
  pos = Point.zero
  speed = 2.8
  private currentAngle = 0
  
  
  smoothTime: number = 2.96
  deltaTimeMulti: number = 1
  angleDeltaTimeMulti: number = 11
  //radius = 30
  get sin_a () { return  Math.sin(rad(this.currentAngle)) }
  get cos_a () { return  Math.cos(rad(this.currentAngle)) }
  private sketch: Sketch
  private size = { width: 300, height: 300 }

  rigid: RigidBody2D
  torqueForce = 200
  private _inertia = 2
  private _angularDrag: number = 0.1
  get inertia () { return this._inertia }
  set inertia (value: number) { this.rigid.inertia = value }
  get angularDrag () { return this._angularDrag }
  set angularDrag (value: number) { this.rigid.angularDrag = value }

  private surface: Surface | null = null
  moveSelf = true

  constructor () {
    super()
    this.sketch = new Sketch
    this.image = new Surface(this.size.width, this.size.height)
    this.rect = this.image.rect
    this.sketch = new Sketch()
    this.sketch.defineStyle('circle', { fill: '#434343', stroke: '#282828', lineWidth: 3 })
    this.sketch.defineStyle('arrow', { stroke: '#fff', lineWidth: 3, lineCap: 'round' })
    this.rigid = new RigidBody2D(this.inertia, this.angularDrag)
    this.rigid.angle = -90
  }

  async create(): Promise<void> {
    this.surface = await loadImage('space-fighter/Ships/Fighter_1.png')
    this.surface.rect.center = this.rect.center
  }

  async setSkin (v: string) {
    if (v === 'Fighter') this.surface = await loadImage('space-fighter/Ships/Fighter_1.png')
    if (v === 'Fighter 2') this.surface = await loadImage('space-fighter/Ships/Fighter_2.png')
    if (v === 'Fighter 3') this.surface = await loadImage('space-fighter/Ships/Fighter_3.png')
    if (v === 'Fighter 4') this.surface = await loadImage('space-fighter/Ships/Fighter_4.png')
      
    if (v === 'Alien') this.surface = await loadImage('space-fighter/Ships/Alien_4.png')
    if (v === 'Alien 2') this.surface = await loadImage('space-fighter/Ships/Alien_2.png')
    
    if (v === 'Frigate') this.surface = await loadImage('space-fighter/Ships/Frigate_1.png')
    if (v === 'Cruiser')  this.surface = await loadImage('space-fighter/Ships/Cruiser_3.png')

    if (v === 'Destroyer 1')  this.surface = await loadImage('space-fighter/Ships/Destroyer_1.png')
    if (v === 'Destroyer 2')  this.surface = await loadImage('space-fighter/Ships/Destroyer_2.png')
    if (v === 'Huge')  this.surface = await loadImage('space-fighter/Ships/Huge_1.png')
    
    if (this.surface) this.surface.rect.center = this.rect.center
  }

  setPos (point: TPoint) {
    this.pos.moveSelf(point)
    this.rect.center = point
  }

  setGoal (point: TPoint) {
    this.goal.moveSelf(point)
  }
  
  turn (dir: 'left' | 'right') {
    this.rigid.addTorque(dir === 'left' ? -this.torqueForce: this.torqueForce)
  }
  
  forward () {
    this.goal.shiftSelf(this.cos_a * this.speed, this.sin_a * this.speed)
  }

  backward () {
    this.goal.shiftSelf(-this.cos_a * this.speed, -this.sin_a * this.speed)
  }

  stop () {}

  protected update (): void {
    this.sketch.clear()
    this.image!.clear()

    this.currentAngle = this.rigid.angle
    this.pos = GMath.smoothDamp(this.pos, this.goal, this.currentVelocity, this.smoothTime, this.deltaTimeMulti*Time.deltaTime)
    if (this.moveSelf) this.rect.center = this.rect.center.shift(this.pos)

    this.rigid.angularSpeed = this.angleDeltaTimeMulti
    this.rigid.update()

    //const center = this.rect.center
    //const p1 = new Point(this.cos_a * this.radius + center.x, this.sin_a * this.radius + center.y)
    //this.sketch.circle('circle', center, this.radius)
    //this.sketch.arrows('arrow', [setSegment(center, p1) ])
    //this.sketch.draw(this.image!)

    if (this.surface) {
      this.image.blit(this.surface, this.surface.rect, { angle: this.rigid.angle + 90, pivote: 'center-center' })
    }

    if (this.isGoBack) {
      const a = this.aGoal < 0 ? this.aGoal + 360 : this.aGoal
      const e = 0 | (a - this.rigid.angle)

      if ( e === 0  ) {
        this.isGoBack = false
      } else {
        if (Math.abs(this.rigid.angularVelocity) < 0.01) {
          
          this.rigid.addTorque( this.torqueForce * Math.sign(this.aGoal))
        }
        
      }
    }
  }

  private isGoBack = false
  private started = false
  private aGoal = 0

  getBack (point: TPoint) {
    this.goal.moveSelf(point)
    this.isGoBack = true

    const p = Point.from(point).shiftSelf(this.pos.neg())
    const a = Math.atan2(p.y, p.x) * 180 / Math.PI
    this.aGoal = a
    //this.rigid.angle = a
  }
}

function getDeltaAngle(current: number, target: number): number {
  let delta = (target - current) % 360;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  return delta;
}
