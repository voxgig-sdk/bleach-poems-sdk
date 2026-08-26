-- Typed models for the BleachPoems SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Poem
---@field id? string
---@field lines table
---@field title string
---@field volume number

---@class PoemLoadMatch
---@field id number

---@class PoemListMatch
---@field id? string
---@field lines? table
---@field title? string
---@field volume? number

local M = {}

return M
