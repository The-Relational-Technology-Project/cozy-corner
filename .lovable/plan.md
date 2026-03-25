

## Block Party Hub + 2026 Neighbor Survey

### Overview
Create a new `/block-party` page that serves as the main Block Party hub, containing a neighbor survey for 2026 planning and a link back to the 2025 retrospective. Update navigation to point "Party" at `/block-party` instead of `/block-party-2025`.

### Changes

**1. New database table: `block_party_survey_2026`**
- `id` uuid PK
- `created_at` timestamptz
- `name` text NOT NULL
- `preferred_times` text[] (array of selected options)
- `preferred_month` text
- `unavailable_weekends` text
- `participation_factors` text
- `potluck_ok` boolean NOT NULL
- `party_ideas` text
- `wants_committee` boolean
- `committee_contact` text (email or phone, only if wants_committee = true)
- RLS: public INSERT, admin-only SELECT

**2. New page: `src/pages/BlockParty.tsx`**
- Main hub page at `/block-party`
- Header section with intro about planning the 2026 block party
- Link/card to `/block-party-2025` labeled as "2025 Block Party Retrospective"
- The neighbor survey form with all specified fields:
  - Name (required text)
  - Time preferences (optional multi-select checkboxes: Sat afternoon, Sat evening, Sun afternoon, Sun evening)
  - Month preference (optional radio: August, September, October)
  - Unavailable weekends (optional textarea)
  - Participation factors (optional textarea)
  - Potluck (required yes/no radio)
  - Party ideas (optional textarea)
  - Committee interest (optional yes/no radio; conditionally shows contact field)
  - Simple math CAPTCHA (e.g. "What is 3 + 7?")
  - Submit button
- On submit: insert into `block_party_survey_2026`, send admin notification via `send-form-notification` edge function
- Success toast on completion

**3. Route + navigation updates**
- `src/App.tsx`: Add `/block-party` route with new `BlockParty` component; keep `/block-party-2025` route
- `src/components/MainNavigation.tsx`: Change Party nav item path from `/block-party-2025` to `/block-party`

**4. Edge function update: `send-form-notification`**
- Add a `block_party_survey` case to email survey responses to Josh

**5. Translation keys**
- Add English keys for the new page in `LanguageContext.tsx` (Chinese translations can follow later)

### Technical Notes
- The math CAPTCHA will generate two random single-digit numbers on component mount and validate the answer client-side before submission
- Multi-select time preferences stored as a Postgres text array
- The form uses existing UI components (Input, Textarea, Checkbox, RadioGroup, Button)
- Follows existing patterns from other form pages (PrepTogether, Contact)

