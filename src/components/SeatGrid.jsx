import React from "react";
import './SeatGrid.css';

const SeatGrid = ({ n, bookedSeats, selectFunction }) => {
  const totalSeats = n * n;
  const grid = [];

  // Function to calculate row-column seat number
  const getSeatLabel = (index) => {
    const row = Math.floor(index / n) + 1; // Row number
    const col = (index % n) + 1; // Column number
    return `${row}-${col}`; // Format: Row-Column
  };

  for (let i = 0; i < totalSeats; i++) {
    const isBooked = bookedSeats.includes(i);
    grid.push(
      <div
        key={i}
        className={`seat ${isBooked ? 'booked' : ''}`}
        onClick={() => selectFunction(i)}
      >
        {isBooked ? "Booked" : getSeatLabel(i)} {/* Display row-column seat number */}
      </div>
    );
  }

  return (
    <div className="seat-container" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
      {grid}
    </div>
  );
};

export default SeatGrid;
