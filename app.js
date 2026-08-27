const STORAGE_KEY = 'nimble-pilot-workspace-v3';
const TODAY_KEY = '2026-08-26';
const DEMO_TODAY = new Date(`${TODAY_KEY}T12:00:00`);
const PEOPLE = ['Spencer', 'Alex Morgan', 'Sam Patel', 'Jordan Lee'];
const SAMPLE_EMAIL = 'Attached are the Q2 financial statements for Fund II. Please review and send us any comments by Friday. We are still waiting on updated valuation support from the investment team. Q2 Financial Statements.pdf';

const clone = (value) => JSON.parse(JSON.stringify(value));
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const seedState = {
  version: 3,
  currentUser: 'Spencer',
  projects: [
    { id: 'fund-ii-audit', name: '2026 Fund II Audit', owner: 'Spencer', deadline: '2026-09-15', status: 'at_risk', color: 'plum', description: 'Complete the annual audit package, approvals, and distribution for Fund II.' },
    { id: 'fund-ii-reporting', name: 'Fund II Quarterly Reporting', owner: 'Spencer', deadline: '2026-08-28', status: 'at_risk', color: 'blue', description: 'Review and distribute the Q2 financial reporting package.' },
    { id: 'entity-tax', name: 'Entity Tax Filings', owner: 'Spencer', deadline: '2026-09-15', status: 'on_track', color: 'gold', description: 'Coordinate tax-return inputs, ownership, and filing dates across entities.' },
    { id: 'operations', name: 'Operations', owner: 'Jordan Lee', deadline: '2026-09-04', status: 'on_track', color: 'moss', description: 'Maintain the operating cadence, vendor work, and internal initiatives.' }
  ],
  tasks: [
    { id: 'task-q2-review', title: 'Review Q2 Fund II financial statements', type: 'personal', owner: 'Spencer', assignedBy: 'Spencer', projectId: 'fund-ii-reporting', dueDate: '2026-08-26', status: 'in_progress', priority: 'high', recurrence: 'none', dependency: 'Updated valuation support from the investment team', context: 'Review the attached statements and return comments to the fund administrator.', sources: [{ type: 'email', label: 'Re: Q2 financial statements' }, { type: 'document', label: 'Q2 Financial Statements.pdf' }], createdAt: '2026-08-24', updatedAt: '2026-08-25' },
    { id: 'task-tax-followup', title: 'Follow up with tax advisor on outstanding information', type: 'waiting', owner: 'Spencer', assignedBy: 'Spencer', projectId: 'entity-tax', dueDate: '2026-08-27', status: 'waiting', priority: 'high', recurrence: 'none', dependency: '', waitingOn: 'Tax advisor', requestedDate: '2026-08-20', followUpDate: '2026-08-27', lastFollowUp: '2026-08-20', context: 'Requested missing ownership information for the Fund II tax return.', sources: [{ type: 'email', label: 'Tax advisor request thread' }], createdAt: '2026-08-20', updatedAt: '2026-08-20' },
    { id: 'task-valuation-support', title: 'Prepare valuation support for audit team', type: 'delegated', owner: 'Alex Morgan', assignedBy: 'Spencer', projectId: 'fund-ii-audit', dueDate: '2026-08-28', status: 'in_progress', priority: 'high', recurrence: 'none', dependency: '', lastFollowUp: '2026-08-25', context: 'Alex is compiling valuation backup for the auditor request list.', sources: [{ type: 'email', label: 'Audit evidence request' }, { type: 'document', label: 'Valuation support checklist.docx' }], createdAt: '2026-08-22', updatedAt: '2026-08-25' },
    { id: 'task-audit-confirmations', title: 'Send audit confirmation requests', type: 'personal', owner: 'Spencer', assignedBy: 'Spencer', projectId: 'fund-ii-audit', dueDate: '2026-08-31', status: 'not_started', priority: 'medium', recurrence: 'none', dependency: 'Final counterparty list', context: 'Use the approved confirmation template and copy the audit team.', sources: [{ type: 'document', label: '2026 audit checklist.xlsx' }], createdAt: '2026-08-24', updatedAt: '2026-08-24' },
    { id: 'task-audit-draft', title: 'Review draft financial statements', type: 'personal', owner: 'Spencer', assignedBy: 'Spencer', projectId: 'fund-ii-audit', dueDate: '2026-09-08', status: 'not_started', priority: 'medium', recurrence: 'none', dependency: 'Auditor draft package', context: 'Compare the draft to the valuation and capital activity support.', sources: [{ type: 'document', label: 'Fund II audit timeline' }], createdAt: '2026-08-23', updatedAt: '2026-08-23' },
    { id: 'task-final-approval', title: 'Obtain final approval for Fund II financials', type: 'delegated', owner: 'Jordan Lee', assignedBy: 'Spencer', projectId: 'fund-ii-audit', dueDate: '2026-09-12', status: 'not_started', priority: 'medium', recurrence: 'none', dependency: 'Reviewed draft financial statements', lastFollowUp: '', context: 'Jordan will coordinate final approval once the draft is clean.', sources: [{ type: 'meeting', label: 'Weekly operations meeting' }], createdAt: '2026-08-24', updatedAt: '2026-08-24' },
    { id: 'task-portal', title: 'Review investor portal rollout plan', type: 'personal', owner: 'Spencer', assignedBy: 'Spencer', projectId: 'operations', dueDate: '2026-09-02', status: 'in_progress', priority: 'medium', recurrence: 'none', dependency: '', context: 'Confirm launch owners, communication sequence, and outstanding access items.', sources: [{ type: 'document', label: 'Investor Portal v3 plan' }], createdAt: '2026-08-21', updatedAt: '2026-08-24' },
    { id: 'task-entity-tracker', title: 'Update entity tracker for Q3', type: 'delegated', owner: 'Sam Patel', assignedBy: 'Spencer', projectId: 'entity-tax', dueDate: '2026-08-25', status: 'not_started', priority: 'medium', recurrence: 'none', dependency: '', lastFollowUp: '2026-08-24', context: 'Refresh entity owners and pending information requests in the Q3 tracker.', sources: [{ type: 'spreadsheet', label: 'Entity Tracker.xlsx' }], createdAt: '2026-08-21', updatedAt: '2026-08-24' },
    { id: 'task-insurance', title: 'Call insurance broker about renewal options', type: 'personal', owner: 'Spencer', assignedBy: 'Spencer', projectId: 'operations', dueDate: '2026-08-24', status: 'completed', priority: 'low', recurrence: 'none', dependency: '', completedAt: '2026-08-24', context: 'Discussed renewal options and requested a revised quote.', sources: [{ type: 'meeting', label: 'Weekly operations meeting' }], createdAt: '2026-08-18', updatedAt: '2026-08-24' },
    { id: 'task-monthly-reporting', title: 'Complete monthly reporting process', type: 'personal', owner: 'Spencer', assignedBy: 'Spencer', projectId: 'fund-ii-reporting', dueDate: '2026-08-31', status: 'not_started', priority: 'medium', recurrence: 'monthly_last_business_day', dependency: '', context: 'Close the monthly reporting checklist on the last business day.', sources: [{ type: 'document', label: 'Monthly reporting SOP' }], createdAt: '2026-08-01', updatedAt: '2026-08-01' },
    { id: 'idea-quarterly-reporting', title: 'Automate quarterly reporting', type: 'idea', owner: 'Spencer', assignedBy: 'Spencer', projectId: '', dueDate: '', status: 'parked', priority: 'low', recurrence: 'none', dependency: '', context: 'Explore a repeatable workflow for collecting, validating, and distributing quarterly reporting.', sources: [{ type: 'meeting', label: 'Planning session notes' }], createdAt: '2026-08-22', updatedAt: '2026-08-22' },
    { id: 'idea-monitoring', title: 'Evaluate a portfolio monitoring system', type: 'idea', owner: 'Spencer', assignedBy: 'Spencer', projectId: '', dueDate: '', status: 'parked', priority: 'low', recurrence: 'none', dependency: '', context: 'Compare whether a dedicated monitoring system reduces spreadsheet maintenance.', sources: [{ type: 'note', label: 'Investment operations idea' }], createdAt: '2026-08-18', updatedAt: '2026-08-18' }
  ],
  agendas: [
    { id: 'agenda-ops', title: 'Weekly operations meeting', with: 'Operations team', when: 'Thursday · 9:30 AM', recurrence: 'Every Thursday', items: [
      { id: 'agenda-audit-status', title: 'Fund audit status', projectId: 'fund-ii-audit', owner: 'Spencer', notes: 'Review valuation support, confirmations, and draft timing.', status: 'open' },
      { id: 'agenda-portal-rollout', title: 'Investor portal rollout', projectId: 'operations', owner: 'Jordan Lee', notes: 'Confirm launch readiness and investor communication.', status: 'open' },
      { id: 'agenda-insurance-renewal', title: 'Insurance renewal', projectId: 'operations', owner: 'Spencer', notes: 'Share the broker update and renewal recommendation.', status: 'discussed' },
      { id: 'agenda-tax-filings', title: 'Outstanding tax filings', projectId: 'entity-tax', owner: 'Sam Patel', notes: 'Review outstanding tax advisor information requests.', status: 'open' },
      { id: 'agenda-office-project', title: 'Office project update', projectId: 'operations', owner: 'Jordan Lee', notes: 'Decide next milestone and vendor action.', status: 'open' }
    ] },
    { id: 'agenda-alex', title: 'Alex Morgan 1:1', with: 'Alex Morgan', when: 'Friday · 10:00 AM', recurrence: 'Weekly', items: [
      { id: 'agenda-valuation', title: 'Valuation support timeline', projectId: 'fund-ii-audit', owner: 'Alex Morgan', notes: 'Check evidence readiness ahead of the audit check-in.', status: 'open' },
      { id: 'agenda-workload', title: 'Current workload and blockers', projectId: '', owner: 'Alex Morgan', notes: 'Discuss capacity for the next reporting cycle.', status: 'open' }
    ] }
  ]
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && saved.version === 3 && Array.isArray(saved.tasks) && Array.isArray(saved.projects) && Array.isArray(saved.agendas)) return saved;
  } catch (_) {
    // A malformed local record should never prevent the pilot from opening.
  }
  return clone(seedState);
}

