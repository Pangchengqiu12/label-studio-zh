import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Button } from "../../components";
import { Form, TextArea, Toggle } from "../../components/Form";
import { MenubarContext } from "../../components/Menubar/Menubar";
import { Block, Elem } from "../../utils/bem";

import { ModelVersionSelector } from "./AnnotationSettings/ModelVersionSelector";
import { ProjectContext } from "../../providers/ProjectProvider";
import { Divider } from "../../components/Divider/Divider";

export const AnnotationSettings = () => {
  const { project, fetchProject } = useContext(ProjectContext);
  const pageContext = useContext(MenubarContext);
  const formRef = useRef();
  const [collab, setCollab] = useState(null);

  useEffect(() => {
    pageContext.setProps({ formRef });
  }, [formRef]);

  const updateProject = useCallback(() => {
    fetchProject(project.id, true);
  }, [project]);

  return (
    <Block name="annotation-settings">
      <Elem name={"wrapper"}>
        <h1>标记设置</h1>
        <Block name="settings-wrapper">
          <Form
            ref={formRef}
            action="updateProject"
            formData={{ ...project }}
            params={{ pk: project.id }}
            onSubmit={updateProject}
          >
            <Form.Row columnCount={1}>
              <Elem name={"header"}>标签说明</Elem>
              <div style={{ color: "var(--sand_600)", fontSize: "14px" }}>
                <p style={{ marginBottom: "0" }}>编写帮助用户完成标记任务的说明.</p>
                <p style={{ marginTop: "8px" }}>
                指令字段支持 HTML 标记，并允许使用图片、iframe (pdf).
                </p>
              </div>
              <div>
                <Toggle label="标签前展示" name="show_instruction" />
              </div>
              <TextArea name="expert_instruction" style={{ minHeight: 128, maxWidth: "520px" }} />
            </Form.Row>

            <Divider height={32} />

            <Form.Row columnCount={1}>
              <br />
              <Elem name={"header"}>预标注</Elem>
              <div>
                <Toggle
                  label="使用预测预标记任务"
                  description={<span>启用并选择用于预标记的预测集.</span>}
                  name="show_collab_predictions"
                  onChange={(e) => {
                    setCollab(e.target.checked);
                  }}
                />
              </div>

              {(collab !== null ? collab : project.show_collab_predictions) && <ModelVersionSelector />}
            </Form.Row>

            <Form.Actions>
              <Form.Indicator>
                <span case="success">保存!</span>
              </Form.Indicator>
              <Button type="submit" look="primary" style={{ width: 120 }}>
              保存
              </Button>
            </Form.Actions>
          </Form>
        </Block>
      </Elem>
    </Block>
  );
};

AnnotationSettings.title = "标注";
AnnotationSettings.path = "/annotation";
