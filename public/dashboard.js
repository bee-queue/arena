$(document).ready(() => {
  const basePath = $('#basePath').val();

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function formatToTreeView(flow, flowHost) {
    const {job, children} = flow;
    const text = `${job.name} <a href="${basePath}/${encodeURIComponent(
      flowHost
    )}/${encodeURIComponent(job.queueName)}/${
      job.id
    }"><span class="label label-default">${job.id}</span></a>`;

    const href = `${basePath}/${encodeURIComponent(
      flowHost
    )}/${encodeURIComponent(job.queueName)}/${job.id}`;

    if (children && children.length > 0) {
      return {
        text,
        nodes: children.map((child) => formatToTreeView(child, flowHost)),
      };
    } else {
      return {
        text,
      };
    }
  }

  // Set up individual "retry job" handler
  $('.js-retry-job').on('click', function (e) {
    e.preventDefault();
    $(this).prop('disabled', true);

    const jobId = $(this).data('job-id');
    const queueName = $(this).data('queue-name');
    const queueHost = $(this).data('queue-host');

    const r = window.confirm(
      `Retry job #${jobId} in queue "${queueHost}/${queueName}"?`
    );
    if (r) {
      $.ajax({
        method: 'PATCH',
        url: `${basePath}/api/queue/${encodeURIComponent(
          queueHost
        )}/${encodeURIComponent(queueName)}/job/${encodeURIComponent(jobId)}`,
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

  // Set up individual "promote job" handler
  $('.js-promote-job').on('click', function (e) {
    e.preventDefault();
    $(this).prop('disabled', true);

    const jobId = $(this).data('job-id');
    const queueName = $(this).data('queue-name');
    const queueHost = $(this).data('queue-host');

    const r = window.confirm(
      `Promote job #${jobId} in queue "${queueHost}/${queueName}"?`
    );
    if (r) {
      $.ajax({
        method: 'PATCH',
        url: `${basePath}/api/queue/${encodeURIComponent(
          queueHost
        )}/${encodeURIComponent(queueName)}/delayed/job/${encodeURIComponent(
          jobId
        )}`,
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

    const r = window.confirm(
      `Remove job #${jobId} in queue "${queueHost}/${queueName}"?`
    );
    if (r) {
      $.ajax({
        method: 'DELETE',
        url: `${basePath}/api/queue/${encodeURIComponent(
          queueHost
        )}/${encodeURIComponent(queueName)}/job/${encodeURIComponent(jobId)}`,
      })
        .done(() => {
          window.location.href = `${basePath}/${encodeURIComponent(
            queueHost
          )}/${encodeURIComponent(queueName)}/${jobState}`;
        })
        .fail((jqXHR) => {
          window.alert(`Request failed, check console for error.`);
          console.error(jqXHR.responseText);
        });
    } else {
      $(this).prop('disabled', false);
    }
  });

  // Set up individual "remove repeatable job" handler
  $('.js-remove-repeatable-job').on('click', function (e) {
    e.preventDefault();
    $(this).prop('disabled', true);

    const jobId = $(this).data('job-id');
    const queueName = $(this).data('queue-name');
    const queueHost = $(this).data('queue-host');
    const jobState = $(this).data('job-state');

    const confirmationResponse = window.confirm(
      `Remove repeatable job #${jobId} in queue "${queueHost}/${queueName}"?`
    );
    if (confirmationResponse) {
      $.ajax({
        method: 'DELETE',
        url: `${basePath}/api/queue/${encodeURIComponent(
          queueHost
        )}/${encodeURIComponent(queueName)}/repeatable/job/${encodeURIComponent(
          jobId
        )}`,
      })
        .done(() => {
          window.location.href = `${basePath}/${encodeURIComponent(
            queueHost
          )}/${encodeURIComponent(queueName)}/${jobState}`;
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
      action,
      jobs: [],
      queueState,
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
        url: `${basePath}/api/queue/${encodeURIComponent(
          queueHost
        )}/${encodeURIComponent(queueName)}/${
          action === 'promote' ? 'delayed/' : ''
        }job/bulk`,
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
    const addJobText = $('.js-toggle-add-job-editor').text();
    const shouldNotHide = addJobText === 'Add Job';
    const newAddJobText = shouldNotHide ? 'Cancel' : 'Add Job';
    $('.jsoneditorx').toggleClass('hide', !shouldNotHide);
    $('.js-toggle-add-job-editor').text(newAddJobText);

    const job = localStorage.getItem('arena:savedJob');
    if (job) {
      const {name, data} = JSON.parse(job);
      window.jsonEditor.set(data);
      $('input.js-add-job-name').val(name);
    } else {
      window.jsonEditor.set({id: ''});
    }
  });

  $('.js-toggle-add-flow-editor').on('click', function () {
    const addFlowText = $('.js-toggle-add-flow-editor').text();
    const shouldNotHide = addFlowText === 'Add Flow';
    const newAddFlowText = shouldNotHide ? 'Cancel Add' : 'Add Flow';
    $('.jsoneditorx').toggleClass('hide', !shouldNotHide);
    $('.js-toggle-add-flow-editor').text(newAddFlowText);

    const flow = localStorage.getItem('arena:savedFlow');
    if (flow) {
      const {data} = JSON.parse(flow);
      window.jsonEditor.set(data);
    } else {
      window.jsonEditor.set({});
    }
  });

  $('.js-toggle-search-flow').on('click', function () {
    const searchFlowText = $('.js-toggle-search-flow').text();
    const shouldNotHide = searchFlowText === 'Search Flow';
    const newSearchFlowText = shouldNotHide ? 'Cancel Search' : 'Search Flow';
    $('.searchflowx').toggleClass('hide', !shouldNotHide);
    $('.js-toggle-search-flow').text(newSearchFlowText);
  });

  $('.js-add-job').on('click', function () {
    const name = $('input.js-add-job-name').val() || null;
    const data = window.jsonEditor.get();
    const job = JSON.stringify({name, data});
    localStorage.setItem('arena:savedJob', job);
    const {queueHost, queueName} = window.arenaInitialPayload;
    $.ajax({
      url: `${basePath}/api/queue/${encodeURIComponent(
        queueHost
      )}/${encodeURIComponent(queueName)}/job`,
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

  $('.js-add-flow').on('click', function () {
    const data = window.jsonEditor.get();
    const flow = JSON.stringify({data});
    localStorage.setItem('arena:savedFlow', flow);
    const {flowHost, connectionName} = window.arenaInitialPayload;
    $.ajax({
      url: `${basePath}/api/flow/${encodeURIComponent(
        flowHost
      )}/${encodeURIComponent(connectionName)}/flow`,
      type: 'POST',
      data: flow,
      contentType: 'application/json',
    })
      .done((res) => {
        const flowTree = formatToTreeView(res, flowHost);
        alert('Flow successfully added!');
        localStorage.removeItem('arena:savedFlow');
        $('#tree').treeview({data: [flowTree], enableLinks: true});
        $('.js-tree').toggleClass('hide', false);
      })
      .fail((jqXHR) => {
        window.alert('Failed to save flow, check console for error.');
        console.error(jqXHR.responseText);
      });
  });

  $('.js-search-flow').on('click', function (e) {
    e.preventDefault();
    const queueName = $('#queue-name-input-search').val();
    const jobId = $('#job-id-input-search').val();
    const depth = $('#depth-input-search').val();
    const maxChildren = $('#max-children-input-search').val();

    const {flowHost, connectionName} = window.arenaInitialPayload;

    $.ajax({
      url: `${basePath}/api/flow/${encodeURIComponent(
        flowHost
      )}/${encodeURIComponent(
        connectionName
      )}/flow?jobId=${jobId}&queueName=${queueName}&depth=${depth}&maxChildren=${maxChildren}`,
      type: 'GET',
      contentType: 'application/json',
    })
      .done((res) => {
        const flowTree = formatToTreeView(res, flowHost);
        alert('Flow info successfully fetched!');
        $('#tree').treeview({data: [flowTree], enableLinks: true});
        $('.js-tree').toggleClass('hide', false);
      })
      .fail((jqXHR) => {
        window.alert('Failed to get flow info, check console for error.');
        console.error(jqXHR.responseText);
      });
  });

  $('.js-pause-queue').on('click', function (e) {
    e.preventDefault();
    $(this).prop('disabled', true);
    const queueName = $(this).data('queue-name');
    const queueHost = $(this).data('queue-host');

    const response = window.confirm(
      `Are you sure you want to pause the queue "${queueHost}/${queueName}"?`
    );
    if (response) {
      $.ajax({
        method: 'PUT',
        url: `${basePath}/api/queue/${encodeURIComponent(
          queueHost
        )}/${encodeURIComponent(queueName)}/pause`,
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

  $('.js-resume-queue').on('click', function (e) {
    e.preventDefault();
    const queueName = $(this).data('queue-name');
    const queueHost = $(this).data('queue-host');

    const response = window.confirm(
      `Are you sure you want to resume the queue "${queueHost}/${queueName}"?`
    );
    if (response) {
      $.ajax({
        method: 'PUT',
        url: `${basePath}/api/queue/${encodeURIComponent(
          queueHost
        )}/${encodeURIComponent(queueName)}/resume`,
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
});
