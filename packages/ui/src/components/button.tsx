'use client'

import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  forwardRef,
  HTMLAttributes,
} from 'react'

export interface ButtonProps<T extends ElementType> extends HTMLAttributes<T> {
  as?: T
  variant?: 'primary' | 'secondary'
}

export const Button = forwardRef(
  <T extends ElementType = 'button'>(
    {
      children,
      intent,
      size,
      fullWidth,
      className,
      as,
      variant = 'primary',
      ...props
    }: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
    ref: ComponentPropsWithRef<T>['ref']
  ) => {
    const Component = as || 'button'

    return (
      <Component
        className={`ui-inline-flex ui-h-min ui-min-w-fit ui-items-center ui-gap-3 ui-rounded-lg ui-px-4 ui-py-2 ui-text-center ui-text-black ui-font-sans ui-font-medium ${
          variant === 'primary' ? 'ui-bg-yellow' : 'ui-bg-white'
        }`}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Button.displayName = 'Button'
