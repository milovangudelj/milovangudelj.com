import { Vector } from '~/lib/vector'
import { mapValue } from '~/utils'

const GRAVITY = new Vector(0, 9.81)
const MASS = 0.002
const MIN_RADIUS = 0.002
const MAX_RADIUS = 0.005
const TIME_STEP = 1 / 40

const calculateTerminalVelocity = (mass: number, radius: number): number => {
  const Cd = 0.5 // Drag coefficient
  const rho = 1.225 // Air density (kg/m^3)
  const g = GRAVITY.length() // Magnitude of gravitational acceleration
  const area = Math.PI * radius * radius // Cross-sectional area
  return Math.sqrt((2 * mass * g) / (rho * area * Cd))
}

export class Flake {
  position: Vector
  velocity: Vector
  mass: number = MASS
  radius: number = Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS
  wind: number = 20
  windTime: number = 0

  constructor(x: number, y: number) {
    this.position = new Vector(x, y)
    this.velocity = new Vector(
      0,
      calculateTerminalVelocity(
        this.mass,
        mapValue(this.radius, MIN_RADIUS, MAX_RADIUS, MAX_RADIUS, MIN_RADIUS)
      )
    )
  }

  update() {
    this.velocity = new Vector(this.wind * Math.sin(this.windTime), this.velocity.y)
    this.position = this.position.add(this.velocity.multiply(TIME_STEP))

    this.windTime += Math.PI / 180
  }

  draw(context: CanvasRenderingContext2D) {
    context.save()
    context.translate(this.position.x, this.position.y)
    context.beginPath()
    context.arc(0, 0, this.radius * 300, 0, Math.PI * 2)
    context.fillStyle = 'rgba(255, 255, 255, 0.7)'
    context.fill()
    context.closePath()
    context.restore()
  }
}
