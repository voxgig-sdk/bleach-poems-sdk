# BleachPoems SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

BleachPoemsUtility.registrar = ->(u) {
  u.clean = BleachPoemsUtilities::Clean
  u.done = BleachPoemsUtilities::Done
  u.make_error = BleachPoemsUtilities::MakeError
  u.feature_add = BleachPoemsUtilities::FeatureAdd
  u.feature_hook = BleachPoemsUtilities::FeatureHook
  u.feature_init = BleachPoemsUtilities::FeatureInit
  u.fetcher = BleachPoemsUtilities::Fetcher
  u.make_fetch_def = BleachPoemsUtilities::MakeFetchDef
  u.make_context = BleachPoemsUtilities::MakeContext
  u.make_options = BleachPoemsUtilities::MakeOptions
  u.make_request = BleachPoemsUtilities::MakeRequest
  u.make_response = BleachPoemsUtilities::MakeResponse
  u.make_result = BleachPoemsUtilities::MakeResult
  u.make_point = BleachPoemsUtilities::MakePoint
  u.make_spec = BleachPoemsUtilities::MakeSpec
  u.make_url = BleachPoemsUtilities::MakeUrl
  u.param = BleachPoemsUtilities::Param
  u.prepare_auth = BleachPoemsUtilities::PrepareAuth
  u.prepare_body = BleachPoemsUtilities::PrepareBody
  u.prepare_headers = BleachPoemsUtilities::PrepareHeaders
  u.prepare_method = BleachPoemsUtilities::PrepareMethod
  u.prepare_params = BleachPoemsUtilities::PrepareParams
  u.prepare_path = BleachPoemsUtilities::PreparePath
  u.prepare_query = BleachPoemsUtilities::PrepareQuery
  u.graphql_body = BleachPoemsUtilities::GraphqlBody
  u.graphql_errors = BleachPoemsUtilities::GraphqlErrors
  u.result_basic = BleachPoemsUtilities::ResultBasic
  u.result_body = BleachPoemsUtilities::ResultBody
  u.result_headers = BleachPoemsUtilities::ResultHeaders
  u.transform_request = BleachPoemsUtilities::TransformRequest
  u.transform_response = BleachPoemsUtilities::TransformResponse
}
