import LeadForm from "@/components/LeadForm";
export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <img src="/banner.png" alt="Logo" className="w-full h-[600px]" />
      <div className="mx-auto max-w-[600px] min-w-[300px] flex flex-col gap-6">
        <LeadForm />
      </div>
    </main>
  );
}