let state = loadState();
let ui = {
  activeView: 'my-work',
  listFilter: 'active',
  activeProjectId: null,
  sort: 'priority',
  searchTerm: '',
  candidate: null,
  editingItemId: null,
  editingProjectId: null
};

function saveState() {
  state.version = 3;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  const saveStatus = $('#save-status');
  if (saveStatus) saveStatus.textContent = 'Saved just now';
}

function newId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function escapeHTML(value = '') {
  return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

function initials(name = '') {
  return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
}

function dateValue(value) {
  return value ? new Date(`${value}T12:00:00`) : null;
}

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addDays(value, days) {
  const date = value ? dateValue(value) : new Date(DEMO_TODAY);
  date.setDate(date.getDate() + days);
  return dateKey(date);
}

function daysFromToday(value) {
  const date = dateValue(value);
  return date ? Math.round((date - DEMO_TODAY) / 86400000) : Number.POSITIVE_INFINITY;
}

function formatDate(value) {
  const date = dateValue(value);
  return date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No date';
}

function relativeDate(value) {
  if (!value) return 'No due date';
  const days = daysFromToday(value);
  if (days === 0) return 'Today';
  if (days === -1) return 'Yesterday';
  if (days === 1) return 'Tomorrow';
  if (days < -1) return `${Math.abs(days)}d overdue`;
  return formatDate(value);
}

function activityDate(value) {
  if (!value) return 'never';
  const days = daysFromToday(value);
  if (days === 0) return 'today';
  if (days === -1) return 'yesterday';
  if (days < -1) return `${Math.abs(days)}d ago`;
  return formatDate(value);
}

function lastBusinessDay(year, monthIndex) {
  const date = new Date(year, monthIndex + 1, 0, 12);
  while (date.getDay() === 0 || date.getDay() === 6) date.setDate(date.getDate() - 1);
  return dateKey(date);
}

function nextRecurringDue(currentDue, recurrence) {
  const current = dateValue(currentDue || TODAY_KEY) || new Date(DEMO_TODAY);
  if (recurrence === 'weekly') return addDays(dateKey(current), 7);
  if (recurrence === 'monthly_last_business_day') return lastBusinessDay(current.getFullYear(), current.getMonth() + 1);
  if (recurrence === 'monthly') {
    const desiredDay = current.getDate();
    const next = new Date(current.getFullYear(), current.getMonth() + 1, 1, 12);
    const lastNextDay = new Date(next.getFullYear(), next.getMonth() + 2, 0).getDate();
    next.setDate(Math.min(desiredDay, lastNextDay));
    return dateKey(next);
  }
  return '';
}

function isComplete(task) {
  return task.status === 'completed';
}

function isOpen(task) {
  return !['completed', 'parked'].includes(task.status);
}

function isOverdue(task) {
  return isOpen(task) && Boolean(task.dueDate) && daysFromToday(task.dueDate) < 0;
}

function isDueSoon(task) {
  const days = daysFromToday(task.dueDate);
  return isOpen(task) && days >= 0 && days <= 3;
}

function needsFollowUp(task) {
  return isOpen(task) && task.type === 'waiting' && Boolean(task.followUpDate) && daysFromToday(task.followUpDate) <= 0;
}

function projectById(id) {
  return state.projects.find((project) => project.id === id);
}

function taskProjectName(task) {
  return projectById(task.projectId)?.name || '';
}

function taskTypeLabel(type) {
  return ({ personal: 'Personal', delegated: 'Delegated', waiting: 'Waiting on', idea: 'Idea' })[type] || type;
}

function statusLabel(status) {
  return ({ not_started: 'Not started', in_progress: 'In progress', waiting: 'Waiting', completed: 'Completed', parked: 'Parked' })[status] || status;
}

function recurrenceLabel(value) {
  return ({ weekly: 'Weekly', monthly: 'Monthly', monthly_last_business_day: 'Last business day monthly' })[value] || '';
}

function priorityScore(priority) {
  return ({ critical: 4, high: 3, medium: 2, low: 1 })[priority] || 0;
}

function projectStats(project) {
  const tasks = state.tasks.filter((task) => task.projectId === project.id && task.type !== 'idea');
  const completed = tasks.filter(isComplete).length;
  const active = tasks.filter(isOpen);
  const overdue = active.filter(isOverdue);
  const dueSoon = active.filter(isDueSoon);
  const percent = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
  const calculatedHealth = overdue.length || project.status === 'blocked' ? 'blocked' : (dueSoon.length || project.status === 'at_risk' ? 'at_risk' : 'on_track');
  return { tasks, active, completed, overdue, dueSoon, percent, health: calculatedHealth };
}

function taskSearchText(task) {
  return [
    task.title, task.type, task.owner, task.assignedBy, task.waitingOn, task.context, task.dependency,
    taskProjectName(task), ...(task.sources || []).flatMap((source) => [source.type, source.label])
  ].filter(Boolean).join(' ').toLowerCase();
}

function matchesSearch(task) {
  return !ui.searchTerm || taskSearchText(task).includes(ui.searchTerm.trim().toLowerCase());
}

function tasksForView(view = ui.activeView) {
  const user = state.currentUser;
  let tasks = state.tasks;
  if (view === 'my-work') tasks = tasks.filter((task) => task.owner === user && task.type !== 'idea');
  if (view === 'delegated') tasks = tasks.filter((task) => task.assignedBy === user && task.owner !== user && task.type !== 'idea');
  if (view === 'waiting') tasks = tasks.filter((task) => task.type === 'waiting' && task.owner === user);
  if (view === 'ideas') tasks = tasks.filter((task) => task.type === 'idea' && task.owner === user);
  if (view === 'project') tasks = tasks.filter((task) => task.projectId === ui.activeProjectId && task.type !== 'idea');
  return tasks.filter(matchesSearch);
}

function applyListFilter(tasks) {
  if (ui.listFilter === 'active') return tasks.filter(isOpen);
  if (ui.listFilter === 'completed') return tasks.filter(isComplete);
  if (ui.listFilter === 'today') return tasks.filter((task) => isOpen(task) && (daysFromToday(task.dueDate) <= 0 || needsFollowUp(task)));
  if (ui.listFilter === 'risk') return tasks.filter((task) => isOpen(task) && (isDueSoon(task) || isOverdue(task)));
  if (ui.listFilter === 'follow-up') return tasks.filter(needsFollowUp);
  return tasks;
}

function sortTasks(tasks) {
  return [...tasks].sort((first, second) => {
    if (isComplete(first) !== isComplete(second)) return isComplete(first) ? 1 : -1;
    if (ui.sort === 'due') {
      const firstDue = first.dueDate ? daysFromToday(first.dueDate) : 9999;
      const secondDue = second.dueDate ? daysFromToday(second.dueDate) : 9999;
      return firstDue - secondDue || priorityScore(second.priority) - priorityScore(first.priority);
    }
    const firstRisk = (isOverdue(first) ? 10 : 0) + (needsFollowUp(first) ? 7 : 0) + priorityScore(first.priority);
    const secondRisk = (isOverdue(second) ? 10 : 0) + (needsFollowUp(second) ? 7 : 0) + priorityScore(second.priority);
    return secondRisk - firstRisk || daysFromToday(first.dueDate) - daysFromToday(second.dueDate);
  });
}

function filteredTasks(view) {
  return sortTasks(applyListFilter(tasksForView(view)));
}

function sourceIcon(type) {
  return ({ email: '✉', document: '▤', meeting: '◎', spreadsheet: '▦', note: '▱' })[type] || '▱';
}

function dueMarkup(task) {
  if (isComplete(task)) return '<span class="due complete-due">Completed</span>';
  if (!task.dueDate) return '<span class="due muted-due">No deadline</span>';
  const className = isOverdue(task) ? 'overdue' : (isDueSoon(task) ? 'soon' : '');
  const descriptor = isOverdue(task) ? `Overdue · ${formatDate(task.dueDate)}` : relativeDate(task.dueDate);
  return `<span class="due ${className}">${escapeHTML(descriptor)}</span>`;
}

function taskCard(task, options = {}) {
  const project = projectById(task.projectId);
  const sources = (task.sources || []).slice(0, 2).map((source) => `<span class="source-chip" title="${escapeHTML(source.type)} source">${sourceIcon(source.type)} ${escapeHTML(source.label)}</span>`).join('');
  const assignment = task.type === 'delegated'
    ? `Delegated to ${escapeHTML(task.owner)}${task.lastFollowUp ? ` · followed up ${escapeHTML(activityDate(task.lastFollowUp))}` : ''}`
    : task.type === 'waiting'
      ? `Waiting on ${escapeHTML(task.waitingOn || 'a response')}${task.followUpDate ? ` · follow up ${escapeHTML(relativeDate(task.followUpDate).toLowerCase())}` : ''}`
      : `Owner · ${escapeHTML(task.owner)}`;
  const dependency = task.dependency ? `<p class="task-detail-line blocker-line">↳ Blocked by ${escapeHTML(task.dependency)}</p>` : '';
  const recurrence = task.recurrence && task.recurrence !== 'none' ? `<span class="tiny-tag recurrence">↻ ${escapeHTML(recurrenceLabel(task.recurrence))}</span>` : '';
  const actions = task.type === 'idea'
    ? `<button class="card-action promote-action" data-promote-idea="${task.id}">Activate idea →</button>`
    : `${(task.type === 'waiting' || task.type === 'delegated') && isOpen(task) ? `<button class="card-action followup-action" data-follow-up="${task.id}">Log follow-up</button>` : ''}`;
  return `<article class="task-card ${isComplete(task) ? 'complete' : ''} ${isOverdue(task) ? 'is-overdue' : ''}" data-open-item="${task.id}" tabindex="0" role="button" aria-label="Open ${escapeHTML(task.title)}">
    <button class="check-button" data-complete="${task.id}" aria-label="${isComplete(task) ? 'Reopen' : 'Complete'} ${escapeHTML(task.title)}">${isComplete(task) ? '✓' : ''}</button>
    <div class="task-main">
      <div class="task-title-row"><h3>${escapeHTML(task.title)}</h3>${task.status === 'waiting' ? '<span class="waiting-dot" title="Waiting for someone else"></span>' : ''}</div>
      <div class="task-meta"><span class="tag ${escapeHTML(task.type)}">${escapeHTML(taskTypeLabel(task.type))}</span>${project ? `<button class="tag project-tag" data-open-project="${project.id}">${escapeHTML(project.name)}</button>` : ''}<span class="owner-meta">${assignment}</span>${recurrence}</div>
      ${task.context ? `<p class="task-context">${escapeHTML(task.context)}</p>` : ''}
      ${dependency}
      ${sources ? `<div class="source-row">${sources}</div>` : ''}
    </div>
    <div class="task-side">${dueMarkup(task)}<span class="priority priority-${escapeHTML(task.priority)}">${task.priority === 'low' ? '' : `${escapeHTML(task.priority)} priority`}</span>${actions}</div>
  </article>`;
}

function emptyState(message, actionLabel = 'Create an item') {
  return `<div class="empty-state"><div class="empty-icon">✓</div><h3>${escapeHTML(message)}</h3><p>Capture it now, or adjust the active view.</p><button class="secondary-button" data-new-item>${escapeHTML(actionLabel)}</button></div>`;
}

function filterControls() {
  const tabs = [
    ['active', 'Open'], ['completed', 'Done'], ['all', 'All']
  ].map(([value, label]) => `<button class="segment ${ui.listFilter === value ? 'active' : ''}" data-list-filter="${value}">${label}</button>`).join('');
  const special = ({ today: 'Focus today', risk: 'At risk', 'follow-up': 'Follow up now' })[ui.listFilter];
  return `<div class="view-controls"><div class="segmented" role="tablist">${tabs}</div>${special ? `<span class="active-filter">${special}<button data-list-filter="active" aria-label="Clear filter">×</button></span>` : ''}<button class="sort-button" data-sort>${ui.sort === 'priority' ? 'Priority' : 'Due date'} <span>⌄</span></button></div>`;
}

function taskPanel(title, description, tasks, options = {}) {
  const body = tasks.length ? `<div class="task-list">${tasks.map((task) => taskCard(task, options)).join('')}</div>` : emptyState(options.emptyMessage || 'Nothing here yet');
  return `<section class="work-panel"><div class="panel-heading"><div><div class="heading-row"><h2>${escapeHTML(title)}</h2><span class="count-pill">${tasks.length}</span></div><p>${escapeHTML(description)}</p></div>${filterControls()}</div>${body}</section>`;
}

function attentionCard(label, count, note, filter, className = '') {
  return `<button class="signal-card ${className}" data-attention-filter="${filter}"><span class="signal-label">${escapeHTML(label)}</span><strong>${count}</strong><span class="signal-note">${escapeHTML(note)} <span>→</span></span></button>`;
}

function renderMyWork() {
  const owned = state.tasks.filter((task) => task.owner === state.currentUser && task.type !== 'idea' && isOpen(task));
  const focus = owned.filter((task) => daysFromToday(task.dueDate) <= 0 || needsFollowUp(task)).length;
  const risk = owned.filter((task) => isDueSoon(task) || isOverdue(task)).length;
  const waiting = owned.filter((task) => task.type === 'waiting').length;
  const delegated = state.tasks.filter((task) => task.assignedBy === state.currentUser && task.owner !== state.currentUser && isOpen(task)).length;
  const done = state.tasks.filter((task) => task.owner === state.currentUser && isComplete(task)).length;
  const allOwned = state.tasks.filter((task) => task.owner === state.currentUser && task.type !== 'idea').length;
  const visibleTasks = filteredTasks('my-work');
  const upcoming = sortTasks(owned.filter((task) => task.dueDate && daysFromToday(task.dueDate) >= 0)).slice(0, 4);
  const followUps = state.tasks.filter((task) => task.owner === state.currentUser && task.type === 'waiting' && isOpen(task));
  return `<section class="signal-grid" aria-label="Work summary">
    ${attentionCard('Focus today', focus, 'due today, overdue, or follow up', 'today', 'signal-focus')}
    ${attentionCard('At risk', risk, 'due in the next 3 days', 'risk')}
    ${attentionCard('Waiting on others', waiting, 'responses you need to track', 'waiting')}
    ${attentionCard('Delegated', delegated, 'work you have handed off', 'delegated')}
    <div class="progress-card"><div class="progress-heading"><span class="signal-label">Your completion</span><strong>${done} / ${allOwned}</strong></div><div class="progress-track"><span style="width:${allOwned ? Math.round((done / allOwned) * 100) : 0}%"></span></div><span class="signal-note">completed work in this workspace</span></div>
  </section>
  <div class="content-grid"><div>${taskPanel('Your attention queue', ui.listFilter === 'active' ? 'Open work ordered by urgency, ownership, and follow-up risk.' : 'Use the controls to inspect completion and risk.', visibleTasks)}</div>
  <aside class="right-rail">
    <div class="rail-heading"><h2>Next up</h2><button class="text-button" data-attention-filter="risk">See risk →</button></div>
    <div class="date-rail"><span>WED</span><strong>26</strong><small>AUG</small></div>
    <div class="compact-list">${upcoming.length ? upcoming.map((task) => `<button class="compact-item" data-open-item="${task.id}"><span class="compact-date">${escapeHTML(relativeDate(task.dueDate))}</span><span><strong>${escapeHTML(task.title)}</strong><small>${escapeHTML(taskProjectName(task) || taskTypeLabel(task.type))}</small></span></button>`).join('') : '<p class="muted-copy">No dated work is coming up.</p>'}</div>
    <div class="rail-divider"></div>
    <div class="rail-heading"><h2>Waiting for</h2><button class="text-button" data-view-link="waiting">Open list →</button></div>
    <div class="compact-list waiting-list">${followUps.length ? followUps.map((task) => `<button class="compact-item" data-open-item="${task.id}"><span class="waiting-person">${escapeHTML(initials(task.waitingOn || '?'))}</span><span><strong>${escapeHTML(task.waitingOn || 'Response')}</strong><small>${escapeHTML(task.title)} · ${escapeHTML(relativeDate(task.followUpDate || task.dueDate))}</small></span></button>`).join('') : '<p class="muted-copy">No responses are outstanding.</p>'}</div>
    <div class="meeting-card"><div class="meeting-top"><span class="meeting-icon">◎</span><span class="meeting-time">Tomorrow · 9:30 AM</span></div><strong>Weekly operations meeting</strong><p>${state.agendas.find((agenda) => agenda.id === 'agenda-ops')?.items.filter((item) => item.status === 'open').length || 0} open agenda items</p><button class="outline-button" data-view-link="agendas">Open agenda <span>→</span></button></div>
  </aside></div>`;
}

function renderDelegated() {
  const tasks = filteredTasks('delegated');
  const overdue = tasks.filter(isOverdue).length;
  const stale = tasks.filter((task) => !task.lastFollowUp || daysFromToday(task.lastFollowUp) <= -2).length;
  return `<section class="delegated-banner"><div><span class="eyebrow">Ownership without chasing spreadsheets</span><h2>${tasks.filter(isOpen).length} active handoffs</h2><p>See the owner, due date, status, source context, and most recent follow-up in one queue.</p></div><div class="mini-stat"><strong>${overdue}</strong><span>overdue</span></div><div class="mini-stat"><strong>${stale}</strong><span>need a check-in</span></div></section>${taskPanel('Delegated to others', 'Items assigned by you. Switch workspace from the sidebar to see the assignee’s own queue.', tasks, { emptyMessage: 'No delegated work matches this view' })}`;
}

function renderWaiting() {
  const tasks = filteredTasks('waiting');
  const needsAttention = tasks.filter(needsFollowUp).length;
  return `<section class="waiting-banner"><div><span class="eyebrow">The next action belongs elsewhere</span><h2>Keep promises visible without treating them as your task.</h2><p>${needsAttention ? `${needsAttention} follow-up${needsAttention === 1 ? '' : 's'} need attention now.` : 'No follow-ups are due right now.'}</p></div><button class="secondary-button" data-list-filter="follow-up">Show follow-ups</button></section>${taskPanel('Waiting on someone', 'Record who was asked, when you asked, the next follow-up, and the original source.', tasks, { emptyMessage: 'No waiting items match this view' })}`;
}

function projectHealthLabel(health) {
  return ({ on_track: 'On track', at_risk: 'At risk', blocked: 'Blocked' })[health] || health;
}

function projectCard(project) {
  const stats = projectStats(project);
  return `<button class="project-card project-${escapeHTML(project.color || 'moss')}" data-open-project="${project.id}"><div class="project-card-top"><span class="project-health ${stats.health}">${projectHealthLabel(stats.health)}</span><span class="project-arrow">→</span></div><h3>${escapeHTML(project.name)}</h3><p>${escapeHTML(project.description || 'No description yet.')}</p><div class="project-progress"><div><span>${stats.completed} of ${stats.tasks.length || 0} complete</span><strong>${stats.percent}%</strong></div><div class="progress-track"><span style="width:${stats.percent}%"></span></div></div><div class="project-card-footer"><span>${stats.overdue.length ? `${stats.overdue.length} overdue` : stats.dueSoon.length ? `${stats.dueSoon.length} due soon` : 'No near-term risk'}</span><span>Due ${escapeHTML(formatDate(project.deadline))}</span></div></button>`;
}

function renderProjectDetail(project) {
  const stats = projectStats(project);
  const tasks = filteredTasks('project');
  return `<section class="project-detail"><button class="back-button" data-back-projects>← All projects</button><div class="project-detail-head"><div><span class="project-health ${stats.health}">${projectHealthLabel(stats.health)}</span><h2>${escapeHTML(project.name)}</h2><p>${escapeHTML(project.description || 'No description yet.')}</p><div class="detail-meta"><span>Owner · ${escapeHTML(project.owner)}</span><span>Target · ${escapeHTML(formatDate(project.deadline))}</span><span>${stats.active.length} active items</span></div></div><div class="detail-actions"><button class="secondary-button" data-edit-project="${project.id}">Edit project</button><button class="primary-button" data-new-item data-project-default="${project.id}">+ Add work</button></div></div><div class="project-metrics"><div><strong>${stats.percent}%</strong><span>complete</span></div><div><strong>${stats.completed}/${stats.tasks.length}</strong><span>items closed</span></div><div><strong>${stats.overdue.length}</strong><span>overdue</span></div><div><strong>${stats.dueSoon.length}</strong><span>due within 3 days</span></div></div></section>${taskPanel('Project work', 'Linked work stays visible alongside ownership, source context, dependencies, and deadlines.', tasks, { emptyMessage: 'This project does not have linked work yet' })}`;
}

function renderProjects() {
  const project = projectById(ui.activeProjectId);
  if (project) return renderProjectDetail(project);
  const activeProjects = state.projects.filter((projectItem) => projectStats(projectItem).tasks.length || projectItem.owner === state.currentUser);
  return `<section class="projects-intro"><div><span class="eyebrow">From individual work to an accountable outcome</span><h2>Project health is calculated from linked tasks.</h2><p>Open a project to see its multi-step work, owners, deadlines, source material, and risk.</p></div><button class="primary-button" data-new-project>+ New project</button></section><section class="project-grid">${activeProjects.map(projectCard).join('')}</section>`;
}

function agendaItemMarkup(agenda, item) {
  const project = projectById(item.projectId);
  const promotedTask = item.taskId ? state.tasks.find((task) => task.id === item.taskId) : null;
  const stateText = item.status === 'discussed' ? 'Discussed' : item.status === 'promoted' ? 'Task created' : 'Open';
  return `<li class="agenda-line ${escapeHTML(item.status)}"><button class="agenda-check" data-discuss-agenda="${agenda.id}" data-agenda-item="${item.id}" aria-label="Toggle ${escapeHTML(item.title)} discussed">${item.status === 'discussed' ? '✓' : item.status === 'promoted' ? '↗' : ''}</button><div class="agenda-line-main"><strong>${escapeHTML(item.title)}</strong><span>${project ? escapeHTML(project.name) : 'No project'} · discuss with ${escapeHTML(item.owner)}</span>${item.notes ? `<small>${escapeHTML(item.notes)}</small>` : ''}</div><div class="agenda-line-actions"><span class="agenda-state">${stateText}</span>${item.status === 'open' ? `<button class="text-button" data-promote-agenda="${agenda.id}" data-agenda-item="${item.id}">Make task →</button>` : ''}${promotedTask ? `<button class="text-button" data-open-item="${promotedTask.id}">Open task →</button>` : ''}</div></li>`;
}

function renderAgendas() {
  return `<section class="agendas-intro"><div><span class="eyebrow">A running place to prepare the right conversation</span><h2>Agendas turn discussion into follow-through.</h2><p>Add a topic for a person or meeting, mark it discussed, or promote it into a traceable task.</p></div></section><div class="agenda-grid">${state.agendas.map((agenda) => {
    const open = agenda.items.filter((item) => item.status === 'open').length;
    return `<section class="agenda-card"><div class="agenda-card-head"><div><span class="meeting-icon">◎</span><span class="agenda-when">${escapeHTML(agenda.when)} · ${escapeHTML(agenda.recurrence)}</span><h3>${escapeHTML(agenda.title)}</h3><p>${escapeHTML(agenda.with)} · ${open} open topic${open === 1 ? '' : 's'}</p></div><button class="secondary-button small-button" data-add-agenda-item="${agenda.id}">+ Add topic</button></div><ul class="agenda-items">${agenda.items.map((item) => agendaItemMarkup(agenda, item)).join('')}</ul></section>`;
  }).join('')}</div>`;
}

function renderIdeas() {
  const tasks = filteredTasks('ideas');
  return `<section class="ideas-intro"><div><span class="eyebrow">Capture without clutter</span><h2>Future ideas stay out of today’s work.</h2><p>When timing is right, activate an idea to create a normal, assignable, traceable task.</p></div><button class="primary-button" data-new-item data-type-default="idea">+ Capture idea</button></section>${taskPanel('Idea backlog', 'Parked ideas are searchable and preserve their originating context.', tasks, { emptyMessage: 'No ideas match this view' })}`;
}

function renderPageHeader() {
  const meta = {
    'my-work': { crumb: 'My work', eyebrow: 'Wednesday, August 26, 2026', title: `Good morning, ${state.currentUser}`, subtitle: 'Here’s the work that needs your attention today.', action: '<button class="primary-button" data-new-item><span>+</span> New item</button>' },
    delegated: { crumb: 'Delegated', eyebrow: 'ACCOUNTABILITY', title: 'Work you have handed off', subtitle: 'Stay close to ownership and risk without recreating status updates.', action: '<button class="primary-button" data-new-item data-type-default="delegated"><span>+</span> Delegate work</button>' },
    waiting: { crumb: 'Waiting on', eyebrow: 'FOLLOW-UPS', title: 'Waiting should not disappear', subtitle: 'Track external commitments separately from work you can complete yourself.', action: '<button class="primary-button" data-new-item data-type-default="waiting"><span>+</span> Log waiting item</button>' },
    projects: { crumb: 'Projects', eyebrow: 'PORTFOLIO OF WORK', title: 'Projects that need a view', subtitle: 'See multi-step work, ownership, milestones, and risk in one place.', action: '<button class="primary-button" data-new-project><span>+</span> New project</button>' },
    agendas: { crumb: 'Agendas', eyebrow: 'MEETINGS & PEOPLE', title: 'Prepare the conversations that move work', subtitle: 'Keep a running agenda and promote action when the meeting is over.', action: '<button class="primary-button" data-add-agenda-item="agenda-ops"><span>+</span> Add agenda item</button>' },
    ideas: { crumb: 'Ideas', eyebrow: 'SOMEDAY / MAYBE', title: 'Keep the valuable ideas', subtitle: 'Capture future opportunities without adding false urgency.', action: '<button class="primary-button" data-new-item data-type-default="idea"><span>+</span> Capture idea</button>' }
  };
  let selected = meta[ui.activeView] || meta['my-work'];
  const project = ui.activeView === 'projects' ? projectById(ui.activeProjectId) : null;
  if (project) selected = { crumb: `Projects / ${project.name}`, eyebrow: 'PROJECT DETAIL', title: project.name, subtitle: 'Progress and risk are determined by the linked work below.', action: '<button class="primary-button" data-new-item data-project-default="' + project.id + '"><span>+</span> Add project work</button>' };
  $('#breadcrumb').innerHTML = `Workspace <span>/</span> ${escapeHTML(selected.crumb)}`;
  $('#page-head').innerHTML = `<div><p class="eyebrow">${escapeHTML(selected.eyebrow)} <span class="live-dot"></span></p><h1>${escapeHTML(selected.title)}<span class="period">.</span></h1><p class="subtitle">${escapeHTML(selected.subtitle)}</p></div><div class="page-actions">${selected.action}</div>`;
}

function renderSidebar() {
  const user = state.currentUser;
  const myOpen = state.tasks.filter((task) => task.owner === user && task.type !== 'idea' && isOpen(task)).length;
  const delegatedOpen = state.tasks.filter((task) => task.assignedBy === user && task.owner !== user && task.type !== 'idea' && isOpen(task)).length;
  const waitingOpen = state.tasks.filter((task) => task.owner === user && task.type === 'waiting' && isOpen(task)).length;
  const projects = state.projects.filter((project) => projectStats(project).active.length).length;
  const agendas = state.agendas.reduce((total, agenda) => total + agenda.items.filter((item) => item.status === 'open').length, 0);
  const ideas = state.tasks.filter((task) => task.owner === user && task.type === 'idea').length;
  $('#my-work-count').textContent = myOpen;
  $('#delegated-count').textContent = delegatedOpen;
  $('#waiting-count').textContent = waitingOpen;
  $('#project-count').textContent = projects;
  $('#agenda-count').textContent = agendas;
  $('#idea-count').textContent = ideas;
  $('#saved-risk-count').textContent = state.tasks.filter((task) => task.owner === user && (isOverdue(task) || isDueSoon(task))).length;
  $('#saved-fund-count').textContent = state.tasks.filter((task) => taskProjectName(task).toLowerCase().includes('fund ii') && isOpen(task)).length;
  $('#saved-agenda-count').textContent = state.agendas.find((agenda) => agenda.id === 'agenda-ops')?.items.filter((item) => item.status === 'open').length || 0;
  $('#workspace-person').textContent = user;
  $('#workspace-initials').textContent = initials(user);
  $('#topbar-initials').textContent = initials(user);
  $$('.nav-item').forEach((button) => button.classList.toggle('active', button.dataset.view === ui.activeView));
  $('#person-menu').innerHTML = PEOPLE.map((person) => `<button role="menuitem" class="person-choice ${person === user ? 'current' : ''}" data-switch-user="${escapeHTML(person)}"><span class="avatar avatar-choice">${escapeHTML(initials(person))}</span><span>${escapeHTML(person)}${person === user ? '<small>Current workspace</small>' : ''}</span>${person === user ? '<b>✓</b>' : ''}</button>`).join('');
}

function buildAlerts() {
  const user = state.currentUser;
  const alerts = [];
  state.tasks.filter((task) => task.owner === user && isOverdue(task)).forEach((task) => alerts.push({ type: 'risk', title: `${task.title} is overdue`, body: `Due ${formatDate(task.dueDate)} · ${taskProjectName(task) || 'No project'}`, taskId: task.id }));
  state.tasks.filter((task) => task.owner === user && needsFollowUp(task)).forEach((task) => alerts.push({ type: 'waiting', title: `Follow up with ${task.waitingOn || 'owner'}`, body: task.title, taskId: task.id }));
  state.tasks.filter((task) => task.assignedBy === user && task.owner !== user && (isOverdue(task) || isDueSoon(task))).forEach((task) => alerts.push({ type: 'delegated', title: `Check delegated work: ${task.owner}`, body: `${task.title} · ${relativeDate(task.dueDate)}`, taskId: task.id }));
  return alerts.slice(0, 5);
}

function renderNotifications() {
  const alerts = buildAlerts();
  $('#notification-dot').classList.toggle('hidden', alerts.length === 0);
  $('#notifications').innerHTML = `<div class="notifications-head"><div><span class="eyebrow">ATTENTION</span><h3>${alerts.length ? `${alerts.length} item${alerts.length === 1 ? '' : 's'} need a look` : 'All clear'}</h3></div><button class="text-button" data-attention-filter="today">Open queue →</button></div>${alerts.length ? alerts.map((alert) => `<button class="notification-row ${escapeHTML(alert.type)}" data-open-item="${alert.taskId}"><span>${alert.type === 'risk' ? '!' : alert.type === 'waiting' ? '◷' : '↗'}</span><div><strong>${escapeHTML(alert.title)}</strong><small>${escapeHTML(alert.body)}</small></div></button>`).join('') : '<p class="muted-copy notification-empty">No overdue work or follow-ups are currently due.</p>'}`;
}

function renderView() {
  const content = $('#view-content');
  const renderers = { 'my-work': renderMyWork, delegated: renderDelegated, waiting: renderWaiting, projects: renderProjects, agendas: renderAgendas, ideas: renderIdeas };
  content.innerHTML = (renderers[ui.activeView] || renderMyWork)();
}

function renderSearchResults() {
  const results = $('#search-results');
  const term = ui.searchTerm.trim();
  if (!term) {
    results.classList.add('hidden');
    results.innerHTML = '';
    return;
  }
  const lower = term.toLowerCase();
  const taskMatches = state.tasks.filter((task) => taskSearchText(task).includes(lower)).slice(0, 6);
  const projectMatches = state.projects.filter((project) => `${project.name} ${project.description} ${project.owner}`.toLowerCase().includes(lower)).slice(0, 3);
  const agendaMatches = state.agendas.filter((agenda) => `${agenda.title} ${agenda.with} ${agenda.items.map((item) => item.title).join(' ')}`.toLowerCase().includes(lower)).slice(0, 2);
  results.classList.remove('hidden');
  results.innerHTML = `<div class="search-help">Press Enter to interpret a question, or open a matching record.</div>${taskMatches.map((task) => `<button class="search-result" data-search-item="${task.id}"><span class="result-icon">◈</span><span><strong>${escapeHTML(task.title)}</strong><small>${escapeHTML(taskProjectName(task) || taskTypeLabel(task.type))} · ${escapeHTML(task.owner)}</small></span></button>`).join('')}${projectMatches.map((project) => `<button class="search-result" data-search-project="${project.id}"><span class="result-icon">▦</span><span><strong>${escapeHTML(project.name)}</strong><small>Project · ${escapeHTML(project.owner)}</small></span></button>`).join('')}${agendaMatches.map((agenda) => `<button class="search-result" data-view-link="agendas"><span class="result-icon">☷</span><span><strong>${escapeHTML(agenda.title)}</strong><small>Agenda with ${escapeHTML(agenda.with)}</small></span></button>`).join('')}${!taskMatches.length && !projectMatches.length && !agendaMatches.length ? '<div class="no-results">No saved work or source context matches that search.</div>' : ''}`;
}

function render() {
  renderSidebar();
  renderPageHeader();
  renderView();
  renderNotifications();
  renderSearchResults();
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function setModal(id, open) {
  const modal = $(`#${id}`);
  modal.classList.toggle('hidden', !open);
  if (open) {
    const firstInput = modal.querySelector('input:not([type="hidden"]), textarea, select');
    setTimeout(() => firstInput?.focus(), 25);
  }
}

function closeAllModals() {
  $$('.modal-backdrop').forEach((modal) => modal.classList.add('hidden'));
}

function populatePeople(select, selected = state.currentUser) {
  select.innerHTML = PEOPLE.map((person) => `<option value="${escapeHTML(person)}" ${person === selected ? 'selected' : ''}>${escapeHTML(person)}</option>`).join('');
}

function populateProjects(select, selected = '') {
  select.innerHTML = `<option value="">No project</option>${state.projects.map((project) => `<option value="${project.id}" ${project.id === selected ? 'selected' : ''}>${escapeHTML(project.name)}</option>`).join('')}`;
}

function updateItemFormVisibility() {
  const type = $('#item-type').value;
  $('#waiting-fields').classList.toggle('hidden', type !== 'waiting');
  $('#delegated-fields').classList.toggle('hidden', type !== 'delegated');
  if (type === 'waiting' && $('#item-status').value === 'not_started') $('#item-status').value = 'waiting';
  if (type === 'idea' && !$('#item-form').elements.id.value) $('#item-status').value = 'parked';
  if (type === 'delegated') $('#assigned-by').value = state.currentUser;
}

function openItemModal(itemId = null, defaults = {}) {
  const form = $('#item-form');
  const item = itemId ? state.tasks.find((task) => task.id === itemId) : null;
  ui.editingItemId = item?.id || null;
  form.reset();
  populatePeople($('#item-owner'), item?.owner || defaults.owner || state.currentUser);
  populateProjects($('#item-project'), item?.projectId || defaults.projectId || '');
  const source = item?.sources?.[0] || {};
  form.elements.id.value = item?.id || '';
  form.elements.title.value = item?.title || '';
  form.elements.type.value = item?.type || defaults.type || 'personal';
  form.elements.owner.value = item?.owner || defaults.owner || state.currentUser;
  form.elements.status.value = item?.status || (defaults.type === 'waiting' ? 'waiting' : defaults.type === 'idea' ? 'parked' : 'not_started');
  form.elements.projectId.value = item?.projectId || defaults.projectId || '';
  form.elements.dueDate.value = item?.dueDate || '';
  form.elements.priority.value = item?.priority || 'medium';
  form.elements.recurrence.value = item?.recurrence || 'none';
  form.elements.dependency.value = item?.dependency || '';
  form.elements.waitingOn.value = item?.waitingOn || '';
  form.elements.requestedDate.value = item?.requestedDate || '';
  form.elements.followUpDate.value = item?.followUpDate || '';
  form.elements.assignedBy.value = item?.assignedBy || state.currentUser;
  form.elements.lastFollowUp.value = item?.lastFollowUp || '';
  form.elements.sourceType.value = source.type || 'note';
  form.elements.sourceLabel.value = source.label || '';
  form.elements.context.value = item?.context || '';
  $('#item-modal-title').textContent = item ? 'Manage work item' : 'Create a new item';
  $('#item-modal-kicker').textContent = item ? 'Edit ownership, status, timing, or context' : 'Capture work with context';
  $('#item-submit').innerHTML = item ? 'Save changes <span>→</span>' : 'Create item <span>→</span>';
  $('#delete-item-button').classList.toggle('hidden', !item);
  $('#item-form-hint').textContent = item ? `Created ${formatDate(item.createdAt || TODAY_KEY)} · changes save locally` : 'Saved locally with its source context';
  updateItemFormVisibility();
  setModal('item-modal-backdrop', true);
}

function openProjectModal(projectId = null) {
  const form = $('#project-form');
  const project = projectId ? projectById(projectId) : null;
  ui.editingProjectId = project?.id || null;
  form.reset();
  populatePeople($('#project-owner'), project?.owner || state.currentUser);
  form.elements.id.value = project?.id || '';
  form.elements.name.value = project?.name || '';
  form.elements.owner.value = project?.owner || state.currentUser;
  form.elements.deadline.value = project?.deadline || '';
  form.elements.status.value = project?.status || 'on_track';
  form.elements.description.value = project?.description || '';
  $('#project-modal-title').textContent = project ? 'Manage project' : 'Create a project';
  $('#project-submit').innerHTML = project ? 'Save project <span>→</span>' : 'Create project <span>→</span>';
  $('#delete-project-button').classList.toggle('hidden', !project);
  setModal('project-modal-backdrop', true);
}

function openAgendaModal(agendaId) {
  const agenda = state.agendas.find((entry) => entry.id === agendaId) || state.agendas[0];
  const form = $('#agenda-form');
  form.reset();
  populateProjects($('#agenda-project'));
  populatePeople($('#agenda-owner'), state.currentUser);
  form.elements.agendaId.value = agenda.id;
  $('#agenda-modal-title').textContent = `Add to ${agenda.title}`;
  setModal('agenda-modal-backdrop', true);
}

function completeTask(taskId) {
  const task = state.tasks.find((entry) => entry.id === taskId);
  if (!task) return;
  if (isComplete(task)) {
    task.status = task.previousStatus || (task.type === 'waiting' ? 'waiting' : 'not_started');
    task.completedAt = '';
    showToast('Item reopened');
  } else {
    task.previousStatus = task.status;
    task.status = 'completed';
    task.completedAt = TODAY_KEY;
    if (task.recurrence && task.recurrence !== 'none') {
      const nextDue = nextRecurringDue(task.dueDate, task.recurrence);
      const nextItem = { ...clone(task), id: newId('task'), status: 'not_started', previousStatus: '', completedAt: '', dueDate: nextDue, createdAt: TODAY_KEY, updatedAt: TODAY_KEY, context: `${task.context || ''}${task.context ? ' ' : ''}Generated from the completed recurring item.` };
      state.tasks.unshift(nextItem);
      showToast(`Completed — next recurring item created for ${formatDate(nextDue)}`);
    } else {
      showToast('Item marked complete');
    }
  }
  task.updatedAt = TODAY_KEY;
  saveState();
  render();
}

function logFollowUp(taskId) {
  const task = state.tasks.find((entry) => entry.id === taskId);
  if (!task) return;
  task.lastFollowUp = TODAY_KEY;
  if (task.type === 'waiting') task.followUpDate = addDays(TODAY_KEY, 7);
  task.updatedAt = TODAY_KEY;
  saveState();
  render();
  showToast(task.type === 'waiting' ? `Follow-up logged; next reminder is ${formatDate(task.followUpDate)}` : 'Follow-up logged on delegated work');
}

function promoteIdea(taskId) {
  const task = state.tasks.find((entry) => entry.id === taskId);
  if (!task) return;
  task.type = 'personal';
  task.status = 'not_started';
  task.updatedAt = TODAY_KEY;
  saveState();
  ui.activeView = 'my-work';
  ui.listFilter = 'active';
  render();
  showToast('Idea activated as a personal task');
}

function promoteAgendaItem(agendaId, itemId) {
  const agenda = state.agendas.find((entry) => entry.id === agendaId);
  const item = agenda?.items.find((entry) => entry.id === itemId);
  if (!agenda || !item || item.taskId) return;
  const task = {
    id: newId('task'), title: item.title, type: 'personal', owner: state.currentUser, assignedBy: state.currentUser,
    projectId: item.projectId || '', dueDate: '', status: 'not_started', priority: 'medium', recurrence: 'none', dependency: '',
    context: item.notes || `Created from ${agenda.title}.`, sources: [{ type: 'meeting', label: `${agenda.title} · ${agenda.when}` }], createdAt: TODAY_KEY, updatedAt: TODAY_KEY
  };
  state.tasks.unshift(task);
  item.status = 'promoted';
  item.taskId = task.id;
  saveState();
  render();
  showToast('Agenda topic promoted to a task with meeting context');
}

function toggleAgendaDiscussion(agendaId, itemId) {
  const agenda = state.agendas.find((entry) => entry.id === agendaId);
  const item = agenda?.items.find((entry) => entry.id === itemId);
  if (!item || item.status === 'promoted') return;
  item.status = item.status === 'discussed' ? 'open' : 'discussed';
  saveState();
  render();
}

function extractCandidate(text) {
  const normalized = text.replace(/\s+/g, ' ').trim();
  const lower = normalized.toLowerCase();
  let title = 'Review captured message';
  if (/financial statements/.test(lower)) title = 'Review Q2 Fund II financial statements';
  else if (/follow up|follow-up/.test(lower)) title = 'Follow up on captured request';
  else {
    const request = normalized.match(/(?:please|can you|could you|need to)\s+([^.!?]{6,130})/i);
    if (request) title = request[1].replace(/^review\s+/i, 'Review ').trim().replace(/\.$/, '');
    else title = normalized.split(/[.!?]/)[0].slice(0, 110) || title;
  }
  let projectId = '';
  if (/fund ii/.test(lower) && /audit/.test(lower)) projectId = 'fund-ii-audit';
  else if (/fund ii/.test(lower)) projectId = 'fund-ii-reporting';
  else if (/tax/.test(lower)) projectId = 'entity-tax';
  else if (/operations|insurance|portal/.test(lower)) projectId = 'operations';
  let dueDate = '';
  const weekday = lower.match(/\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/);
  if (weekday) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const target = days.indexOf(weekday[1]);
    let delta = (target - DEMO_TODAY.getDay() + 7) % 7;
    if (!delta) delta = 7;
    dueDate = addDays(TODAY_KEY, delta);
  }
  const fileMatch = normalized.match(/(?:[\w()'-]+(?:\s+[\w()'-]+){0,7})\.(?:pdf|xlsx|xls|docx|doc|pptx|csv)/i);
  const dependencyMatch = normalized.match(/waiting on\s+([^.!?]{3,130})/i);
  return {
    title,
    projectId,
    dueDate,
    dependency: dependencyMatch ? dependencyMatch[1].trim() : '',
    context: normalized,
    sources: [{ type: 'email', label: 'Pasted email / message' }, ...(fileMatch ? [{ type: 'document', label: fileMatch[0].trim() }] : [])]
  };
}

