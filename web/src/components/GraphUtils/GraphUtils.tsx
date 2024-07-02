
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Toaster } from '@redwoodjs/web/dist/toast'
import NewEntity from '@/components/Entity/NewEntity/NewEntity'
import NewRelationship from '../Relationship/NewRelationship/NewRelationship'
import NewTypeRelationship from '../TypeRelationship/NewTypeRelationship/NewTypeRelationship'

export default function GraphUtils() {
  return (
    <Card className='col-span-1 p-4 overflow-y-auto'>
      <Toaster />
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
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Créer une nouvelle relation</AccordionTrigger>
          <AccordionContent>
            <NewRelationship />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Créer un nouveau type</AccordionTrigger>
          <AccordionContent>
            <NewTypeRelationship />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}