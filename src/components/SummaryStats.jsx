import React, { useEffect, useState } from "react";

function SummaryStats({ total, withSeries, avgComics }) {
  const [updatedStat, setUpdatedStat] = useState(null);

  useEffect(() => {
    setUpdatedStat("total");
    const timeout = setTimeout(() => setUpdatedStat(null), 500);
    return () => clearTimeout(timeout);
  }, [total, withSeries, avgComics]);

  return (
    <section className="summary-stats">
      <div className={`stat ${updatedStat === "total" ? "updated" : ""}`}>
        <strong>Total of Characters: </strong> {total}
      </div>
      <div className={`stat ${updatedStat === "total" ? "updated" : ""}`}>
        <strong>Characters with Series: </strong> {withSeries}
      </div>
      <div className={`stat ${updatedStat === "total" ? "updated" : ""}`}>
        <strong>Average Comics per Character: </strong> {avgComics}
      </div>
    </section>
  );
}

export default SummaryStats;
