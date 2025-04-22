import { forwardRef } from 'react'

const LightningOverlay = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
        zIndex: 30,
        pointerEvents: 'none',
      }}
    />
  )
})

export default LightningOverlay
