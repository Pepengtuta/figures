# Role Scope Matrix — SAGIP / SasterGPT

ASCII reference for the capstone deck. Verified against `app/includes/functions.php`,
`app/includes/sidebar.php`, and the page-level guards in `public/` and `app/`.

---

## 1. Account hierarchy

```text
  SUPERADMIN  (role=superadmin) ................ all municipalities, all tiers
      |
      +-- BARANGAY TIER  (role=barangay) ....... one barangay only
      |     BHERT      = sub_role tanod          (field / data entry)
      |     CHAIRMAN   = sub_role captain        (approves barangay reports)
      |     SECRETARY  = sub_role secretary      (operations, centers)
      |
      +-- MUNICIPAL TIER (role=pcf) ............ one municipality
      |     MDR-KALIBO  = mdr_kalibo             (Kalibo only)
      |     MDR-IBAJAY  = mdr_ibajay             (Ibajay only)
      |     MDR ADMIN   = mdr_admin              (municipal admin)
      |     MAYOR       = mayor_kalibo / mayor_ibajay   [READ-ONLY]
      |
      +-- PROVINCIAL TIER (role=pho) ........... province-wide
            PDRRMO      = pdrrmo
            PHO ADMIN   = (no sub_role)         (manages PDRRMO accounts)
            GOVERNOR    = governor              [READ-ONLY]

  REPORT FLOW
  BHERT --> CHAIRMAN --> MDR (review / verify / respond) --> PDRRMO (referral)
     create     review        Under MDR Review                Referred to PHO
                forward       Verified / Responding           Under PHO Review
                dismiss
```

---

## 2. Capability matrix

```text
                  BHERT  CHAIR  SEC    MDR    MAYOR  PDRRMO PHO    GOV    SUPER
 SCOPE            BRGY   BRGY   BRGY   MUNI   MUNI   PROV   PROV   PROV   ALL
 ---------------- ------ ------ ------ ------ ------ ------ ------ ------ ------
 Login            Y      Y      Y      Y      Y      Y      Y      Y      Y
 Dashboard        Y      Y      Y      Y      Y      Y      Y      Y      Y
 Map              Y      Y      Y      Y      Y      Y      Y      Y      Y
 Encode incident  Y      Y      -      R      R      R      R      R      R
 View reports     OWN    OWN    OWN    MUNI   MUNI   REF    REF    REF    ALL
 Review/dismiss   -      Y      -      -      -      -      -      -      -
 MDR status flow  -      -      -      Y      -      -      -      -      R
 Provincial act   -      -      -      -      -      Y      Y      -      R
 Manage centers   -      OWN    OWN    MUNI   -      ALL    ALL    -      ALL
 Declare needs    -      OWN    OWN    Y      -      Y      Y      -      Y
 View assistance  -      -      -      Y      Y      Y      Y      Y      Y
 Pledge           -      -      -      Y      (Y)    Y      Y      (Y)    Y
 Advance pledge   -      -      -      OWN    OWN    OWN    OWN    OWN    ALL
 Confirm received -      OWN    OWN    -      -      -      -      -      -
 Publish alerts   -      -      -      Y      -      Y      Y      -      R
 Manage users     -      Y      Y      MDR-A  -      -      PHO-A  -      Y
 Activity log     -      Y      -      MDR-A  -      -      PHO-A  -      Y
 Manage hotlines  -      -      -      Y      -      Y      Y      -      Y
 Read-only tier   -      -      -      -      RO     -      -      RO     -
```

---

## 3. Legend

```text
 Y     allowed
 -     denied / page not reachable
 R     read-only (view and filter only, no writes)
 RO    account is a read-only observer by design (Mayor, Governor)
 OWN   allowed, but limited to the actor's own barangay / own pledge /
       own center
 MUNI  limited to the forced municipality (Kalibo or Ibajay)
 REF   provincial users see referred reports only, not the full barangay list
 ALL   no scope restriction beside the sidebar municipality filter
 MDR-A only sub_role mdr_admin  (MDR-Kalibo / MDR-Ibajay cannot)
 PHO-A only PHO Admin, i.e. role=pho with no sub_role
```

Scope sources: `barangay_id` on the session user; `mdr_municipality()` and
`mayor_municipality()` force Kalibo/Ibajay; every other admin role uses the
sidebar municipality filter (default = all municipalities).

