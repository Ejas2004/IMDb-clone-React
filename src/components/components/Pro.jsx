import React from "react";
import { Check } from "lucide-react";
import BackButton from "./common/BackButton";
import "./Pro.css";

const plans = [
  {
    name: "Free",
    price: 0,
    features: [
      "Access to basic content",
      "Limited video quality",
      "Ads included",
    ],
    popular: false,
    buttonClass: "button-free",
    cardClass: "card-white",
  },
  {
    name: "Premium",
    price: 9.99,
    features: [
      "Unlimited content access",
      "HD video quality",
      "Ad-free experience",
      "Download for offline",
      "Priority support",
    ],
    popular: true,
    buttonClass: "button-yellow",
    cardClass: "card-yellow",
  },
  {
    name: "VIP",
    price: 19.99,
    features: [
      "Everything in Premium",
      "4K Ultra HD quality",
      "Exclusive content",
      "Early access to new releases",
      "VIP badge & perks",
      "24/7 dedicated support",
    ],
    popular: false,
    buttonClass: "button-white",
    cardClass: "card-white",
  },
];

function PlanCard({ plan }) {
  return (
    <>
    <div className={`plan-card ${plan.cardClass}`}>
      {plan.popular && <div className="popular-badge">POPULAR</div>}
      <h3 className="plan-title">{plan.name}</h3>
      <div className="plan-price">
        <span className="price-amount">
          ${plan.price === 0 ? 0 : plan.price.toFixed(2)}
        </span>
        <span className="price-period">/month</span>
      </div>
      <button className={`plan-button ${plan.buttonClass}`}>
        Get Started
      </button>
      <ul className="plan-features">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="feature-item">
            <Check className="feature-icon" />
            <span className="feature-text">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
        </>
  );
}

export default function Pro() {
  return (
    <div className="pro-container">
      <BackButton to="/" />

      <div className="pro-header">
        <h1>Choose Your Plan</h1>
        <p>Select the perfect plan for your needs</p>
      </div>
      <div className="plans-wrapper">
        {plans.map((plan, idx) => (
          <PlanCard key={idx} plan={plan} />
        ))}
      </div>
    </div>
  );
}
