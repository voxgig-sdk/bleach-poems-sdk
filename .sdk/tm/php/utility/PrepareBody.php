<?php
declare(strict_types=1);

// BleachPoems SDK utility: prepare_body

class BleachPoemsPrepareBody
{
    public static function call(BleachPoemsContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