function renderCandidate() {
  const container = $('#email-candidate');
  const candidate = ui.candidate;
  if (!candidate) {
    container.classList.add('hidden');
    container.innerHTML = '';
    return;
  }
  const project = projectById(candidate.projectId);
  container.classList.remove('hidden');
  container.innerHTML = `<div class="candidate-head"><span>LOCAL CANDIDATE · REVIEW REQUIRED</span><span class="candidate-confidence">Context found</span></div><h3>${escapeHTML(candidate.title)}</h3><div class="candidate-grid"><div><span>Project</span><strong>${escapeHTML(project?.name || 'No project inferred')}</strong></div><div><span>Due</span><strong>${escapeHTML(candidate.dueDate ? formatDate(candidate.dueDate) : 'No date inferred')}</strong></div><div><span>Dependency</span><strong>${escapeHTML(candidate.dependency || 'None inferred')}</strong></div></div><div class="source-row">${candidate.sources.map((source) => `<span class="source-chip">${sourceIcon(source.type)} ${escapeHTML(source.label)}</span>`).join('')}</div><p>Review the candidate before creating it. You can edit every field immediately afterward.</p><button class="primary-button" data-create-email-candidate>Create reviewed task <span>→</span></button>`;
}

function createCandidateTask() {
  const candidate = ui.candidate;
  if (!candidate) return;
  state.tasks.unshift({ id: newId('task'), title: candidate.title, type: 'personal', owner: state.currentUser, assignedBy: state.currentUser, projectId: candidate.projectId, dueDate: candidate.dueDate, status: 'not_started', priority: 'high', recurrence: 'none', dependency: candidate.dependency, context: candidate.context, sources: candidate.sources, createdAt: TODAY_KEY, updatedAt: TODAY_KEY });
  saveState();
  ui.candidate = null;
  setModal('email-modal-backdrop', false);
  ui.activeView = 'my-work';
  ui.listFilter = 'active';
  render();
  showToast('Reviewed email candidate added to your work');
}

