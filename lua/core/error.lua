-- BleachPoems SDK error

local BleachPoemsError = {}
BleachPoemsError.__index = BleachPoemsError


function BleachPoemsError.new(code, msg, ctx)
  local self = setmetatable({}, BleachPoemsError)
  self.is_sdk_error = true
  self.sdk = "BleachPoems"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function BleachPoemsError:error()
  return self.msg
end


function BleachPoemsError:__tostring()
  return self.msg
end


return BleachPoemsError
