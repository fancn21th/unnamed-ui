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
    name: "status-tag-demo",
    type: "registry:example",
    registryDependencies: ["status-tag"],
    files: [
      {
        path: "examples/recruitment/status-tag/status-tag-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/recruitment/status-tag-demo.tsx",
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
  {
    name: "markdown-demo",
    type: "registry:example",
    registryDependencies: ["markdown"],
    files: [
      {
        path: "examples/recruitment/markdown/markdown-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/recruitment/markdown-demo.tsx",
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
        path: "examples/button/button-demo.tsx",
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
  // toggle-button examples
  {
    name: "toggle-button-demo",
    type: "registry:example",
    registryDependencies: ["toggle-button-01"],
    files: [
      {
        path: "examples/toggle-button/toggle-button-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/toggle-button-demo.tsx",
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
    registryDependencies: ["deep-thinking-01"],
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
  // tooltip examples
  {
    name: "tooltip-demo",
    type: "registry:example",
    registryDependencies: ["tooltip-01", "button"],
    files: [
      {
        path: "examples/tooltip/tooltip-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/tooltip-demo.tsx",
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
  // Merge recruitment examples
  ...recruitmentExamples,
];
