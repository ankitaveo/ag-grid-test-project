import { AgGridReact } from "ag-grid-react";
import React, { useMemo } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const AGGrid = ({
  data,
  columnDefs,
  gridApiRef,
  quickFilterText,
  alignedGrids,
  onColumnMoved,
  onColumnResized,
  onFilterChanged,
  dynamicHeight,
  onSelectionChanged,
  onSortChanged,
}) => {
  const containerStyle = useMemo(
    () => ({
      width: "100%",
      height: `${dynamicHeight}px`,
      alignItems: "center",
    }),
    [dynamicHeight]
  );

  return (
    <div style={containerStyle} className={"ag-theme-quartz-dark"}>
      <AgGridReact
        ref={gridApiRef}
        suppressRowHoverHighlight={true}
        rowData={data}
        rowHeight={40}
        columnDefs={columnDefs}
        suppressDragLeaveHidesColumns={true}
        onColumnResized={onColumnResized}
        onColumnMoved={onColumnMoved}
        suppressMaxRenderedRowRestriction={true}
        quickFilterText={quickFilterText}
        alignedGrids={alignedGrids}
        popupParent={document.body}
        animateRows={false}
        rowSelection={"multiple"}
        suppressRowClickSelection={true}
        onSelectionChanged={onSelectionChanged}
        onFilterChanged={onFilterChanged}
        onSortChanged={(e) => onSortChanged(e, alignedGrids)}
        // suppressSorting={isDisabled}
        // suppressMovableColumns={isDisabled}
        // suppressColumnResize={isDisabled}
      />
    </div>
    // </div>
  );
};

export default AGGrid;
