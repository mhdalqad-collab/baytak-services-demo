import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Camera, Send } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import { omanLocations, serviceCategories } from "../data/mockData";
import { useLanguage } from "../i18n/LanguageContext";
import { detectIssueFromPhoto } from "../utils/simulation";

export default function RequestFormPage({ onSubmit }) {
  const [searchParams] = useSearchParams();
  const { locationName, serviceName, statusName, t } = useLanguage();
  const selectedService = searchParams.get("service") || "AC maintenance";
  const [formData, setFormData] = useState({
    serviceType: selectedService,
    description: "",
    urgency: "Normal",
    location: "Muscat",
    preferredTime: "",
    photoName: ""
  });

  const examples = useMemo(
    () => ({
      "Electrical repair": t("request.defaultDescription"),
      Plumbing: t("request.defaultDescription"),
      "AC maintenance": t("request.defaultDescription"),
      Cleaning: t("request.defaultDescription"),
      Painting: t("request.defaultDescription"),
      Carpentry: t("request.defaultDescription"),
      "Appliance repair": t("request.defaultDescription"),
      "Pest control": t("request.defaultDescription"),
      "Emergency repair": t("request.defaultDescription")
    }),
    [t]
  );

  function updateField(field, value) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  const aiDetection = formData.photoName ? detectIssueFromPhoto(formData.photoName, formData.serviceType) : null;
  const isEmergency = formData.urgency === "Emergency";

  function submitForm() {
    onSubmit({
      ...formData,
      description: formData.description || examples[formData.serviceType] || "Customer reported a maintenance issue.",
      preferredTime: formData.preferredTime || t("request.defaultTime"),
      photoName: formData.photoName || "photo-placeholder.jpg"
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitForm();
  }

  return (
    <div>
      <SectionHeader
        kicker={t("request.kicker")}
        title={t("request.title")}
        description={t("request.description")}
        action={
          <Link to="/matching" onClick={submitForm} className="btn-primary">
            {t("request.submit")}
            <Send size={17} />
          </Link>
        }
      />

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className={`glass-card rounded-[2.4rem] p-6 ${isEmergency ? "border-red-300 ring-4 ring-red-100" : ""}`}>
          <div className="grid gap-5">
            <label className="grid gap-2 text-sm font-extrabold">
              {t("request.serviceType")}
              <select className="input-field" value={formData.serviceType} onChange={(event) => updateField("serviceType", event.target.value)}>
                {serviceCategories.map((service) => (
                  <option key={service.id} value={service.name}>{serviceName(service.name)}</option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-extrabold">
              {t("request.problem")}
              <textarea
                className="input-field min-h-36 resize-none"
                value={formData.description}
                onChange={(event) => updateField("description", event.target.value)}
                placeholder={examples[formData.serviceType]}
              />
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-extrabold">
              {t("request.urgency")}
                <select className="input-field" value={formData.urgency} onChange={(event) => updateField("urgency", event.target.value)}>
                  {["Normal", "Urgent", "Emergency"].map((urgency) => (
                    <option key={urgency} value={urgency}>{statusName(urgency)}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-extrabold">
                {t("request.locationOman")}
                <select className="input-field" value={formData.location} onChange={(event) => updateField("location", event.target.value)}>
                  {omanLocations.map((location) => (
                    <option key={location} value={location}>{locationName(location)}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="grid gap-2 text-sm font-extrabold">
              {t("request.preferredTime")}
              <input
                className="input-field"
                value={formData.preferredTime}
                onChange={(event) => updateField("preferredTime", event.target.value)}
                placeholder={t("request.preferredPlaceholder")}
              />
            </label>
          </div>
          {isEmergency && (
            <div className="mt-5 rounded-[1.7rem] border border-red-200 bg-red-50 p-4 text-sm font-black text-red-700">
              Emergency mode enabled: high-priority dispatch, faster provider response, and emergency fee included.
            </div>
          )}
        </div>

        <aside className="space-y-5">
          <div className="surface-card rounded-[2.4rem] border border-dashed border-lagoon/35 p-6 shadow-card">
            <div className="grid h-24 place-items-center rounded-[1.7rem] bg-mist text-lagoon">
              <Camera size={34} />
            </div>
            <label className="mt-5 grid gap-2 text-sm font-extrabold">
              {t("request.upload")}
              <input
                className="input-field"
                value={formData.photoName}
                onChange={(event) => updateField("photoName", event.target.value)}
                placeholder={t("request.photoPlaceholder")}
              />
            </label>
            <p className="mt-3 text-sm leading-6 text-ink/55">
              {t("request.uploadNote")}
            </p>
            {aiDetection && (
              <div className="surface-muted mt-4 rounded-[1.7rem] p-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-lagoon">AI issue detection</p>
                <p className="mt-2 text-lg font-black text-ink">{aiDetection.issue}</p>
                <p className="mt-1 text-sm font-bold text-ink/60">
                  Confidence: {aiDetection.confidence}% · Suggested service: {aiDetection.suggestedService}
                </p>
              </div>
            )}
          </div>

          <div className="premium-panel rounded-[2.4rem] p-6 shadow-soft">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-palm">{t("request.nextStep")}</p>
            <h2 className="mt-3 font-display text-3xl font-bold">{t("request.providerMatching")}</h2>
            <p className="mt-3 leading-7 text-white/65">{t("request.nextText")}</p>
            <Link to="/matching" onClick={submitForm} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-extrabold text-slate-900 transition hover:-translate-y-0.5">
              {t("request.submit")}
              <Send size={17} />
            </Link>
          </div>
        </aside>
      </form>
    </div>
  );
}
