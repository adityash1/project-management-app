import { useAtom, useSetAtom } from "jotai";
import {
  currentPageIdAtom,
  currentWorkspaceIdAtom,
  workspaceIdsAtom,
} from "../store";
// import { useRouter } from "next/router";
import React, { useCallback } from "react";

export const WorkspaceList = () => {
  const [ids, setIds] = useAtom(workspaceIdsAtom);
//   const router = useRouter();
  const setWorkspaceId = useSetAtom(currentWorkspaceIdAtom);
  const setPageId = useSetAtom(currentPageIdAtom);
  return (
    <div className="w-full">
      {ids &&
        ids.map((id) => (
          <div className="flex items-center space-x-2 mb-2 p-2" key={id}>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIds((ids) => ids!.filter((i) => i !== id));
              }}
            >
              delete
            </button>
            <button
              onClick={() => {
                setWorkspaceId(id);
                setPageId("page0");
                // void router.push(`/${id}/page0`);
              }}
            >
              open
            </button>
            <span>{id}</span>
          </div>
        ))}
      <div
        className="flex items-center space-x-2 mb-2 p-2"
        onClick={useCallback(() => {
          const id = prompt("Workspace ID");
          if (id) {
            setIds((ids) => {
              if (!ids) {
                return [id];
              }
              if (ids.includes(id)) {
                return ids;
              }
              return [...ids, id];
            });
          }
        }, [setIds])}
      >
        ADD Workspace
      </div>
    </div>
  );
};
