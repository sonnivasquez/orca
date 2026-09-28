/**
 * The cell box xterm lays out, per text size, so the first subscribe after ready carries the phone's dims.
 *
 * The document builds its terminal before it reports ready, puts that box in `web-ready`, and
 * reports it again whenever xterm lays out a different one.
 */
export type TerminalCellMetrics = { fontScale: number; cellWidth: number; cellHeight: number }

function positive(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : null
}

/** The notify's `cellMetrics`, keeping only well-formed entries; absent on an older document. */
export function readTerminalCellMetrics(msg: Record<string, unknown>): TerminalCellMetrics[] {
  if (!Array.isArray(msg.cellMetrics)) {
    return []
  }
  const entries: TerminalCellMetrics[] = []
  const reported: unknown[] = msg.cellMetrics
  for (const entry of reported) {
    if (
      typeof entry !== 'object' ||
      entry === null ||
      !('fontScale' in entry && 'cellWidth' in entry && 'cellHeight' in entry)
    ) {
      continue
    }
    const fontScale = positive(entry.fontScale)
    const cellWidth = positive(entry.cellWidth)
    const cellHeight = positive(entry.cellHeight)
    if (fontScale !== null && cellWidth !== null && cellHeight !== null) {
      entries.push({ fontScale, cellWidth, cellHeight })
    }
  }
  return entries
}
