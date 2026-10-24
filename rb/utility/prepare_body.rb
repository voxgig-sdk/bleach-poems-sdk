# BleachPoems SDK utility: prepare_body
require_relative 'media'
module BleachPoemsUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return BleachPoemsUtilities.raw_body(ctx.reqdata) if BleachPoemsUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
