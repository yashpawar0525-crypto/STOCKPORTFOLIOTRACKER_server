const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getDashboardOverview,
  getPortfolio,
  createPortfolioItem,
  deletePortfolioItem,
  getWatchlist,
  createWatchlistItem,
  deleteWatchlistItem,
} = require("../controllers/dashboardController");

router.get("/overview", auth, getDashboardOverview);
router.get("/portfolio", auth, getPortfolio);
router.post("/portfolio", auth, createPortfolioItem);
router.delete("/portfolio/:id", auth, deletePortfolioItem);
router.get("/watchlist", auth, getWatchlist);
router.post("/watchlist", auth, createWatchlistItem);
router.delete("/watchlist/:id", auth, deleteWatchlistItem);

module.exports = router;
