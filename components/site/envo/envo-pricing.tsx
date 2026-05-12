import { PremiumPricingCard } from "@/components/site/visual-system";
import { PACKAGE_NAMES } from "@/lib/constants";
import { visualThemes } from "@/lib/visual-themes";

const theme = visualThemes.envoWarm;

const setupCopyByPlan = {
  Starter: "Starter setup from $750.",
  Growth: "Growth setup from $1,500.",
  Custom: "Custom buildout from $5,000+."
} as const;

const priceDisplayByPlan = {
  Starter: "$250/mo",
  Growth: "$500/mo",
  Custom: "from $1,000/mo"
} as const;

export function EnvoPricing() {
  return (
    <section className="premium-section" id="pricing">
      <div className="relative mx-auto max-w-[1450px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[color:var(--vs-accent-3)]">Pricing</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-normal text-white sm:text-5xl">
              Simple pricing. Powerful lead coverage.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[color:var(--vs-muted)]">
            Choose the Envo coverage that matches your lead sources and routing complexity. No guaranteed revenue claims,
            just clearer lead response and cleaner handoffs.
          </p>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {PACKAGE_NAMES.map((plan) => {
            const name = plan.name as keyof typeof setupCopyByPlan;

            return (
              <PremiumPricingCard
                key={plan.name}
                copy={`${plan.summary} ${setupCopyByPlan[name]}`}
                cta="Preview Envo"
                name={plan.name}
                price={priceDisplayByPlan[name]}
                theme={theme}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
