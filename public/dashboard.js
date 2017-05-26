$(document).ready(() => {
  $('.js-retryjob-form').on('submit', function(e) {
    e.preventDefault();

    const jobId = $(this).serializeArray().find((field) => field.name === 'jobId').value;
    const queueName = $(this).serializeArray().find((field) => field.name === 'queueName').value;

    const r = window.confirm(`Retry job #${jobId} in queue "${queueName}"?`);
    if (r) {
      $.ajax({
        method: 'PATCH',
        url: `/dashboard/${queueName}/${jobId}/retry`
      }).done(() => {
        window.location.reload();
      }).fail((jqXHR, textStatus) => {
        window.alert(`Request failed: ${textStatus}`);
      });
    }
  });
});
