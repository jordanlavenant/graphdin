import { useMemo, useContext, useEffect } from 'react'
import { Metadata } from '@redwoodjs/web'
import { GraphVisualizer } from '@/components/GraphVisualizer/GraphVisualizer'
import GraphUtils from '@/components/GraphUtils/GraphUtils'
import { GraphRedrawContext } from '@/context/GraphRedrawContext'

const HomePage = () => {

  const { redraw, setRedraw } = useContext(GraphRedrawContext)

  useEffect(() => {
    if (redraw) {
      setRedraw(false);
    }
  }, [redraw, setRedraw]);

  return (
    <>
      <Metadata title="Graphdin" description="Home page" />

      <section className='grid grid-cols-4 gap-4 h-full'>
        <GraphVisualizer key={redraw ? 'redraw' : 'initial'} />
        <GraphUtils />
      </section>
    </>
  )
}

export default HomePage
