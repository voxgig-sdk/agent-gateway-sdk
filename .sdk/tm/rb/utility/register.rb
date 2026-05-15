# AgentGateway SDK utility registration
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
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

AgentGatewayUtility.registrar = ->(u) {
  u.clean = AgentGatewayUtilities::Clean
  u.done = AgentGatewayUtilities::Done
  u.make_error = AgentGatewayUtilities::MakeError
  u.feature_add = AgentGatewayUtilities::FeatureAdd
  u.feature_hook = AgentGatewayUtilities::FeatureHook
  u.feature_init = AgentGatewayUtilities::FeatureInit
  u.fetcher = AgentGatewayUtilities::Fetcher
  u.make_fetch_def = AgentGatewayUtilities::MakeFetchDef
  u.make_context = AgentGatewayUtilities::MakeContext
  u.make_options = AgentGatewayUtilities::MakeOptions
  u.make_request = AgentGatewayUtilities::MakeRequest
  u.make_response = AgentGatewayUtilities::MakeResponse
  u.make_result = AgentGatewayUtilities::MakeResult
  u.make_point = AgentGatewayUtilities::MakePoint
  u.make_spec = AgentGatewayUtilities::MakeSpec
  u.make_url = AgentGatewayUtilities::MakeUrl
  u.param = AgentGatewayUtilities::Param
  u.prepare_auth = AgentGatewayUtilities::PrepareAuth
  u.prepare_body = AgentGatewayUtilities::PrepareBody
  u.prepare_headers = AgentGatewayUtilities::PrepareHeaders
  u.prepare_method = AgentGatewayUtilities::PrepareMethod
  u.prepare_params = AgentGatewayUtilities::PrepareParams
  u.prepare_path = AgentGatewayUtilities::PreparePath
  u.prepare_query = AgentGatewayUtilities::PrepareQuery
  u.result_basic = AgentGatewayUtilities::ResultBasic
  u.result_body = AgentGatewayUtilities::ResultBody
  u.result_headers = AgentGatewayUtilities::ResultHeaders
  u.transform_request = AgentGatewayUtilities::TransformRequest
  u.transform_response = AgentGatewayUtilities::TransformResponse
}
