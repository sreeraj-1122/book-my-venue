import express from 'express';
// import userRouter from './user.routes';
// import propertyRouter from './property.routes';
// import reviewRouter from './review.routes';
// import tagRouter from './tag.routes';
import authRouter from './auth.routes';
// import bookingRouter from './booking.routes';
// import paymentRouter from './payment.routes';

const router = express.Router();

router.use('/auth', authRouter);
// router.use('/user', userRouter);
// router.use('/property', propertyRouter);
// router.use('/review', reviewRouter);
// router.use('/tag', tagRouter);
// router.use('/booking', bookingRouter);
// router.use('/payment', paymentRouter);

export default router;
