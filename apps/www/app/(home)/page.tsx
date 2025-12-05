import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <h1 className="text-2xl font-bold mb-4">unnamed-ui / home</h1>
      <p>
        You can open{" "}
        <Link href="/docs" className="font-medium underline">
          /docs
        </Link>{" "}
        and see the design system documentation.
      </p>

      <p>
        You can open{" "}
        <Link href="/themes" className="font-medium underline">
          /themes
        </Link>{" "}
        and see how to customize themes.
      </p>

      <p>
        You can open{" "}
        <Link href="/libs" className="font-medium underline">
          /libs
        </Link>{" "}
        and see the ai chat framework documentation.
      </p>
    </div>
  );
}
