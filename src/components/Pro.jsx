import React from "react";
import { Check } from "lucide-react";
import "./Pro.css";
const mainframe = [
    {
      imgs: "https://www.dxbnewsnetwork.com/upload/newsimage/2025/10/04/kantara_2.jpg",
      des: "Exploring the origins of Kaadubettu Shiva during the Kadamba dynasty era, it delves into the untamed wilderness and forgotten lore surrounding his past.",
      title: "Kantara A Legend: Chapter 1",
    },
    {
      imgs: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.stan.com.au%2Fwatch%2Fthe-dark-knight-2008&psig=AOvVaw0WCOBnR5anRumPWulJs-o3&ust=1759947900648000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJj-sP7akpADFQAAAAAdAAAAABAE",
      title: "The Dark Knight",
      des: "When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness",
    },
    {
      imgs: "https://mecinemas.com/assets/img/posters/SawX_banner.jpg",
      des: "A sick and desperate John travels to Mexico for a risky and experimental medical procedure in hopes of a miracle cure for his cancer only to discover the entire operation is a scam to defraud the most vulnerable.",
      title: "SAW X",
    },
    {
      imgs: "https://www.yashrajfilms.com/images/default-source/movies/veer-zaara/veer-zaara_mobile.jpg?sfvrsn=c2f5cc_8",
      des: "An Indian Air Force pilot rescues a Pakistani girl stranded in India. Years later, a lawyer seeks to unravel the truth behind the pilot's mysterious imprisonment in Pakistan for over two decades, during which he remained silent.",
      title: "Veer Zaara",
    },
  ];
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
  );
}

export default function Pro() {
  return (
    <div className="pro-container">
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
