import type { Registry } from "shadcn/schema";

// Recruitment examples - separate for easy removal
const recruitmentExamples: Registry["items"] = [
  {
    name: "action-dropdown-demo",
    type: "registry:example",
    registryDependencies: ["action-dropdown"],
    files: [
      {
        path: "examples/recruitment/action-dropdown/action-dropdown-demo.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/action-dropdown-demo.tsx",
      },
    ],
  },
  {
    name: "candidates-table-demo",
    type: "registry:example",
    registryDependencies: ["candidates-table"],
    files: [
      {
        path: "examples/recruitment/candidates-table/candidates-table-demo.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/candidates-table-demo.tsx",
      },
    ],
  },
  {
    name: "chat-radio-demo",
    type: "registry:example",
    registryDependencies: ["chat-radio"],
    files: [
      {
        path: "examples/recruitment/chat-radio/chat-radio-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/recruitment/chat-radio-demo.tsx",
      },
    ],
  },
  {
    name: "datasource-guide-demo",
    type: "registry:example",
    registryDependencies: ["datasource-guide"],
    files: [
      {
        path: "examples/recruitment/datasource-guide/datasource-guide-demo.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/datasource-guide-demo.tsx",
      },
    ],
  },
  {
    name: "delete-confirm-modal-demo",
    type: "registry:example",
    registryDependencies: ["delete-confirm-modal"],
    files: [
      {
        path: "examples/recruitment/delete-confirm-modal/delete-confirm-modal-demo.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/delete-confirm-modal-demo.tsx",
      },
    ],
  },
  {
    name: "interview-process-table-demo",
    type: "registry:example",
    registryDependencies: ["interview-process-table"],
    files: [
      {
        path: "examples/recruitment/interview-process-table/interview-process-table-demo.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/interview-process-table-demo.tsx",
      },
    ],
  },
  {
    name: "job-card-demo",
    type: "registry:example",
    registryDependencies: ["job-card"],
    files: [
      {
        path: "examples/recruitment/job-card/job-card-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/recruitment/job-card-demo.tsx",
      },
    ],
  },
  {
    name: "message-bubble-demo",
    type: "registry:example",
    registryDependencies: ["message-bubble"],
    files: [
      {
        path: "examples/recruitment/message-bubble/message-bubble-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/recruitment/message-bubble-demo.tsx",
      },
    ],
  },
  {
    name: "personnel-recommend-demo",
    type: "registry:example",
    registryDependencies: ["personnel-recommend"],
    files: [
      {
        path: "examples/recruitment/personnel-recommend/personnel-recommend-demo.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/personnel-recommend-demo.tsx",
      },
    ],
  },
  {
    name: "recruitment-job-table-demo",
    type: "registry:example",
    registryDependencies: ["recruitment-job-table"],
    files: [
      {
        path: "examples/recruitment/recruitment-job-table/recruitment-job-table-demo.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/recruitment-job-table-demo.tsx",
      },
    ],
  },
  {
    name: "recruitment-scene-demo",
    type: "registry:example",
    registryDependencies: ["recruitment-scene"],
    files: [
      {
        path: "examples/recruitment/recruitment-scene/recruitment-scene-demo.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/recruitment-scene-demo.tsx",
      },
    ],
  },
  {
    name: "repeat-file-modal-demo",
    type: "registry:example",
    registryDependencies: ["repeat-file-modal"],
    files: [
      {
        path: "examples/recruitment/repeat-file-modal/repeat-file-modal-demo.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/repeat-file-modal-demo.tsx",
      },
    ],
  },
  {
    name: "report-card-demo",
    type: "registry:example",
    registryDependencies: ["report-card"],
    files: [
      {
        path: "examples/recruitment/report-card/report-card-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/recruitment/report-card-demo.tsx",
      },
    ],
  },
  {
    name: "report-section-demo",
    type: "registry:example",
    registryDependencies: ["report-section"],
    files: [
      {
        path: "examples/recruitment/report-section/report-section-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/recruitment/report-section-demo.tsx",
      },
    ],
  },
  {
    name: "resource-upload-demo",
    type: "registry:example",
    registryDependencies: ["resource-upload"],
    files: [
      {
        path: "examples/recruitment/resource-upload/resource-upload-demo.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/resource-upload-demo.tsx",
      },
    ],
  },
  {
    name: "sender-recruitment-demo",
    type: "registry:example",
    registryDependencies: ["sender-input"],
    files: [
      {
        path: "examples/recruitment/sender-recruitment/sender-demo.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/sender-recruitment-demo.tsx",
      },
    ],
  },
  {
    name: "similar-job-demo",
    type: "registry:example",
    registryDependencies: ["similar-job"],
    files: [
      {
        path: "examples/recruitment/similar-job/similar-job-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/recruitment/similar-job-demo.tsx",
      },
    ],
  },
  {
    name: "step-detail-demo",
    type: "registry:example",
    registryDependencies: ["step-detail"],
    files: [
      {
        path: "examples/recruitment/step-detail/step-detail-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/recruitment/step-detail-demo.tsx",
      },
    ],
  },
  {
    name: "step-overview-demo",
    type: "registry:example",
    registryDependencies: ["step-overview"],
    files: [
      {
        path: "examples/recruitment/step-overview/step-overview-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/recruitment/step-overview-demo.tsx",
      },
    ],
  },
  {
    name: "thinking-demo",
    type: "registry:example",
    registryDependencies: ["thinking"],
    files: [
      {
        path: "examples/recruitment/thinking/thinking-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/recruitment/thinking-demo.tsx",
      },
    ],
  },
  {
    name: "thinking-process-demo",
    type: "registry:example",
    registryDependencies: ["thinking-process"],
    files: [
      {
        path: "examples/recruitment/thinking-process/thinking-process-demo.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/thinking-process-demo.tsx",
      },
    ],
  },
  {
    name: "thinking-process-debugging",
    type: "registry:example",
    registryDependencies: ["thinking-process"],
    files: [
      {
        path: "examples/recruitment/thinking-process/thinking-process-debugging.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/thinking-process-debugging.tsx",
      },
    ],
  },
  {
    name: "thinking-process-default",
    type: "registry:example",
    registryDependencies: ["thinking-process"],
    files: [
      {
        path: "examples/recruitment/thinking-process/thinking-process-default.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/thinking-process-default.tsx",
      },
    ],
  },
  {
    name: "thinking-process-with-hint",
    type: "registry:example",
    registryDependencies: ["thinking-process"],
    files: [
      {
        path: "examples/recruitment/thinking-process/thinking-process-with-hint.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/thinking-process-with-hint.tsx",
      },
    ],
  },
  {
    name: "thinking-process-custom",
    type: "registry:example",
    registryDependencies: ["thinking-process"],
    files: [
      {
        path: "examples/recruitment/thinking-process/thinking-process-custom.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/thinking-process-custom.tsx",
      },
    ],
  },
  {
    name: "thinking-step-item-demo",
    type: "registry:example",
    registryDependencies: ["thinking-step-item"],
    files: [
      {
        path: "examples/recruitment/thinking-step-item/thinking-step-item-demo.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/thinking-step-item-demo.tsx",
      },
    ],
  },
  {
    name: "thinking-step-item-default",
    type: "registry:example",
    registryDependencies: ["thinking-step-item"],
    files: [
      {
        path: "examples/recruitment/thinking-step-item/thinking-step-item-default.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/thinking-step-item-default.tsx",
      },
    ],
  },
  {
    name: "thinking-step-item-with-attachments",
    type: "registry:example",
    registryDependencies: ["thinking-step-item"],
    files: [
      {
        path: "examples/recruitment/thinking-step-item/thinking-step-item-with-attachments.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/thinking-step-item-with-attachments.tsx",
      },
    ],
  },
  {
    name: "thinking-step-item-with-overflow-files",
    type: "registry:example",
    registryDependencies: ["thinking-step-item"],
    files: [
      {
        path: "examples/recruitment/thinking-step-item/thinking-step-item-with-overflow-files.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/thinking-step-item-with-overflow-files.tsx",
      },
    ],
  },
  {
    name: "thinking-step-item-with-tags",
    type: "registry:example",
    registryDependencies: ["thinking-step-item"],
    files: [
      {
        path: "examples/recruitment/thinking-step-item/thinking-step-item-with-tags.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/thinking-step-item-with-tags.tsx",
      },
    ],
  },
  {
    name: "todo-list-demo",
    type: "registry:example",
    registryDependencies: ["todo-list"],
    files: [
      {
        path: "examples/recruitment/todo-list/todo-list-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/recruitment/todo-list-demo.tsx",
      },
    ],
  },
  {
    name: "work-objective-list-demo",
    type: "registry:example",
    registryDependencies: ["work-objective-list"],
    files: [
      {
        path: "examples/recruitment/work-objective-list/work-objective-list-demo.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/work-objective-list-demo.tsx",
      },
    ],
  },
  {
    name: "work-result-list-demo",
    type: "registry:example",
    registryDependencies: ["work-result-list"],
    files: [
      {
        path: "examples/recruitment/work-result-list/work-result-list-demo.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/work-result-list-demo.tsx",
      },
    ],
  },
  {
    name: "candidate-report-demo",
    type: "registry:example",
    registryDependencies: ["candidate-report"],
    files: [
      {
        path: "examples/recruitment/candidate-report/candidate-report-demo.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/candidate-report-demo.tsx",
      },
    ],
  },
  {
    name: "capability-column-demo",
    type: "registry:example",
    registryDependencies: ["capability-column"],
    files: [
      {
        path: "examples/recruitment/capability-column/capability-column-demo.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/capability-column-demo.tsx",
      },
    ],
  },
  {
    name: "confirm-jd-form-demo",
    type: "registry:example",
    registryDependencies: ["confirm-jd-form"],
    files: [
      {
        path: "examples/recruitment/confirm-jd-form/confirm-jd-form-demo.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/confirm-jd-form-demo.tsx",
      },
    ],
  },
  {
    name: "data-source-list-demo",
    type: "registry:example",
    registryDependencies: ["data-source-list"],
    files: [
      {
        path: "examples/recruitment/data-source-list/data-source-list-demo.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/data-source-list-demo.tsx",
      },
    ],
  },
  {
    name: "interview-info-form-demo",
    type: "registry:example",
    registryDependencies: ["interview-info-form"],
    files: [
      {
        path: "examples/recruitment/interview-info-form/interview-info-form-demo.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/interview-info-form-demo.tsx",
      },
    ],
  },
  {
    name: "interview-question-panel-demo",
    type: "registry:example",
    registryDependencies: ["interview-question-panel"],
    files: [
      {
        path: "examples/recruitment/interview-question-panel/interview-question-panel-demo.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/interview-question-panel-demo.tsx",
      },
    ],
  },
  {
    name: "recruitment-activity-overview-demo",
    type: "registry:example",
    registryDependencies: ["recruitment-activity-overview"],
    files: [
      {
        path: "examples/recruitment/recruitment-activity-overview/recruitment-activity-overview-demo.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/recruitment-activity-overview-demo.tsx",
      },
    ],
  },
  {
    name: "resume-evaluation-report-demo",
    type: "registry:example",
    registryDependencies: ["resume-evaluation-report"],
    files: [
      {
        path: "examples/recruitment/resume-evaluation-report/resume-evaluation-report-demo.tsx",
        type: "registry:example",
        target:
          "components/wuhan/examples/recruitment/resume-evaluation-report-demo.tsx",
      },
    ],
  },
];