Report flow statuses: `Pending` -> `Reviewed` -> `Forwarded to PCF`
(displayed as "Forward to MDR") -> `Under MDR Review` -> `Verified` ->
`Responding` -> `Referred to PHO` (displayed as "PRVCL") ->
`Under PHO Review` -> `Resolved`. `Dismissed` and `Returned` are the
terminal / return paths.

---

## 4. Known gaps (code vs. documented intent)

```text
 G1  Mayors (pcf/mayor_*) and the Governor (pho/governor) are documented
     read-only, but can_pledge_assistance() only checks can_view_assistance().
     They can therefore record pledges. Marked (Y) above to reflect actual
     behavior, not intended behavior.

 G2  Confirming receipt is locked to the owning barangay's captain or
     secretary. Advancing a pledge is donor-only, plus superadmin; no
     provincial override remains.

 G3  Manage Users is also gated per account by users.can_manage_users, so a
     Chairman/Secretary or MDR Admin can be denied despite the matrix column.

 G4  can_manage_hotlines() allows pcf and pho but not barangay roles;
     barangay users only view the hotline page.
```

---

## 5. Design tokens (for the Figma rebuild)

Source of truth: `public/asset/css/style.css` `:root` block and
`flutter/…/constants/app_colors.dart`. Use these exact values as Figma color
variables; do not re-pick colors.

### 5.1 Core palette

| Variable | Hex | Where it comes from | Use on the slide |
| --- | --- | --- | --- |
| `primary` | `#DC3545` | `--primary`, `AppColors.primaryRed` | brand red: tier accent for Superadmin, CTA, active nav border |
| `primary-dark` | `#C82333` | `--primary-dark`, `AppColors.darkRed` | hover / pressed red |
| `light-red` | `#FFE5E5` | `AppColors.lightRed` | secondary text on red banners |
| `dark` | `#343A40` | `--dark`, `AppColors.webDark` | headings, dark chrome |
| `sidebar` | `#2F3439` | `--sidebar`, `AppColors.webSidebar` | dark header band / sidebar mock |
| `sidebar-brand` | `#262A2F` | `.sidebar-brand` | darker strip inside sidebar |
| `bg` | `#F4F6F9` | `--bg`, `AppColors.background` | slide background |
| `card` | `#FFFFFF` | `--card`, `AppColors.card` | card / table / matrix cell base |
| `border` | `#DEE2E6` | `--border`, `AppColors.border` | 1 px hairlines, connectors |
| `text` | `#212529` | `--text`, `AppColors.textDark` | body copy |
| `muted` | `#6C757D` | `--muted`, `AppColors.textMuted` | captions, legend, footnotes |
| `table-head` | `#F8F9FA` | `.custom-table thead th` | matrix header fill |
| `table-head-text` | `#495057` | `.custom-table thead th` | matrix header text |
| `filter-bar` | `#FAFAFA` | `.filter-bar` | zebra alt row / sub-header strip |
| `blue` | `#0D6EFD` | `AppColors.primaryBlue` | Bukas / municipal accent |
| `success` | `#198754` | `AppColors.successGreen` | Open centers, verified, barangay accent |
| `info` | `#0DCAF0` | `--bs-info` | Available centers |
| `warning` | `#FFC107` | `AppColors.warningYellow` | Full centers, pending |
| `orange` | `#FD7E14` | `AppColors.primaryOrange` | Needs supplies, provincial accent |
| `purple` | `#6F42C1` | `AppColors.primaryPurple` | health facilities only, not tiers |
| `gray-500` | `#ADB5BD` | Bootstrap default (derived) | "denied" dash, dashed read-only outline |

### 5.2 Soft badge pairs (hard-coded in `style.css:447-453`)

These are the only approved tint/text combinations. Use them verbatim for
matrix cells, status pills and legend chips.

| Badge | Background | Text | Icon (Material Symbols) |
| --- | --- | --- | --- |
| `badge-soft-success` | `#D1E7DD` | `#0F5132` | `check_circle` |
| `badge-soft-info` | `#D1ECF1` | `#0C5460` | `info` |
| `badge-soft-primary` | `#CFE2FF` | `#084298` | `lock` |
| `badge-soft-danger` | `#F8D7DA` | `#842029` | `cancel` |
| `badge-soft-orange` | `#FFE5D0` | `#9A3412` | `warning` |
| `badge-soft-warning` | `#FFF3CD` | `#856404` | `error` |
| `badge-soft-secondary` | `#E2E3E5` | `#41464B` | `visibility_off` |
| `badge-soft-purple` (derive) | `#E2D9F3` | `#59359A` | `local_hospital` |

