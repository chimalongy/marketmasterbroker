import React from 'react'
import PlanCard from './PlanCard'
import "../styles/Plans.css"



function Plans(props) {
  return (
    <div className='plans'>
      
        <div>
            <PlanCard plantitle="Basic" planpercentage={10} mincash={100} maxcash={499}  pay={props.pay} realparent ={props.realParent} />
          </div>
          <div>
            <PlanCard plantitle="Gold" planpercentage={15} mincash={500} maxcash={1499} pay={props.pay} realparent ={props.realParent}  />
          </div>
          <div>
            <PlanCard plantitle="Master" planpercentage={20} mincash={2000} maxcash={9999} pay={props.pay} realparent ={props.realParent}  />
          </div>
          <div>
            <PlanCard plantitle="Premium" planpercentage={25} mincash={10000} maxcash={25000} pay={props.pay} realparent ={props.realParent} />
          </div>
    </div>
  )
} 

export default Plans