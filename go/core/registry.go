package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewPoemEntityFunc func(client *BleachPoemsSDK, entopts map[string]any) BleachPoemsEntity

