export const statusOptionsTab = [
  { value: "requested", label: "Project Requested" },
  { value: "footage_received", label: "Footage Received" },
  { value: "assigned_to_editor", label: "Assigned to Editor" },
  { value: "editing_in_progress", label: "Editing in Progress" },
  { value: "revision_in_progress", label: "Revision in Progress" },
  { value: "edit_complete", label: "Edit Complete" },
  { value: "approved_by_client", label: "Approved" },
];


export const ProjectStatusColorCode = new Map([
    ["requested", "#8f5bd0"],
    ["footage_received", "#257ab3"],
    ["assigned_to_editor", "#6ac4fa"],
    ["editing_in_progress", "#f5a449"],
    ["revision_in_progress", "#d14854"],
    ["edit_complete", "#9cc941"],
    ["approved_by_client", "#43bb71"],
  ]);
  