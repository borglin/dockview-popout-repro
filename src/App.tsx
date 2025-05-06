import {
  DockviewApi,
  DockviewReact,
  DockviewReadyEvent,
  IDockviewReactProps,
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
    return <div>Panel</div>;
  },
};

const tabComponents: IDockviewReactProps["tabComponents"] = {
  default: (props) => {
    const panelInstance = props.api.group.panels.find(
      (p) => p.id === props.api.id
    );
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <div>{props.api.title}</div>
        <button
          style={{ appearance: "none", background: "none", border: "none", display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          onClick={() =>
            panelInstance && props.containerApi.addPopoutGroup(panelInstance)
          }
        >
          <span style={{ color: 'white', fontSize: '18px' }} className="material-symbols-outlined">back_to_tab</span>
        </button>
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
              <button onClick={() => localStorage.clear()}>
                Clear storage
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
                tabComponents={tabComponents}
                watermarkComponent={Watermark}
                leftHeaderActionsComponent={LeftComponent}
                rightHeaderActionsComponent={RightComponent}
                defaultTabComponent={tabComponents.default}
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
