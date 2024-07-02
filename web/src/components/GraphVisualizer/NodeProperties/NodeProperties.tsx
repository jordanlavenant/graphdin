import { Card } from '@/components/ui/card'

const NodeProperties = ({
  node
} : {
  node: any
}) => {

  if (!node) return
  console.log(Math.floor(node.attr.y))

  return (
    <Card className={`absolute bottom-[${Math.floor(node.attr.y)}%]`}>
      <p className='text-green-500'>Properties {node.attr.y}</p>
    </Card>
  )
}

export default NodeProperties