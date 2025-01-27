import { IDockviewHeaderActionsProps } from "dockview";
import React from "react";
import { Icon } from "../utils/utils";

export const RightComponent = (props: IDockviewHeaderActionsProps) => {
  const [popout, setPopout] = React.useState<boolean>(
    props.api.location.type === "popout"
  );

  React.useEffect(() => {
    const disposable = props.group.api.onDidLocationChange((event) => [
      setPopout(event.location.type === "popout"),
    ]);

    return () => {
      disposable.dispose();
    };
  }, [props.group.api]);

  const onClick = () => {
    if (popout) {
      const group = props.containerApi.addGroup();
      props.group.api.moveTo({ group });
    } else {
      props.containerApi.addPopoutGroup(props.group, {
        popoutUrl: "/popout/index.html",
      });
    }
  };

  return (
    <div style={{ height: "100%", color: "white", padding: "0px 4px" }}>
      <Icon
        onClick={onClick}
        icon={popout ? "jump_to_element" : "back_to_tab"} />
    </div>
  );
};
