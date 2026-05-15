<?php
declare(strict_types=1);

// BleachPoems SDK utility registration

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

BleachPoemsUtility::setRegistrar(function (BleachPoemsUtility $u): void {
    $u->clean = [BleachPoemsClean::class, 'call'];
    $u->done = [BleachPoemsDone::class, 'call'];
    $u->make_error = [BleachPoemsMakeError::class, 'call'];
    $u->feature_add = [BleachPoemsFeatureAdd::class, 'call'];
    $u->feature_hook = [BleachPoemsFeatureHook::class, 'call'];
    $u->feature_init = [BleachPoemsFeatureInit::class, 'call'];
    $u->fetcher = [BleachPoemsFetcher::class, 'call'];
    $u->make_fetch_def = [BleachPoemsMakeFetchDef::class, 'call'];
    $u->make_context = [BleachPoemsMakeContext::class, 'call'];
    $u->make_options = [BleachPoemsMakeOptions::class, 'call'];
    $u->make_request = [BleachPoemsMakeRequest::class, 'call'];
    $u->make_response = [BleachPoemsMakeResponse::class, 'call'];
    $u->make_result = [BleachPoemsMakeResult::class, 'call'];
    $u->make_point = [BleachPoemsMakePoint::class, 'call'];
    $u->make_spec = [BleachPoemsMakeSpec::class, 'call'];
    $u->make_url = [BleachPoemsMakeUrl::class, 'call'];
    $u->param = [BleachPoemsParam::class, 'call'];
    $u->prepare_auth = [BleachPoemsPrepareAuth::class, 'call'];
    $u->prepare_body = [BleachPoemsPrepareBody::class, 'call'];
    $u->prepare_headers = [BleachPoemsPrepareHeaders::class, 'call'];
    $u->prepare_method = [BleachPoemsPrepareMethod::class, 'call'];
    $u->prepare_params = [BleachPoemsPrepareParams::class, 'call'];
    $u->prepare_path = [BleachPoemsPreparePath::class, 'call'];
    $u->prepare_query = [BleachPoemsPrepareQuery::class, 'call'];
    $u->result_basic = [BleachPoemsResultBasic::class, 'call'];
    $u->result_body = [BleachPoemsResultBody::class, 'call'];
    $u->result_headers = [BleachPoemsResultHeaders::class, 'call'];
    $u->transform_request = [BleachPoemsTransformRequest::class, 'call'];
    $u->transform_response = [BleachPoemsTransformResponse::class, 'call'];
});