function setView(view) {
  ui.activeView = view;
  ui.activeProjectId = null;
  ui.listFilter = 'active';
  ui.searchTerm = '';
  $('#search-input').value = '';
  $('#search-results').classList.add('hidden');
  render();
}

function applyAttentionFilter(filter) {
  if (filter === 'waiting') {
    ui.activeView = 'waiting';
    ui.listFilter = 'active';
  } else if (filter === 'delegated') {
    ui.activeView = 'delegated';
    ui.listFilter = 'active';
  } else {
    ui.activeView = 'my-work';
    ui.listFilter = filter;
  }
  ui.activeProjectId = null;
  ui.searchTerm = '';
  $('#search-input').value = '';
  render();
}

function handleNaturalLanguageQuery() {
  const query = ui.searchTerm.trim().toLowerCase();
  if (!query) return;
  if (/waiting|who owes|follow.?up/.test(query)) {
    applyAttentionFilter('waiting');
    showToast('Showing work that is waiting on someone else');
  } else if (/delegat|assigned/.test(query)) {
    applyAttentionFilter('delegated');
    showToast('Showing work you delegated');
  } else if (/overdue|at risk|risk|today|important/.test(query)) {
    applyAttentionFilter(/today|important/.test(query) ? 'today' : 'risk');
    showToast('Showing the attention queue');
  } else if (/agenda|meeting|discuss/.test(query)) {
    setView('agendas');
    showToast('Opening your running agendas');
  } else if (/fund ii/.test(query)) {
    ui.activeView = 'projects';
    ui.activeProjectId = 'fund-ii-reporting';
    ui.searchTerm = '';
    $('#search-input').value = '';
    render();
    showToast('Opening Fund II project work');
  } else {
    ui.activeView = 'my-work';
    ui.listFilter = 'all';
    render();
    showToast('Searching your work, people, and source context');
  }
}

