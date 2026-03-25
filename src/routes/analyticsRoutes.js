const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getMoodTrend,
  getTags,
  getSummary,
} = require("../controllers/analyticsController");
const { generateWeeklySummary } = require("../jobs/weeklySummary"); // cron job function

router.use(protect);

router.get("/mood-trend", getMoodTrend);
router.get("/tags", getTags);
router.get("/summary", getSummary);

// manual trigger endpoint for demonstration purposes
router.post("/trigger-cron", async (req, res) => {
  try {
    await generateWeeklySummary();
    res.json({ message: "Weekly summary job executed successfully." });
  } catch (error) {
    res.status(500).json({ message: "Job failed" });
  }
});

module.exports = router;
