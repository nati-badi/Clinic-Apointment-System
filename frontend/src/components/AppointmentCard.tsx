"use client";

interface AppointmentCardProps {
  appointment: {
    id: string;
    patientName: string;
    doctorName: string;
    date: string;
    notes?: string;
  };
}

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
  const formattedDate = new Date(appointment.date).toLocaleString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{appointment.patientName}</h3>
          <p className="text-sm text-gray-500">with {appointment.doctorName}</p>
        </div>
        <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
          Confirmed
        </span>
      </div>
      <div className="text-sm text-gray-600 mb-2">
        <strong className="font-medium text-gray-700">Date:</strong> {formattedDate}
      </div>
      {appointment.notes && (
        <div className="text-sm text-gray-600 mt-3 pt-3 border-t border-gray-50">
          <p className="italic">"{appointment.notes}"</p>
        </div>
      )}
    </div>
  );
}
