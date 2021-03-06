import {Router} from 'express';
import {parseISO, startOfHour} from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentsRouter.post('/', (request, response) =>{
  const {provider, date} = request.body;
  console.log(request.body);

  const parsedDate = startOfHour(parseISO(date));
  const findAppointmentInSameDate = appointmentRepository.findByDate(parsedDate);

  if(findAppointmentInSameDate){
    return response
    .status(400)
    .json({message: 'This appointment is already booked'});
  }

  const appointment = appointmentRepository.create(provider, parsedDate);

  return response.json(appointment);
});
export default appointmentsRouter;
