import { WelcomeMessage } from "@/registry/wuhan/composed/welcome/welcome";

export default function WelcomeBranded() {
  return (
    <WelcomeMessage
      icon={
        <img
          src="/logo.png"
          alt="Logo"
          width={48}
          height={48}
          className="rounded-lg"
        />
      }
      text={
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            欢迎来到未来
          </h1>
          <p className="text-lg text-muted-foreground">探索 AI 的无限可能</p>
        </div>
      }
      className="py-12"
    />
  );
}
