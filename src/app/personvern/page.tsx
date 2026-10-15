import Sidebar from "@/components/Sidebar";

export default function PersonvernPage() {
  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      <Sidebar />
      <main className="flex-1 px-4 py-10 lg:px-8 max-w-2xl">
        <h1 className="heading-stripe text-3xl mb-4 text-neutral-50">
          Personvern
        </h1>
        <p className="text-neutral-300 mb-4">
          Denne lokale prototypen samler ikke inn personopplysninger. Når
          siden settes i reell drift med nyhetsbrev og innsendingsskjema, vil
          denne siden oppdateres med informasjon om hvilke data som lagres,
          hvor lenge, og hvordan du kan be om å få dem fjernet, i tråd med
          GDPR.
        </p>
      </main>
    </div>
  );
}