function openTaskFromAnywhere(taskId) {
  closeAllModals();
  openItemModal(taskId);
}

function resetDemo() {
  if (!window.confirm('Reset this browser-local pilot to the original demo data?')) return;
  state = clone(seedState);
  ui = { activeView: 'my-work', listFilter: 'active', activeProjectId: null, sort: 'priority', searchTerm: '', candidate: null, editingItemId: null, editingProjectId: null };
  localStorage.removeItem(STORAGE_KEY);
  saveState();
  render();
  showToast('Demo data reset');
}

// Interaction wiring
$$('.nav-item').forEach((button) => button.addEventListener('click', () => setView(button.dataset.view)));

$('#person-switcher').addEventListener('click', () => {
  const menu = $('#person-menu');
  menu.classList.toggle('hidden');
  $('#person-switcher').setAttribute('aria-expanded', String(!menu.classList.contains('hidden')));
});

$('#search-toggle').addEventListener('click', () => {
  $('#search-row').classList.toggle('hidden');
  if (!$('#search-row').classList.contains('hidden')) $('#search-input').focus();
});

$('#search-input').addEventListener('input', (event) => {
  ui.searchTerm = event.target.value;
  renderSearchResults();
});

$('#search-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleNaturalLanguageQuery();
  }
  if (event.key === 'Escape') $('#clear-search').click();
});