export const examples: Registry["items"] = [
  // welcome examples
  {
    name: "welcome-demo",
    type: "registry:example",
    registryDependencies: ["welcome"],
    files: [
      {
        path: "examples/welcome/welcome-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/welcome-demo.tsx",
      },
    ],
  },
  // message examples
  {
    name: "message-demo",
    type: "registry:example",
    registryDependencies: ["message", "message-01", "button"],
    files: [
      {
        path: "examples/message/message-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/message-demo.tsx",
      },
    ],
  },
  {
    name: "message-default",
    type: "registry:example",
    registryDependencies: ["message"],
    files: [
      {
        path: "examples/message/message-default.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/message-default.tsx",
      },
    ],
  },
  {
    name: "message-composed-demo",
    type: "registry:example",
    registryDependencies: ["message", "message-01", "button"],
    files: [
      {
        path: "examples/message/message-composed-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/message-composed-demo.tsx",
      },
    ],
  },
  {
    name: "message-with-status",
    type: "registry:example",
    registryDependencies: ["message", "message-01", "button"],
    files: [
      {
        path: "examples/message/message-with-status.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/message-with-status.tsx",
      },
    ],
  },
  {
    name: "message-with-attachment",
    type: "registry:example",
    registryDependencies: ["message", "attachment-list"],
    files: [
      {
        path: "examples/message/message-with-attachment.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/message-with-attachment.tsx",
      },
    ],
  },
  {
    name: "message-with-feedback",
    type: "registry:example",
    registryDependencies: ["message", "button"],
    files: [
      {
        path: "examples/message/message-with-feedback.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/message-with-feedback.tsx",
      },
    ],
  },
  {
    name: "message-with-avatar-header",
    type: "registry:example",
    registryDependencies: ["message", "avatar-header"],
    files: [
      {
        path: "examples/message/message-with-avatar-header.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/message-with-avatar-header.tsx",
      },
    ],
  },
  // attachment-list examples
  {
    name: "attachment-list-demo",
    type: "registry:example",
    registryDependencies: ["attachment-list"],
    files: [
      {
        path: "examples/attachment-list/attachment-list-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/attachment-list-demo.tsx",
      },
    ],
  },
  {
    name: "attachment-list-preview",
    type: "registry:example",
    registryDependencies: ["attachment-list"],
    files: [
      {
        path: "examples/attachment-list/attachment-list-preview.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/attachment-list-preview.tsx",
      },
    ],
  },
  {
    name: "attachment-list-custom-render",
    type: "registry:example",
    registryDependencies: ["attachment-list"],
    files: [
      {
        path: "examples/attachment-list/attachment-list-custom-render.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/attachment-list-custom-render.tsx",
      },
    ],
  },
  {
    name: "attachment-list-empty",
    type: "registry:example",
    registryDependencies: ["attachment-list"],
    files: [
      {
        path: "examples/attachment-list/attachment-list-empty.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/attachment-list-empty.tsx",
      },
    ],
  },
  // quote-content examples
  {
    name: "quote-content-demo",
    type: "registry:example",
    registryDependencies: ["quote-content"],
    files: [
      {
        path: "examples/quote-content/quote-content-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quote-content-demo.tsx",
      },
    ],
  },
  {
    name: "quote-content-default",
    type: "registry:example",
    registryDependencies: ["quote-content"],
    files: [
      {
        path: "examples/quote-content/quote-content-default.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quote-content-default.tsx",
      },
    ],
  },
  {
    name: "quote-content-custom-icon",
    type: "registry:example",
    registryDependencies: ["quote-content"],
    files: [
      {
        path: "examples/quote-content/quote-content-custom-icon.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quote-content-custom-icon.tsx",
      },
    ],
  },
  {
    name: "quote-content-adapter",
    type: "registry:example",
    registryDependencies: ["quote-content"],
    files: [
      {
        path: "examples/quote-content/quote-content-adapter.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quote-content-adapter.tsx",
      },
    ],
  },
  {
    name: "quote-content-custom-render",
    type: "registry:example",
    registryDependencies: ["quote-content"],
    files: [
      {
        path: "examples/quote-content/quote-content-custom-render.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quote-content-custom-render.tsx",
      },
    ],
  },
  // avatar-header examples
  {
    name: "avatar-header-demo",
    type: "registry:example",
    registryDependencies: ["avatar-header"],
    files: [
      {
        path: "examples/avatar-header/avatar-header-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/avatar-header-demo.tsx",
      },
    ],
  },
  {
    name: "avatar-header-default",
    type: "registry:example",
    registryDependencies: ["avatar-header"],
    files: [
      {
        path: "examples/avatar-header/avatar-header-default.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/avatar-header-default.tsx",
      },
    ],
  },
  {
    name: "avatar-header-sizes",
    type: "registry:example",
    registryDependencies: ["avatar-header"],
    files: [
      {
        path: "examples/avatar-header/avatar-header-sizes.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/avatar-header-sizes.tsx",
      },
    ],
  },
  {
    name: "avatar-header-icons",
    type: "registry:example",
    registryDependencies: ["avatar-header"],
    files: [
      {
        path: "examples/avatar-header/avatar-header-icons.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/avatar-header-icons.tsx",
      },
    ],
  },
  {
    name: "avatar-header-error",
    type: "registry:example",
    registryDependencies: ["avatar-header"],
    files: [
      {
        path: "examples/avatar-header/avatar-header-error.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/avatar-header-error.tsx",
      },
    ],
  },
  // history-item examples
  {
    name: "history-item-demo",
    type: "registry:example",
    registryDependencies: ["history-item"],
    files: [
      {
        path: "examples/history-item/history-item-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/history-item-demo.tsx",
      },
    ],
  },
  {
    name: "history-item-basic",
    type: "registry:example",
    registryDependencies: ["history-item"],
    files: [
      {
        path: "examples/history-item/history-item-basic.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/history-item-basic.tsx",
      },
    ],
  },
  {
    name: "history-item-with-actions",
    type: "registry:example",
    registryDependencies: ["history-item"],
    files: [
      {
        path: "examples/history-item/history-item-with-actions.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/history-item-with-actions.tsx",
      },
    ],
  },
  {
    name: "history-item-with-icons",
    type: "registry:example",
    registryDependencies: ["history-item"],
    files: [
      {
        path: "examples/history-item/history-item-with-icons.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/history-item-with-icons.tsx",
      },
    ],
  },
  {
    name: "history-item-states",
    type: "registry:example",
    registryDependencies: ["history-item"],
    files: [
      {
        path: "examples/history-item/history-item-states.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/history-item-states.tsx",
      },
    ],
  },
  {
    name: "history-item-list",
    type: "registry:example",
    registryDependencies: ["history-item"],
    files: [
      {
        path: "examples/history-item/history-item-list.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/history-item-list.tsx",
      },
    ],
  },
  // sender examples
  {
    name: "sender-demo",
    type: "registry:example",
    registryDependencies: ["sender"],
    files: [
      {
        path: "examples/sender/sender-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sender-demo.tsx",
      },
    ],
  },
  {
    name: "sender-default",
    type: "registry:example",
    registryDependencies: ["sender-01"],
    files: [
      {
        path: "examples/sender/sender-default.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sender-default.tsx",
      },
    ],
  },
  {
    name: "sender-active",
    type: "registry:example",
    registryDependencies: ["sender-01"],
    files: [
      {
        path: "examples/sender/sender-active.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sender-active.tsx",
      },
    ],
  },
  {
    name: "sender-disabled",
    type: "registry:example",
    registryDependencies: ["sender-01"],
    files: [
      {
        path: "examples/sender/sender-disabled.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sender-disabled.tsx",
      },
    ],
  },
  {
    name: "sender-composed-demo",
    type: "registry:example",
    registryDependencies: ["sender-01", "attachment-list", "quote-content"],
    files: [
      {
        path: "examples/sender/sender-composed-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sender-composed-demo.tsx",
      },
    ],
  },
  // responsive sender examples
  {
    name: "sender-responsive",
    type: "registry:example",
    title: "Sender Responsive",
    description:
      "Responsive sender with automatic single/multi-line layout switching",
    registryDependencies: ["responsive-sender"],
    files: [
      {
        path: "examples/sender/sender-responsive.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sender-responsive.tsx",
      },
    ],
  },
  {
    name: "sender-responsive-default",
    type: "registry:example",
    title: "Sender Responsive Default",
    description: "Basic usage of responsive sender primitives",
    registryDependencies: ["sender-responsive-01"],
    files: [
      {
        path: "examples/sender/sender-responsive-default.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sender-responsive-default.tsx",
      },
    ],
  },
  // textarea example
  {
    name: "textarea-demo",
    type: "registry:example",
    registryDependencies: ["textarea"],
    files: [
      {
        path: "examples/textarea/textarea-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/textarea-demo.tsx",
      },
    ],
  },
  // button examples
  {
    name: "button-demo",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/block-button/button-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/button-demo.tsx",
      },
    ],
  },
  // prompt examples
  {
    name: "prompt-demo",
    type: "registry:example",
    registryDependencies: ["prompt"],
    files: [
      {
        path: "examples/prompt/prompt-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/prompt-demo.tsx",
      },
    ],
  },
  {
    name: "prompt-horizontal",
    type: "registry:example",
    registryDependencies: ["prompt"],
    files: [
      {
        path: "examples/prompt/prompt-horizontal.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/prompt-horizontal.tsx",
      },
    ],
  },
  {
    name: "prompt-vertical",
    type: "registry:example",
    registryDependencies: ["prompt"],
    files: [
      {
        path: "examples/prompt/prompt-vertical.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/prompt-vertical.tsx",
      },
    ],
  },
  // suggestion examples
  {
    name: "suggestion-demo",
    type: "registry:example",
    registryDependencies: ["suggestion"],
    files: [
      {
        path: "examples/suggestion/suggestion-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/suggestion-demo.tsx",
      },
    ],
  },
  {
    name: "suggestion-default",
    type: "registry:example",
    registryDependencies: ["suggestion"],
    files: [
      {
        path: "examples/suggestion/suggestion-default.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/suggestion-default.tsx",
      },
    ],
  },
  {
    name: "suggestion-custom-icon",
    type: "registry:example",
    registryDependencies: ["suggestion"],
    files: [
      {
        path: "examples/suggestion/suggestion-custom-icon.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/suggestion-custom-icon.tsx",
      },
    ],
  },
  // quick-action examples
  {
    name: "quick-action-demo",
    type: "registry:example",
    registryDependencies: ["quick-action"],
    files: [
      {
        path: "examples/quick-action/quick-action-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quick-action-demo.tsx",
      },
    ],
  },
  {
    name: "quick-action-default",
    type: "registry:example",
    registryDependencies: ["quick-action"],
    files: [
      {
        path: "examples/quick-action/quick-action-default.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quick-action-default.tsx",
      },
    ],
  },
  {
    name: "quick-action-with-icons",
    type: "registry:example",
    registryDependencies: ["quick-action"],
    files: [
      {
        path: "examples/quick-action/quick-action-with-icons.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quick-action-with-icons.tsx",
      },
    ],
  },
  {
    name: "quick-action-single",
    type: "registry:example",
    registryDependencies: ["quick-action"],
    files: [
      {
        path: "examples/quick-action/quick-action-single.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quick-action-single.tsx",
      },
    ],
  },
  {
    name: "quick-action-interactive",
    type: "registry:example",
    registryDependencies: ["quick-action"],
    files: [
      {
        path: "examples/quick-action/quick-action-interactive.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quick-action-interactive.tsx",
      },
    ],
  },
  {
    name: "quick-action-disabled",
    type: "registry:example",
    registryDependencies: ["quick-action"],
    files: [
      {
        path: "examples/quick-action/quick-action-disabled.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quick-action-disabled.tsx",
      },
    ],
  },
  {
    name: "quick-action-flexible-layout",
    type: "registry:example",
    registryDependencies: ["quick-action"],
    files: [
      {
        path: "examples/quick-action/quick-action-flexible-layout.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quick-action-flexible-layout.tsx",
      },
    ],
  },
  // sidebar examples
  {
    name: "sidebar-demo",
    type: "registry:example",
    registryDependencies: ["sidebar", "avatar-header", "button"],
    files: [
      {
        path: "examples/sidebar/sidebar-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sidebar-demo.tsx",
      },
    ],
  },
  {
    name: "markdown-demo",
    type: "registry:example",
    registryDependencies: ["markdown"],
    files: [
      {
        path: "examples/markdown/markdown-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/markdown-demo.tsx",
      },
    ],
  },
  {
    name: "markdown-advanced-demo",
    type: "registry:example",
    registryDependencies: ["markdown", "custom-sources", "sources-sidebar"],
    files: [
      {
        path: "examples/markdown/markdown-advanced-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/markdown-advanced-demo.tsx",
      },
    ],
  },
  {
    name: "custom-sources-demo",
    type: "registry:example",
    registryDependencies: ["custom-sources", "sources-sidebar"],
    files: [
      {
        path: "examples/custom-sources/custom-sources-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/custom-sources-demo.tsx",
      },
    ],
  },
  {
    name: "sources-sidebar-demo",
    type: "registry:example",
    registryDependencies: ["sources-sidebar"],
    files: [
      {
        path: "examples/sources-sidebar/sources-sidebar-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sources-sidebar-demo.tsx",
      },
    ],
  },
  {
    name: "sidebar-custom-header",
    type: "registry:example",
    registryDependencies: ["sidebar"],
    files: [
      {
        path: "examples/sidebar/sidebar-custom-header.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sidebar-custom-header.tsx",
      },
    ],
  },
  {
    name: "sidebar-custom-new-button",
    type: "registry:example",
    registryDependencies: ["sidebar"],
    files: [
      {
        path: "examples/sidebar/sidebar-custom-new-button.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sidebar-custom-new-button.tsx",
      },
    ],
  },
  {
    name: "sidebar-with-search",
    type: "registry:example",
    registryDependencies: ["sidebar"],
    files: [
      {
        path: "examples/sidebar/sidebar-with-search.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sidebar-with-search.tsx",
      },
    ],
  },
  {
    name: "sidebar-empty-state",
    type: "registry:example",
    registryDependencies: ["sidebar"],
    files: [
      {
        path: "examples/sidebar/sidebar-empty-state.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sidebar-empty-state.tsx",
      },
    ],
  },
  {
    name: "sidebar-controlled-collapse",
    type: "registry:example",
    registryDependencies: ["sidebar", "button"],
    files: [
      {
        path: "examples/sidebar/sidebar-controlled-collapse.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sidebar-controlled-collapse.tsx",
      },
    ],
  },
  {
    name: "sidebar-footer-collapse",
    type: "registry:example",
    registryDependencies: ["sidebar", "avatar-header"],
    files: [
      {
        path: "examples/sidebar/sidebar-footer-collapse.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sidebar-footer-collapse.tsx",
      },
    ],
  },
  // feedback examples
  {
    name: "feedback-demo",
    type: "registry:example",
    registryDependencies: ["feedback"],
    files: [
      {
        path: "examples/feedback/feedback-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/feedback-demo.tsx",
      },
    ],
  },
  {
    name: "feedback-controlled",
    type: "registry:example",
    registryDependencies: ["feedback"],
    files: [
      {
        path: "examples/feedback/feedback-controlled.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/feedback-controlled.tsx",
      },
    ],
  },
  {
    name: "feedback-custom-options",
    type: "registry:example",
    registryDependencies: ["feedback"],
    files: [
      {
        path: "examples/feedback/feedback-custom-options.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/feedback-custom-options.tsx",
      },
    ],
  },
  {
    name: "feedback-report",
    type: "registry:example",
    registryDependencies: ["feedback"],
    files: [
      {
        path: "examples/feedback/feedback-report.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/feedback-report.tsx",
      },
    ],
  },
  // toggle-button examples
  {
    name: "toggle-button-demo",
    type: "registry:example",
    registryDependencies: ["toggle-button"],
    files: [
      {
        path: "examples/toggle-button/toggle-button-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/toggle-button-demo.tsx",
      },
    ],
  },
  {
    name: "toggle-button-default",
    type: "registry:example",
    registryDependencies: ["toggle-button"],
    files: [
      {
        path: "examples/toggle-button/toggle-button-default.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/toggle-button-default.tsx",
      },
    ],
  },
  {
    name: "toggle-button-compact",
    type: "registry:example",
    registryDependencies: ["toggle-button"],
    files: [
      {
        path: "examples/toggle-button/toggle-button-compact.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/toggle-button-compact.tsx",
      },
    ],
  },
  {
    name: "toggle-button-multiple",
    type: "registry:example",
    registryDependencies: ["toggle-button"],
    files: [
      {
        path: "examples/toggle-button/toggle-button-multiple.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/toggle-button-multiple.tsx",
      },
    ],
  },
  {
    name: "toggle-button-disabled",
    type: "registry:example",
    registryDependencies: ["toggle-button"],
    files: [
      {
        path: "examples/toggle-button/toggle-button-disabled.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/toggle-button-disabled.tsx",
      },
    ],
  },
  {
    name: "toggle-button-feedback",
    type: "registry:example",
    registryDependencies: ["toggle-button"],
    files: [
      {
        path: "examples/toggle-button/toggle-button-feedback.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/toggle-button-feedback.tsx",
      },
    ],
  },
  {
    name: "toggle-button-sender",
    type: "registry:example",
    registryDependencies: ["toggle-button"],
    files: [
      {
        path: "examples/toggle-button/toggle-button-sender.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/toggle-button-sender.tsx",
      },
    ],
  },
  {
    name: "toggle-button-filter",
    type: "registry:example",
    registryDependencies: ["toggle-button"],
    files: [
      {
        path: "examples/toggle-button/toggle-button-filter.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/toggle-button-filter.tsx",
      },
    ],
  },
  // deep-thinking examples
  {
    name: "deep-thinking-demo",
    type: "registry:example",
    registryDependencies: ["deep-thinking"],
    files: [
      {
        path: "examples/deep-thinking/deep-thinking-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/deep-thinking-demo.tsx",
      },
    ],
  },
  {
    name: "deep-thinking-default",
    type: "registry:example",
    registryDependencies: ["deep-thinking"],
    files: [
      {
        path: "examples/deep-thinking/deep-thinking-default.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/deep-thinking-default.tsx",
      },
    ],
  },
  {
    name: "deep-thinking-with-status",
    type: "registry:example",
    registryDependencies: ["deep-thinking"],
    files: [
      {
        path: "examples/deep-thinking/deep-thinking-with-status.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/deep-thinking-with-status.tsx",
      },
    ],
  },
  {
    name: "deep-thinking-custom",
    type: "registry:example",
    registryDependencies: ["deep-thinking-01"],
    files: [
      {
        path: "examples/deep-thinking/deep-thinking-custom.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/deep-thinking-custom.tsx",
      },
    ],
  },
  {
    name: "deep-thinking-controlled",
    type: "registry:example",
    registryDependencies: ["deep-thinking"],
    files: [
      {
        path: "examples/deep-thinking/deep-thinking-controlled.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/deep-thinking-controlled.tsx",
      },
    ],
  },
  {
    name: "deep-thinking-labels",
    type: "registry:example",
    registryDependencies: ["deep-thinking"],
    files: [
      {
        path: "examples/deep-thinking/deep-thinking-labels.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/deep-thinking-labels.tsx",
      },
    ],
  },
  {
    name: "deep-thinking-steps",
    type: "registry:example",
    registryDependencies: ["deep-thinking"],
    files: [
      {
        path: "examples/deep-thinking/deep-thinking-steps.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/deep-thinking-steps.tsx",
      },
    ],
  },
  // component-panel examples
  {
    name: "component-panel-default",
    type: "registry:example",
    registryDependencies: ["component-panel"],
    files: [
      {
        path: "examples/component-panel/component-panel-default.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/component-panel-default.tsx",
      },
    ],
  },
  {
    name: "component-panel-controlled",
    type: "registry:example",
    registryDependencies: ["component-panel", "button"],
    files: [
      {
        path: "examples/component-panel/component-panel-controlled.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/component-panel-controlled.tsx",
      },
    ],
  },
  {
    name: "component-panel-single-select",
    type: "registry:example",
    registryDependencies: ["component-panel"],
    files: [
      {
        path: "examples/component-panel/component-panel-single-select.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/component-panel-single-select.tsx",
      },
    ],
  },
  {
    name: "component-panel-with-icons",
    type: "registry:example",
    registryDependencies: ["component-panel"],
    files: [
      {
        path: "examples/component-panel/component-panel-with-icons.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/component-panel-with-icons.tsx",
      },
    ],
  },
  {
    name: "component-panel-disabled",
    type: "registry:example",
    registryDependencies: ["component-panel"],
    files: [
      {
        path: "examples/component-panel/component-panel-disabled.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/component-panel-disabled.tsx",
      },
    ],
  },
  {
    name: "component-panel-tab-controlled",
    type: "registry:example",
    registryDependencies: ["component-panel"],
    files: [
      {
        path: "examples/component-panel/component-panel-tab-controlled.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/component-panel-tab-controlled.tsx",
      },
    ],
  },
  // tooltip examples
  {
    name: "tooltip-demo",
    type: "registry:example",
    registryDependencies: ["tooltip", "button"],
    files: [
      {
        path: "examples/tooltip/tooltip-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/tooltip-demo.tsx",
      },
    ],
  },
  {
    name: "tooltip-basic",
    type: "registry:example",
    registryDependencies: ["tooltip"],
    files: [
      {
        path: "examples/tooltip/tooltip-basic.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/tooltip-basic.tsx",
      },
    ],
  },
  {
    name: "tooltip-positions",
    type: "registry:example",
    registryDependencies: ["tooltip"],
    files: [
      {
        path: "examples/tooltip/tooltip-positions.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/tooltip-positions.tsx",
      },
    ],
  },
  {
    name: "tooltip-with-icons",
    type: "registry:example",
    registryDependencies: ["tooltip"],
    files: [
      {
        path: "examples/tooltip/tooltip-with-icons.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/tooltip-with-icons.tsx",
      },
    ],
  },
  {
    name: "tooltip-long-text",
    type: "registry:example",
    registryDependencies: ["tooltip"],
    files: [
      {
        path: "examples/tooltip/tooltip-long-text.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/tooltip-long-text.tsx",
      },
    ],
  },
  {
    name: "tooltip-toolbar",
    type: "registry:example",
    registryDependencies: ["tooltip"],
    files: [
      {
        path: "examples/tooltip/tooltip-toolbar.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/tooltip-toolbar.tsx",
      },
    ],
  },
  {
    name: "tooltip-table",
    type: "registry:example",
    registryDependencies: ["tooltip"],
    files: [
      {
        path: "examples/tooltip/tooltip-table.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/tooltip-table.tsx",
      },
    ],
  },
  {
    name: "tooltip-form",
    type: "registry:example",
    registryDependencies: ["tooltip"],
    files: [
      {
        path: "examples/tooltip/tooltip-form.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/tooltip-form.tsx",
      },
    ],
  },
  // execution-result examples
  {
    name: "execution-result-demo",
    type: "registry:example",
    registryDependencies: ["execution-result"],
    files: [
      {
        path: "examples/execution-result/execution-result-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/execution-result-demo.tsx",
      },
    ],
  },
  {
    name: "execution-result-default",
    type: "registry:example",
    registryDependencies: ["execution-result"],
    files: [
      {
        path: "examples/execution-result/execution-result-default.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/execution-result-default.tsx",
      },
    ],
  },
  {
    name: "execution-result-controlled",
    type: "registry:example",
    registryDependencies: ["execution-result"],
    files: [
      {
        path: "examples/execution-result/execution-result-controlled.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/execution-result-controlled.tsx",
      },
    ],
  },
  {
    name: "execution-result-with-tools",
    type: "registry:example",
    registryDependencies: ["execution-result"],
    files: [
      {
        path: "examples/execution-result/execution-result-with-tools.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/execution-result-with-tools.tsx",
      },
    ],
  },
  {
    name: "execution-result-workflow",
    type: "registry:example",
    registryDependencies: ["execution-result"],
    files: [
      {
        path: "examples/execution-result/execution-result-workflow.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/execution-result-workflow.tsx",
      },
    ],
  },
  {
    name: "dynamic-form-demo",
    type: "registry:example",
    registryDependencies: ["dynamic-form"],
    files: [
      {
        path: "examples/dynamic-form/dynamic-form-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/dynamic-form-demo.tsx",
      },
    ],
  },
  {
    name: "dynamic-form-default",
    type: "registry:example",
    registryDependencies: ["dynamic-form"],
    files: [
      {
        path: "examples/dynamic-form/dynamic-form-default.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/dynamic-form-default.tsx",
      },
    ],
  },
  {
    name: "dynamic-form-validation",
    type: "registry:example",
    registryDependencies: ["dynamic-form"],
    files: [
      {
        path: "examples/dynamic-form/dynamic-form-validation.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/dynamic-form-validation.tsx",
      },
    ],
  },
  {
    name: "dynamic-form-readonly",
    type: "registry:example",
    registryDependencies: ["dynamic-form"],
    files: [
      {
        path: "examples/dynamic-form/dynamic-form-readonly.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/dynamic-form-readonly.tsx",
      },
    ],
  },
  {
    name: "dynamic-form-ref-methods",
    type: "registry:example",
    registryDependencies: ["dynamic-form"],
    files: [
      {
        path: "examples/dynamic-form/dynamic-form-ref-methods.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/dynamic-form-ref-methods.tsx",
      },
    ],
  },
  {
    name: "dynamic-form-ai-scenario",
    type: "registry:example",
    registryDependencies: ["dynamic-form"],
    files: [
      {
        path: "examples/dynamic-form/dynamic-form-ai-scenario.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/dynamic-form-ai-scenario.tsx",
      },
    ],
  },
  {
    name: "dynamic-form-with-extra",
    type: "registry:example",
    registryDependencies: ["dynamic-form", "status-tag"],
    files: [
      {
        path: "examples/dynamic-form/dynamic-form-with-extra.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/dynamic-form-with-extra.tsx",
      },
    ],
  },
  {
    name: "dynamic-form-pending",
    type: "registry:example",
    registryDependencies: ["dynamic-form"],
    files: [
      {
        path: "examples/dynamic-form/dynamic-form-pending.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/dynamic-form-pending.tsx",
      },
    ],
  },
  {
    name: "dynamic-form-confirmed",
    type: "registry:example",
    registryDependencies: ["dynamic-form"],
    files: [
      {
        path: "examples/dynamic-form/dynamic-form-confirmed.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/dynamic-form-confirmed.tsx",
      },
    ],
  },
  {
    name: "task-list-demo",
    type: "registry:example",
    registryDependencies: ["task-list"],
    files: [
      {
        path: "examples/task-list/task-list-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/task-list-demo.tsx",
      },
    ],
  },
  {
    name: "task-list-default",
    type: "registry:example",
    registryDependencies: ["task-list"],
    files: [
      {
        path: "examples/task-list/task-list-default.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/task-list-default.tsx",
      },
    ],
  },
  {
    name: "task-list-editable",
    type: "registry:example",
    registryDependencies: ["task-list"],
    files: [
      {
        path: "examples/task-list/task-list-editable.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/task-list-editable.tsx",
      },
    ],
  },
  {
    name: "task-list-feedback",
    type: "registry:example",
    registryDependencies: ["task-list"],
    files: [
      {
        path: "examples/task-list/task-list-feedback.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/task-list-feedback.tsx",
      },
    ],
  },
  {
    name: "task-list-pending",
    type: "registry:example",
    registryDependencies: ["task-list"],
    files: [
      {
        path: "examples/task-list/task-list-pending.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/task-list-pending.tsx",
      },
    ],
  },
  {
    name: "task-list-confirmed",
    type: "registry:example",
    registryDependencies: ["task-list"],
    files: [
      {
        path: "examples/task-list/task-list-confirmed.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/task-list-confirmed.tsx",
      },
    ],
  },
  {
    name: "task-list-composed-demo",
    type: "registry:example",
    registryDependencies: ["task-list"],
    files: [
      {
        path: "examples/task-list/task-list-composed-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/task-list-composed-demo.tsx",
      },
    ],
  },
  {
    name: "status-tag-demo",
    type: "registry:example",
    registryDependencies: ["status-tag"],
    files: [
      {
        path: "examples/status-tag/status-tag-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/status-tag-demo.tsx",
      },
    ],
  },
  {
    name: "status-tag-default",
    type: "registry:example",
    registryDependencies: ["status-tag"],
    files: [
      {
        path: "examples/status-tag/status-tag-default.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/status-tag-default.tsx",
      },
    ],
  },
  {
    name: "status-tag-custom",
    type: "registry:example",
    registryDependencies: ["status-tag"],
    files: [
      {
        path: "examples/status-tag/status-tag-custom.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/status-tag-custom.tsx",
      },
    ],
  },
  {
    name: "status-tag-mixed",
    type: "registry:example",
    registryDependencies: ["status-tag"],
    files: [
      {
        path: "examples/status-tag/status-tag-mixed.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/status-tag-mixed.tsx",
      },
    ],
  },
  // select-card examples
  {
    name: "select-card-demo",
    type: "registry:example",
    registryDependencies: ["select-card"],
    files: [
      {
        path: "examples/select-card/select-card-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/select-card-demo.tsx",
      },
    ],
  },
  // confirm-panel examples
  {
    name: "confirm-panel-demo",
    type: "registry:example",
    registryDependencies: ["confirm-panel"],
    files: [
      {
        path: "examples/confirm-panel/confirm-panel-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/confirm-panel-demo.tsx",
      },
    ],
  },
  {
    name: "select-card-single",
    type: "registry:example",
    registryDependencies: ["select-card"],
    files: [
      {
        path: "examples/select-card/select-card-single.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/select-card-single.tsx",
      },
    ],
  },
  {
    name: "confirm-panel-pending",
    type: "registry:example",
    registryDependencies: ["confirm-panel"],
    files: [
      {
        path: "examples/confirm-panel/confirm-panel-pending.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/confirm-panel-pending.tsx",
      },
    ],
  },
  {
    name: "select-card-controlled",
    type: "registry:example",
    registryDependencies: ["select-card", "button"],
    files: [
      {
        path: "examples/select-card/select-card-controlled.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/select-card-controlled.tsx",
      },
    ],
  },
  {
    name: "confirm-panel-confirmed",
    type: "registry:example",
    registryDependencies: ["confirm-panel"],
    files: [
      {
        path: "examples/confirm-panel/confirm-panel-confirmed.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/confirm-panel-confirmed.tsx",
      },
    ],
  },
  {
    name: "button-demo",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/block-button/button-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/button-demo.tsx",
      },
    ],
  },
  // icon-button examples
  {
    name: "icon-button-demo",
    type: "registry:example",
    registryDependencies: ["icon-button"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "examples/icon-button/icon-button-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/icon-button-demo.tsx",
      },
    ],
  },
  {
    name: "confirm-panel-with-actions",
    type: "registry:example",
    registryDependencies: ["confirm-panel", "button"],
    files: [
      {
        path: "examples/confirm-panel/confirm-panel-with-actions.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/confirm-panel-with-actions.tsx",
      },
    ],
  },
  {
    name: "confirm-panel-custom-content",
    type: "registry:example",
    registryDependencies: ["confirm-panel"],
    files: [
      {
        path: "examples/confirm-panel/confirm-panel-custom-content.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/confirm-panel-custom-content.tsx",
      },
    ],
  },
  // report-card examples
  {
    name: "report-card-example",
    type: "registry:example",
    registryDependencies: ["report-card-01"],
    files: [
      {
        path: "examples/report-card/report-card-example.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/report-card-example.tsx",
      },
    ],
  },
  // Merge recruitment examples
  ...recruitmentExamples,
  {
    name: "checkbox-demo",
    type: "registry:example",
    registryDependencies: ["checkbox"],
    files: [
      {
        path: "examples/checkbox/checkbox-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "checkbox-controlled",
    type: "registry:example",
    registryDependencies: ["checkbox"],
    files: [
      {
        path: "examples/checkbox/checkbox-controlled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "checkbox-indeterminate",
    type: "registry:example",
    registryDependencies: ["checkbox"],
    files: [
      {
        path: "examples/checkbox/checkbox-indeterminate.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "checkbox-group-demo",
    type: "registry:example",
    registryDependencies: ["checkbox"],
    files: [
      {
        path: "examples/checkbox/checkbox-group-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "checkbox-group-controlled",
    type: "registry:example",
    registryDependencies: ["checkbox"],
    files: [
      {
        path: "examples/checkbox/checkbox-group-controlled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "checkbox-group-disabled",
    type: "registry:example",
    registryDependencies: ["checkbox"],
    files: [
      {
        path: "examples/checkbox/checkbox-group-disabled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "checkbox-custom-style",
    type: "registry:example",
    registryDependencies: ["checkbox"],
    files: [
      {
        path: "examples/checkbox/checkbox-custom-style.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "radio-demo",
    type: "registry:example",
    registryDependencies: ["radio"],
    files: [
      {
        path: "examples/radio/radio-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "radio-controlled",
    type: "registry:example",
    registryDependencies: ["radio"],
    files: [
      {
        path: "examples/radio/radio-controlled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "radio-group-options",
    type: "registry:example",
    registryDependencies: ["radio"],
    files: [
      {
        path: "examples/radio/radio-group-options.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "radio-vertical",
    type: "registry:example",
    registryDependencies: ["radio"],
    files: [
      {
        path: "examples/radio/radio-vertical.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "radio-disabled",
    type: "registry:example",
    registryDependencies: ["radio"],
    files: [
      {
        path: "examples/radio/radio-disabled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "radio-group-controlled",
    type: "registry:example",
    registryDependencies: ["radio"],
    files: [
      {
        path: "examples/radio/radio-group-controlled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "radio-custom-style",
    type: "registry:example",
    registryDependencies: ["radio"],
    files: [
      {
        path: "examples/radio/radio-custom-style.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "block-select-demo",
    type: "registry:example",
    registryDependencies: ["block-select"],
    files: [
      {
        path: "examples/block-select/block-select-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "block-select-controlled",
    type: "registry:example",
    registryDependencies: ["block-select"],
    files: [
      {
        path: "examples/block-select/block-select-controlled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "block-select-multiple",
    type: "registry:example",
    registryDependencies: ["block-select"],
    files: [
      {
        path: "examples/block-select/block-select-multiple.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "block-select-icon",
    type: "registry:example",
    registryDependencies: ["block-select"],
    files: [
      {
        path: "examples/block-select/block-select-icon.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "block-select-full-rounded",
    type: "registry:example",
    registryDependencies: ["block-select"],
    files: [
      {
        path: "examples/block-select/block-select-full-rounded.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "block-select-disabled",
    type: "registry:example",
    registryDependencies: ["block-select"],
    files: [
      {
        path: "examples/block-select/block-select-disabled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "block-select-advanced",
    type: "registry:example",
    registryDependencies: ["block-select"],
    files: [
      {
        path: "examples/block-select/block-select-advanced.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "triple-split-pane-demo",
    type: "registry:example",
    registryDependencies: ["triple-split-pane"],
    files: [
      {
        path: "examples/split-pane/triple-split-pane-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "task-card-demo",
    type: "registry:example",
    registryDependencies: ["task-card"],
    files: [
      {
        path: "examples/task-card/task-card-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/task-card-demo.tsx",
      },
    ],
  },
  // block-input examples
  {
    name: "block-input-default",
    type: "registry:example",
    registryDependencies: ["block-input"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "examples/block-input/block-input-default.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "block-input-demo",
    type: "registry:example",
    registryDependencies: ["block-input"],
    files: [
      {
        path: "examples/block-input/block-input-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "block-input-states",
    type: "registry:example",
    registryDependencies: ["block-input"],
    files: [
      {
        path: "examples/block-input/block-input-states.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "block-input-multiline",
    type: "registry:example",
    registryDependencies: ["block-input"],
    files: [
      {
        path: "examples/block-input/block-input-multiline.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "block-input-rounded",
    type: "registry:example",
    registryDependencies: ["block-input"],
    files: [
      {
        path: "examples/block-input/block-input-rounded.tsx",
        type: "registry:example",
      },
    ],
  },
  // tag examples
  {
    name: "tag-default",
    type: "registry:example",
    registryDependencies: ["tag"],
    files: [
      {
        path: "examples/tag/tag-default.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "tag-demo",
    type: "registry:example",
    registryDependencies: ["tag"],
    files: [
      {
        path: "examples/tag/tag-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "tag-with-icon",
    type: "registry:example",
    registryDependencies: ["tag"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "examples/tag/tag-with-icon.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "tag-closeable",
    type: "registry:example",
    registryDependencies: ["tag"],
    files: [
      {
        path: "examples/tag/tag-closeable.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "tag-addable",
    type: "registry:example",
    registryDependencies: ["tag", "block-input"],
    files: [
      {
        path: "examples/tag/tag-addable.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "tag-checkable",
    type: "registry:example",
    registryDependencies: ["tag"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "examples/tag/tag-checkable.tsx",
        type: "registry:example",
      },
    ],
  },
  // divider examples
  {
    name: "divider-default",
    type: "registry:example",
    registryDependencies: ["divider"],
    files: [
      {
        path: "examples/divider/divider-default.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "divider-demo",
    type: "registry:example",
    registryDependencies: ["divider"],
    files: [
      {
        path: "examples/divider/divider-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "divider-variants",
    type: "registry:example",
    registryDependencies: ["divider"],
    files: [
      {
        path: "examples/divider/divider-variants.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "divider-with-text",
    type: "registry:example",
    registryDependencies: ["divider"],
    files: [
      {
        path: "examples/divider/divider-with-text.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "divider-vertical",
    type: "registry:example",
    registryDependencies: ["divider"],
    files: [
      {
        path: "examples/divider/divider-vertical.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "divider-custom",
    type: "registry:example",
    registryDependencies: ["divider"],
    files: [
      {
        path: "examples/divider/divider-custom.tsx",
        type: "registry:example",
      },
    ],
  },
  // upload examples
  {
    name: "upload-default",
    type: "registry:example",
    registryDependencies: ["upload"],
    files: [
      {
        path: "examples/upload/upload-default.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "upload-demo",
    type: "registry:example",
    registryDependencies: ["upload"],
    files: [
      {
        path: "examples/upload/upload-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "upload-custom-request",
    type: "registry:example",
    registryDependencies: ["upload"],
    files: [
      {
        path: "examples/upload/upload-custom-request.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "upload-restrictions",
    type: "registry:example",
    registryDependencies: ["upload"],
    files: [
      {
        path: "examples/upload/upload-restrictions.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "upload-controlled",
    type: "registry:example",
    registryDependencies: ["upload"],
    files: [
      {
        path: "examples/upload/upload-controlled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "upload-disabled",
    type: "registry:example",
    registryDependencies: ["upload"],
    files: [
      {
        path: "examples/upload/upload-disabled.tsx",
        type: "registry:example",
      },
    ],
  },
  // goal-card examples
  {
    name: "goal-card-demo",
    type: "registry:example",
    registryDependencies: ["goal-card"],
    files: [
      {
        path: "examples/goal-card/goal-card-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/goal-card-demo.tsx",
      },
    ],
  },
  {
    name: "agent-card-demo",
    type: "registry:example",
    registryDependencies: ["agent-card"],
    files: [
      {
        path: "examples/agent-card/agent-card-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/agent-card-demo.tsx",
      },
    ],
  },
  // document-card examples
  {
    name: "document-card-demo",
    type: "registry:example",
    registryDependencies: ["document-card"],
    files: [
      {
        path: "examples/document-card/document-card-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/document-card-demo.tsx",
      },
    ],
  },
  // file-card examples
  {
    name: "file-card-demo",
    type: "registry:example",
    registryDependencies: ["file-card"],
    files: [
      {
        path: "examples/file-card/file-card-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/file-card-demo.tsx",
      },
    ],
  },
  // accordion examples
  {
    name: "accordion-demo",
    type: "registry:example",
    registryDependencies: ["accordion"],
    files: [
      {
        path: "examples/accordion/accordion-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/accordion-demo.tsx",
      },
    ],
  },
  {
    name: "avatar-default",
    type: "registry:example",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "examples/avatar/avatar-default.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "page-header-demo",
    type: "registry:example",
    title: "Page Header Demo",
    description: "Page header component demo with various configurations",
    dependencies: ["lucide-react"],
    registryDependencies: ["page-header"],
    files: [
      {
        path: "examples/page-header/page-header-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/page-header-demo.tsx",
      },
    ],
  },
  {
    name: "avatar-demo",
    type: "registry:example",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "examples/avatar/avatar-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "avatar-text",
    type: "registry:example",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "examples/avatar/avatar-text.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "avatar-icon",
    type: "registry:example",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "examples/avatar/avatar-icon.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "avatar-sizes",
    type: "registry:example",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "examples/avatar/avatar-sizes.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "avatar-group-demo",
    type: "registry:example",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "examples/avatar/avatar-group-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "avatar-header-demo",
    type: "registry:example",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "examples/avatar/avatar-header-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "progress-default",
    type: "registry:example",
    registryDependencies: ["progress"],
    files: [
      {
        path: "examples/progress/progress-default.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "progress-demo",
    type: "registry:example",
    registryDependencies: ["progress"],
    files: [
      {
        path: "examples/progress/progress-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "progress-line",
    type: "registry:example",
    registryDependencies: ["progress"],
    files: [
      {
        path: "examples/progress/progress-line.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "progress-circle",
    type: "registry:example",
    registryDependencies: ["progress"],
    files: [
      {
        path: "examples/progress/progress-circle.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "progress-steps",
    type: "registry:example",
    registryDependencies: ["progress"],
    files: [
      {
        path: "examples/progress/progress-steps.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "progress-format",
    type: "registry:example",
    registryDependencies: ["progress"],
    files: [
      {
        path: "examples/progress/progress-format.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "progress-dynamic",
    type: "registry:example",
    registryDependencies: ["progress"],
    files: [
      {
        path: "examples/progress/progress-dynamic.tsx",
        type: "registry:example",
      },
    ],
  },
];
