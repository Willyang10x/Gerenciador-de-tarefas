import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tasks', 
  description: 'Um gerenciador de tarefas simples criado com Next.js', 
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}