$('#clear-search').addEventListener('click', () => {
  ui.searchTerm = '';
  $('#search-input').value = '';
  $('#search-row').classList.add('hidden');
  render();
});

$('#notifications-toggle').addEventListener('click', () => $('#notifications').classList.toggle('hidden'));
$('#email-import-button').addEventListener('click', () => { $('#email-text').value = SAMPLE_EMAIL; ui.candidate = null; renderCandidate(); setModal('email-modal-backdrop', true); });
$('#quick-tour').addEventListener('click', () => setModal('tour-modal-backdrop', true));
$('#reset-demo').addEventListener('click', resetDemo);
$('.mobile-menu').addEventListener('click', () => $('#sidebar').classList.toggle('open'));

$('#item-type').addEventListener('change', updateItemFormVisibility);

$('#item-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const existing = data.get('id') ? state.tasks.find((task) => task.id === data.get('id')) : null;
  const type = data.get('type');
  const status = data.get('status') || (type === 'waiting' ? 'waiting' : type === 'idea' ? 'parked' : 'not_started');
  const sourceLabel = data.get('sourceLabel').trim();
  const sourceType = data.get('sourceType');
  const sources = sourceLabel ? [{ type: sourceType, label: sourceLabel }, ...((existing?.sources || []).slice(1))] : (existing?.sources || []);
  const record = {
    ...(existing || {}),
    id: existing?.id || newId('task'),
    title: data.get('title').trim(), type, owner: data.get('owner'), assignedBy: type === 'delegated' ? state.currentUser : (data.get('assignedBy') || existing?.assignedBy || state.currentUser),
    projectId: data.get('projectId'), dueDate: data.get('dueDate'), status, priority: data.get('priority'), recurrence: data.get('recurrence'), dependency: data.get('dependency').trim(),
    waitingOn: data.get('waitingOn').trim(), requestedDate: data.get('requestedDate'), followUpDate: data.get('followUpDate'), lastFollowUp: data.get('lastFollowUp'),
    context: data.get('context').trim(), sources, createdAt: existing?.createdAt || TODAY_KEY, updatedAt: TODAY_KEY
  };
  if (type === 'idea' && status !== 'completed') record.status = 'parked';
  if (type === 'waiting' && status === 'not_started') record.status = 'waiting';
  if (existing) Object.assign(existing, record); else state.tasks.unshift(record);
  saveState();
  setModal('item-modal-backdrop', false);
  render();
  showToast(existing ? 'Work item updated' : 'New work item captured');
});

