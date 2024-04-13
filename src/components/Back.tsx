'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export function Back() {
  const router = useRouter()

  const handleNavigateTopreviousPage = useCallback(() => {
    router.back()
  }, [router])

  return (
    <div
      onClick={handleNavigateTopreviousPage}
      className="text-text-darker text-sm flex gap-2 items-center hover:font-bold cursor-pointer"
    >
      <ArrowLeft className="w-3 h-3" />
      VOLTAR
    </div>
  )
}
