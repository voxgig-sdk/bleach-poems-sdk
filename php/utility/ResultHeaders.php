<?php
declare(strict_types=1);

// BleachPoems SDK utility: result_headers

class BleachPoemsResultHeaders
{
    public static function call(BleachPoemsContext $ctx): ?BleachPoemsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
