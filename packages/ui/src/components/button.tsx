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
      ...props
    }: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
    ref: ComponentPropsWithRef<T>['ref']
  ) => {
    const Component = as || 'button'

    return (
      <Component
        className="ui-bg-yellow ui-text-button ui-inline-block ui-h-min ui-min-w-fit ui-rounded-lg ui-px-4 ui-py-2 ui-text-center ui-text-black"
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Button.displayName = 'Button'
