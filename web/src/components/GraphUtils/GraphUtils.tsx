
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import NewEntity from '@/components/Entity/NewEntity/NewEntity'

export default function GraphUtils() {
  return (
    <Card className='col-span-1 p-4'>
      <h1 className='text-center'>Graph Utils</h1>
      <Separator className='my-4'/>
      <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Créer une nouvelle entitée</AccordionTrigger>
        <AccordionContent>
          <NewEntity />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </Card>
  )
}