$(document).ready(() => {
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getField($form, fieldName) {
    return $form.serializeArray().find((field) => field.name === fieldName).value;
  }

  // Set up individual "retry job" handler
  $('.js-retry-job').on('click', function(e) {
    e.preventDefault();

    const jobId = getField($(this).closest('.js-individual-action'), 'jobId')
    const queueName = getField($(this).closest('.js-individual-action'), 'queueName');

    const r = window.confirm(`Retry job #${jobId} in queue "${queueName}"?`);
    if (r) {
      $.ajax({
        method: 'PATCH',
        url: `/dashboard/${queueName}/${jobId}`
      }).done(() => {
        window.location.reload();
      }).fail((jqXHR) => {
        window.alert(`Request failed, check console for error.`);
        console.error(jqXHR.responseText);
      });
    }
  });

  // Set up individual "remove job" handler
  $('.js-remove-job').on('click', function(e) {
    e.preventDefault();

    const jobId = getField($(this).closest('.js-individual-action'), 'jobId')
    const queueName = getField($(this).closest('.js-individual-action'), 'queueName');
    const jobState = getField($(this).closest('.js-individual-action'), 'jobState');

    const r = window.confirm(`Remove job #${jobId} in queue "${queueName}"?`);
    if (r) {
      $.ajax({
        method: 'DELETE',
        url: `/dashboard/${queueName}/${jobId}`
      }).done(() => {
        window.location.href = `/dashboard/${queueName}/${jobState}`;
      }).fail((jqXHR) => {
        window.alert(`Request failed, check console for error.`);
        console.error(jqXHR.responseText);
      });
    }
  });

  // Set up "select all jobs" button handler
  $('.js-select-all-jobs').change(function() {
    const $jobBulkCheckboxes = $('.js-bulk-job');
    $jobBulkCheckboxes.prop('checked', this.checked);
  });

  // Set up "shift-click" multiple checkbox selection handler
  (function() {
    // https://stackoverflow.com/questions/659508/how-can-i-shift-select-multiple-checkboxes-like-gmail
    let lastChecked = null;
    let $jobBulkCheckboxes = $('.js-bulk-job');
    $jobBulkCheckboxes.click(function(e) {
      if (!lastChecked) {
        lastChecked = this;
        return;
      }

      if (e.shiftKey) {
        let start = $jobBulkCheckboxes.index(this);
        let end = $jobBulkCheckboxes.index(lastChecked);

        $jobBulkCheckboxes.slice(
          Math.min(start, end),
          Math.max(start, end) + 1
        ).prop('checked', lastChecked.checked);
      }

      lastChecked = this;
    });
  })();

  // Set up bulk "remove job" handler
  $('.js-remove-jobs').on('click', function(e) {
    $(this).prop('disabled', true);

    const queueName = $('.js-queue-name').val();
    const queueState = $('.js-queue-state').val();
    const $jobBulkCheckboxesForm = $('.js-bulk-job-form');

    let data = {queueName, action: 'remove', jobsToRemove: []};
    $('.js-bulk-job-container').each((index, value) => {
      const isChecked = $(value).find('[name=jobChecked]').is(':checked');
      const id = parseInt($(value).find('[name=jobId]').val(), 10);

      if (isChecked) {
        data.jobsToRemove.push(id);
      }
    });

    $.post({
      url: `/dashboard/${queueName}/${queueState}/bulk`,
      data: JSON.stringify(data),
      contentType: 'application/json'
    }).done(() => {
      window.location.reload();
    }).fail((jqXHR) => {
      window.alert(`Request failed, check console for error.`);
      console.error(jqXHR.responseText);
    });
  });
});
