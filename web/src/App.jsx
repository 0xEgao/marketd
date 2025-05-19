import { useState, useEffect } from "react";

function App() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetch("/offer_data.json")
      .then((res) => res.json())
      .then((data) => {
        setOffers(data);
        if (data.length > 0) {
          const timestamps = data.map((offer) => offer.timestamp * 1000);
          const latestTimestamp = Math.max(...timestamps);
          setLastUpdated(new Date(latestTimestamp));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-orange-400 text-xl font-medium">
            Loading Market Data...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-screen-2xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-orange-500 mb-2">
            Coinswap Market
          </h1>
          <p className="text-gray-400 text-lg">
            Live market offers with competitive rates
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-orange-600 to-orange-500">
                  {[
                    { label: "Address", desc: "Maker Address" },
                    { label: "Base Fee", desc: "Fixed Fee" },
                    { label: "Amount", desc: "Volume Fee" },
                    { label: "Time", desc: "Time Fee" },
                    { label: "Min Size", desc: "Minimum Order" },
                    { label: "Max Size", desc: "Maximum Order" },
                    { label: "Bond", desc: "Fidelity Bond" },
                  ].map((header, idx) => (
                    <th key={idx} className="px-6 py-4 text-left">
                      <div className="flex flex-col">
                        <span className="text-white font-bold">
                          {header.label}
                        </span>
                        <span className="text-orange-100 text-xs font-normal">
                          {header.desc}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-700">
                {offers.map((offer, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-700 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="font-mono text-sm text-orange-300 truncate max-w-xs">
                        {offer.address}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-green-400">
                        {offer.base_fee}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-blue-400 font-medium">
                        {(offer.amount_relative_fee_pct * 100).toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-blue-400 font-medium">
                        {(offer.time_relative_fee_pct * 100).toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-yellow-400">
                        {offer.min_size.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-yellow-400">
                        {offer.max_size.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-orange-400 font-medium">
                        {offer.fidelity_bond.amount.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>
            Showing {offers.length} active offers •{" "}
            {lastUpdated ? lastUpdated.toLocaleTimeString() : "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;