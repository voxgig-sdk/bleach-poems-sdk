# BleachPoems SDK exists test

require "minitest/autorun"
require_relative "../BleachPoems_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = BleachPoemsSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
