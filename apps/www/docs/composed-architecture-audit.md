# Composed Components Audit (vs Thinking Process Benchmark)

Benchmark component: `apps/www/registry/wuhan/composed/thinking-process/thinking-process.tsx`.

Audit scope: `apps/www/registry/wuhan/composed/**`.

## Global gaps (relative to benchmark)

- Missing `React.forwardRef` + `displayName` in most components.
- Missing `@public` JSDoc on exported components and public types.
- Accessibility gaps: missing `aria-*`, unclear button semantics, no labels on interactive icons.
- API inconsistencies: naming (`onToggle` vs `onSelect`), `Composed` suffix vs file name.
- Boundary issues: some composed components depend on UI layer instead of block primitives.
- Performance: inline maps or callbacks created per render.

## Per-component findings

### `attachment-list/attachment-list.tsx`

Issues:

- No `forwardRef` / `displayName`.
- Public interfaces lack `@public`.
- Clickable card has no explicit button semantics or `aria-label`.
- Naming: `AttachmentListComposed` vs file name mismatch.

Optimizations:

- Add `forwardRef` and `displayName`.
- Add `@public` to exported types and component.
- Add `aria-label` / `role="button"` for interactive cards.
- Align component name with file (`AttachmentList`).

### `avatar-header/avatar-header.tsx`

Issues:

- No `forwardRef` / `displayName`.
- Public interfaces lack `@public`.
- Avatar accessibility is fixed and not configurable.

Optimizations:

- Add `forwardRef` and `displayName`.
- Add `@public` to exported types and component.
- Allow configurable `avatar` semantics (e.g., `avatarAriaHidden`).

### `component-panel/component-panel.tsx`

Issues:

- No `forwardRef` / `displayName`.
- Public interfaces lack `@public`.
- Missing ARIA semantics for tabs/items.
- Callback name `onToggle` is inconsistent.

Optimizations:

- Add `forwardRef` and `displayName`.
- Add `@public` to public types and component.
- Add `aria-label`/`aria-selected` for tabs/items.
- Consider `onSelect` naming for items.

### `deep-thinking/deep-thinking.tsx`

Issues:

- No `forwardRef` / `displayName`.
- Public interfaces lack `@public`.
- Missing `aria-expanded` / `aria-controls` on collapsible trigger.

Optimizations:

- Add `forwardRef` and `displayName`.
- Add `@public` to public types and component.
- Add accessibility attributes for collapsible sections.
- Export default label object for reuse.

### `execution-result/execution-result.tsx`

Issues:

- No `forwardRef` / `displayName`.
- Public interfaces lack `@public`.
- Status icons are not labeled.
- Status map is created in render scope.

Optimizations:

- Add `forwardRef` and `displayName`.
- Add `@public` to public types and component.
- Add `aria-label` for status icon usage.
- Move static maps to module scope.

### `feedback/feedback.tsx`

Issues:

- No `forwardRef` / `displayName`.
- Public interfaces lack `@public`.
- Controlled/uncontrolled patterns are mixed.
- Missing `aria-describedby` for error messaging.

Optimizations:

- Add `forwardRef` and `displayName`.
- Add `@public` to public types and component.
- Choose a consistent controlled model (prefer controlled).
- Add `aria-describedby` when errors are introduced.

### `history-item/history-item.tsx`

Issues:

- No `forwardRef` / `displayName`.
- Public interfaces lack `@public`.
- Uses `data-selected`/`data-active` instead of ARIA.

Optimizations:

- Add `forwardRef` and `displayName`.
- Add `@public` to public types and component.
- Prefer `aria-selected`/`aria-current`.
- Consider `asChild` / `button` semantics.

### `message/message.tsx`

Issues:

- Minor naming inconsistency (`errorMessage` vs `errorContent`).

Optimizations:

- Align naming for clarity (`errorText` / `errorSlot`).
- Optional: add `aria-atomic` for `aria-live`.

### `prompt/prompt.tsx`

Issues:

- Missing `@public` on types and component.
- Group lacks `aria-label`.
- Variant logic duplicated.

Optimizations:

- Add `@public` to public types and component.
- Add `aria-label` to group.
- Extract variant mapping logic.

