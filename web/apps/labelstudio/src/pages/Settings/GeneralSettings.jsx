import { useCallback, useContext } from "react";
import { Button } from "../../components";
import { Form, Input, Select, TextArea } from "../../components/Form";
import { RadioGroup } from "../../components/Form/Elements/RadioGroup/RadioGroup";
import { ProjectContext } from "../../providers/ProjectProvider";
import { Block, Elem } from "../../utils/bem";
import { EnterpriseBadge } from "../../components/Badges/Enterprise";
import "./settings.scss";
import { HeidiTips } from "../../components/HeidiTips/HeidiTips";
import { FF_LSDV_E_297, isFF } from "../../utils/feature-flags";
import { createURL } from "../../components/HeidiTips/utils";
import { Caption } from "../../components/Caption/Caption";

export const GeneralSettings = () => {
  const { project, fetchProject } = useContext(ProjectContext);

  const updateProject = useCallback(() => {
    if (project.id) fetchProject(project.id, true);
  }, [project]);

  const colors = ["#FDFDFC", "#FF4C25", "#FF750F", "#ECB800", "#9AC422", "#34988D", "#617ADA", "#CC6FBE"];

  const samplings = [
    { value: "Sequential", label: "顺序", description: "任务按数据管理器排序" },
    { value: "Uniform", label: "随机", description: "任务选择采用均匀随机" },
  ];

  return (
    <Block name="general-settings">
      <Elem name={"wrapper"}>
        <h1>通用设置</h1>
        <Block name="settings-wrapper">
          <Form action="updateProject" formData={{ ...project }} params={{ pk: project.id }} onSubmit={updateProject}>
            <Form.Row columnCount={1} rowGap="16px">
              <Input name="title" label="项目名称" />

              <TextArea name="description" label="描述" style={{ minHeight: 128 }} />
              {isFF(FF_LSDV_E_297) && (
                <Block name="workspace-placeholder">
                  <Elem name="badge-wrapper">
                    <Elem name="title">工作空间</Elem>
                    <EnterpriseBadge />
                  </Elem>
                  <Select placeholder="选择一个选项" disabled options={[]} />
                  <Caption>
                  通过将项目组织到工作区中来简化项目管理.{" "}
                    <a
                      target="_blank"
                      href={createURL(
                        "https://docs.humansignal.com/guide/manage_projects#Create-workspaces-to-organize-projects",
                        {
                          experiment: "project_settings_tip",
                          treatment: "simplify_project_management",
                        },
                      )}
                      rel="noreferrer"
                    >
                      学习更多
                    </a>
                  </Caption>
                </Block>
              )}
              <RadioGroup name="color" label="颜色" size="large" labelProps={{ size: "large" }}>
                {colors.map((color) => (
                  <RadioGroup.Button key={color} value={color}>
                    <Block name="color" style={{ "--background": color }} />
                  </RadioGroup.Button>
                ))}
              </RadioGroup>

              <RadioGroup label="任务抽样" labelProps={{ size: "large" }} name="sampling" simple>
                {samplings.map(({ value, label, description }) => (
                  <RadioGroup.Button
                    key={value}
                    value={`${value} 采样`}
                    label={`${label} 采样`}
                    description={description}
                  />
                ))}
                {isFF(FF_LSDV_E_297) && (
                  <RadioGroup.Button
                    key="uncertainty-sampling"
                    value=""
                    label={
                      <>
                        不确定性采样 <EnterpriseBadge />
                      </>
                    }
                    disabled
                    description={
                      <>
                        任务根据模型不确定性得分进行选择 (主动学习模式).{" "}
                        <a
                          target="_blank"
                          href={createURL("https://docs.humansignal.com/guide/active_learning", {
                            experiment: "project_settings_workspace",
                            treatment: "workspaces",
                          })}
                          rel="noreferrer"
                        >
                          学习更多
                        </a>
                      </>
                    }
                  />
                )}
              </RadioGroup>
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
      {isFF(FF_LSDV_E_297) && <HeidiTips collection="projectSettings" />}
    </Block>
  );
};

GeneralSettings.menuItem = "通用";
GeneralSettings.path = "/";
GeneralSettings.exact = true;
