export const RunServer = false

export const ApiUrl = "https://api2.profilebud.com/insta/api/v5"

export function GenerateUrl(path) {
    return(ApiUrl+path)
  }