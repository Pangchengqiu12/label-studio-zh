import { observer } from "mobx-react";
import { LsRedo, LsRemove, LsUndo } from "../../assets/icons";
import { Button } from "../../common/Button/Button";
import { Tooltip } from "../../common/Tooltip/Tooltip";
import { Block, Elem } from "../../utils/bem";
import "./HistoryActions.scss";

export const EditingHistory = observer(({ entity }) => {
  const { history } = entity;

  return (
    <Block name="history-buttons">
      <Tooltip title="撤销">
        <Elem
          tag={Button}
          name="action"
          type="text"
          aria-label="Undo"
          disabled={!history?.canUndo}
          onClick={() => entity.undo()}
          icon={<LsUndo />}
        />
      </Tooltip>
      <Tooltip title="恢复">
        <Elem
          tag={Button}
          name="action"
          type="text"
          aria-label="Redo"
          disabled={!history?.canRedo}
          onClick={() => entity.redo()}
          icon={<LsRedo />}
        />
      </Tooltip>
      <Tooltip title="重置">
        <Elem
          tag={Button}
          name="action"
          type="text"
          aria-label="Reset"
          disabled={!history?.canUndo}
          onClick={() => history?.reset()}
          icon={<LsRemove />}
        />
      </Tooltip>
    </Block>
  );
});
