import { Columns } from "../../../components/Columns/Columns";
import { Description } from "../../../components/Description/Description";
import { Block, cn } from "../../../utils/bem";
import { Elem } from "../../../utils/bem";
import { StorageSet } from "./StorageSet";
import "./StorageSettings.scss";
import { isInLicense, LF_CLOUD_STORAGE_FOR_MANAGERS } from "../../../utils/license-flags";

const isAllowCloudStorage = !isInLicense(LF_CLOUD_STORAGE_FOR_MANAGERS);

export const StorageSettings = () => {
  const rootClass = cn("storage-settings");

  return isAllowCloudStorage ? (
    <Block name="storage-settings">
      <Elem name={"wrapper"}>
        <h1>云存储</h1>
        <Description style={{ marginTop: 0 }}>
        使用云存储或数据库存储作为您的标签任务源或完成标注的目标。.
        </Description>

        <Columns count={2} gap="40px" size="320px" className={rootClass}>
          <StorageSet title="源云存储" buttonLabel="添加源云存储" rootClass={rootClass} />

          <StorageSet
            title="目标云存储"
            target="export"
            buttonLabel="添加目标云存储"
            rootClass={rootClass}
          />
        </Columns>
      </Elem>
    </Block>
  ) : null;
};

StorageSettings.title = "云存储";
StorageSettings.path = "/storage";
