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
# @!attribute [rw] lines
#   @return [Array]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] volume
#   @return [Integer]
Poem = Struct.new(
  :lines,
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

# Request payload for Poem#list.
#
# @!attribute [rw] lines
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] volume
#   @return [Integer, nil]
PoemListMatch = Struct.new(
  :lines,
  :title,
  :volume,
  keyword_init: true
)

