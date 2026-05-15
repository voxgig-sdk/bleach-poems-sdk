# BleachPoems SDK utility: make_context
require_relative '../core/context'
module BleachPoemsUtilities
  MakeContext = ->(ctxmap, basectx) {
    BleachPoemsContext.new(ctxmap, basectx)
  }
end
