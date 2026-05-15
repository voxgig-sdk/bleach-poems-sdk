# BleachPoems SDK utility: feature_add
module BleachPoemsUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
