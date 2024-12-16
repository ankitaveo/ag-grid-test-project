/* eslint-disable object-shorthand */
/* eslint-disable multiline-ternary */
import { useRef, useState } from "react";
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  UncontrolledAccordion,
} from "reactstrap";

import { useSelector } from "react-redux";

// ** Config
import AGGrid from "../agGrid/AGGrid";
import {
  calculateDynamicHeight,
  select_row_col,
  tableHeight,
} from "../agGrid/utils";

function DisplayValue(data, searchText, rowCount) {
  return (data === null && searchText !== "") ||
    (rowCount === 0 && searchText !== "")
    ? "none"
    : "block";
}

const statusOptionsTab = [
  { value: "requested", label: "Project Requested" },
  { value: "footage_received", label: "Footage Received" },
  { value: "assigned_to_editor", label: "Assigned to Editor" },
  { value: "editing_in_progress", label: "Editing in Progress" },
  { value: "revision_in_progress", label: "Revision in Progress" },
  { value: "edit_complete", label: "Edit Complete" },
  { value: "approved_by_client", label: "Approved" },
];

const ProjectStatusColorCode = new Map([
  ["requested", "#8f5bd0"],
  ["footage_received", "#257ab3"],
  ["assigned_to_editor", "#6ac4fa"],
  ["editing_in_progress", "#f5a449"],
  ["revision_in_progress", "#d14854"],
  ["edit_complete", "#9cc941"],
  ["approved_by_client", "#43bb71"],
]);

