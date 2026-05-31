import { Link } from "react-router-dom";
import CostEstimateCard from "../components/CostEstimateCard";
import OfferCard from "../components/OfferCard";
import SectionHeader from "../components/SectionHeader";
import { useLanguage } from "../i18n/LanguageContext";

export default function OffersPage({ request, offers, costEstimate, onAccept }) {
  const { locationName, serviceName, t } = useLanguage();
  const recommended = [...offers].sort((a, b) => b.matchingScore - a.matchingScore)[0];
  const others = offers.filter((offer) => offer.id !== recommended?.id);

  return (
    <div>
      <SectionHeader
        kicker={t("offers.kicker")}
        title={t("offers.title")}
        description={t("offers.description", {
          service: serviceName(request?.serviceType || "AC maintenance"),
          location: locationName(request?.location || "Muscat")
        })}
        action={
          <Link to="/matching" className="btn-secondary">
            {t("offers.back")}
          </Link>
        }
      />

      <div className="mb-6 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <CostEstimateCard estimate={costEstimate} request={request} />
        {recommended && (
          <div>
            <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.22em] text-lagoon">Recommended Provider</p>
            <OfferCard offer={recommended} onAccept={onAccept} recommended />
          </div>
        )}
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-3xl font-bold">Compare provider bids</h2>
        <div className="flex flex-wrap gap-2 text-xs font-black text-ink/55">
          <span className="surface-card rounded-full px-3 py-2">Price</span>
          <span className="surface-card rounded-full px-3 py-2">Rating</span>
          <span className="surface-card rounded-full px-3 py-2">Arrival time</span>
          <span className="surface-card rounded-full px-3 py-2">Matching score</span>
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {others.map((offer) => (
          <OfferCard key={offer.id} offer={offer} onAccept={onAccept} />
        ))}
      </div>
    </div>
  );
}
