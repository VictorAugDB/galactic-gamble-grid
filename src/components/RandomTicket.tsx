import { Dices } from 'lucide-react'
import { Button } from './Button'
import { useNewTickets } from '@/app/contexts/NewTicketsContext'

type RandomTicketProps = {
  newTicketId: string
}

export function RandomTicket({ newTicketId }: RandomTicketProps) {
  const { handleRandomize } = useNewTickets()

  return (
    <Button
      onClick={() => handleRandomize(newTicketId)}
      variant="darker-blue"
      size="xs"
    >
      <Dices className="w-5 h-5" />
    </Button>
  )
}
