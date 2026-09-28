import { describe, expect, it } from 'vitest'
import { readTerminalCellMetrics } from './terminal-cell-metrics'

// 23 device px at DPR 3: the WebGL renderer's 13px cell on the emulator.
const CELL_1X = { fontScale: 1, cellWidth: 23 / 3, cellHeight: 15 }

describe('readTerminalCellMetrics', () => {
  it('reads nothing from a notify without a cell box', () => {
    expect(readTerminalCellMetrics({ type: 'web-ready' })).toEqual([])
  })

  it('drops malformed entries and keeps the well-formed ones', () => {
    expect(
      readTerminalCellMetrics({
        cellMetrics: [null, { fontScale: 1, cellWidth: 0, cellHeight: 15 }, 'x', CELL_1X]
      })
    ).toEqual([CELL_1X])
  })
})
