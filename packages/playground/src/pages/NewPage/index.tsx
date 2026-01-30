import { SidebarComposed } from "../../components/wuhan/composed/sidebar";
import { AvatarHeaderComposed } from "../../components/wuhan/composed/avatar-header";
import { Sparkles } from "lucide-react";

export function NewPage() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-slate-50 text-slate-900">
      <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4">
        <div className="text-sm font-semibold">Agent Console</div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Workspace</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>Online</span>
        </div>
      </header>

      <main className="flex flex-1 gap-4 px-4 py-4">
        <SidebarComposed 
        conversations={[{ id: "1", title: "Conversation 1" }]} 
        header={{
          title: "Agent Console",
          icon: <Sparkles className="size-4" />,
        }}
        footer={({ collapsed }) => <AvatarHeaderComposed name={!collapsed?"User":null}  />} />

        <section className="flex flex-1 flex-col rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-4 py-3 text-sm font-semibold">
            Conversation
          </div>
          <div className="flex-1 px-4 py-3 text-sm text-slate-400">
            Messages
          </div>
          <div className="border-t border-slate-200 px-4 py-3 text-sm text-slate-400">
            Composer
          </div>
        </section>

        <aside className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="text-xs font-semibold uppercase text-slate-400">
            Right Panel
          </div>
        </aside>
      </main>
    </div>
  );
}
