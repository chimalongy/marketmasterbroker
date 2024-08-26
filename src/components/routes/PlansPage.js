import React from "react";
import BasicPlanCard from "../BasicPlanCard";
import FrequentlyAskedQuestions from "./FrequentlyAskedQuestions";

function PlansPage() {
  const basicPlan = {
    title: "Basic",
     subtitle: "Basic Package",
    features: [
      "Minimum investment: $200",
      "Maximum investment: $999",
      "35% Hourly possible outcome",
      "Auto Trading (Fix ROI)",
      "Account manager",
      "48 hours rollover",
    ],
    buttonText: "Get Started",
  };

  const advancedPlan = {
    title: "Standard",
     subtitle: "Most Popular Package",
    features: [
      "Minimum investment: $500",
      "Maximum investment: $4,999",
      "50% hourly possible outcome",
      "Auto Trading (Smart orders)",
      "Account manager",
      "48 hours rollover",
    ],
    buttonText: "Get Started",
    badge: "POPULAR",
  };

  const PremiumPlan = {
    title: "Super",
   subtitle: "Best ROI",
    features: [
      "Minimum investment: $1,000",
      "Maximum investment: Infinite",
      "70% hourly possible outcome",
      "Auto Trading (Smart orders)",
      "Account manager",
      "48 hours rollover",
    ],
    buttonText: "Get Started",
  };

  return (
    <div>
      <div className="sect-container dark-container">
        <div className="sect-container-wrapper">
          <h1 className="sectionheader" data-aos="fade-in-up"data-aos-duration="2200">Tustworthy Investing</h1>
          <p className="sectiondescription">
            All inclusive packages tailored for every trader.
          </p>

          <div className="crypto-prices-container triple-flex">
            <div>
              <BasicPlanCard
                title={basicPlan.title}
                subtitle={basicPlan.subtitle}
                features={basicPlan.features}
                buttonText={basicPlan.buttonText}
              />
            </div>
            <div>
              <BasicPlanCard
                title={advancedPlan.title}
                subtitle={advancedPlan.subtitle}
                features={advancedPlan.features}
                buttonText={advancedPlan.buttonText}
              />
            </div>
            <div>
              <BasicPlanCard
                title={PremiumPlan.title}
                subtitle={PremiumPlan.subtitle}
                features={PremiumPlan.features}
                buttonText={PremiumPlan.buttonText}
              />
            </div>
          </div>
        </div>
      </div>

      <FrequentlyAskedQuestions />
    </div>
  );
}

export default PlansPage;
