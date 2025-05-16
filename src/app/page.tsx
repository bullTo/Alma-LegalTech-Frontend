import LeadForm from "@/components/LeadForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <Image
        src="/banner.png"
        alt="Logo"
        width={1920}
        height={600}
        className="w-full h-[600px]"
        priority
      />
      <div className="mx-auto max-w-[600px] min-w-[300px] flex flex-col gap-6">
        <LeadForm />
      </div>
    </main>
  );
}
