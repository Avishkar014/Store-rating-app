const prisma = require("../utils/prisma");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;

    const exists = await prisma.user.findUnique({
      where: { email }
    });

    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        address,
        password: hashedPassword,
        role
      }
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    await prisma.store.create({
      data: {
        name,
        email,
        address,
        ownerId
      }
    });

    res.status(201).json({ message: "Store created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalStores = await prisma.store.count();
    const totalRatings = await prisma.rating.count();

    res.json({
      totalUsers,
      totalStores,
      totalRatings
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true
      }
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllStores = async (req, res) => {
  try {
    const stores = await prisma.store.findMany({
      include: { ratings: true }
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
        email: store.email,
        address: store.address,
        rating: Number(avgRating)
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  createStore,
  getDashboardStats,
  getAllUsers,
  getAllStores
};
