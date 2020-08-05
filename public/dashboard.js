$(document).ready(() => {
  const basePath = $('#basePath').val();

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Set up individual "retry job" handler
  $('.js-retry-job').on('click', function (e) {
    e.preventDefault();
    $(this).prop('disabled', true);

    const jobId = $(this).data('job-id');
    const queueName = $(this).data('queue-name');
    const queueHost = $(this).data('queue-host');

    const r = window.confirm(`Retry job #${jobId} in queue "${queueHost}/${queueName}"?`);
    if (r) {
      $.ajax({
        method: 'PATCH',
        url: `${basePath}/api/queue/${encodeURIComponent(queueHost)}/${encodeURIComponent(
          queueName
        )}/job/${encodeURIComponent(jobId)}`,
      })
        .done(() => {
          window.location.reload();
        })
        .fail((jqXHR) => {
          window.alert(`Request failed, check console for error.`);
          console.error(jqXHR.responseText);
        });
    } else {
      $(this).prop('disabled', false);
    }
  });

  // Set up individual "remove job" handler
  $('.js-remove-job').on('click', function (e) {
    e.preventDefault();
    $(this).prop('disabled', true);

    const jobId = $(this).data('job-id');
    const queueName = $(this).data('queue-name');
    const queueHost = $(this).data('queue-host');
    const jobState = $(this).data('job-state');

    const r = window.confirm(`Remove job #${jobId} in queue "${queueHost}/${queueName}"?`);
    if (r) {
      $.ajax({
        method: 'DELETE',
        url: `${basePath}/api/queue/${encodeURIComponent(queueHost)}/${encodeURIComponent(
          queueName
        )}/job/${encodeURIComponent(jobId)}`,
      })
        .done(() => {
          window.location.href = `${basePath}/${encodeURIComponent(queueHost)}/${encodeURIComponent(
            queueName
          )}/${jobState}`;
        })
        .fail((jqXHR) => {
          window.alert(`Request failed, check console for error.`);
          console.error(jqXHR.responseText);
        });
    } else {
      $(this).prop('disabled', false);
    }
  });

  // Set up "select all jobs" button handler
  $('.js-select-all-jobs').change(function () {
    const $jobBulkCheckboxes = $('.js-bulk-job');
    $jobBulkCheckboxes.prop('checked', this.checked);
  });

  // Set up "shift-click" multiple checkbox selection handler
  (function () {
    // https://stackoverflow.com/questions/659508/how-can-i-shift-select-multiple-checkboxes-like-gmail
    let lastChecked = null;
    let $jobBulkCheckboxes = $('.js-bulk-job');
    $jobBulkCheckboxes.click(function (e) {
      if (!lastChecked) {
        lastChecked = this;
        return;
      }

      if (e.shiftKey) {
        let start = $jobBulkCheckboxes.index(this);
        let end = $jobBulkCheckboxes.index(lastChecked);

        $jobBulkCheckboxes
          .slice(Math.min(start, end), Math.max(start, end) + 1)
          .prop('checked', lastChecked.checked);
      }

      lastChecked = this;
    });
  })();

  // Set up bulk actions handler
  $('.js-bulk-action').on('click', function (e) {
    $(this).prop('disabled', true);

    const $bulkActionContainer = $('.js-bulk-action-container');
    const action = $(this).data('action');
    const queueName = $(this).data('queue-name');
    const queueHost = $(this).data('queue-host');
    const queueState = $(this).data('queue-state');

    let data = {
      queueName,
      action: 'remove',
      jobs: [],
    };

    $bulkActionContainer.each((index, value) => {
      const isChecked = $(value).find('[name=jobChecked]').is(':checked');
      const id = encodeURIComponent($(value).find('[name=jobId]').val());

      if (isChecked) {
        data.jobs.push(id);
      }
    });

    const r = window.confirm(
      `${capitalize(action)} ${data.jobs.length} ${
        data.jobs.length > 1 ? 'jobs' : 'job'
      } in queue "${queueHost}/${queueName}"?`
    );
    if (r) {
      $.ajax({
        method: action === 'remove' ? 'POST' : 'PATCH',
        url: `${basePath}/api/queue/${encodeURIComponent(queueHost)}/${encodeURIComponent(
          queueName
        )}/job/bulk`,
        data: JSON.stringify(data),
        contentType: 'application/json',
      })
        .done(() => {
          window.location.reload();
        })
        .fail((jqXHR) => {
          window.alert(`Request failed, check console for error.`);
          console.error(jqXHR.responseText);
        });
    } else {
      $(this).prop('disabled', false);
    }
  });

  $('.js-toggle-add-job-editor').on('click', function () {
    $('.jsoneditorx').toggleClass('hide');
    const job = localStorage.getItem('arena:savedJob');
    if (job) {
      const { name, data } = JSON.parse(job);
      window.jsonEditor.set(data);
      $('input.js-add-job-name').val(name);
    } else {
      window.jsonEditor.set({ id: '' });
    }
  });

  $('.js-add-job').on('click', function () {
    const name = $('input.js-add-job-name').val() || null;
    const data = window.jsonEditor.get();
    const job = JSON.stringify({ name, data });
    localStorage.setItem('arena:savedJob', job);
    const { queueHost, queueName } = window.arenaInitialPayload;
    $.ajax({
      url: `${basePath}/api/queue/${encodeURIComponent(queueHost)}/${encodeURIComponent(
        queueName
      )}/job`,
      type: 'POST',
      data: job,
      contentType: 'application/json',
    })
      .done(() => {
        alert('Job successfully added!');
        localStorage.removeItem('arena:savedJob');
      })
      .fail((jqXHR) => {
        window.alert('Failed to save job, check console for error.');
        console.error(jqXHR.responseText);
      });
  });
});
