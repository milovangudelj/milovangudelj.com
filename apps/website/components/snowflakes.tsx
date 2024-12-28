'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

import { cn, mapValue } from '~/utils'

import { Flake } from '~/lib/flake'
import { Vector } from '~/lib/vector'

interface SnowflakesProps {
  className?: string
  quantity?: number
}

const generateSnowflakes = (quantity: number, width: number, height: number): Flake[] =>
  Array.from(
    { length: quantity },
    () =>
      new Flake(
        mapValue(Math.random() * 2 * width, 0, 2 * width, -width / 2, (3 * width) / 2),
        mapValue(Math.random() * 2 * height, 0, 2 * height, -height, height)
      )
  )

export const Snowflakes: React.FC<SnowflakesProps> = ({ className = '', quantity = 100 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  const snowflakes = useRef<Flake[]>([])
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1
  const rafID = useRef<number | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d')
    }
    initCanvas()
    animate()
    window.addEventListener('resize', initCanvas)

    return () => {
      if (rafID.current != null) {
        window.cancelAnimationFrame(rafID.current)
      }
      window.removeEventListener('resize', initCanvas)
    }
  }, [])

  const initCanvas = () => {
    resizeCanvas()
  }

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      snowflakes.current.length = 0
      canvasSize.current.w = canvasContainerRef.current.offsetWidth
      canvasSize.current.h = canvasContainerRef.current.offsetHeight
      canvasRef.current.width = canvasSize.current.w * dpr
      canvasRef.current.height = canvasSize.current.h * dpr
      canvasRef.current.style.width = `${canvasSize.current.w}px`
      canvasRef.current.style.height = `${canvasSize.current.h}px`
      context.current.scale(dpr, dpr)
      snowflakes.current = generateSnowflakes(quantity, canvasSize.current.w, canvasSize.current.h)
    }
  }

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h)
    }
  }

  const animate = () => {
    clearContext()
    snowflakes.current.forEach((flake: Flake) => {
      flake.update()
      // if the flake is outside the screen bounds, reset its position to a random value above the screen
      if (flake.position.y > canvasSize.current.h + flake.radius) {
        flake.position = new Vector(
          mapValue(
            Math.random() * 2 * canvasSize.current.w,
            0,
            2 * canvasSize.current.w,
            -canvasSize.current.w / 2,
            (3 * canvasSize.current.w) / 2
          ),
          -Math.random() * canvasSize.current.h
        )
      }
      if (context.current) flake.draw(context.current)
    })
    rafID.current = window.requestAnimationFrame(animate)
  }

  return (
    <motion.div
      className={cn('pointer-events-none', className)}
      ref={canvasContainerRef}
      aria-hidden="true"
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <canvas ref={canvasRef} className="size-full" />
    </motion.div>
  )
}
