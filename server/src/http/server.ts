import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'

import { registerBusiness } from './routes/register-business'
import { registerClient } from './routes/register-client'
import { sendAuthenticationLink } from './routes/send-authentication-link'
import { createAppointment } from './routes/create-appointment'
import { approveAppointment } from './routes/approve-appointment'
import { cancelAppointment } from './routes/cancel-appointment'
import { getAppointments } from './routes/get-appointments'
import { createEvaluation } from './routes/create-evaluation'
import { getEvaluations } from './routes/get-evaluations'
import { updateServicesProvided } from './routes/update-services-provided'
import { updateProfile } from './routes/update-profile'
import { authentication } from './authentication'
import { getProfile } from './routes/get-profile'
import { authenticateFromLink } from './routes/authenticate-from-link'
import { getRepresentedBusiness } from './routes/get-represented-business'
import { signOut } from './routes/sign-out'
import { getAppointmentDetails } from './routes/get-appointment-details'
import { getMonthlyRevenue } from './routes/get-monthly-revenue'
import { getAppointmentAmountThisMonth } from './routes/get-appointment-amount-month'
import { getAppointmentAmountToday } from './routes/get-appointment-amount-today'
import { getCanceledAppointmentsInMonth } from './routes/get-canceled-appointments-in-month'
import { getDailyRevenue } from './routes/get-daily-revenue'
import { getPopularServices } from './routes/get-popular-services'
import { makePaymentForAppointment } from './routes/make-payment-for-appointment'
import { completeAppointment } from './routes/complete-appointment'

const app = new Elysia()
  .use(
    cors({
      credentials: true,
      allowedHeaders: ['content-type'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
      origin: (request): boolean => {
        const origin = request.headers.get('origin')

        if (!origin) {
          return false
        }

        return true
      },
    }),
  )
  .use(authentication)
  .use(signOut)
  .use(getProfile)
  .use(getRepresentedBusiness)
  .use(registerBusiness)
  .use(registerClient)
  .use(sendAuthenticationLink)
  .use(authenticateFromLink)
  .use(createAppointment)
  .use(approveAppointment)
  .use(cancelAppointment)
  .use(makePaymentForAppointment)
  .use(completeAppointment)
  .use(getAppointments)
  .use(getAppointmentDetails)
  .use(createEvaluation)
  .use(getEvaluations)
  .use(updateServicesProvided)
  .use(updateProfile)
  .use(getMonthlyRevenue)
  .use(getAppointmentAmountThisMonth)
  .use(getAppointmentAmountToday)
  .use(getCanceledAppointmentsInMonth)
  .use(getDailyRevenue)
  .use(getPopularServices)

app.listen(3333)

console.log(
  `🔥 HTTP server running at ${app.server?.hostname}:${app.server?.port}`,
)
