import React from "react";

export default function PanicActions() {
  const simulateSOS = () => alert("SOS triggered! Guardian + Local help notified 🚨");

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold">Panic Actions</h2>
      <p className="text-gray-600">
        One-tap SOS, loud alarm and quick dial to nearby police station.
      </p>

      <div className="flex gap-3 mt-4">
        <button
          onClick={simulateSOS}
          className="bg-rose-600 text-white px-5 py-3 rounded-xl hover:bg-rose-700"
        >
          Panic SOS
        </button>
        <a
          href="tel:112"
          className="px-5 py-3 rounded-xl border hover:bg-rose-50"
        >
          Call 112
        </a>
      </div>
    </div>
  );
}
