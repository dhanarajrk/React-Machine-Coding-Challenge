import React, { useState } from 'react'

export const StarRating = () => {
    const [hoverStar, setHoverstar] = useState(0)
    const [rating, setRating] = useState(0)

    return (
        <div>
            <h2>Star Rating</h2>
            {[1, 2, 3, 4, 5].map((starnumber) => (
                <span key={starnumber}
                    onMouseEnter={() => setHoverstar(starnumber)}
                    onMouseLeave={() => setHoverstar(0)}
                    onClick={() => setRating(starnumber)}
                    style={{
                        cursor: "pointer",
                        fontSize: "30px",
                        color: starnumber <= (hoverStar || rating) ? "gold" : "gray", // If the current starnumber is less than or equal to either the hovered star or the selected rating, color it gold; otherwise, color it gray. Make sure to check hoverStar first to allow for temporary highlighting on hover, and if no star is hovered, fall back to the selected rating for coloring.
                    }}>
                    ★
                </span>
            ))}
        </div>
    )
}
