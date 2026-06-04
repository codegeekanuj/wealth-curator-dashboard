export const mockFinancialData = {
  summary: {
    netWorth: 1248390,
    netWorthTrend: "+12.4% vs last month",
    spending: 4280,
    spendingTrend: "+2.1% higher than avg",
    savings: 245000,
    savingsTrend: "On track for Q4 goal",
    savingsRate: 70, // percentage progress bar
    proNetWorth: 24500.00,
    proSpending: 3200.00,
    proSavings: 8450.00,
  },
  activeAlerts: [
    {
      id: "alert-1",
      type: "critical",
      title: "Subscription Spike",
      description: "3 new recurring charges detected from 'Cloud SaaS' in the last 48h.",
      category: "Subscription Audit",
      actionLabel: "Review Audit",
      time: "2 hours ago"
    },
    {
      id: "alert-2",
      type: "success",
      title: "Emergency Fund Cap",
      description: "Your 'Rainy Day' fund has reached its target of $20k. Redirecting flows?",
      category: "Savings",
      actionLabel: "Review Fund",
      time: "Yesterday"
    },
    {
      id: "alert-3",
      type: "info",
      title: "Dividend Reinvestment",
      description: "AAPL and MSFT paid dividends today. Automatic reinvestment pending.",
      category: "Investing",
      actionLabel: "View Details",
      time: "2 days ago"
    },
    {
      id: "alert-4",
      type: "warning",
      title: "Dining Out Alert",
      description: "You've reached 86% of your food budget for June.",
      category: "Dining Out",
      actionLabel: "Adjust Budget",
      time: "June 12"
    },
    {
      id: "alert-5",
      type: "success",
      title: "Subscription Audit",
      description: "Cancelled 3 inactive services. Saved $65.00/mo.",
      category: "Audit",
      actionLabel: "View History",
      time: "June 10"
    }
  ],
  transactions: [
    {
      id: "tx-1",
      merchant: "Apple Store Soho",
      category: "Technology",
      status: "CLEARED",
      amount: -1299.00,
      date: "Oct 24, 2023 • 14:20"
    },
    {
      id: "tx-2",
      merchant: "Blue Hill Farm",
      category: "Lifestyle",
      status: "CLEARED",
      amount: -485.20,
      date: "Oct 23, 2023 • 19:15"
    },
    {
      id: "tx-3",
      merchant: "ConEd Utility Bill",
      category: "Utilities",
      status: "PENDING",
      amount: -214.10,
      date: "Oct 22, 2023 • 09:00"
    },
    {
      id: "tx-4",
      merchant: "Monthly Salary Deposit",
      category: "Income",
      status: "CLEARED",
      amount: 12500.00,
      date: "Oct 21, 2023 • 12:30"
    },
    {
      id: "tx-5",
      merchant: "The Artisanal Kitchen",
      category: "Food",
      status: "CLEARED",
      amount: -42.50,
      date: "12 June • Food"
    },
    {
      id: "tx-6",
      merchant: "City Electric Co.",
      category: "Bills",
      status: "CLEARED",
      amount: -120.00,
      date: "10 June • Bills"
    },
    {
      id: "tx-7",
      merchant: "Netflix Inc.",
      category: "Subscriptions",
      status: "CLEARED",
      amount: -15.49,
      date: "Oct 20, 2023 • 03:00"
    },
    {
      id: "tx-8",
      merchant: "Whole Foods Market",
      category: "Food",
      status: "CLEARED",
      amount: -182.40,
      date: "Oct 19, 2023 • 11:45"
    },
    {
      id: "tx-9",
      merchant: "Subway Transit",
      category: "Transportation",
      status: "CLEARED",
      amount: -2.75,
      date: "Oct 18, 2023 • 08:30"
    }
  ],
  spendingComposition: [
    { name: "Housing & Utilities", percentage: 42, color: "var(--primary-blue)" },
    { name: "Dining & Leisure", percentage: 18, color: "var(--accent-orange)" },
    { name: "Investments", percentage: 25, color: "var(--accent-green)" },
    { name: "Transportation", percentage: 15, color: "var(--accent-yellow)" }
  ],
  portfolio: {
    sentiment: {
      score: 74,
      label: "Optimistic",
      globalEquities: "Bullish",
      fixedIncome: "Neutral",
      volatilityIndex: "Low"
    },
    sectorAllocation: [
      { name: "Technology", percentage: 42 },
      { name: "Financials", percentage: 18 },
      { name: "Healthcare", percentage: 15 },
      { name: "Other", percentage: 25 }
    ],
    velocity: {
      "1M": [
        { name: "Oct 1", portfolio: 1300000, sp500: 1250000 },
        { name: "Oct 5", portfolio: 1340000, sp500: 1260000 },
        { name: "Oct 10", portfolio: 1320000, sp500: 1255000 },
        { name: "Oct 15", portfolio: 1380000, sp500: 1270000 },
        { name: "Oct 20", portfolio: 1410000, sp500: 1285000 },
        { name: "Oct 24", portfolio: 1424902, sp500: 1290000 }
      ],
      "6M": [
        { name: "May", portfolio: 1200000, sp500: 1150000 },
        { name: "Jun", portfolio: 1250000, sp500: 1180000 },
        { name: "Jul", portfolio: 1280000, sp500: 1200000 },
        { name: "Aug", portfolio: 1320000, sp500: 1220000 },
        { name: "Sep", portfolio: 1380000, sp500: 1250000 },
        { name: "Oct", portfolio: 1424902, sp500: 1290000 }
      ],
      "1Y": [
        { name: "Nov 22", portfolio: 1100000, sp500: 1050000 },
        { name: "Jan 23", portfolio: 1150000, sp500: 1080000 },
        { name: "Mar 23", portfolio: 1220000, sp500: 1120000 },
        { name: "May 23", portfolio: 1200000, sp500: 1150000 },
        { name: "Jul 23", portfolio: 1280000, sp500: 1200000 },
        { name: "Sep 23", portfolio: 1380000, sp500: 1250000 },
        { name: "Oct 23", portfolio: 1424902, sp500: 1290000 }
      ],
      "ALL": [
        { name: "2020", portfolio: 800000, sp500: 750000 },
        { name: "2021", portfolio: 1050000, sp500: 980000 },
        { name: "2022", portfolio: 950000, sp500: 900000 },
        { name: "2023", portfolio: 1424902, sp500: 1290000 }
      ]
    },
    performanceMetrics: {
      topPerformer: {
        symbol: "NVDA",
        change: "+8.4%"
      },
      riskLevel: {
        label: "Moderate",
        details: "Balanced"
      }
    }
  },
  budgets: {
    totalBudgetVelocity: 12450.00,
    totalBudgetLimit: 15000.00,
    projectedSurplus: 2550.00,
    savingsEfficiency: 94.2,
    categories: [
      {
        id: "b-1",
        name: "Housing & Rent",
        spent: 3200.00,
        limit: 3200.00,
        status: "FIXED",
        statusType: "info",
        color: "#4f46e5"
      },
      {
        id: "b-2",
        name: "Groceries",
        spent: 642.50,
        limit: 900.00,
        status: "HEALTHY",
        statusType: "success",
        color: "#10b981"
      },
      {
        id: "b-3",
        name: "Entertainment",
        spent: 450.00,
        limit: 500.00,
        status: "CRITICAL",
        statusType: "danger",
        color: "#ef4444"
      },
      {
        id: "b-4",
        name: "Lifestyle",
        spent: 210.00,
        limit: 600.00,
        status: "OPTIMAL",
        statusType: "warning",
        color: "#f59e0b"
      }
    ]
  },
  aiInsights: {
    signals: [
      {
        id: "sig-1",
        title: "Active Signal: Rebalance Priority",
        description: "Your technology exposure has increased by 14.2% since last quarter. Our algorithms suggest shifting 4% of gains into emerging market debt and high-yield real estate to maintain your risk-adjusted profile.",
        confidence: 88,
        actionLabel: "Review Strategy"
      },
      {
        id: "sig-2",
        title: "Optimizing Alpha: Tech-Weighted Strategy",
        description: "We've identified a 4.2% efficiency gap in your fixed-income rotation. Realigning toward sovereign bonds could mitigate the current volatility in your growth bucket.",
        confidence: 92,
        actionLabel: "Review Strategy"
      }
    ],
    cashFlowIntelligence: [
      {
        id: "cf-1",
        type: "surplus",
        title: "Surplus Opportunity",
        description: "You spent 12% less on dining this month. Transfer $450 to your 'Growth' bucket to stay ahead of your 2024 goal."
      },
      {
        id: "cf-2",
        type: "audit",
        title: "Recurring Audit",
        description: "We detected two overlapping streaming subscriptions. Canceling 'Media+' would save you $180 annually."
      },
      {
        id: "cf-3",
        type: "tax",
        title: "Tax-Loss Harvesting",
        description: "3 assets in your legacy portfolio are eligible for tax-loss harvesting. Potential benefit: $2,100."
      }
    ]
  }
};
