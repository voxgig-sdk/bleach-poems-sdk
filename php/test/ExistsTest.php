<?php
declare(strict_types=1);

// BleachPoems SDK exists test

require_once __DIR__ . '/../bleachpoems_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = BleachPoemsSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
