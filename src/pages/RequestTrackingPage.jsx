import { Link } from "react-router-dom";
import { FastForward, PartyPopper } from "lucide-react";
import Badge from "../components/Badge";
import CostEstimateCard from "../components/CostEstimateCard";
import MapSimulation from "../components/MapSimulation";
import SectionHeader from "../components/SectionHeader";
import TrackingTimeline from "../components/TrackingTimeline";
import { trackingSteps } from "../data/mockData";
import { useLanguage } from "../i18n/LanguageContext";

export default function RequestTrackingPage({ request, offer, costEstimate, currentStep, onStepChange, onComplete }) {
  const { serviceName, t } = useLanguage();
  const isComplete = currentStep >= trackingSteps.length - 1;

  function advance() {
    const next = Math.min(currentStep + 1, trackingSteps.length - 1);
    onStepChange(next);
    if (next === trackingSteps.length - 1) onComplete();
  }

  return (
    <div>
      <SectionHeader
        kicker={t("tracking.kicker")}
        title={t("tracking.title")}
        description={t("tracking.description")}
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="space-y-5">
          <article className="glass-card rounded-[2.4rem] p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-lagoon">{request?.id}</p>
                <h2 className="mt-2 font-display text-3xl font-bold">{serviceName(request?.serviceType)}</h2>
              </div>
              <Badge tone={isComplete ? "Completed" : "Active"}>{isComplete ? "Completed" : "Active"}</Badge>
            </div>
            <p className="mt-4 leading-8 text-ink/65">{request?.description}</p>
            <div className="surface-muted mt-5 rounded-[1.7rem] p-4">
              <p className="text-sm font-extrabold text-ink/45">{t("tracking.selectedProvider")}</p>
              <p className="mt-1 text-xl font-black">{offer?.providerName || request?.provider || "OmanFix Technical Services"}</p>
              <p className="mt-2 text-sm font-bold text-ink/55">
                {t("tracking.estimatedPrice")}: {offer?.estimatedPrice || request?.price || 32} {t("common.omr")}
              </p>
            </div>
          </article>

          <CostEstimateCard estimate={costEstimate} request={request} />
        </aside>

        <section className="space-y-6">
          <MapSimulation request={request} offer={offer} currentStep={currentStep} />
          <div className="glass-card rounded-[2.4rem] p-6">
            <div className="mb-6 h-3 overflow-hidden rounded-full bg-white">
              <div className="h-full rounded-full bg-lagoon transition-all duration-700" style={{ width: `${((currentStep + 1) / trackingSteps.length) * 100}%` }} />
            </div>
            <TrackingTimeline steps={trackingSteps} currentStep={currentStep} />
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {!isComplete ? (
                <button className="btn-primary" onClick={advance}>
                  <FastForward size={17} />
                  {t("tracking.nextStatus")}
                </button>
              ) : (
                <Link to="/rating" className="btn-primary">
                  <PartyPopper size={17} />
                  {t("tracking.rateProvider")}
                </Link>
              )}
              <button className="btn-secondary" onClick={() => onStepChange(0)}>
                {t("tracking.reset")}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
