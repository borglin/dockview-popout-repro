import { DockviewPanelApi } from "dockview";
import React from "react";

export function usePanelWindowObject(api: DockviewPanelApi): Window {
  const [document, setDocument] = React.useState<Window>(api.getWindow());

  React.useEffect(() => {
    const disposable = api.onDidLocationChange(() => {
      setDocument(api.getWindow());
    });

    return () => {
      disposable.dispose();
    };
  }, [api]);

  return document;
}
