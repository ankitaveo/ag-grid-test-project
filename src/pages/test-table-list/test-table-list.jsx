import { AgGridReact } from "ag-grid-react";
import React, { useMemo, useRef, useState, useEffect } from "react";

import "./styles.css";

const TestTableList = () => {
  const gridRef = useRef(null);
  const [rowData, setRowData] = useState([]);
  const columnDefs = useMemo(
    () => [
      { field: "athlete", width: 150 },
      { field: "age", width: 90 },
      { field: "country", width: 150 },
      { field: "year", width: 90 },
      { field: "date", width: 150 },
      { field: "sport", width: 150 },
      { field: "gold", width: 100 },
      { field: "silver", width: 100 },
      { field: "bronze", width: 100 },
      { field: "total", width: 100 },
    ],
    []
  );

  useEffect(() => {
    if (gridRef.current) {
      console.log("Grid ref is set:", gridRef.current);
    } else {
      console.error("Grid ref is not set");
    }
  }, [gridRef]);

  const onGridReady = (params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => {
        setRowData(data);
      });
  };

  return (
    <div className="custom-accordion custom-ag-grouping project-management">
      <div
        style={{ height: "100vh", width: "100%" }}
        className={"ag-theme-quartz-dark"}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};

export default TestTableList;