### `quick-action/quick-action.tsx`

Issues:

- No `forwardRef` / `displayName`.
- Public interfaces lack `@public`.
- Direct primitive exports weaken composed boundary.
- Hardcoded layout strings instead of tokens/slots.

Optimizations:

- Add `forwardRef` and `displayName`.
- Add `@public` to public types and component.
- Wrap primitives instead of re-exporting.
- Expose slots or props for header region.

### `quote-content/quote-content.tsx`

Issues:

- No `forwardRef` / `displayName`.
- Public interfaces lack `@public`.
- Close button has no `aria-label`.

Optimizations:

- Add `forwardRef` and `displayName`.
- Add `@public` to public types and component.
- Add `aria-label` to close button.

### `sender/sender.tsx`

Issues:

- No `forwardRef` / `displayName`.
- Public interfaces lack `@public`.
- Mixed concerns in single component (mode, attachments, form).
- Accessibility: input/form relationships not explicit.

Optimizations:

- Add `forwardRef` and `displayName`.
- Add `@public` to public types and component.
- Extract slots or sub-components for attachments/modes.
- Add `aria-describedby` for validation/error hinting.

### `sidebar/sidebar.tsx`

Issues:

- No `forwardRef` / `displayName`.
- Public interfaces lack `@public`.
- Search input and list lack `aria-label`.
- Config object is large and nested.

Optimizations:

- Add `forwardRef` and `displayName`.
- Add `@public` to public types and component.
- Add ARIA labels for search and history list.
- Offer slot-style props to reduce config nesting.

### `suggestion/suggestion.tsx`

Issues:

- No `forwardRef` / `displayName`.
- Public interfaces lack `@public`.
- Direct primitive exports weaken composed boundary.

Optimizations:

- Add `forwardRef` and `displayName`.
- Add `@public` to public types and component.
- Prefer composed exports over primitive re-exports.

### `task-list/task-list.tsx`

Issues:

- No `forwardRef` / `displayName`.
- Public interfaces lack `@public`.
- Uses UI layer `Button` rather than block primitives.
- State handling coupled to render.

Optimizations:

- Add `forwardRef` and `displayName`.
- Add `@public` to public types and component.
- Move to block primitives for boundary consistency.
- Consider `useReducer` or callbacks for state flow.

### `task-list/EditableList.tsx`

Issues:

- No `forwardRef` / `displayName`.
- Public interfaces lack `@public`.
- Drag handle and delete action lack `aria-label`.

Optimizations:

- Add `forwardRef` and `displayName`.
- Add `@public` to public types and component.
- Add `aria-label` to drag handle and delete action.
- Memoize handlers where helpful.

### `task-list/ReadonlyList.tsx`

Issues:

- No `forwardRef` / `displayName`.
- Public interfaces lack `@public`.
- List semantics missing (`role="list"`).

Optimizations:

- Add `forwardRef` and `displayName`.
- Add `@public` to public types and component.
- Add list role and label.

### `thinking-step-item/thinking-step-item.tsx`

Issues:

- Mostly aligned with benchmark.
- Default labels are not exported.

Optimizations:

- Export default labels for reuse.

### `welcome/welcome.tsx`

Issues:

- No `forwardRef` / `displayName`.
- Public interfaces lack `@public`.
- Component name does not match file name.

Optimizations:

- Add `forwardRef` and `displayName`.
- Add `@public` to public types and component.
- Align component name with file name.

### `dynamic-form/DynamicForm.tsx`

Issues:

- Public exports lack `@public`.
- UI layer dependencies instead of primitives.
- `useImperativeHandle` dependencies are large.

Optimizations:

- Add `@public` to public types and component.
- Reduce UI dependencies or wrap with block primitives.
- Split or memoize logic inside imperative handle.

### `dynamic-form/FormItem.tsx`

Issues:

- No `forwardRef` / `displayName`.
- Public interfaces lack `@public`.
- UI dependencies instead of primitives.
- Inline render function created on every render.

Optimizations:

- Add `forwardRef` and `displayName`.
- Add `@public` to public types and component.
- Use block primitives or composed wrappers.
- Extract render logic to component or memoize.
