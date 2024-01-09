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
        className={`inline-flex h-min min-w-fit items-center gap-3 rounded-lg ${
          variant === 'primary' ? 'bg-yellow' : 'bg-white'
        } text-body px-4 py-2 text-center font-sans font-medium text-black`}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Button.displayName = 'Button'
