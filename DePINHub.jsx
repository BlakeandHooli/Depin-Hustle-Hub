import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const baseProjects = [
  {
    name: "Mysterium",
    symbol: "MYST",
    roi: "Varies",
    cost: "$0 (if node hosted on existing device)",
    difficulty: "Low",
    referralLink: "https://yourreferral.link/mysterium",
    monthlyTokens: 2,
    tokenPriceUSD: 0.32,
  },
  {
    name: "Grass",
    symbol: "GRASS",
    roi: "Free pre-token access",
    cost: "$0",
    difficulty: "Very Low",
    referralLink: "https://yourreferral.link/grass",
    monthlyTokens: 1.5,
    tokenPriceUSD: 0.12,
  },
];

// Premium-only projects
const premiumProjects = [
  {
    name: "DIMO",
    symbol: "DIMO",
    roi: "Growing",
    cost: "$0 (existing devices)",
    difficulty: "Medium",
    referralLink: "https://yourreferral.link/dimo",
    monthlyTokens: 3,
    tokenPriceUSD: 0.18,
  },
  {
    name: "Helium",
    symbol: "HNT",
    roi: "Variable",
    cost: "$0 (if hosted on existing device)",
    difficulty: "Medium",
    referralLink: "https://yourreferral.link/helium",
    monthlyTokens: 4,
    tokenPriceUSD: 1.2,
  },
];

export default function DePINHub() {
  const [isPremium, setIsPremium] = useState(false);
  const projects = isPremium
    ? [...baseProjects, ...premiumProjects]
    : baseProjects;

  const [progresses, setProgresses] = useState(projects.map(() => 0));
  const [millixPaid, setMillixPaid] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgresses((oldProgresses) =>
        oldProgresses.map((prog, i) =>
          prog < projects[i].monthlyTokens ? +(prog + 0.1).toFixed(2) : projects[i].monthlyTokens
        )
      );
    }, 100);

    return () => clearInterval(interval);
  }, [projects]);

  const totalTokens = projects.reduce((sum, project) => sum + (project.monthlyTokens || 0), 0);
  const totalUSD = projects.reduce(
    (sum, project, i) => sum + progresses[i] * project.tokenPriceUSD,
    0
  );

  const handleMillixUpgrade = () => {
    alert("To upgrade with Millix, please send 2,000,000 Mx to: your-millix-wallet-address. Then click 'Verify Millix Payment' below.");
  };

  const verifyMillixPayment = () => {
    alert("Payment verified. Premium unlocked!");
    setIsPremium(true);
    setMillixPaid(true);
    setProgresses(Array(baseProjects.length + premiumProjects.length).fill(0));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-black text-pink-500 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">DePIN Hustle Hub</h1>

      <p className="mb-4">
        Start earning with these DePIN projects that can be hosted on your existing devices for free:
      </p>

      {!isPremium && (
        <div className="mb-6 bg-pink-900 p-3 rounded text-sm">
          💡 Upgrade to <strong>Premium</strong> for 2,000,000 Millix to remove ads and unlock bonus features!
          <div className="mt-2">
            <button
              className="underline text-pink-300"
              onClick={handleMillixUpgrade}
            >
              Pay with Millix
            </button>
            <button
              className="underline text-pink-300 ml-4"
              onClick={verifyMillixPayment}
            >
              Verify Millix Payment
            </button>
          </div>
        </div>
      )}

      <div className="mb-6 text-lg font-semibold">
        Estimated Monthly Token Accumulation: {totalTokens.toFixed(2)}<br />
        Total Earnings (simulated): ${totalUSD.toFixed(2)}
      </div>

      {projects.map((project, i) => {
        const progressPercent = (progresses[i] / project.monthlyTokens) * 100;
        const earnedUSD = (progresses[i] * project.tokenPriceUSD).toFixed(2);
        const reachedGoal = progresses[i] >= project.monthlyTokens;

        return (
          <Card key={project.name} className="mb-4 bg-gray-900">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                {project.name} ({project.symbol})
              </h2>
              <p className="text-sm mb-2">
                ROI: {project.roi} | Cost: {project.cost} | Difficulty: {project.difficulty}
              </p>
              <p className="text-sm mb-2">Est. Tokens/Month: {project.monthlyTokens}</p>

              <div className="w-full bg-pink-700 rounded h-4 mb-1">
                <div
                  className="bg-pink-400 h-4 rounded"
                  style={{ width: `${progressPercent}%`, transition: "width 0.1s linear" }}
                ></div>
              </div>
              <p className="text-sm mb-1 font-mono">
                Tokens earned: {progresses[i].toFixed(2)} / {project.monthlyTokens} ({earnedUSD} USD)
              </p>

              {reachedGoal && (
                <p className="text-green-400 text-sm font-semibold mb-2">🎉 Monthly Goal Achieved!</p>
              )}

              <a
                href={project.referralLink}
                className="underline"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Sign Up via Our Referral Link
              </a>

              {!isPremium && (
                <div className="mt-4 text-xs text-pink-300 italic">
                  🔺 Sponsored: Check out more ways to earn with [Your Ad Here] 🔺
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
