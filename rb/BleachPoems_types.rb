# frozen_string_literal: true

# Typed models for the BleachPoems SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Poem entity data model.
#
# @!attribute [rw] line
#   @return [Array]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] volume
#   @return [Integer]
Poem = Struct.new(
  :line,
  :title,
  :volume,
  keyword_init: true
)

# Request payload for Poem#load.
#
# @!attribute [rw] id
#   @return [Integer]
PoemLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Match filter for Poem#list (any subset of Poem fields).
#
# @!attribute [rw] line
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] volume
#   @return [Integer, nil]
PoemListMatch = Struct.new(
  :line,
  :title,
  :volume,
  keyword_init: true
)

