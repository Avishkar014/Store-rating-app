const prisma = require("../utils/prisma");

// Get all stores with average rating
const getStores = async (req, res) => {
  try {
    const stores = await prisma.store.findMany({
      include: {
        ratings: true
      }
    });

    const result = stores.map(store => {
      const avgRating =
        store.ratings.length === 0
          ? 0
          : (
              store.ratings.reduce((sum, r) => sum + r.value, 0) /
              store.ratings.length
            ).toFixed(1);

      return {
        id: store.id,
        name: store.name,
        address: store.address,
        rating: Number(avgRating)
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Submit or update rating
const rateStore = async (req, res) => {
  try {
    const userId = req.user.id;
    const storeId = parseInt(req.params.storeId);
    const { value } = req.body;

    if (value < 1 || value > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    await prisma.rating.upsert({
      where: {
        userId_storeId: {
          userId,
          storeId
        }
      },
      update: { value },
      create: {
        userId,
        storeId,
        value
      }
    });

    res.json({ message: "Rating submitted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getStores, rateStore };
