import express from 'express';
import Machine from '../models/Machine.js';
const router = express.Router();

// GET all machines (with optional filters)
router.get('/', async (req, res) => {
  const { technician, status } = req.query;
  let filter = {};
  if(technician) filter.technician = technician;
  if(status) filter.status = status;
  const machines = await Machine.find(filter);
  res.json(machines);
});

// POST new machine
router.post('/', async (req, res) => {
  const { sn, client, phone, type, brand, technician } = req.body;
  const machine = new Machine({ sn, client, phone, type, brand, technician });
  await machine.save();
  res.json(machine);
});

// PUT mark exit
router.put('/:id/exit', async (req, res) => {
  const machine = await Machine.findById(req.params.id);
  if(!machine) return res.status(404).json({ message: "Machine not found" });
  machine.exit = new Date();
  machine.status = "Out";
  await machine.save();
  res.json(machine);
});

// POST add repair
router.post('/:id/repair', async (req, res) => {
  const { note, tech } = req.body;
  const machine = await Machine.findById(req.params.id);
  if(!machine) return res.status(404).json({ message: "Machine not found" });
  machine.repairs.push({ note, tech: tech || machine.technician });
  await machine.save();
  res.json(machine);
});

export default router;
