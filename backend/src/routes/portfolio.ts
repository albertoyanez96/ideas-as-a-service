import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler } from '../middleware/errorHandler';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const { industry, tier, featured } = req.query;

  const where: any = {};
  
  if (industry) {
    where.industry = { contains: industry as string, mode: 'insensitive' };
  }
  
  if (tier) {
    where.tier = tier as string;
  }
  
  if (featured !== undefined) {
    where.featured = featured === 'true';
  }

  const portfolioItems = await prisma.portfolio.findMany({
    where,
    orderBy: [
      { featured: 'desc' },
      { createdAt: 'desc' }
    ]
  });

  res.json({
    success: true,
    data: portfolioItems
  });
}));

router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const portfolioItem = await prisma.portfolio.findUnique({
    where: { id }
  });

  if (!portfolioItem) {
    return res.status(404).json({
      success: false,
      error: 'Portfolio item not found'
    });
  }

  res.json({
    success: true,
    data: portfolioItem
  });
}));

export default router;