import type { App } from "obsidian";
import { VIEW_TYPE_EXAMPLE } from "../constants";

export async function openExampleView (app: App) {
  const { workspace } = app;
  let leaf = workspace.getLeavesOfType(VIEW_TYPE_EXAMPLE)[0];

  if (!leaf) {
    const rightLeaf = workspace.getRightLeaf(false);
    if (!rightLeaf) return;
    await rightLeaf.setViewState({ type: VIEW_TYPE_EXAMPLE, active: true});
    leaf = rightLeaf;
  }

  workspace.revealLeaf(leaf);
}