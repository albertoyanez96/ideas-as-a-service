import express, { Response } from 'express';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

router.post('/create-intent', authenticate, asyncHandler(async (req: AuthRequest, res: Response) => {
  const { ideaId } = req.body;

  if (!ideaId) {
    throw createError('Idea ID is required', 400);
  }

  const idea = await prisma.idea.findUnique({
    where: { id: ideaId }
  });

  if (!idea) {
    throw createError('Idea not found', 404);
  }

  if (idea.userId !== req.user!.id) {
    throw createError('Access denied', 403);
  }

  const existingPayment = await prisma.payment.findFirst({
    where: {
      ideaId,
      status: 'COMPLETED'
    }
  });

  if (existingPayment) {
    throw createError('This idea has already been paid for', 400);
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(idea.price * 100), // Convert to cents
    currency: 'usd',
    metadata: {
      ideaId: idea.id,
      userId: req.user!.id
    }
  });

  const payment = await prisma.payment.create({
    data: {
      amount: idea.price,
      currency: 'usd',
      stripePaymentId: paymentIntent.id,
      userId: req.user!.id,
      ideaId: idea.id,
      status: 'PENDING'
    }
  });

  res.json({
    success: true,
    data: {
      clientSecret: paymentIntent.client_secret,
      paymentId: payment.id
    }
  });
}));

router.post('/confirm', authenticate, asyncHandler(async (req: AuthRequest, res: Response) => {
  const { paymentIntentId } = req.body;

  if (!paymentIntentId) {
    throw createError('Payment intent ID is required', 400);
  }

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (paymentIntent.status === 'succeeded') {
    const payment = await prisma.payment.update({
      where: { stripePaymentId: paymentIntentId },
      data: { status: 'COMPLETED' }
    });

    await prisma.idea.update({
      where: { id: payment.ideaId },
      data: { status: 'IN_REVIEW' }
    });

    res.json({
      success: true,
      data: { payment }
    });
  } else {
    throw createError('Payment not completed', 400);
  }
}));

router.get('/history', authenticate, asyncHandler(async (req: AuthRequest, res: Response) => {
  const payments = await prisma.payment.findMany({
    where: { userId: req.user!.id },
    include: {
      idea: {
        select: { id: true, title: true, tier: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  res.json({
    success: true,
    data: payments
  });
}));

export default router;