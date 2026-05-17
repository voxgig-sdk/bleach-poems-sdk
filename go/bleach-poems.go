package voxgigbleachpoemssdk

import (
	"github.com/voxgig-sdk/bleach-poems-sdk/go/core"
	"github.com/voxgig-sdk/bleach-poems-sdk/go/entity"
	"github.com/voxgig-sdk/bleach-poems-sdk/go/feature"
	_ "github.com/voxgig-sdk/bleach-poems-sdk/go/utility"
)

// Type aliases preserve external API.
type BleachPoemsSDK = core.BleachPoemsSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type BleachPoemsEntity = core.BleachPoemsEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type BleachPoemsError = core.BleachPoemsError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewPoemEntityFunc = func(client *core.BleachPoemsSDK, entopts map[string]any) core.BleachPoemsEntity {
		return entity.NewPoemEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewBleachPoemsSDK = core.NewBleachPoemsSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
