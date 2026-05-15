<?php
declare(strict_types=1);

// BleachPoems SDK base feature

class BleachPoemsBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(BleachPoemsContext $ctx, array $options): void {}
    public function PostConstruct(BleachPoemsContext $ctx): void {}
    public function PostConstructEntity(BleachPoemsContext $ctx): void {}
    public function SetData(BleachPoemsContext $ctx): void {}
    public function GetData(BleachPoemsContext $ctx): void {}
    public function GetMatch(BleachPoemsContext $ctx): void {}
    public function SetMatch(BleachPoemsContext $ctx): void {}
    public function PrePoint(BleachPoemsContext $ctx): void {}
    public function PreSpec(BleachPoemsContext $ctx): void {}
    public function PreRequest(BleachPoemsContext $ctx): void {}
    public function PreResponse(BleachPoemsContext $ctx): void {}
    public function PreResult(BleachPoemsContext $ctx): void {}
    public function PreDone(BleachPoemsContext $ctx): void {}
    public function PreUnexpected(BleachPoemsContext $ctx): void {}
}
