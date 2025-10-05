import React, { useEffect, useState } from "react";
import { searchLocations } from "../api/api";
import DestinationCard from "../components/DestinationCard";

export default function Destinations() {
  const [query, setQuery] = useState("India");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchList(query);
  }, []);

  async function fetchList(q) {
    setLoading(true);
    try {
      const data = await searchLocations(q);
      // Travel-Advisor can return suggestions array; flatten common cases:
      // some wrappers: data[0]?.results, or suggestions[0]?.entities
      if (Array.isArray(data)) {
        setItems(data);
      } else if (data?.suggestions) {
        // suggestions array — combine entities
        const arr = data.suggestions.flatMap(s => s.entities || []);
        setItems(arr);
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error(err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <div className="container">
        <div className="section-head">
          <h2>Top Travel Destinations</h2>
          <form className="search-inline" onSubmit={(e) => { e.preventDefault(); fetchList(query); }}>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search city, country..." />
            <button className="btn" type="submit">Search</button>
          </form>
        </div>

        {loading ? <div className="muted">Loading...</div> : (
          <div className="grid places-grid">
            {items.length ? items.map((it, idx) => <DestinationCard key={idx} item={it} />) : (
              <div className="muted">No destinations found. Try another query.</div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
