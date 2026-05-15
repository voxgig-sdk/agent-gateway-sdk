<?php
declare(strict_types=1);

// AgentGateway SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

AgentGatewayUtility::setRegistrar(function (AgentGatewayUtility $u): void {
    $u->clean = [AgentGatewayClean::class, 'call'];
    $u->done = [AgentGatewayDone::class, 'call'];
    $u->make_error = [AgentGatewayMakeError::class, 'call'];
    $u->feature_add = [AgentGatewayFeatureAdd::class, 'call'];
    $u->feature_hook = [AgentGatewayFeatureHook::class, 'call'];
    $u->feature_init = [AgentGatewayFeatureInit::class, 'call'];
    $u->fetcher = [AgentGatewayFetcher::class, 'call'];
    $u->make_fetch_def = [AgentGatewayMakeFetchDef::class, 'call'];
    $u->make_context = [AgentGatewayMakeContext::class, 'call'];
    $u->make_options = [AgentGatewayMakeOptions::class, 'call'];
    $u->make_request = [AgentGatewayMakeRequest::class, 'call'];
    $u->make_response = [AgentGatewayMakeResponse::class, 'call'];
    $u->make_result = [AgentGatewayMakeResult::class, 'call'];
    $u->make_point = [AgentGatewayMakePoint::class, 'call'];
    $u->make_spec = [AgentGatewayMakeSpec::class, 'call'];
    $u->make_url = [AgentGatewayMakeUrl::class, 'call'];
    $u->param = [AgentGatewayParam::class, 'call'];
    $u->prepare_auth = [AgentGatewayPrepareAuth::class, 'call'];
    $u->prepare_body = [AgentGatewayPrepareBody::class, 'call'];
    $u->prepare_headers = [AgentGatewayPrepareHeaders::class, 'call'];
    $u->prepare_method = [AgentGatewayPrepareMethod::class, 'call'];
    $u->prepare_params = [AgentGatewayPrepareParams::class, 'call'];
    $u->prepare_path = [AgentGatewayPreparePath::class, 'call'];
    $u->prepare_query = [AgentGatewayPrepareQuery::class, 'call'];
    $u->result_basic = [AgentGatewayResultBasic::class, 'call'];
    $u->result_body = [AgentGatewayResultBody::class, 'call'];
    $u->result_headers = [AgentGatewayResultHeaders::class, 'call'];
    $u->transform_request = [AgentGatewayTransformRequest::class, 'call'];
    $u->transform_response = [AgentGatewayTransformResponse::class, 'call'];
});
