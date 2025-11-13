import { setSegment, Sketch, Sprite, Surface, rad, Point, Time, GMath, type TPoint, PolyRect, Rect, RigidBody2D, loadImage } from "smallgame"

export class Hero extends Sprite {
  private currentVelocity = {
    x : { value: 0 },
    y : { value: 0 }
  }
  goal = Point.zero
  pos = Point.zero
  speed = 2.8
  private currentAngle = 0
  private goalAngle = 0
  rotation_step = 2
  smoothTime: number = 2.96
  deltaTimeMulti: number = 2
  angleDeltaTimeMulti: number = 11
  radius = 30
  get sin_a () { return  Math.sin(rad(this.currentAngle)) }
  get cos_a () { return  Math.cos(rad(this.currentAngle)) }
  private sketch: Sketch
  private size = { width: 300, height: 300 }

  rigid: RigidBody2D
  torqueForce = 200

  surface: Surface | null = null
  moveSelf = true

  constructor (private bg: Surface, private pc: Point) {
    super()
    this.sketch = new Sketch
    this.image = new Surface(this.size.width, this.size.height)
    this.rect = this.image.rect
    this.sketch = new Sketch()
    this.sketch.defineStyle('circle', { fill: '#434343', stroke: '#282828', lineWidth: 3 })
    this.sketch.defineStyle('arrow', { stroke: '#fff', lineWidth: 3, lineCap: 'round' })
    this.rigid = new RigidBody2D(2)
    this.rigid.angle = -90
  }

  async create(): Promise<void> {
    this.surface = await loadImage('space-fighter/Ships/Fighter_1.png')
    //this.surface = await loadImage('space-fighter/Ships/Alien_4.png')
   
    this.surface.rect.center = this.rect.center
  }

  async setSkin (v: string) {
    if (v === 'Fighter') {
      this.surface = await loadImage('space-fighter/Ships/Fighter_1.png')
     
    }
    if (v === 'Alien') {
      this.surface = await loadImage('space-fighter/Ships/Alien_4.png')
    }
    if (v === 'Alien 2') {
      this.surface = await loadImage('space-fighter/Ships/Alien_2.png')
    }
    if (v === 'Frigate') {
      this.surface = await loadImage('space-fighter/Ships/Frigate_1.png')
    }
    if (v === 'Cruiser') {
      this.surface = await loadImage('space-fighter/Ships/Cruiser_3.png')
    }
    //Cruiser_3
    //Frigate_1
    if (this.surface) this.surface.rect.center = this.rect.center
    // if (this.surface) {
    //   this.rect.width = this.surface.rect.width  
    //   this.rect.height = this.surface.rect.height  
    // }
  }

  setPos (point: TPoint) {
    this.pos.moveSelf(point)
    this.rect.center = point
  }

  setGoal (point: TPoint) {
    this.goal.moveSelf(point)
  }
  
  turn (dir: 'left' | 'right') {
    if (dir === 'left') {
      this.goalAngle -= this.rotation_step 
      this.rigid.addTorque(-this.torqueForce, Time.deltaTime)
    }
    if (dir === 'right') {
      this.goalAngle += this.rotation_step 
      this.rigid.addTorque(this.torqueForce, Time.deltaTime)
    }
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

    this.currentAngle = this.rigid.angle // GMath.moveTowardsAngle( this.goalAngle, this.currentAngle, this.angleDeltaTimeMulti * Time.deltaTime)
    this.pos = GMath.smoothDamp(this.pos, this.goal, this.currentVelocity, this.smoothTime, this.deltaTimeMulti*Time.deltaTime)
    if (this.moveSelf) 
    {
      this.rect.center = this.rect.center.shift(this.pos)
    } else {
      this.bg.rect.center = this.bg.rect.center.shift(this.pos.neg())
    }
    
    //this.bg.rect.shiftSelf(this.pos.neg(), 'center-center')
   
    
    this.rigid.update(this.angleDeltaTimeMulti * Time.deltaTime)

    const center = this.rect.center
    const p1 = new Point(this.cos_a * this.radius + center.x, this.sin_a * this.radius + center.y)

    this.sketch.circle('circle', center, this.radius)
    

    //const r = Rect.fromCenter(center, p1.x * 2, p1.y * 2)
    //this.sketch.polyrect({ stroke: '#999', fill: '#aaa' }, new PolyRect(
    //  r.topLeft,
    //  r.topRight,
    //  r.bottomLeft,
    //  r.bottomRight,
    //))

    this.sketch.arrows('arrow', [setSegment(center, p1) ])
   // this.sketch.draw(this.image!)

    if (this.surface) {
      //this.image.rot(this.rigid.angle + 90)
      this.image.blit(this.surface, this.surface.rect, { angle: this.rigid.angle + 90, pivote: 'center-center' })
      //this.image.unrot()
    }
  }

  getBack (point: TPoint) {
    this.goal.moveSelf(point)
    const center = this.rect.center
    const p1 = new Point(this.cos_a * this.radius + center.x, this.sin_a * this.radius + center.y)
    const d = this.pos.shift(-p1.x, -p1.y)
    this.goalAngle += -180 // (Math.atan2(d.x, d.y) * 180 / Math.PI) 
    //this.currentAngle = this.goalAngle
  }

  

}