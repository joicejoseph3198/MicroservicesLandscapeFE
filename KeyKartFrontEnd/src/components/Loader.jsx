import React from 'react'
import { bouncy } from 'ldrs'


const Loader = () => {
    bouncy.register()
  return (
    <div>
        <l-bouncy
            size="45"
            speed="1.75" 
            color="gray" 
            >    
        </l-bouncy> 
    </div>
  )
}

export default Loader