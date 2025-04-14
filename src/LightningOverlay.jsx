import { forwardRef } from 'react'

const LightningOverlay = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#fffdd8',
        opacity: 0,
        zIndex: 20,
        pointerEvents: 'none',
      }}
    />
  )
})

export default LightningOverlay