Rule: never put white text on `#FFC107`; use `#856404` on `#FFF3CD`.
All listed pairs pass WCAG AA at 12 px bold.

### 5.3 Typography

| Token | Web value | Figma value |
| --- | --- | --- |
| family | `Arial, Helvetica, sans-serif` | `Arial` (fallback `Inter`) |
| body | 14 px / 1.4 | 14 / 20 |
| small / legend | 12 px | 12 / 16 |
| table header | 13 px / 700 | 13 / 18 bold, `#495057` |
| panel title | 16 px / 700 | 16 / 22 bold |
| page title | 22 px / 700 | 24 / 30 bold |
| slide title | — | 40 / 48 bold, `#212529` |
| icon font | Material Symbols Outlined, 20 px, `FILL 0` | same glyphs, 20 px |

### 5.4 Shape and depth

| Element | Radius | Stroke | Shadow |
| --- | --- | --- | --- |
| card / panel | 4 px | 1 px `#DEE2E6` | `0 1px 3px rgba(0,0,0,.06)` |
| soft badge | 4 px | none | none |
| stat / tier card | 4 px | 1 px `#DEE2E6` + 4 px left accent | `0 1px 3px rgba(0,0,0,.06)` |
| directory card | 14 px | 1 px, hover `#DC3545` | hover `0 10px 24px rgba(0,0,0,.08)` |
| connector | — | 2 px `#DEE2E6`, 8 px arrowhead | none |
| hover / pressed | — | — | lighten by 8 % or use `primary-dark` |

Spacing scale: 4 / 8 / 12 / 16 / 22 / 24 / 32 / 48. Panel padding 12–15 px,
table cell padding 8 px 12 px, row height 44 px.

### 5.5 Tier color coding (derived, consistent with the palette)

| Tier | Accent | Soft background | Text |
| --- | --- | --- | --- |
| Barangay | `#198754` | `#D1E7DD` | `#0F5132` |
| Municipal | `#0D6EFD` | `#CFE2FF` | `#084298` |
| Provincial | `#FD7E14` | `#FFE5D0` | `#9A3412` |
| Read-only observer | `#6C757D` | `#E2E3E5` | `#41464B` |
| Superadmin | `#DC3545` | `#F8D7DA` | `#842029` |

Use the accent as the 4 px left border of each tier card and as the role
column header underline in the matrix.

---

## 6. Figma build specification

### 6.1 Frames

| Frame | Size | Notes |
| --- | --- | --- |
| `Fig · Role Scope` | 1920 × 1080 | master, `#F4F6F9` background |
| `Fig · Hierarchy` | 1920 × 560 | section 1 + 2 combined, white card |
| `Fig · Matrix` | 1728 × auto | one table instance, no wrapper card |
| `Fig · Legend + Gaps` | 1728 × auto | 2 columns, 32 px gutter |
| Export | PNG @2x | 16:9 deck slides |

Grid: 12 columns, margin 96, gutter 24, column 122. Content width 1728.
Layer naming: `tier/barangay`, `role/secretary`, `matrix/row/login`,
`cell/pledge/pcf` — `area/element/variant`, so the deck script can find nodes.

### 6.2 Component set A — `Role Tier Card`

Auto-layout vertical, padding 16, gap 8, width 320, radius 4, fill `#FFFFFF`,
1 px stroke `#DEE2E6`, 4 px left accent per tier. Variants:

| Property | Values |
| --- | --- |
| `tier` | barangay / municipal / provincial / superadmin / observer |
| `readonly` | true / false |

Text slots: `role name` 16/700 `#212529`; `sub_role code` 12/400 `#6C757D`
monospace-ish (use `Roboto Mono` fallback); `scope` chip = soft badge pair.
`readonly=true` adds an `eye` icon 16 px `#6C757D` and a `READ-ONLY` chip
(`#E2E3E5` / `#41464B`).

### 6.3 Component set B — `Perm Cell`

Fixed 163 × 44, centered content, fill per state, 1 px right/bottom stroke
`#DEE2E6`, radius 0 (the table rounds only its outer 4 px).

