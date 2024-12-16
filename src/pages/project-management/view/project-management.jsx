import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setData,
  setIsFetching,
} from "../../../redux/allDataProjectManagement";
import requested from "../../../mock/requested.json";
import footage_received from "../../../mock/footage_received.json";
import assigned_to_editor from "../../../mock/assigned_to_editor.json";
import editing_in_progress from "../../../mock/editing_in_progress.json";
import revision_in_progress from "../../../mock/revision_in_progress.json";
import edit_complete from "../../../mock/edit_complete.json";
import approved_by_client from "../../../mock/approved_by_client.json";
import { columnDefs } from "../agGrid/utils";
import ProjectTableListView from "../project-table/project-table-list.";

export const ProjectManagement = () => {
  const dispatch = useDispatch();
  const { data, isFetching, error } = useSelector(
    (state) => state.allDataProjectManagement
  );
  console.log("isFetching: ", isFetching);

  const [searchText, setSearchText] = useState("");

  const mockData = {
    requested: requested,
    footage_received: footage_received,
    assigned_to_editor: assigned_to_editor,
    editing_in_progress: editing_in_progress,
    revision_in_progress: revision_in_progress,
    edit_complete: edit_complete,
    approved_by_client: approved_by_client,
  };

  const mockLoadingFalse = {
    requested: false,
    footage_received: false,
    assigned_to_editor: false,
    editing_in_progress: false,
    revision_in_progress: false,
    edit_complete: false,
    approved_by_client: false,
  };
  const mockLoadingTrue = {
    requested: true,
    footage_received: true,
    assigned_to_editor: true,
    editing_in_progress: true,
    revision_in_progress: true,
    edit_complete: true,
    approved_by_client: false,
  };

  useEffect(() => {
    dispatch(setIsFetching(mockLoadingTrue));
    setTimeout(() => {
      dispatch(setData(mockData));
      dispatch(setIsFetching(mockLoadingFalse));
    }, 3000);
  }, []);

  // if (isFetching.requested) {
  //   return [...Array(8)].map((_, i) => (
  //     <div key={i} className="d-flex align-items-center">
  //       <div className="skeleton-loader"></div>
  //     </div>
  //   ));
  // }

  return (
    <div>
      <div>
        <input
          type="text"
          id="search-input"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e?.target?.value);
          }}
        />
      </div>
      <h1>Project Management</h1>
      <ProjectTableListView searchText={searchText} colDefData={columnDefs()} />
      {/* <ProjectTableListView
      /> */}
      {/* <ProjectTableList searchText={searchText} colDefData={columnDefs()} /> */}
    </div>
  );
};
