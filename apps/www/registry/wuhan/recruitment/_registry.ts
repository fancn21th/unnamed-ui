import { type Registry } from "shadcn/schema";

// Recruitment blocks - separate for easy removal
export const recruitmentBlocks: Registry["items"] = [
  {
    name: "action-dropdown",
    type: "registry:block",
    title: "Action Dropdown",
    description: "操作下拉菜单组件",
    files: [
      {
        path: "recruitment/ActionDropdown/ActionDropdown.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/action-dropdown.tsx",
      },
    ],
  },
  {
    name: "chat-radio",
    type: "registry:block",
    title: "Chat Radio",
    description: "聊天单选组件",
    files: [
      {
        path: "recruitment/ChatRadio/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/chat-radio.tsx",
      },
    ],
  },
  {
    name: "delete-confirm-modal",
    type: "registry:block",
    title: "Delete Confirm Modal",
    description: "删除确认对话框",
    files: [
      {
        path: "recruitment/DeleteConfirmModal/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/delete-confirm-modal.tsx",
      },
    ],
  },
  {
    name: "datasource-guide",
    type: "registry:block",
    title: "Datasource Guide",
    description: "数据来源引导卡片",
    files: [
      {
        path: "recruitment/DatasourceGuide/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/datasource-guide.tsx",
      },
    ],
  },
  {
    name: "job-card",
    type: "registry:block",
    title: "Job Card",
    description: "职位卡片",
    files: [
      {
        path: "recruitment/JobCard/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/job-card.tsx",
      },
    ],
  },
  {
    name: "message-bubble",
    type: "registry:block",
    title: "Message Bubble",
    description: "消息气泡",
    files: [
      {
        path: "recruitment/MessageBubble/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/message-bubble.tsx",
      },
    ],
  },
  {
    name: "recruitment-scene",
    type: "registry:block",
    title: "Recruitment Scene",
    description: "招聘场景",
    files: [
      {
        path: "recruitment/RecruitmentScene/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/recruitment-scene.tsx",
      },
    ],
  },
  {
    name: "report-section",
    type: "registry:block",
    title: "Report Section",
    description: "报告模块容器",
    files: [
      {
        path: "recruitment/ReportSection/ReportSection.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/report-section.tsx",
      },
    ],
  },
  {
    name: "resource-upload",
    type: "registry:block",
    title: "Resource Upload",
    description: "资源上传",
    files: [
      {
        path: "recruitment/ResourceUpload/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/resource-upload.tsx",
      },
    ],
  },
  {
    name: "similar-job",
    type: "registry:block",
    title: "Similar Job",
    description: "相似职位参考",
    files: [
      {
        path: "recruitment/SimilarJob/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/similar-job.tsx",
      },
    ],
  },
  {
    name: "thinking",
    type: "registry:block",
    title: "Thinking",
    description: "深度思考组件",
    files: [
      {
        path: "recruitment/Thinking/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/thinking.tsx",
      },
    ],
  },
  {
    name: "report-card",
    type: "registry:block",
    title: "Report Card",
    description: "报告卡片",
    files: [
      {
        path: "recruitment/ReportCard/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/report-card.tsx",
      },
    ],
  },
  {
    name: "step-detail",
    type: "registry:block",
    title: "Step Detail",
    description: "步骤详情",
    files: [
      {
        path: "recruitment/StepDetail/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/step-detail.tsx",
      },
    ],
  },
  {
    name: "step-overview",
    type: "registry:block",
    title: "Step Overview",
    description: "步骤总览",
    files: [
      {
        path: "recruitment/StepOverview/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/step-overview.tsx",
      },
    ],
  },
  {
    name: "candidates-table",
    type: "registry:block",
    title: "Candidates Table",
    description: "候选人信息表格",
    files: [
      {
        path: "recruitment/CandidatesTable/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/candidates-table.tsx",
      },
    ],
  },
  {
    name: "personnel-recommend",
    type: "registry:block",
    title: "Personnel Recommend",
    description: "人员推荐列表",
    files: [
      {
        path: "recruitment/PersonnelRecommend/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/personnel-recommend.tsx",
      },
    ],
  },
  {
    name: "recruitment-job-table",
    type: "registry:block",
    title: "Recruitment Job Table",
    description: "招聘岗位表格",
    files: [
      {
        path: "recruitment/RecruitmentJobTable/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/recruitment-job-table.tsx",
      },
    ],
  },
  {
    name: "interview-process-table",
    type: "registry:block",
    title: "Interview Process Table",
    description: "面试流程表格",
    files: [
      {
        path: "recruitment/InterviewProcessTable/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/interview-process-table.tsx",
      },
    ],
  },
  {
    name: "todo-list",
    type: "registry:block",
    title: "Todo List",
    description: "待办事项列表",
    files: [
      {
        path: "recruitment/TodoList/TodoList.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/todo-list.tsx",
      },
    ],
  },
  {
    name: "work-objective-list",
    type: "registry:block",
    title: "Work Objective List",
    description: "工作目标列表",
    files: [
      {
        path: "recruitment/WorkObjectiveList/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/work-objective-list.tsx",
      },
    ],
  },
  {
    name: "work-result-list",
    type: "registry:block",
    title: "Work Result List",
    description: "工作结果列表",
    files: [
      {
        path: "recruitment/WorkResultList/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/work-result-list.tsx",
      },
    ],
  },
  {
    name: "repeat-file-modal",
    type: "registry:block",
    title: "Repeat File Modal",
    description: "重复文件提示对话框",
    files: [
      {
        path: "recruitment/RepeatFileModal/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/repeat-file-modal.tsx",
      },
    ],
  },
  {
    name: "candidate-report",
    type: "registry:block",
    title: "Candidate Report",
    description: "候选人评估报告",
    files: [
      {
        path: "recruitment/CandidateReport/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/candidate-report.tsx",
      },
    ],
  },
  {
    name: "capability-column",
    type: "registry:block",
    title: "Capability Column",
    description: "能力对比柱状图",
    files: [
      {
        path: "recruitment/CapabilityColumn/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/capability-column.tsx",
      },
    ],
  },
  {
    name: "confirm-jd-form",
    type: "registry:block",
    title: "Confirm JD Form",
    description: "JD确认表单",
    files: [
      {
        path: "recruitment/ConfirmJDForm/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/confirm-jd-form.tsx",
      },
    ],
  },
  {
    name: "data-source-list",
    type: "registry:block",
    title: "Data Source List",
    description: "数据来源列表",
    files: [
      {
        path: "recruitment/DataSourceList/DataSourceList.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/data-source-list.tsx",
      },
    ],
  },
  {
    name: "interview-info-form",
    type: "registry:block",
    title: "Interview Info Form",
    description: "面试信息表单",
    files: [
      {
        path: "recruitment/InterviewInfoForm/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/interview-info-form.tsx",
      },
    ],
  },
  {
    name: "interview-question-panel",
    type: "registry:block",
    title: "Interview Question Panel",
    description: "面试问题面板",
    files: [
      {
        path: "recruitment/InterviewQuestionPanel/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/interview-question-panel.tsx",
      },
    ],
  },
  {
    name: "recruitment-activity-overview",
    type: "registry:block",
    title: "Recruitment Activity Overview",
    description: "招聘活动概览",
    files: [
      {
        path: "recruitment/RecruitmentActivityOverview/RecruitmentActivityOverview.tsx",
        type: "registry:component",
        target:
          "components/wuhan/recruitment/recruitment-activity-overview.tsx",
      },
    ],
  },
  {
    name: "resume-evaluation-report",
    type: "registry:block",
    title: "Resume Evaluation Report",
    description: "简历评估报告",
    files: [
      {
        path: "recruitment/ResumeEvaluationReport/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/resume-evaluation-report.tsx",
      },
    ],
  },
  //sender-input
  {
    name: "sender-input",
    type: "registry:block",
    title: "Sender Input",
    description: "发送者输入组件",
    files: [
      {
        path: "recruitment/Sender/index.tsx",
        type: "registry:component",
        target: "components/wuhan/recruitment/sender.tsx",
      },
    ],
  },
];
