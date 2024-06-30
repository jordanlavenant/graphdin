import { Metadata } from '@redwoodjs/web'
import { GraphVisualizer } from '@/components/GraphVisualizer/GraphVisualizer'
import GraphUtils from '@/components/GraphUtils/GraphUtils'

const HomePage = () => {
  return (
    <>
      <Metadata title="Graphdin" description="Home page" />

      <section className='grid grid-cols-4 gap-4 h-full'>
        <GraphVisualizer />
        <GraphUtils />
      </section>
    </>
  )
}

export default HomePage
