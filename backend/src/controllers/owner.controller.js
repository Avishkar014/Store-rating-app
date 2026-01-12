const prisma = require("../utils/prisma");

const getMyStoreRatings = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const store = await prisma.store.findUnique({
      where: { ownerId },
      include: {
        ratings: {
          include: {
            user: {
              select: { id: true, name: true, email: true }
            }
          }
        }
      }
    });

    if (!store) {
      return res.status(404).json({ message: "Store not found for this owner" });
    }

    const avgRating =
      store.ratings.length === 0
        ? 0
        : (
            store.ratings.reduce((sum, r) => sum + r.value, 0) /
            store.ratings.length
          ).toFixed(1);

    const users = store.ratings.map(r => ({
      userId: r.user.id,
      name: r.user.name,
      email: r.user.email,
      rating: r.value
    }));

    res.json({
      storeName: store.name,
      averageRating: Number(avgRating),
      ratings: users
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getMyStoreRatings };