| Variant | Fill | Text / glyph | Meaning |
| --- | --- | --- | --- |
| `yes` | `#D1E7DD` | `check_circle` `#0F5132` | Y |
| `no` | `#FFFFFF` | `—` `#ADB5BD` | denied |
| `read` | `#E2E3E5` | `visibility` `#41464B` | R |
| `observer` | `#E2E3E5` | `visibility_off` + `RO` `#41464B` | RO |
| `own` | `#CFE2FF` | `lock` + `OWN` `#084298` | own scope |
| `scoped` | `#D1ECF1` | `hub` + `MUNI`/`REF`/`ALL` `#0C5460` | widened/narrowed scope |
| `admin` | `#FFE5D0` | `admin_panel_settings` + `MDR-A`/`PHO-A` `#9A3412` | admin-only |
| `gap` | `#FFF3CD` | `error` + `(Y)` `#856404` | known gap G1 |

Keep the literal text inside the cell (`Y`, `—`, `OWN`, `(Y)`) so the design
stays readable if printed in grayscale. Glyph plus 11 px bold label, 2 px gap.

### 6.4 Matrix table instance

| Part | Spec |
| --- | --- |
| label column | 260 px, left-aligned, 13/700 `#495057`, sticky, fill `#FFFFFF` |
| role columns | 9 × 163 px = 1467 px; header 56 px, fill `#F8F9FA` |
| header text | role 13/700 `#495057`, scope line 11/400 `#6C757D` |
| row height | 44 px; zebra `#FFFFFF` / `#FAFAFA` |
| group separators | 2 px `#DEE2E6` between "Report & response", "Centers & needs", "Administration" |
| outer frame | 1 px `#DEE2E6`, radius 4, shadow `0 1px 3px rgba(0,0,0,.06)` |

Suggested row groups for the deck (reorder freely, keep label text):
1. Access — Login, Dashboard, Map
2. Reports — Encode incident, View reports, Review/dismiss, MDR status flow, Provincial act
3. Centers & needs — Manage centers, Declare needs, View assistance, Pledge, Advance pledge, Confirm received
4. Administration — Publish alerts, Manage users, Activity log, Manage hotlines, Read-only tier

### 6.5 Hierarchy diagram

- Root node `SUPERADMIN` = tier card variant `superadmin`, 360 wide, centered top.
- Three branch columns at x = 0 / 596 / 1192 (`barangay`, `pcf`, `pho`), 32 px below root, connected with 2 px `#DEE2E6` orthogonal lines, 8 px arrowheads, radius 8 on elbows.
- Sub-role chips inside each tier card: soft badge pair of that tier, 12/700.
- Read-only members (Mayor, Governor) get the `observer` card variant and a dashed 1 px `#ADB5BD` outline to signal "no writes".
- Report flow strip below: 4 stage chips + arrow, each stage pill uses:

| Status | Background | Text |
| --- | --- | --- |
| Pending | `#FFF3CD` | `#856404` |
| Reviewed / Forward to MDR | `#D1ECF1` | `#0C5460` |
| Under MDR Review | `#CFE2FF` | `#084298` |
| Verified | `#D1E7DD` | `#0F5132` |
| Responding | `#FFE5D0` | `#9A3412` |
| Referred to PHO / PRVCL | `#E2D9F3` | `#59359A` |
| Under PHO Review | `#D1ECF1` | `#0C5460` |
| Resolved | `#198754` | `#FFFFFF` |
| Dismissed | `#E2E3E5` | `#41464B` |
| Returned | `#F8D7DA` | `#842029` |

### 6.6 Legend and gaps treatment

- Legend as 3 columns of chip + 12 px label, each chip 24 px tall, 4 px radius.
- Gaps block: `#FFF3CD` fill, 1 px `#FFECB5` stroke (`.simple-note` in CSS), `#664D03` text, `error` icon 16 px, radius 4. Keep G1–G4 literal.
- Footnotes: 12/400 `#6C757D`, 16 px above the slide bottom edge.

### 6.7 Icon map (Material Symbols Outlined)

`dashboard`, `map`, `add_location_alt`, `description`, `fact_check`,
`sync_alt`, `account_balance`, `home_work`, `inventory_2`, `volunteer_activism`,
`local_shipping`, `task_alt`, `campaign`, `group`, `history`, `call`,
`visibility`, `visibility_off`, `lock`, `hub`, `admin_panel_settings`,
`check_circle`, `error`, `shield_person`.

### 6.8 Accessibility and export checklist

- Body text `#212529` on `#F4F6F9` and `#FFFFFF`: ≥ 12:1.
- `#6C757D` only at 12 px or larger bold, never for critical labels.
- Do not rely on color alone: every cell keeps its text label next to the glyph.
- Export PNG @2x; keep one PDF with selectable text for the appendix.
- Name layers with the `area/element/variant` convention above before export.

