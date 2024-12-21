import React from 'react'
import { useParams } from 'react-router-dom'


const Dyanamic = () => {
    const {id} = useParams()
  return (
    <div>ID: {id}</div>
  )
}

export default Dyanamic