const Portfolio = require("../models/Portfolio");
const Watchlist = require("../models/Watchlist");

exports.getDashboardOverview = async (req, res) => {
  try {
    const portfolio = await Portfolio.find({ userId: req.user.id });
    const watchlist = await Watchlist.find({ userId: req.user.id });

    const totalInvested = portfolio.reduce((sum, item) => sum + item.quantity * item.buyPrice, 0);
    const currentValue = totalInvested * 1.08;
    const gain = currentValue - totalInvested;
    const gainPercent = totalInvested ? ((gain / totalInvested) * 100).toFixed(1) : 0;

    res.json({
      overview: {
        totalInvested,
        currentValue,
        gain,
        gainPercent,
        portfolioCount: portfolio.length,
        watchlistCount: watchlist.length,
      },
      portfolio,
      watchlist,
    });
  } catch (error) {
    res.status(500).json({ message: "Unable to load dashboard", error: error.message });
  }
};

exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch portfolio", error: error.message });
  }
};

exports.createPortfolioItem = async (req, res) => {
  const { company, symbol, quantity, buyPrice } = req.body;

  if (!company || !symbol || !quantity || !buyPrice) {
    return res.status(400).json({ message: "Company, symbol, quantity and buy price are required" });
  }

  try {
    const item = await Portfolio.create({
      userId: req.user.id,
      company,
      symbol,
      quantity,
      buyPrice,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: "Unable to add portfolio item", error: error.message });
  }
};

exports.deletePortfolioItem = async (req, res) => {
  try {
    const item = await Portfolio.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!item) {
      return res.status(404).json({ message: "Portfolio item not found" });
    }

    res.json({ message: "Portfolio item removed" });
  } catch (error) {
    res.status(500).json({ message: "Unable to remove portfolio item", error: error.message });
  }
};

exports.getWatchlist = async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(watchlist);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch watchlist", error: error.message });
  }
};

exports.createWatchlistItem = async (req, res) => {
  const { company, symbol } = req.body;

  if (!company || !symbol) {
    return res.status(400).json({ message: "Company and symbol are required" });
  }

  try {
    const item = await Watchlist.create({
      userId: req.user.id,
      company,
      symbol,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: "Unable to add watchlist item", error: error.message });
  }
};

exports.deleteWatchlistItem = async (req, res) => {
  try {
    const item = await Watchlist.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!item) {
      return res.status(404).json({ message: "Watchlist item not found" });
    }

    res.json({ message: "Watchlist item removed" });
  } catch (error) {
    res.status(500).json({ message: "Unable to remove watchlist item", error: error.message });
  }
};
