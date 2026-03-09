import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { Priority } from "../../src/generated/prisma";
//Priority is an Enum that Prisma auto-generates from schema.prisma file.

//Get all
export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { masterId } = req.query;
    const details = await prisma.listDetails.findMany({
          where: masterId ? { listMasterId: parseInt(masterId as string) } : {},
          orderBy: { createdAt: "desc" },
          include: { listMaster: true }
    });
    res.json({ success: true, data: details });
  } catch (error) {
    next(error);
  }
};

// GET single detail by ID
export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);
    const detail = await prisma.listDetails.findUnique({
      where: { id },
      include: { listMaster: true },
    });
    if (!detail) {
      res.status(404).json({ success: false, error: "ListDetails not found" });
      return;
    }
    res.json({ success: true, data: detail });
  } catch (error) {
    next(error);
  }
};

// POST create
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description, priority, dueDate, listMasterId } = req.body;

    if (!title || !listMasterId) {
      res.status(400).json({
        success: false,
        error: "title and listMasterId are required",
      });
      return;
    }

    const detail = await prisma.listDetails.create({
      data: {
        title,
        description,
        priority: priority as Priority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        listMasterId: parseInt(listMasterId),
      },
    });
    res.status(201).json({ success: true, data: detail });
  } catch (error) {
    next(error);
  }
};

// PUT update
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);
    const { title, description, completed, priority, dueDate } = req.body;

    const detail = await prisma.listDetails.update({
      where: { id },
      data: {
        title,
        description,
        completed,
        priority: priority as Priority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      },
    });
    res.json({ success: true, data: detail });
  } catch (error) {
    next(error);
  }
};

// PATCH toggle completed
export const toggleComplete = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);
    const existing = await prisma.listDetails.findUnique({ where: { id } });

    if (!existing) {
      res.status(404).json({ success: false, error: "Record not found" });
      return;
    }

    const updated = await prisma.listDetails.update({
      where: { id },
      data: { completed: !existing.completed },
    });
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// DELETE single
export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);
    await prisma.listDetails.delete({ where: { id } });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// DELETE all by masterId
export const removeAllByMaster = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { masterId } = req.params;
    await prisma.listDetails.deleteMany({
      where: { listMasterId: parseInt(masterId as string) },
    });
    res.status(200).json({ success: true, message: "All details deleted" });
  } catch (error) {
    next(error);
  }
};
