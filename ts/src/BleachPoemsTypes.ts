// Typed models for the BleachPoems SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Poem {
  line: any[]
  title: string
  volume: number
}

export interface PoemLoadMatch {
  id: number
}

export interface PoemListMatch {
  line?: any[]
  title?: string
  volume?: number
}

