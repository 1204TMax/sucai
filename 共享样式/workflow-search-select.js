(function() {
  if (window.CCWorkflowSearchSelect) return;

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function(ch) {
      return ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[ch];
    });
  }

  function render(container, config) {
    if (!container) return;
    var options = Array.from(new Set(config.options || [])).filter(Boolean);
    var value = config.value || '';
    var label = value || config.emptyLabel || '全部工作流';
    container.innerHTML = '<div class="workflow-search-control">'
      + '<button class="workflow-search-trigger" type="button" title="' + esc(label) + '">' + esc(label) + '</button>'
      + '<div class="workflow-search-popup">'
      + '<input class="workflow-search-input" type="search" placeholder="搜索工作流名称">'
      + '<div class="workflow-search-options">'
      + '<button class="workflow-search-option' + (!value ? ' active' : '') + '" type="button" data-value="">全部工作流</button>'
      + options.map(function(name) {
        return '<button class="workflow-search-option' + (name === value ? ' active' : '') + '" type="button" data-value="' + esc(name) + '" data-search="' + esc(name.toLowerCase()) + '">' + esc(name) + '</button>';
      }).join('')
      + '<div class="workflow-search-empty" hidden>没有匹配的工作流</div>'
      + '</div></div></div>';

    var control = container.querySelector('.workflow-search-control');
    var trigger = container.querySelector('.workflow-search-trigger');
    var popup = container.querySelector('.workflow-search-popup');
    var input = container.querySelector('.workflow-search-input');
    var empty = container.querySelector('.workflow-search-empty');

    trigger.addEventListener('click', function(event) {
      event.stopPropagation();
      control.classList.toggle('open');
      if (control.classList.contains('open')) setTimeout(function() { input.focus(); }, 0);
    });
    popup.addEventListener('click', function(event) { event.stopPropagation(); });
    input.addEventListener('input', function() {
      var query = input.value.trim().toLowerCase();
      var visible = 0;
      container.querySelectorAll('.workflow-search-option').forEach(function(option, index) {
        var show = index === 0 || !query || (option.dataset.search || '').includes(query);
        option.hidden = !show;
        if (show && index > 0) visible += 1;
      });
      empty.hidden = visible > 0 || !query;
    });
    container.querySelectorAll('.workflow-search-option').forEach(function(option) {
      option.addEventListener('click', function() {
        control.classList.remove('open');
        if (typeof config.onChange === 'function') config.onChange(option.dataset.value || '');
      });
    });
  }

  document.addEventListener('click', function() {
    document.querySelectorAll('.workflow-search-control.open').forEach(function(control) {
      control.classList.remove('open');
    });
  });
  document.addEventListener('keydown', function(event) {
    if (event.key !== 'Escape') return;
    document.querySelectorAll('.workflow-search-control.open').forEach(function(control) {
      control.classList.remove('open');
    });
  });

  window.CCWorkflowSearchSelect = { render: render };
})();
