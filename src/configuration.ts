import * as vscode from "vscode";

export default class Configuration {
  /**
   * @returns Run tests in Docker.
   */
  static fuzzySearch(): boolean {
    return vscode.workspace
      .getConfiguration("open-editor-search")
      .get("fuzzySearch");
  }
}
