<?php
declare(strict_types=1);

// BleachPoems SDK utility: feature_add

class BleachPoemsFeatureAdd
{
    public static function call(BleachPoemsContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
