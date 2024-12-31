---
title: Create a Prompt
short: Create a Prompt
tier: enterprise
type: guide
order: 0
order_enterprise: 228
meta_title: Create a Prompt
meta_description: How to create a Prompt
section: Prompts
date: 2024-06-11 16:53:16
---


## Prerequisites

* An API key for your LLM. 
* A project that meets the [criteria noted below](#Create-a-Prompt). 

## Model provider API keys

You can specify one OpenAI API key and/or multiple custom and Azure OpenAI keys per organization. Keys only need to be added once. 

Click **API Keys** in the top right of the Prompts page to open the **Model Provider API Keys** window:

![Screenshot of the API keys modal](/images/prompts/model_keys.png)

Once added, you will have the option to select from the base models associated with each API key as you configure your prompts:

![Screenshot of the Base Models drop-down](/images/prompts/base_models.png)

To remove the key, click **API Keys** in the upper right of the Prompts page. You'll have the option to remove the key and add a new one. 

### Add OpenAI, Azure OpenAI, or a custom model

{% details <b>Use an OpenAI key</b> %}

You can only have one OpenAI key per organization. For a list of the OpenAI models we support, see [Features, requirements, and constraints](prompts_overview#Features-requirements-and-constraints). 

If you don't already have one, you can [create an OpenAI account here](https://platform.openai.com/signup).

You can find your OpenAI API key on the [API key page](https://platform.openai.com/api-keys). 

Once added, all supported OpenAI models will appear in the base model options when you configure your prompt.

{% enddetails %}

{% details <b>Use an Azure OpenAI key</b> %}

Each Azure OpenAI key is tied to a specific deployment, and each deployment comprises a single OpenAI model. So if you want to use multiple models through Azure, you will need to create a deployment for each model and then add each key to Label Studio. 

For a list of the Azure OpenAI models we support, see [Features, requirements, and constraints](prompts_overview#Features-requirements-and-constraints). 

To use Azure OpenAI, you must first create the Azure OpenAI resource and then a model deployment:

1. From the Azure portal, [create an Azure OpenAI resource](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/create-resource?pivots=web-portal#create-a-resource). 

!!! note
    If you are restricting network access to your resource, you will need to add the following IP addresses when configuring network security:
    
    * 3.219.3.197
    * 34.237.73.3
    * 44.216.17.242


2. From Azure OpenAI Studio, [create a deployment](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/create-resource?pivots=web-portal#deploy-a-model). This is a base model endpoint. 

When adding the key to Label Studio, you are asked for the following information:

| Field | Description|
| --- | --- |
| **Deployment** | The is the name of the deployment. By default, this is the same as the model name, but you can customize it when you create the deployment. If they are different, you must use the deployment name and not the underlying model name. |
| **Endpoint** | This is the target URI provided by Azure.  |
| **API key** | This is the key provided by Azure. |

You can find all this information in the **Details** section of the deployment in Azure OpenAI Studio. 

![Screenshot of the Azure deployment details](/images/prompts/azure_deployment.png)

{% enddetails %}

{% details <b>Use a custom LLM</b> %}

You can use your own self-hosted and fine-tuned model as long as it meets the following criteria:

* Your server must provide [JSON mode](https://python.useinstructor.com/concepts/patching/#json-mode) for the LLM. 
* The server API must follow [OpenAI format](https://platform.openai.com/docs/api-reference/chat/create#chat-create-response_format). 

Examples of compatible LLMs include [Ollama](https://ollama.com/) and [sglang](https://github.com/sgl-project/sglang?tab=readme-ov-file#openai-compatible-api). 

To add a custom model, enter the following:

* A name for the model. 
* The endpoint URL for the model. For example, `https://my.openai.endpoint.com/v1`
* An API key to access the model. (Optional)
* An auth token to access the model. (Optional)

{% enddetails %}


## Create a Prompt

From the Prompts page, click **Create Prompt** in the upper right and then complete the following fields:

<div class="noheader rowheader">

| | |
| --- | --- |
| Name | Enter a name for the Prompt. |
| Description | Enter a description for the Prompt.  |
| Target Project| Select the project you want to use. If you don't have any eligible projects, you will see an error message. <br>See the note below. <br><br>When you select a project, additional information about the labeling config appears. This includes the classes that will be used when applying the prompt.  |

</div>

!!! note Eligible projects
    Target projects must meet the following criteria:
    * You must have access to the project. If you are in the Manager role, you need to be added to the project to have access. 
    * The project cannot be located in your Personal Sandbox workspace. 
    * While projects connected to an ML backend will still appear in the list of eligible projects, we do not recommend using Prompts with an ML backend as this can interfere with how accuracy and score are calculated when evaluating the prompt. 
  
