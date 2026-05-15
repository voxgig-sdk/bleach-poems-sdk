# BleachPoems SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module BleachPoemsFeatures
  def self.make_feature(name)
    case name
    when "base"
      BleachPoemsBaseFeature.new
    when "test"
      BleachPoemsTestFeature.new
    else
      BleachPoemsBaseFeature.new
    end
  end
end
