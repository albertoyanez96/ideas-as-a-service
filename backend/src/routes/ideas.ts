import express, { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', authenticate, asyncHandler(async (req: AuthRequest, res: Response) => {
  const { title, description, industry, targetAudience, tier } = req.body;

  if (!title || !description || !industry || !tier) {
    throw createError('Title, description, industry, and tier are required', 400);
  }

  const tierPrices = {
    VALIDATION: 499,
    BLUEPRINT: 2999,
    LAUNCH_READY: 9999,
    ENTERPRISE: 25000
  };

  const idea = await prisma.idea.create({
    data: {
      title,
      description,
      industry,
      targetAudience,
      tier,
      price: tierPrices[tier as keyof typeof tierPrices],
      userId: req.user!.id,
    },
    include: {
      user: {
        select: { id: true, name: true, email: true, role: true }
      }
    }
  });

  res.status(201).json({
    success: true,
    data: idea
  });
}));

router.get('/', authenticate, asyncHandler(async (req: AuthRequest, res: Response) => {
  const where = req.user!.role === 'ADMIN' ? {} : { userId: req.user!.id };

  const ideas = await prisma.idea.findMany({
    where,
    include: {
      user: {
        select: { id: true, name: true, email: true, role: true }
      },
      deliverables: true,
      payments: true,
      _count: {
        select: { messages: true, files: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  res.json({
    success: true,
    data: ideas
  });
}));

router.get('/:id', authenticate, asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const idea = await prisma.idea.findUnique({
    where: { id },
    include: {
      user: {
        select: { id: true, name: true, email: true, role: true }
      },
      deliverables: true,
      payments: true,
      files: true,
      messages: {
        orderBy: { createdAt: 'asc' }
      }
    }
  });

  if (!idea) {
    throw createError('Idea not found', 404);
  }

  if (req.user!.role !== 'ADMIN' && idea.userId !== req.user!.id) {
    throw createError('Access denied', 403);
  }

  res.json({
    success: true,
    data: idea
  });
}));

router.put('/:id/status', authenticate, requireAdmin, asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['SUBMITTED', 'IN_REVIEW', 'IN_PROGRESS', 'COMPLETED', 'DELIVERED', 'CANCELLED'];
  if (!validStatuses.includes(status)) {
    throw createError('Invalid status', 400);
  }

  const idea = await prisma.idea.update({
    where: { id },
    data: { status },
    include: {
      user: {
        select: { id: true, name: true, email: true, role: true }
      },
      deliverables: true
    }
  });

  res.json({
    success: true,
    data: idea
  });
}));

export default router;