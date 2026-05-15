<?php
declare(strict_types=1);

// BleachPoems SDK utility: result_body

class BleachPoemsResultBody
{
    public static function call(BleachPoemsContext $ctx): ?BleachPoemsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
