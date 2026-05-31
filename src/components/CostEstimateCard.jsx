import { Brain, AlertTriangle } from "lucide-react";

export default function CostEstimateCard({ estimate, request }) {
  if (!estimate) return null;
  const emergency = request?.urgency === "Emergency";

  return (
    <article className={`rounded-[2.2rem] border p-5 shadow-card ${emergency ? "border-red-200 bg-red-50 text-slate-900" : "surface-card"}`}>
      <div className="flex items-start gap-4">
        <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${emergency ? "bg-red-600 text-white" : "bg-mist text-lagoon"}`}>
          {emergency ? <AlertTriangle size={23} /> : <Brain size={23} />}
        </div>
        <div>
          <p className={`text-sm font-extrabold uppercase tracking-[0.22em] ${emergency ? "text-red-700" : "text-lagoon"}`}>AI cost estimation</p>
          <h3 className="mt-1 text-2xl font-black text-ink">
            Estimated Cost: {estimate.min}-{estimate.max} OMR
          </h3>
          {emergency && <p className="mt-2 rounded-2xl bg-red-600 px-3 py-2 text-sm font-black text-white">Emergency request sent to nearby providers</p>}
        </div>
      </div>
      <div className="mt-5 grid gap-2">
        {estimate.reasons.map((reason) => (
          <div key={reason} className="surface-muted rounded-2xl px-4 py-3 text-sm font-bold text-ink/70">
            {reason}
          </div>
        ))}
      </div>
    </article>
  );
}
