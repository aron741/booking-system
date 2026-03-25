const prisma = require("../lib/prisma");

const createAppointment = async (req, res) => {
  try {
    const { availabilityId } = req.body;

    const slot = await prisma.availability.findUnique({
      where: { id: availabilityId },
      include: { appointment: true },
    });

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (slot.appointment) {
      return res.status(400).json({ message: "Already booked" });
    }

    const appointment = await prisma.appointment.create({
      data: {
        userId: req.user.userId,
        availabilityId,
      },
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyAppointments = async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { userId: req.user.userId },
      include: { availability: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        user: true,
        availability: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAppointment,
  getMyAppointments,
  getAllAppointments,
};