$('#delete-item-button').addEventListener('click', () => {
  const id = $('#item-form').elements.id.value;
  const item = state.tasks.find((task) => task.id === id);
  if (!item || !window.confirm(`Delete “${item.title}”?`)) return;
  state.tasks = state.tasks.filter((task) => task.id !== id);
  state.agendas.forEach((agenda) => agenda.items.forEach((entry) => { if (entry.taskId === id) entry.taskId = ''; }));
  saveState();
  setModal('item-modal-backdrop', false);
  render();
  showToast('Work item deleted');
});

$('#project-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const existing = data.get('id') ? projectById(data.get('id')) : null;
  const record = { ...(existing || {}), id: existing?.id || newId('project'), name: data.get('name').trim(), owner: data.get('owner'), deadline: data.get('deadline'), status: data.get('status'), description: data.get('description').trim(), color: existing?.color || 'moss' };
  if (existing) Object.assign(existing, record); else state.projects.push(record);
  saveState();
  setModal('project-modal-backdrop', false);
  render();
  showToast(existing ? 'Project updated' : 'Project created');
});

$('#delete-project-button').addEventListener('click', () => {
  const id = $('#project-form').elements.id.value;
  const project = projectById(id);
  if (!project || !window.confirm(`Delete “${project.name}”? Linked work will be kept but unassigned.`)) return;
  state.tasks.forEach((task) => { if (task.projectId === id) task.projectId = ''; });
  state.agendas.forEach((agenda) => agenda.items.forEach((item) => { if (item.projectId === id) item.projectId = ''; }));
  state.projects = state.projects.filter((entry) => entry.id !== id);
  ui.activeProjectId = null;
  saveState();
  setModal('project-modal-backdrop', false);
  render();
  showToast('Project deleted; linked work was retained');
});

