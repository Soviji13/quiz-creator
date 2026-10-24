import { ItemView, WorkspaceLeaf } from "obsidian";
import { StrictMode } from "react";
import { createRoot, Root } from "react-dom/client";
import { VIEW_TYPE_EXAMPLE } from "../constants"
import { AppContext } from "../ui/context/AppContext";
import { ExampleApp } from "../ui/components/ExampleApp";

export class ExampleView extends ItemView {

  private root: Root | null = null;

  constructor (leaf: WorkspaceLeaf) {
    super (leaf);
  }

  getViewType() { return VIEW_TYPE_EXAMPLE; }
  getDisplayText() { return "Vista de ejemplo"; }
  getIcon() { return "layout-dashboard"; }

  async onOpen() {
    this.root = createRoot(this.contentEl);
    this.root.render(
      <StrictMode>
        <AppContext.Provider value={this.app}>
          <ExampleApp />
        </AppContext.Provider>
      </StrictMode>
    )
  }

  async onClose() {
    this.root?.unmount();
    this.root = null;
  }
}