import type { TipsCollection } from "./types";

export const defaultTipsCollection: TipsCollection = {
  projectCreation: [
    {
      title: "Did you know?",
      content: "It’s easier to find the projects when you organize them into workspaces using Label Studio Enterprise.",
      closable: true,
      link: {
        label: "Learn more",
        url: "https://docs.humansignal.com/guide/manage_projects#Create-workspaces-to-organize-projects",
        params: {
          experiment: "project_creation_tip",
          treatment: "find_and_manage_projects",
        },
      },
    },
    {
      title: "Unlock faster access provisioning",
      content:
        "Streamline assigning staff to multiple projects by assigning them to workspaces in Label Studio Enterprise.",
      closable: true,
      link: {
        label: "Learn more",
        url: "https://docs.humansignal.com/guide/manage_projects#Add-or-remove-members-to-a-workspace",
        params: {
          experiment: "project_creation_tip",
          treatment: "faster_provisioning",
        },
      },
    },
    {
      title: "Did you know?",
      content:
        "In the Enterprise platform, admins can view annotator performance dashboards to optimize resource allocation, improve team management, and inform compensation.",
      closable: true,
      link: {
        label: "Learn more",
        url: "https://docs.humansignal.com/guide/dashboard_annotator",
        params: {
          experiment: "project_creation_tip",
          treatment: "annotator_dashboard",
        },
      },
    },
    {
      title: "Did you know?",
      content:
        "You can control access to specific projects and workspaces for internal team members and external annotators using Label Studio Enterprise.",
      closable: true,
      link: {
        label: "Learn more",
        url: "https://docs.humansignal.com/guide/manage_users#Roles-in-Label-Studio-Enterprise",
        params: {
          experiment: "project_creation_tip",
          treatment: "access_to_projects",
        },
      },
    },
    {
      title: "Did you know?",
      content:
        "You can use or modify dozens or templates to configure your labeling UI, or create a custom configuration from scratch using simple XML-like tag.",
      closable: true,
      link: {
        label: "Learn more",
        url: "https://labelstud.io/guide/setup",
        params: {
          experiment: "project_creation_tip",
          treatment: "templates",
        },
      },
    },
    {
      title: "Labeling for GenAI",
      content:
        "Label Studio has templates available for supervised LLM fine-tuning, RAG retrieval ranking, RLHF, chatbot evaluation, and more.",
      closable: true,
      link: {
        label: "Explore templates",
        url: "https://labelstud.io/templates/gallery_generative_ai",
        params: {
          experiment: "project_creation_tip",
          treatment: "genai_templates",
        },
      },
    },
  ],
  organizationPage: [
    {
      title: "It looks like your team is growing!",
      content:
        "Assign roles to your team using Label Studio Enterprise and control access to sensitive data at the project and workspace levels.",
      closable: true,
      link: {
        label: "Learn more",
        url: "https://docs.humansignal.com/guide/manage_users#Roles-in-Label-Studio-Enterprise",
        params: {
          experiment: "organization_page_tip",
          treatment: "team_growing",
        },
      },
    },
    {
      title: "Want to simplify and secure logging in?",
      content: "Enable Single Sign-On for your team using SAML, SCIM2 or LDAP with Label Studio Enterprise.",
      closable: true,
      link: {
        label: "Learn more",
        url: "https://docs.humansignal.com/guide/auth_setup",
        params: {
          experiment: "organization_page_tip",
          treatment: "enable_sso",
        },
      },
    },
    {
      title: "Source data faster",
      content:
        "Use semantic search, similarity search, and filters to curate optimal datasets and automatically assign labeling tasks in the Enterprise platform.",
      closable: true,
      link: {
        label: "Learn more",
        url: "https://docs.humansignal.com/guide/dataset_overview",
        params: {
          experiment: "organization_page_tip",
          treatment: "data_discovery",
        },
      },
    },
    {
      title: "Want to automate task distribution?",
      content:
        "Create rules, automate how tasks are distributed to annotators, and only show tasks assigned to each annotator in their view.and control task visibility for each annotator.",
      closable: true,
      link: {
        label: "Learn more",
        url: "https://docs.humansignal.com/guide/setup_project#Set-up-annotation-settings-for-your-project",
        params: {
          experiment: "organization_page_tip",
          treatment: "automate_distribution",
        },
      },
    },
    {
      title: "Share knowledge with the community",
      content:
        "Have questions or a tip to share with other Label Studio users? Join the community slack channel for the latest updates. ",
      closable: true,
      link: {
        label: "Join the community",
        url: "https://label-studio.slack.com",
        params: {
          experiment: "organization_page_tip",
          treatment: "share_knowledge",
        },
      },
    },
    {
      title: "Did you know?",
      content:
        "Label Studio supports multiple points of integration with cloud storage, machine learning models, and popular tools to automate your machine learning pipeline.",
      closable: true,
      link: {
        label: "Check out the integrations directory",
        url: "https://labelstud.io/integrations/",
        params: {
          experiment: "organization_page_tip",
          treatment: "integration_points",
        },
      },
    },
  ],
  projectSettings: [
    {
      title: "节省时间与自动标签",
      content:
        "Use automation to instantly label large-scale datasets without sacrificing quality in the Enterprise platform.",
      closable: true,
      link: {
        label: "学习更多",
        url: "https://docs.humansignal.com/guide/prompts_overview#Auto-labeling-with-Prompts",
        params: {
          experiment: "project_settings_tip",
          treatment: "auto_labeling",
        },
      },
    },
    {
      title: "你知道吗?",
      content:
        "您可以使用Label Studio Enterprise通过审阅者工作流和任务协议分数来提高标记数据的质量.",
      closable: true,
      link: {
        label: "学习更多",
        url: "https://docs.humansignal.com/guide/quality",
        params: {
          experiment: "project_settings_tip",
          treatment: "quality_and_agreement",
        },
      },
    },
    {
      title: "评估GenAI模型",
      content:
        "结合自动化和人工监督来评估和确保企业平台的LLM质量.",
      closable: true,
      link: {
        label: "Learn more",
        url: "https://humansignal.com/evals/",
        params: {
          experiment: "project_settings_tip",
          treatment: "evals",
        },
      },
    },
    {
      title: "你知道吗?",
      content:
        "通过使用Enterprise云服务，您可以节省管理基础架构和升级的时间，还可以访问自动化、质量和团队管理的更多特性.",
      closable: true,
      link: {
        label: "Learn more",
        url: "https://humansignal.com/platform/",
        params: {
          experiment: "project_settings_tip",
          treatment: "infrastructure_and_upgrades",
        },
      },
    },
    {
      title: "你知道吗?",
      content: "您可以使用后端SDK连接ML模型，以节省预标记或主动学习的时间.",
      closable: true,
      link: {
        label: "Learn more",
        url: "https://labelstud.io/guide/ml",
        params: {
          experiment: "project_settings_tip",
          treatment: "connect_ml_models",
        },
      },
    },
    {
      title: "更快的图像标记",
      content:
        "只需单击两次，您就可以向图像添加矩形或椭圆，或者双击即可创建多边形、矩形或椭圆.",
      closable: true,
      link: {
        label: "Learn more",
        url: "https://labelstud.io/guide/labeling#Faster-image-labeling",
        params: {
          experiment: "project_settings_tip",
          treatment: "two_clicks",
        },
      },
    },
  ],
};
