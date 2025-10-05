import React from "react";
import { Link } from "react-router-dom";

export default function DestinationCard({ item }) {
  // item may be nested; try to extract the usual properties
  const obj = item?.result_object || item;
  const id = obj?.location_id || obj?.id || obj?.name || Math.random().toString(36).slice(2,9);
  const title = obj?.name || obj?.title || "Unknown place";
  const subtitle = obj?.location_string || obj?.category?.name || obj?.subtitle || "";
  const img = obj?.photo?.images?.medium?.url || obj?.photo?.images?.original?.url || `https://picsum.photos/seed/${id}/600/400`;

  return (
    <article className="card place-card">
      <img src={img} alt={title} className="card-img" />
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-sub">{subtitle}</p>
        <div className="card-actions">
          <Link to={`/destinations/${encodeURIComponent(String(id))}`} className="btn">View</Link>
          <Link to={`/booking/${encodeURIComponent(String(id))}`} className="btn-outline">Book</Link>
        </div>
      </div>
    </article>
  );
}
