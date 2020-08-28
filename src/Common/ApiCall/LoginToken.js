import { PostRequest} from "./Requests";
import ApiResponse from "../Models/ApiResponse";
import ApiError from "../Models/ApiError";
import {ApiUrl, GenerateUrl} from "./ApiUrl";

const LoginToken = async (email, password) => {
  let apiResponse;
  if (process.env.NODE_ENV !== "development") {
    apiResponse = await PostRequest(GenerateUrl("/api/v1/login"), {
      email,
      password
    })
  } else {
    apiResponse = new ApiResponse({data: dummyPlans()}, 200, null)
  }
  if (apiResponse.isValid()) {
    return apiResponse.body.data;
  } else {
    let message = `Something went wrong. Error: ${apiResponse.error}`;
    return new ApiError(message);
  }
};

function dummyPlans() {
  return {
    data: {
      "token": "Blq_dSbonnLT2e4Hs7F9Kve4RKbFps"
    },
    success: true,
    errors: []
  }
}

export default LoginToken
