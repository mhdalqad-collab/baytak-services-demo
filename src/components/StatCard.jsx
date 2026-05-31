export default function StatCard({ label, value, trend, icon: Icon }) {
  return (
    <div className="surface-card rounded-[2rem] p-4 shadow-card sm:p-5">
      <div className="mb-5 flex items-start justify-between gap-4 sm:mb-6">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-mist text-lagoon sm:h-11 sm:w-11">
          <Icon size={21} />
        </div>
        <span className="rounded-full bg-clay/10 px-3 py-1 text-xs font-extrabold text-clay">{trend}</span>
      </div>
      <p className="text-sm font-bold text-ink/50">{label}</p>
      <p className="mt-1 text-2xl font-black tracking-tight text-ink sm:text-3xl">{value}</p>
    </div>
  );
}
