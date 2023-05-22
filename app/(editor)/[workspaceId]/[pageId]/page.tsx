"use client";

import {
  currentPageIdAtom,
  currentWorkspaceAtom,
  currentWorkspaceIdAtom,
  rootStore,
} from "@/store";
import { useAtomValue } from "jotai";
import { Suspense, useEffect, useState } from "react";

import Link from "next/link";
import { Editor } from "@/components/Editor";
import { PageList } from "@/components/PageList";
import { assertExists } from "@blocksuite/store";
import { initPage } from "@/lib/utils";

const WorkspacePage = () => {
  const workspaceId = useAtomValue(currentWorkspaceIdAtom);
  const pageId = useAtomValue(currentPageIdAtom);
  const [value, setValue] = useState<boolean | undefined>(undefined);
  const isInitialRender = value === undefined;
  useEffect(() => {
    setValue(true);
  }, []);
  if (isInitialRender) {
    return "Loading...";
  }
  return (
    <div className=" w-screen h-screen flex items-center">
      <Link href="/${workspaceId}">Back to root</Link>
      <div>
        {workspaceId && <PageList />}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={async () => {
            const workspace = await rootStore.get(currentWorkspaceAtom);
            assertExists(workspace);
            const page = workspace.createPage({
              id: `page${workspace.meta.pageMetas.length}`,
            });
            initPage(page);
          }}
        >
          add page
        </button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Editor key={`${workspaceId}-${pageId}`} />
      </Suspense>
    </div>
  );
};

export default WorkspacePage;
