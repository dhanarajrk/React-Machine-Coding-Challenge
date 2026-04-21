import React from 'react'

export const Card = ({title, thumbnail}) => {
  return (
    <div>
        <img src={thumbnail} alt={title} style={{width: "150px", height: "150px", objectFit: "cover"}}/>
        <h6>{title}</h6>
    </div>
  )
}
