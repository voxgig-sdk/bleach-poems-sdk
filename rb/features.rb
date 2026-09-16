# BleachPoems SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module BleachPoemsFeatures
  def self.make_feature(name)
    case name
    when "base"
      BleachPoemsBaseFeature.new
    when "ratelimit"
      BleachPoemsRatelimitFeature.new
    when "retry"
      BleachPoemsRetryFeature.new
    when "test"
      BleachPoemsTestFeature.new
    when "timeout"
      BleachPoemsTimeoutFeature.new
    else
      BleachPoemsBaseFeature.new
    end
  end
end
