"use client";

import React, { useEffect, useState } from "react";
import { WorkspaceList } from "@/components/WorkSpace-List";

function EditorPage() {
  const [value, setValue] = useState<boolean | undefined>(undefined);
  const isInitialRender = value === undefined;
  useEffect(() => {
    setValue(true);
  }, []);
  if (isInitialRender) {
    return "Loading...";
  }
  return (
    <main>
      <WorkspaceList />
    </main>
  );
}

export default EditorPage;