$('#agenda-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const agenda = state.agendas.find((entry) => entry.id === data.get('agendaId'));
  if (!agenda) return;
  agenda.items.push({ id: newId('agenda-item'), title: data.get('title').trim(), projectId: data.get('projectId'), owner: data.get('owner'), notes: data.get('notes').trim(), status: 'open' });
  saveState();
  setModal('agenda-modal-backdrop', false);
  render();
  showToast('Agenda item added');
});

$('#email-use-sample').addEventListener('click', () => { $('#email-text').value = SAMPLE_EMAIL; ui.candidate = null; renderCandidate(); });
$('#email-parse').addEventListener('click', () => { const text = $('#email-text').value.trim(); if (!text) return showToast('Paste a message to extract candidate work'); ui.candidate = extractCandidate(text); renderCandidate(); });

$('#view-content').addEventListener('click', (event) => {
  const target = event.target.closest('button, [data-open-item]');
  if (!target) return;
  if (target.dataset.complete) return completeTask(target.dataset.complete);
  if (target.dataset.followUp) return logFollowUp(target.dataset.followUp);
  if (target.dataset.promoteIdea) return promoteIdea(target.dataset.promoteIdea);
  if (target.dataset.promoteAgenda) return promoteAgendaItem(target.dataset.promoteAgenda, target.dataset.agendaItem);
  if (target.dataset.discussAgenda) return toggleAgendaDiscussion(target.dataset.discussAgenda, target.dataset.agendaItem);
  if (target.dataset.addAgendaItem) return openAgendaModal(target.dataset.addAgendaItem);
  if (target.dataset.newItem !== undefined) return openItemModal(null, { type: target.dataset.typeDefault || 'personal', projectId: target.dataset.projectDefault || '' });
  if (target.dataset.newProject !== undefined) return openProjectModal();
  if (target.dataset.editProject) return openProjectModal(target.dataset.editProject);
  if (target.dataset.openProject) { ui.activeView = 'projects'; ui.activeProjectId = target.dataset.openProject; ui.listFilter = 'active'; render(); return; }
  if (target.dataset.backProjects !== undefined) { ui.activeProjectId = null; render(); return; }
  if (target.dataset.listFilter) { ui.listFilter = target.dataset.listFilter; render(); return; }
  if (target.dataset.sort !== undefined) { ui.sort = ui.sort === 'priority' ? 'due' : 'priority'; render(); return; }
  if (target.dataset.attentionFilter) return applyAttentionFilter(target.dataset.attentionFilter);
  if (target.dataset.viewLink) return setView(target.dataset.viewLink);
  if (target.dataset.openItem) return openTaskFromAnywhere(target.dataset.openItem);
});

$('#view-content').addEventListener('keydown', (event) => {
  const card = event.target.closest('.task-card[data-open-item]');
  if (!card || event.target !== card || !['Enter', ' '].includes(event.key)) return;
  event.preventDefault();
  openTaskFromAnywhere(card.dataset.openItem);
});

$('#page-head').addEventListener('click', (event) => {
  const target = event.target.closest('button');
  if (!target) return;
  if (target.dataset.newItem !== undefined) openItemModal(null, { type: target.dataset.typeDefault || 'personal', projectId: target.dataset.projectDefault || '' });
  if (target.dataset.newProject !== undefined) openProjectModal();
  if (target.dataset.addAgendaItem) openAgendaModal(target.dataset.addAgendaItem);
});

$('.sidebar-section').addEventListener('click', (event) => {
  const button = event.target.closest('[data-saved-view]');
  if (!button) return;
  if (button.dataset.savedView === 'at-risk') applyAttentionFilter('risk');
  if (button.dataset.savedView === 'fund-ii') { ui.activeView = 'projects'; ui.activeProjectId = 'fund-ii-reporting'; ui.listFilter = 'active'; render(); }
  if (button.dataset.savedView === 'operations') setView('agendas');
});

$('#person-menu').addEventListener('click', (event) => {
  const button = event.target.closest('[data-switch-user]');
  if (!button) return;
  state.currentUser = button.dataset.switchUser;
  saveState();
  $('#person-menu').classList.add('hidden');
  $('#person-switcher').setAttribute('aria-expanded', 'false');
  ui.activeView = 'my-work';
  ui.listFilter = 'active';
  render();
  showToast(`Switched to ${state.currentUser}'s workspace`);
});

$('#notifications').addEventListener('click', (event) => {
  const target = event.target.closest('button');
  if (!target) return;
  if (target.dataset.openItem) { $('#notifications').classList.add('hidden'); openTaskFromAnywhere(target.dataset.openItem); }
  if (target.dataset.attentionFilter) { $('#notifications').classList.add('hidden'); applyAttentionFilter(target.dataset.attentionFilter); }
});

$('#search-results').addEventListener('click', (event) => {
  const target = event.target.closest('button');
  if (!target) return;
  if (target.dataset.searchItem) { ui.searchTerm = ''; $('#search-input').value = ''; $('#search-results').classList.add('hidden'); openTaskFromAnywhere(target.dataset.searchItem); }
  if (target.dataset.searchProject) { ui.searchTerm = ''; $('#search-input').value = ''; $('#search-results').classList.add('hidden'); ui.activeView = 'projects'; ui.activeProjectId = target.dataset.searchProject; render(); }
  if (target.dataset.viewLink) setView(target.dataset.viewLink);
});

$('#email-candidate').addEventListener('click', (event) => { if (event.target.closest('[data-create-email-candidate]')) createCandidateTask(); });

$$('.modal-backdrop').forEach((backdrop) => backdrop.addEventListener('click', (event) => { if (event.target === backdrop) setModal(backdrop.id, false); }));
document.addEventListener('click', (event) => {
  const closeButton = event.target.closest('[data-close-modal]');
  if (closeButton) setModal(closeButton.dataset.closeModal, false);
  const globalNewItem = event.target.closest('[data-new-item]');
  if (globalNewItem && !globalNewItem.closest('#view-content, #page-head')) openItemModal(null, { type: globalNewItem.dataset.typeDefault || 'personal', projectId: globalNewItem.dataset.projectDefault || '' });
  const globalProject = event.target.closest('[data-new-project]');
  if (globalProject && !globalProject.closest('#view-content, #page-head')) openProjectModal();
  const globalAgenda = event.target.closest('[data-add-agenda-item]');
  if (globalAgenda && !globalAgenda.closest('#view-content, #page-head')) openAgendaModal(globalAgenda.dataset.addAgendaItem);
  if (!event.target.closest('.workspace-wrap')) { $('#person-menu').classList.add('hidden'); $('#person-switcher').setAttribute('aria-expanded', 'false'); }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (!$('#search-row').classList.contains('hidden')) $('#clear-search').click();
    else closeAllModals();
  }
});

render();
