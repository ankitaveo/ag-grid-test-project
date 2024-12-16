export const customComparator = (valueA, valueB) => {
  return valueA?.toLowerCase().localeCompare(valueB?.toLowerCase());
};

let setTimeInstance;

export const select_row_col = {
  headerName: "",
  field: "select_row",
  colId: "select_row",
  width: 50,
  resizable: false,
  sort: null,
  sortable: false,
  pinned: "left",
  lockPinned: true,
  suppressMovable: true,
  showDisabledCheckboxes: true,
  headerCheckboxSelectionFilteredOnly: true,
  headerCheckboxSelection: () => {
    return true;
  },
};

export const columnDefs = () => {
  const data = [
    {
      ...select_row_col,
    },
    {
      headerName: "Company Name",
      field: "company_name",
      width: 500,
      cellClass: "cell-class",
      sort: null,
      comparator: customComparator,
    },
    {
      headerName: "Order Date",
      field: "invoice_due_date",
      width: 500,
      sort: null,
      cellClass: "cell-class",
      cellStyle: (params) => ({}),
      valueFormatter: (params) =>
        JSON.stringify(params?.data?.invoice_due_date),
      getQuickFilterText: (params) => {
        const formattedDate =
          params?.data?.invoice_due_date !== null
            ? new Date(params?.data?.invoice_due_date).toLocaleDateString(
                "en-US",
                {
                  month: "2-digit",
                  day: "2-digit",
                  year: "2-digit",
                }
              )
            : null;
        return formattedDate;
      },
    },
    {
      headerName: "Project Name",
      field: "project_name",
      width: 500,
      sort: null,
      cellRenderer: (params) => {
        return JSON.stringify(params.value);
      },
      comparator: customComparator,
    },
    {
      headerName: "Project Type",
      field: "sub_order",
      width: 500,
      sort: null,
      cellStyle: { textTransform: "capitalize" },
      comparator: customComparator,
      valueFormatter: (params) => JSON.stringify(params.value),
      getQuickFilterText: (params) => {
        const formattedText =
          params.data?.sub_order !== null
            ? JSON.stringify(params.data?.sub_order)
            : null;
        return formattedText;
      },
    },
    {
      headerName: "Language",
      field: "wedding_language",
      width: 500,

      sort: null,
      cellStyle: { textTransform: "capitalize" },
      valueFormatter: (params) => {
        return params.value ? params.value : "--";
      },
      comparator: customComparator,
    },
    {
      headerName: "NLE Software",
      field: "nle_software",
      width: 500,
      sort: null,
      comparator: customComparator,
      valueFormatter: (params) => {
        return params.value === null ? "--" : params.value.replace(/_/g, " ");
      },
      cellStyle: (params) => ({
        textTransform: "uppercase",
      }),
      getQuickFilterText: (params) => {
        const formattedText =
          params.data?.nle_software !== null
            ? JSON.stringify(params.data?.nle_software)
            : null;
        return formattedText;
      },
    },
    {
      headerName: "Footage",
      field: "tracking_number",
      width: 500,
      // comparator: customComparator,
      cellStyle: (params) => ({
        textTransform: "uppercase",
      }),
      sort: null,
      cellClass: () => {
        return `footage`;
      },
      cellRenderer: (params) => {
        const footageTransferMethod = params.data?.footage_transfer_method;
        if (footageTransferMethod) {
          if (footageTransferMethod === "online") {
            return (
              <a
                className="click-name"
                href={params.data?.online_footage_link}
                target="__blank"
              >
                Link
              </a>
            );
          } else {
            return (
              <div>
                <p style={{ margin: "0" }}>
                  {params.data?.tracking_number} &nbsp;-&nbsp; {/* <br /> */}
                  {params.data?.shipping_service_text}
                </p>
              </div>
            );
          }
        } else {
          return "-";
        }
      },
    },
    {
      headerName: "Number of Events per Year",
      field: "events_per_year",
      width: 500,
      sort: null,
      cellClass: "cell-class",
      valueFormatter: (params) =>
        params.value ? JSON.stringify(params.value) : "--",
    },
    {
      headerName: "Editor ID",
      field: "editor_id",
      width: 500,
      sort: null,
      cellClass: "cell-class",
      valueFormatter: (params) =>
        params.value ? JSON.stringify(params.value) : "--",
    },
    {
      headerName: "Privacy Policy",
      field: "privacy_policy",
      width: 500,
      sort: null,
      cellStyle: { textTransform: "capitalize" },
      valueFormatter: (params) => {
        return params.value === null ? "--" : params.value.replace(/_/g, " ");
      },
      getQuickFilterText: (params) => {
        const formattedText =
          params.data?.privacy_policy !== null
            ? params.data?.privacy_policy.replace(/_/g, " ")
            : null;
        return formattedText;
      },
    },
    {
      headerName: "Archived or Delete",
      field: "actions_archive_delete",
      width: 500,
      minWidth: 130,
      sortable: false,
      cellRenderer: () => {
        return JSON.stringify("Archived or Delete");
      },
      cellClass: () => {
        return `actions-archive-delete`;
      },
    },
  ];

  return data;
};

export const defaultColumnsSize = {
  sr_no: { minSize: 30, defaultSize: 180 },
  company_name: { minSize: 80, defaultSize: 200 },
  invoice_due_date: { minSize: 80, defaultSize: 170 },
  project_name: { minSize: 80, defaultSize: 280 },
  sub_order: { minSize: 80, defaultSize: 475 },
  wedding_language: { minSize: 80, defaultSize: 170 },
  nle_software: { minSize: 80, defaultSize: 320 },
  tracking_number: { minSize: 80, defaultSize: 250 },
  number: { minSize: 80, defaultSize: 130 },
  privacy_policy: { minSize: 80, defaultSize: 220 },
  estimated_date: { minSize: 80, defaultSize: 260 },
  project_review_link: { minSize: 200, defaultSize: 300 },
  editor_id: { minSize: 80, defaultSize: 260 },
  project_status: { minSize: 80, defaultSize: 260 },
  actions_archive_delete: { minSize: 120, defaultSize: 260 },
};

export const onSortChanged = (e, alignedGrids) => {
  if (setTimeInstance) {
    clearTimeout(setTimeInstance);
  }

  const sortElement = e?.api?.sortController?.getSortModel();
  const getColumns = e?.api?.getColumnDefs();

  const columnDefs = getColumns.map((item) => {
    if (
      sortElement.length &&
      sortElement[0].colId !== item.field &&
      !item.sortable
    ) {
      return { ...item, sort: null };
    }

    return item;
  });
  const payload = {
    type: "1",
    column_sizes: JSON.stringify(columnDefs),
  };

  setTimeInstance = setTimeout(() => {
    console.log("payload: -->> ", payload);
  }, 1000);

  if (alignedGrids) {
    alignedGrids.forEach((row) => {
      row?.current?.api?.setColumnDefs(columnDefs);
    });
  }
};

export const tableHeight = 618;

export function calculateDynamicHeight(rowCount, allData, tableHeight) {
  return rowCount !== null
    ? rowCount >= 14
      ? tableHeight
      : 65 + rowCount * 40
    : allData?.length >= 14
    ? tableHeight
    : 65 + (allData?.length || 0) * 40;
}
