import { IDockviewHeaderActionsProps } from "dockview";
import { Icon } from "../utils/utils";

let panelCount = 0;

export const LeftComponent = (props: IDockviewHeaderActionsProps) => {
  const onClick = () => {
    props.containerApi.addPanel({
      id: (++panelCount).toString(),
      title: `Tab ${panelCount}`,
      component: "default",
      position: { referenceGroup: props.group },
    });
  };
  return (
    <div style={{ height: "100%", color: "white", padding: "0px 4px" }}>
      <Icon onClick={onClick} icon={"add"} />
    </div>
  );
};
