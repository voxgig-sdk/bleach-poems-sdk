<?php
declare(strict_types=1);

// BleachPoems SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class BleachPoemsFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new BleachPoemsBaseFeature();
            case "test":
                return new BleachPoemsTestFeature();
            default:
                return new BleachPoemsBaseFeature();
        }
    }
}
