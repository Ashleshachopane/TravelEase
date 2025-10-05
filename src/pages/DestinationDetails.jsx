import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { searchLocations } from "../api/api";

export default function DestinationDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simple strategy: re-run a general search and find matching id (since API may not have details endpoint)
    (async () => {
      setLoading(true);
      try {
        const data = await searchLocations(id);
        // try to find by id or name
        let found = null;
        if (Array.isArray(data)) {
          found = data.find(d => (d?.result_object?.location_id && String(d?.result_object?.location_id) === id) ||
                                 String(d?.result_object?.name) === id || String(d?.name) === id);
        }
        setItem(found || (Array.isArray(data) && data[0]) || null);
      } catch (err) {
        console.error(err);
        setItem(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="container muted">Loading...</div>;
  if (!item) return <div className="container muted">Details not available.</div>;

  const obj = item.result_object || item;
  const img = obj?.photo?.images?.large?.url || obj?.photo?.images?.medium?.url || `https://picsum.photos/seed/${id}/900/500`;
  const title = obj?.name || obj?.title || "Unknown place";
  const desc = obj?.description || obj?.subtitle || obj?.location_string || "";

  return (
    <main className="page">
      <div className="container">
        <div className="detail-hero card">
          <img src={img} alt={title} className="detail-img" />
          <div className="detail-body">
            <h1>{title}</h1>
            <p className="muted">{desc}</p>
            <div className="detail-actions">
              <Link to={`/booking/${encodeURIComponent(String(id))}`} className="btn btn-lg">Book Now</Link>
              <Link to="/destinations" className="link muted">Back to list</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
