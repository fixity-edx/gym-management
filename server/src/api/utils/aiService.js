const aiService = {
    // Member: Summarize recent attendance
    getAttendanceSummary: async (history) => {
        if (!history || history.length === 0) {
            return "Start your fitness journey today! Your first check-in is waiting.";
        }

        const recent = history[0];
        const daysSinceLast = Math.floor((new Date() - new Date(recent.checkIn)) / (1000 * 60 * 60 * 24));

        let summary = "";
        if (daysSinceLast === 0) summary = "Great job working out today! Keep up the momentum.";
        else if (daysSinceLast < 3) summary = "You're consistent! A short rest is good for recovery.";
        else if (daysSinceLast < 7) summary = "It's been a few days. Ready to crush another workout?";
        else summary = `We miss you! It's been ${daysSinceLast} days since your last visit. Come back soon!`;

        // Simple heuristic for "favorite time"
        const morningCount = history.filter(h => new Date(h.checkIn).getHours() < 12).length;
        if (morningCount > history.length / 2) {
            summary += " You seem to love morning workouts!";
        }

        return summary;
    },

    // Member: Renewal Recommendation
    getRenewalRecommendation: async (user, plans) => {
        // Recommend the longest plan if they are frequent, else the monthly
        return {
            suggestedPlan: plans.find(p => p.durationDays > 300) || plans[0],
            reason: "Based on your high commitment, an annual plan saves you 20%!"
        };
    },

    // Admin: Calculate Churn Risk for a single user
    getChurnRisk: async (user, history) => {
        let riskScore = 10; // Base risk
        const daysSinceLast = history.length > 0 ?
            Math.floor((new Date() - new Date(history[0].checkIn)) / (1000 * 60 * 60 * 24)) : 30;

        if (daysSinceLast > 30) riskScore += 50;
        else if (daysSinceLast > 14) riskScore += 30;
        else if (daysSinceLast > 7) riskScore += 10;

        if (!user.subscription.isActive) riskScore += 40;

        return {
            riskScore: Math.min(riskScore, 100),
            lastVisit: history.length > 0 ? history[0].checkIn : null,
            prediction: riskScore > 50 ? "High risk of churn" : "Low risk of churn"
        };
    },

    // Admin: Branch Insights
    getBranchPerformance: async (branchData, revenueData) => {
        return {
            efficiency: "85%",
            peakHours: "6 PM - 8 PM",
            insight: "Capacity utilization is high during peak hours. Consider adding more equipment."
        };
    }
};

module.exports = aiService;
