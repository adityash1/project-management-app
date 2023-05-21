import { createStore, atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { assertExists, DisposableGroup, Workspace } from "@blocksuite/store";
import { atomWithObservable } from "jotai/utils";
// @ts-expect-error
import { createIndexedDBProvider } from "@toeverything/y-indexeddb";
import { AffineSchemas } from "@blocksuite/blocks/models";
import type { EditorContainer } from "@blocksuite/editor";
import type { PageMeta } from "@blocksuite/store";
import { initPage, WorkspaceNotFoundError } from "@/lib/utils";
import { Observable, from } from "rxjs";
import { filter, mergeMap } from "rxjs/operators";

const editorContainerAtom = atom<Promise<typeof EditorContainer>>(async () => {
  const { EditorContainer } = await import("@blocksuite/editor");
  return EditorContainer;
});

export const rootStore = createStore();

// if the value is `null`, it means the user has not created any workspace yet
export const workspaceIdsAtom = atomWithStorage<string[] | null>(
  "workspaces",
  null
);

// hotfix for jotai #1813
rootStore.sub(workspaceIdsAtom, () => {});

workspaceIdsAtom.onMount = (set) => {
  if (localStorage.getItem("workspaces") === null) {
    set(["demo-workspace"]);
  }
};

export const currentWorkspaceIdAtom = atom<string | null>(null);
export const currentPageIdAtom = atom<string | null>(null);

const hashMap = new Map<string, Workspace>();

export const currentWorkspaceAtom = atom<Promise<Workspace | null>>(
  async (get, { signal }) => {
    const ids = get(workspaceIdsAtom);
    const id = get(currentWorkspaceIdAtom);
    console.log(ids);
    if (!id) return null;
    if (ids === null) {
      return null;
    }
    if (ids.indexOf(id) === -1) {
      throw new WorkspaceNotFoundError("workspace not found");
    }
    let workspace = hashMap.get(id);
    if (!workspace) {
      workspace = new Workspace({
        id,
      });
      workspace.register(AffineSchemas);
      hashMap.set(id, workspace);
    }
    const provider = createIndexedDBProvider(workspace.id, workspace.doc);
    assertExists(provider);
    provider.connect();
    provider.whenSynced.then(() => {
      assertExists(workspace);
      if (workspace.isEmpty) {
        const page = workspace.createPage({
          id: "page0",
        });

        initPage(page);
      } else {
        const page = workspace.getPage("page0");
        assertExists(page);
      }
    });
    await provider.whenSynced;
    if (signal.aborted) {
      provider.disconnect();
      return null;
    }
    signal.addEventListener("abort", () => {
      provider.disconnect();
    });
    return workspace;
  }
);

export const currentPageMetaAtom = atomWithObservable<PageMeta[]>((get) => {
  return from(get(currentWorkspaceAtom)).pipe(
    filter((workspace): workspace is Workspace => workspace !== null),
    mergeMap((workspace) => {
      const group = new DisposableGroup();
      return new Observable<PageMeta[]>((subscriber) => {
        group.add(
          workspace.slots.pageAdded.on(() => {
            subscriber.next(workspace.meta.pageMetas);
          })
        );
        group.add(
          workspace.slots.pageRemoved.on(() => {
            subscriber.next(workspace.meta.pageMetas);
          })
        );
        subscriber.next(workspace.meta.pageMetas);

        return () => {
          group.dispose();
        };
      });
    })
  );
});

export const editorAtom = atom<Promise<EditorContainer | null>>(async (get) => {
  const workspace = await get(currentWorkspaceAtom);
  const pageId = get(currentPageIdAtom);
  if (!workspace || !pageId) return null;
  const EditorContainer = await get(editorContainerAtom);
  const editor = new EditorContainer();
  const page = workspace.getPage(pageId);
  if (!page) {
    return null;
  }
  editor.page = page;
  return editor;
});

if (typeof window !== "undefined") {
  const workspaceId = window.location.pathname.split("/")[1];
  const pageId = window.location.pathname.split("/")[2];
  if (workspaceId) {
    rootStore.set(currentWorkspaceIdAtom, workspaceId);
  }
  if (pageId) {
    rootStore.set(currentPageIdAtom, pageId);
  }
}
