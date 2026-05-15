<?php
declare(strict_types=1);

// BleachPoems SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class BleachPoemsMakeContext
{
    public static function call(array $ctxmap, ?BleachPoemsContext $basectx): BleachPoemsContext
    {
        return new BleachPoemsContext($ctxmap, $basectx);
    }
}
