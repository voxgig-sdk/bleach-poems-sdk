package core

type BleachPoemsError struct {
	IsBleachPoemsError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewBleachPoemsError(code string, msg string, ctx *Context) *BleachPoemsError {
	return &BleachPoemsError{
		IsBleachPoemsError: true,
		Sdk:              "BleachPoems",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *BleachPoemsError) Error() string {
	return e.Msg
}
