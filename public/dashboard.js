$(document).ready(() => {
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getField(form, fieldName) {
    return $(form).serializeArray().find((field) => field.name === fieldName).value;
  }

  $('.js-retryjob-form').on('submit', function(e) {
    e.preventDefault();

    const jobId = getField(this, 'jobId')
    const queueName = getField(this, 'queueName');

    const r = window.confirm(`Retry job #${jobId} in queue "${queueName}"?`);
    if (r) {
      $.ajax({
        method: 'PATCH',
        url: `/dashboard/${queueName}/${jobId}`
      }).done(() => {
        window.location.reload();
      }).fail((jqXHR, textStatus) => {
        window.alert(`Request failed: ${textStatus}`);
      });
    }
  });

  $('.js-removejob-form').on('submit', function(e) {
    e.preventDefault();

    const jobId = getField(this, 'jobId')
    const queueName = getField(this, 'queueName');
    const jobState = getField(this, 'jobState');

    const r = window.confirm(`Remove job #${jobId} in queue "${queueName}"?`);
    if (r) {
      $.ajax({
        method: 'DELETE',
        url: `/dashboard/${queueName}/${jobId}`
      }).done(() => {
        window.location.href = `/dashboard/${queueName}/${jobState}`;
      }).fail((jqXHR, textStatus) => {
        window.alert(`Request failed: ${textStatus}`);
      });
    }
  });
});
