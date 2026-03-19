import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function BookingPage() {
  const location = useLocation();
  const { availableSlots, doctorName } = location.state || {};

  if (!availableSlots) {
    return <p>No slots data available. Please go back and select a doctor.</p>;
  }

  return (
    <>   
    <Navbar/>
     <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Booking for {doctorName}</h2>
      <div className="flex flex-wrap gap-4">
        {availableSlots.length === 0 ? (
          <p>No slots available.</p>
        ) : (
          availableSlots.map(slot => (
            <div
              key={slot.id}
              className="border p-4 rounded shadow w-48 text-center"
            >
              <p>{slot.slot_date}</p>
              <p>{slot.slot_time}</p>
            </div>
          ))
        )}
      </div>
    </div>
 </>
 );
}