const ProjectTableListView = ({ searchText, colDefData }) => {
  const {
    data: allDataProjectManagement,
    isFetching: allDataProjectManagementFetchState,
    error: allDataProjectManagementError,
  } = useSelector((state) => state.allDataProjectManagement);

  const disableColState = false;

  const isDisabled = false;

  const [rowCount, setRowCount] = useState({
    requested: null,
    footage_received: null,
    assigned_to_editor: null,
    editing_in_progress: null,
    revision_in_progress: null,
    edit_complete: null,
    approved_by_client: null,
  });

  const defaultSelectedState = {
    requested: [],
    footage_received: [],
    assigned_to_editor: [],
    editing_in_progress: [],
    revision_in_progress: [],
    edit_complete: [],
    approved_by_client: [],
  };
  const [selectedRow, setSelectedRow] = useState(defaultSelectedState);

  const isRowSelectable = (key) => {
    const otherKeys = Object.keys(selectedRow).filter((k) => k !== key);
    return otherKeys.some((k) => selectedRow[k].length > 0);
  };

  function RowCountIsZero(obj) {
    for (const key in obj) {
      if (obj[key] !== 0) {
        return false;
      }
    }
    return true;
  }

  const [colConfig, setColConfig] = useState(colDefData);

  const gridApiRef = useRef([]);

  const onSelectionChanged = (gridAPI, module) => {
    const selectedArray = gridAPI?.api?.getSelectedRows();
    const selectedArrayId = selectedArray.map((r) => r.sub_project_id);
    setSelectedRow((prev) => {
      const colRow = { ...prev, [module]: selectedArrayId };
      const isDisabledCol = Object.values(colRow).some(
        (value) => value.length > 0
      );
      if (disableColState !== isDisabledCol) {
        console.log("isDisabledCol: -->> ", isDisabledCol);
      }
      return colRow;
    });
  };

  const AgAPIShortAndResize = (col) => {
    const col_payload = col.filter((r) => r.colId !== select_row_col.colId);

    console.log("col: -->> ", col, col_payload);
    setColConfig(col);
  };

  let setTimeInstance;
  const onColumnResized = (event) => {
    const getColumns = event?.api?.getColumnDefs();

    if (setTimeInstance) {
      clearTimeout(setTimeInstance);
    }

    if (getColumns) {
      try {
        setTimeInstance = setTimeout(() => {
          AgAPIShortAndResize(getColumns);
        }, 1000);
      } catch (err) {}
    } else {
    }
  };

  const onSortChanged = (e, alignedGrids) => {
    if (setTimeInstance) {
      clearTimeout(setTimeInstance);
    }

    const sortElement = e?.api?.sortController?.getSortModel();
    const getColumns = e?.api?.getColumnDefs();

    const columx = getColumns.map((item) => {
      if (
        sortElement.length &&
        sortElement[0].colId !== item.field &&
        !item.sortable
      ) {
        return { ...item, sort: null };
      }

      return item;
    });

    setTimeInstance = setTimeout(() => {
      AgAPIShortAndResize(columx);
    }, 1000);

    if (alignedGrids) {
      alignedGrids.forEach((row) => {
        row?.current?.api?.setColumnDefs(columx);
      });
    }
  };

  const onColumnMoved = (e) => {
    onColumnResized(e);
  };

  const SelectedRowDropdown = ({ module }) => {
    const selectedID = selectedRow[module] || [];

    const handleApiCall = (value) => {
      console.log("value: -->> ", value);
    };

    return (
      selectedID?.length !== 0 && (
        <div className="selected-row">
          <span>Selected : {selectedID?.length}</span>
          <div className="btn-primary" onClick={() => handleApiCall(module)}>
            Move to Project Status
          </div>
        </div>
      )
    );
  };

  const SelectedRowArchived = ({ module }) => {
    const selectedID = selectedRow[module] || [];

    const handleApiCall = () => {
      console.log("selectedID: -->> ", selectedID);
    };

    return (
      selectedID?.length !== 0 && (
        <div className="selected-row d-flex align-items-center">
          <span>Selected : {selectedID?.length}</span>
          <div
            color="flat-primary"
            className="ms-1 p-50 btn-primary"
            onClick={() => handleApiCall()}
          >
            Move to Archived
          </div>
        </div>
      )
    );
  };

  const renderLoadingAndNodata = (module) => {
    if (!allDataProjectManagementError[module]) {
      if (allDataProjectManagementFetchState[module]) {
        return [...Array(8)].map((_, i) => (
          <div key={i} className="d-flex align-items-center">
            <div className="skeleton-loader"></div>
          </div>
        ));
      }

      if (allDataProjectManagement[module]?.length === 0) {
        return <div>No Data Found</div>;
      }
      return;
    }

    return <div>Error</div>;
  };

  return (
    <>
      {/* accordion-start */}
      <div className="custom-accordion custom-ag-grouping project-management">
        <UncontrolledAccordion
          defaultOpen={["1", "2", "3", "4", "5", "6", "7"]}
          stayOpen
        >
          {statusOptionsTab?.map((row, index) => (
            <AccordionItem
              key={row?.value}
              id={row?.value}
              style={{
                borderColor: ProjectStatusColorCode.get(row?.value),
                display: DisplayValue(
                  allDataProjectManagement[row?.value],
                  searchText,
                  rowCount[row?.value]
                ),
              }}
            >
              <AccordionHeader
                targetId={`${index + 1}`}
                className="custom-accordion-header"
              >
                <div className="accordion-sub-header">
                  <h3
                    style={{
                      fontWeight: "500",
                      margin: "0px",
                      color: ProjectStatusColorCode.get(row?.value),
                    }}
                  >
                    {row?.label}
                  </h3>
                  <>
                    <div className="number-project">
                      Number of Projects :&nbsp;
                      {allDataProjectManagement[row?.value]?.length || 0}
                    </div>
                    {rowCount[row?.value] !== null && searchText !== "" && (
                      <div
                        className="number-project"
                        style={{ color: "#4da69a" }}
                      >
                        Search Results : &nbsp;
                        {rowCount[row?.value]}
                      </div>
                    )}
                  </>
                </div>
              </AccordionHeader>
              <AccordionBody
                accordionId={`${index + 1}`}
                className={`main-project-table-accordion-body ${
                  !allDataProjectManagement?.[row?.value] &&
                  "padding-bottom-1px"
                }`}
              >
                {row?.value === "approved_by_client" ? (
                  <SelectedRowArchived module={row?.value} />
                ) : (
                  <SelectedRowDropdown module={row?.value} />
                )}

                {renderLoadingAndNodata(row?.value)}

                <div
                  className={`${
                    (allDataProjectManagementFetchState[row?.value] ||
                      allDataProjectManagement[row?.value]?.length === 0) &&
                    "d-none"
                  } ${isRowSelectable(row?.value) && "hidden-checkbox"}`}
                >
                  {/* <AgGridReact
                    ref={(el) => (gridApiRef.current[index] = el)}
                    data={allDataProjectManagement?.[row?.value]}
                    columnDefs={colConfig.map((r) => ({
                      ...r,
                      ...(r.field === select_row_col.colId && {
                        checkboxSelection: () => {
                          return !isRowSelectable(row?.value);
                        },
                      }),
                    }))}
                  /> */}
                  <AGGrid
                    data={allDataProjectManagement?.[row?.value]}
                    columnDefs={colConfig.map((r) => ({
                      ...r,
                      ...(r.field === select_row_col.colId && {
                        checkboxSelection: () => {
                          return !isRowSelectable(row?.value);
                        },
                      }),
                    }))}
                    dynamicHeight={calculateDynamicHeight(
                      rowCount[row?.value],
                      allDataProjectManagement[row?.value],
                      tableHeight
                    )}
                    gridApiRef={(el) => (gridApiRef.current[index] = el)}
                    quickFilterText={
                      allDataProjectManagementFetchState[row?.value]
                        ? ""
                        : searchText
                    }
                    onFilterChanged={(data) => {
                      setTimeout(() => {
                        setRowCount((prev) => ({
                          ...prev,
                          [row?.value]:
                            searchText === ""
                              ? null
                              : data?.api.getModel()?.getRowCount(),
                        }));
                      }, index + 1);
                    }}
                    alignedGrids={gridApiRef.current.filter(
                      (_, i) => i !== index
                    )}
                    isDisabled={isDisabled}
                    onSelectionChanged={(value) =>
                      onSelectionChanged(value, row?.value)
                    }
                    onSortChanged={onSortChanged}
                    {...(row?.value === "requested"
                      ? {
                          onColumnMoved: onColumnMoved,
                          onColumnResized: onColumnResized,
                        }
                      : {})}
                  />
                </div>
              </AccordionBody>
            </AccordionItem>
          ))}
        </UncontrolledAccordion>
      </div>
      {RowCountIsZero(rowCount) ? "No data found" : ""}
    </>
  );
};

export default ProjectTableListView;
