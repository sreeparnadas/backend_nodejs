import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

// GET all list masters
export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const lists = await prisma.listMaster.findMany({
      orderBy: { createdAt: "desc" },
      include: { details: true },
    });
    res.json({ success: true, data: lists });
  } catch (error) {
    next(error);
  }
};


// GET single list master by ID
export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);
    const list = await prisma.listMaster.findUnique({
      where: { id },
      include: { details: true },
    });
    if (!list) {
      res.status(404).json({ success: false, error: "ListMaster not found" });
      return;
    }
    res.json({ success: true, data: list });
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
    const { title, description, color } = req.body;

    if (!title) {
      res.status(400).json({ success: false, error: "Title is required" });
      return;
    }

    const list = await prisma.listMaster.create({
      data: { title, description, color },
    });
    res.status(201).json({ success: true, data: list });
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
    const { title, description, color, isArchived } = req.body;

    const list = await prisma.listMaster.update({
      where: { id },
      data: { title, description, color, isArchived },
    });
    res.json({ success: true, data: list });
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
    await prisma.listMaster.delete({ where: { id } });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// DELETE all
export const removeAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await prisma.listMaster.deleteMany({});
    res.status(200).json({ success: true, message: "All records deleted" });
  } catch (error) {
    next(error);
  }
};