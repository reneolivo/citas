var app = require('../../server/server');

module.exports = function(Professional) {
  Professional.observe('loaded', (context, next) => {
    appendFutureAppointmentsCount(context).then(
      () => next(),
      (error) => next(error)
    );
  });
};

function appendFutureAppointmentsCount(context) {
  var professional = context.data;

  if (!professional) return Promise.resolve();

  return app.models.Availability.find({
    where: { professionalId: professional.id }
  })
  .then((results) => results.map((r) => r.id))
  .then((ids) => {
    return app.models.Appointment.find({ // count is not working
      where: {
        date: { gt: new Date() },
        availabilityId: { inq: ids }
      }
    });
  })
  .then((results) => {
    professional.futureAppointmentsCount = results.length;
  });
}
