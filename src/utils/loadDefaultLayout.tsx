import { DockviewApi } from "dockview";

export function loadDefaultLayout(api: DockviewApi) {
  api.addPanel({
    id: "panel_1",
    component: "default",
  });

  api.addPanel({
    id: 'panel_2',
    component: 'default',
  });

  api.addPanel({
    id: 'panel_3',
    component: 'default',
  });

  api.addPanel({
    id: 'panel_4',
    component: 'default',
  });

  api.addPanel({
    id: 'panel_5',
    component: 'default',
    position: { direction: 'right' },
  });

  api.addPanel({
    id: 'panel_6',
    component: 'default',
  });
}
