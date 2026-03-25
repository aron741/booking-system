const prisma = require("../lib/prisma");

const getAvailability = async (req, res) => {
  try {
    const slots = await prisma.availability.findMany({
      where: { isActive: true, appointment: null },
      orderBy: { date: "asc" },
    });

    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAvailability = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;

    const slot = await prisma.availability.create({
      data: {
        date: new Date(date),
        startTime,
        endTime,
      },
    });

    res.status(201).json(slot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAvailability,
  createAvailability,
};