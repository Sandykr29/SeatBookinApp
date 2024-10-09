import React, { useState } from "react";
import SeatGrid from "./SeatGrid";

const TicketBooking = () => {
  const [vipBookedSeats, setVipBookedSeats] = useState([]);
  const [premiumBookedSeats, setPremiumBookedSeats] = useState([]);
  const [economyBookedSeats, setEconomyBookedSeats] = useState([]);
  const [error, setError] = useState("");

  const handleBooking = (seatNum, type) => {
    let bookedSeats, setBookedSeats;
    switch (type) {
      case "VIP":
        bookedSeats = vipBookedSeats;
        setBookedSeats = setVipBookedSeats;
        break;
      case "Premium":
        bookedSeats = premiumBookedSeats;
        setBookedSeats = setPremiumBookedSeats;
        break;
      case "Economy":
        bookedSeats = economyBookedSeats;
        setBookedSeats = setEconomyBookedSeats;
        break;
      default:
        return;
    }

    if (bookedSeats.includes(seatNum)) {
      setBookedSeats(bookedSeats.filter((seat) => seat !== seatNum));
    } else {
      if (bookedSeats.length < 5) {
        setBookedSeats([...bookedSeats, seatNum]);
      } else {
        setError(`You can only book up to 5 seats in ${type}.`);
      }
    }
  };

  const handleSubmit = () => {
    const vipSeats = vipBookedSeats.map(i => `VIP ${Math.floor(i / 2) + 1}-${(i % 2) + 1}`).join(", ") || "None";
    const premiumSeats = premiumBookedSeats.map(i => `Premium ${Math.floor(i / 4) + 1}-${(i % 4) + 1}`).join(", ") || "None";
    const economySeats = economyBookedSeats.map(i => `Economy ${Math.floor(i / 8) + 1}-${(i % 8) + 1}`).join(", ") || "None";

    alert(`
      Booking confirmed!
      VIP Seats: ${vipSeats}
      Premium Seats: ${premiumSeats}
      Economy Seats: ${economySeats}
    `);
  };

  return (
    <div>
      <h2>VIP Seat Booking</h2>
      <SeatGrid n={2} bookedSeats={vipBookedSeats} selectFunction={(id) => handleBooking(id, "VIP")} />

      <h2>Premium Seat Booking</h2>
      <SeatGrid n={4} bookedSeats={premiumBookedSeats} selectFunction={(id) => handleBooking(id, "Premium")} />

      <h2>Economy Seat Booking</h2>
      <SeatGrid n={8} bookedSeats={economyBookedSeats} selectFunction={(id) => handleBooking(id, "Economy")} />

      <button onClick={handleSubmit}>Confirm Booking</button>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TicketBooking;
