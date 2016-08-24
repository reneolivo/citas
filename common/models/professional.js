var app = require('../../server/server');
var moment = require('moment');

module.exports = function(Professional) {
  Professional.observe('loaded', (context) => {
    return appendTodaysAppointmentCount(context.instance);
  });
};

function appendTodaysAppointmentCount(professional) {
  if (!professional) return Promise.resolve();

  return app.models.Availability.find({
    where: { professionalId: professional.id }
  })
  .then((results) => results.map((r) => r.id))
  .then((ids) => {
    var todayStarts = moment().startOf('day').toDate();
    var todayEnds = moment().endOf('day').toDate();

    return app.models.Appointment.find({ // count is not working
      where: {
        date: { between: [ todayStarts, todayEnds ] },
        availabilityId: { inq: ids }
      }
    });
  })
  .then((results) => {
    professional.todaysAppointmentCount = results.length;
  });
}
