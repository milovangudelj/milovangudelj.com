export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        style={{
          position: 'absolute',
          inset: 0,
          height: '100dvh',
          maxHeight: '100dvh',
          margin: 0,
          padding: 0,
          overflow: 'auto',
          overscrollBehavior: 'none',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        {children}
      </body>
    </html>
  )
}
