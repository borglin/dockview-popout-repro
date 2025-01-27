import {
  DockviewApi,
  DockviewReact,
  DockviewReadyEvent,
  SerializedDockview,
} from "dockview";
import "dockview/dist/styles/dockview.css";
import React from "react";
import { useLocalStorage } from "./hooks/useLocalStorage.tsx";
import { loadDefaultLayout } from "./utils/loadDefaultLayout.tsx";
import { RightComponent } from "./components/RightComponent.tsx";
import { Watermark } from "./Watermark.tsx";
import { LeftComponent } from "./components/LeftComponent.tsx";
import { Route, Routes } from "react-router";

const components = {
  default: () => {
    return (
      <div>
        Panel
      </div>
    );
  },
};

export const App = (props: { theme?: string }) => {
  const [api, setApi] = React.useState<DockviewApi>();
  const [layout, setLayout] =
    useLocalStorage<SerializedDockview>("floating.layout");

  const load = (api: DockviewApi) => {
    api.clear();
    if (layout) {
      try {
        api.fromJSON(layout);
      } catch (err) {
        console.error(err);
        api.clear();
        loadDefaultLayout(api);
      }
    } else {
      loadDefaultLayout(api);
    }
  };

  const onReady = (event: DockviewReadyEvent) => {
    load(event.api);
    setApi(event.api);
  };

  return (
    <Routes>
      <Route path="/popout.html" />
      <Route
        path="/"
        element={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <style media="only screen"></style>
            <div style={{ height: "25px" }}>
              <button
                onClick={() => {
                  if (api) {
                    setLayout(api.toJSON());
                  }
                }}
              >
                Save
              </button>
              <button
                onClick={() => {
                  if (api) {
                    load(api);
                  }
                }}
              >
                Load
              </button>
              <button
                onClick={() => {
                  setLayout(null);
                  api!.clear();
                }}
              >
                Clear
              </button>
            </div>
            <div
              style={{
                flexGrow: 1,
              }}
            >
              <DockviewReact
                onReady={onReady}
                components={components}
                watermarkComponent={Watermark}
                leftHeaderActionsComponent={LeftComponent}
                rightHeaderActionsComponent={RightComponent}
                className={`${props.theme || "dockview-theme-abyss"}`}
              />
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default App;
