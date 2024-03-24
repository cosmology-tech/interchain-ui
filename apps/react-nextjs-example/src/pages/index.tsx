import Link from "next/link";
import { Text } from "@interchain-ui/react";
import { Layout } from "@/components/layout";

export default function Home() {
  return (
    <Layout>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24`}
      >
        <div className="flex flex-col gap-6">
          <Text>Current: / page</Text>

          <Link href="/settings">
            <span className="bg-slate-300 p-4 text-gray-600 rounded-lg">
              Go to /settings
            </span>
          </Link>
        </div>
      </main>
    </Layout>
  );
}
