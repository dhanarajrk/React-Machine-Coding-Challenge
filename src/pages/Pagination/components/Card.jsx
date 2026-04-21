import React from 'react'

export const Card = ({title, thumbnail, price}) => {
  return (
    <div>
        <img src={thumbnail} alt={title} style={{width: "150px", height: "150px", objectFit: "cover"}}/>
        <h6>{title} <p>${price.toFixed(2)}</p></h6>
        
    </div>
  )
}
