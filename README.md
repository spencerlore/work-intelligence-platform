# Nimble Partners work intelligence pilot

A dependency-free browser pilot for connecting work, ownership, deadlines, projects, meetings, and source context in one attention-oriented workspace.

## Run it

Open `index.html` directly, or serve this folder with any static web server. For example:

```powershell
python -m http.server 8000
```

Then open <http://localhost:8000>. There is no build step, package install, account, or external API key.

The demonstration date is intentionally fixed to **August 26, 2026** so due-date, risk, and recurrence behavior remains predictable during an interview. Data persists in browser `localStorage`; use **Reset demo data** in the sidebar to restore the seed workspace.

## Requirements coverage

| Case-study minimum | Where it is demonstrated |
| --- | --- |
| Create and manage tasks | **New item** supports create/edit/delete, completion/reopening, priority, blockers, and recurrence. |
| Assign tasks to people | Choose an owner, delegate work, and switch workspaces to see the assignee's queue. |
| Associate tasks with projects | Link work during capture or editing; project dashboards calculate progress and health from linked tasks. |
| Track deadlines and status | Due dates, status, overdue styling, three-day risk, notifications, sorting, and project rollups are live. |
| Distinguish personal, delegated, and waiting work | Separate navigation and data states drive different owner, assignee, and follow-up behavior. |
| Useful attention-oriented home | **My work** summarizes focus today, near-term risk, waiting responses, delegated work, completion, upcoming deadlines, and meetings. |
| Preserve context or source information | Each item stores notes plus a typed email, document, meeting, spreadsheet/system, or note reference. |

The prototype also demonstrates the optional email/text capture, reviewed deterministic extraction, search, running agendas, document relationships, recurring tasks, alerts, project dashboards, natural-language routing, and a future-ideas parking lot. All writes are browser-local and user-triggered.

## Working feature set

### Core assignment requirements

- Create, edit, complete/reopen, and delete work items
- Assign owners and switch between team-member workspaces
- Separate personal, delegated, waiting, and parked-idea workflows
- Associate tasks with editable projects
- Track priority, status, deadlines, blockers, request dates, follow-up dates, and last follow-up
- Attention-oriented home view for today, overdue work, three-day risk, waiting responses, delegated work, upcoming deadlines, and completion
- Preserve typed source relationships to emails, documents, spreadsheets/systems, meetings, and notes
- Search titles, projects, people, dependencies, context, and source labels

### Pilot workflows beyond the minimum

- **Project dashboards:** calculated progress, completion, overdue work, near-term risk, owners, target dates, and linked task drill-down
- **Reviewed email/text capture:** local extraction proposes a title, Friday deadline, project, dependency, and attachment; nothing is saved until the user confirms
- **Running agendas:** add topics, mark them discussed, and promote a topic to a task while retaining meeting provenance
- **Recurring work:** weekly, monthly, and last-business-day schedules automatically create the next occurrence after completion
- **Follow-up management:** waiting and delegated cards expose one-click follow-up logging
- **Ideas:** searchable parking lot with one-click activation into normal work
- **Notifications:** derived alerts for overdue items, due follow-ups, and at-risk delegated work
- **Natural-language routing:** queries such as “What am I waiting for?”, “Show delegated work”, “What is overdue?”, “Fund II”, and “agenda” open the relevant workspace
- **Saved views:** risk, Fund II, and operations agenda shortcuts are live rather than decorative
- Responsive desktop, tablet, and mobile layouts

## Data model

The local state mirrors entities that would remain separate in production:

- `Task`: work type, owner, assigner, status, priority, due date, project ID, blocker, recurrence, waiting/follow-up metadata, context, and typed sources
- `Project`: owner, target date, declared health, description; task-derived metrics remain calculated
- `Agenda`: recurring meeting/person context with discussion items and optional promoted task IDs
- `SourceRef`: source type and display label; production would also carry immutable provider IDs, URLs, version/eTag, tenant, permissions, and sync timestamps

`Task.projectId` and promoted agenda `taskId` values are stable identifiers rather than copied names. Deleting a project retains its tasks and removes only the link.

## Architecture and product choices

Vanilla HTML, CSS, and JavaScript keep the exercise runnable without dependency or environment risk. Rendering is state-derived, mutations persist immediately, user input is HTML-escaped before rendering, and dates/status transitions use deterministic code.

The pilot treats personal, delegated, and waiting work as different ownership states rather than cosmetic tags. Project health is calculated from work state, source context is visible at the point of action, and extraction uses a review gate to avoid silently creating incorrect obligations.

## What I did not trust automation to decide

AI is useful for generating interface scaffolding and suggesting candidate extraction, but I would not let it silently determine or mutate:

- Final owners, deadlines, permissions, or completion state
- Whether “waiting on” is a blocker versus a separate follow-up obligation
- Recurrence date math, especially the last business day
- Project health and overdue calculations
- Source-of-truth precedence when Outlook, a tracker, and a user edit disagree
- Whether confidential source content may be exposed to a model

Those parts are deterministic in this prototype. The email flow deliberately says **local candidate** and requires review. In production, AI could extract and summarize candidates with confidence and citations; a human or explicit policy would confirm writes. I also tightened the attachment parser after browser testing showed that a broad generated pattern captured too much message text—source provenance must be precise.

## Production evolution

The next architecture would use a typed API and Postgres behind Microsoft Entra ID authentication:

- Tenant-scoped users, teams, RBAC/ABAC, project confidentiality, and field-level authorization
- Microsoft Graph webhooks plus delta queries for Outlook, calendar, SharePoint, and OneDrive
- Idempotent ingestion using provider IDs, eTags, sync cursors, deduplication, retries, and reconciliation dashboards
- Immutable source references and an append-only activity/audit log
- Object storage and malware scanning for direct uploads; links remain permission-checked at access time
- Search indexing only authorized records and source excerpts
- Encryption in transit and at rest, secret management, retention rules, legal hold, export, and deletion controls
- Background workers for recurrence, reminders, notifications, and connector sync
- AI gateway with approved models, redaction/DLP, prompt logging policy, no-training guarantees, citations, confidence thresholds, and human approval for writes

The source system remains authoritative for imported email/documents; Nimble is authoritative for native work state. Conflicts should be surfaced rather than resolved invisibly.

## Deliberately outside this local pilot

Real authentication, server-side multi-user collaboration, Microsoft Graph sync, binary file uploads, production permissions, and reliable notification delivery require backend infrastructure and were not simulated as security theatre. The pilot demonstrates their intended seams through stable IDs, typed sources, user ownership, and explicit local-only labeling.
