// import { query } from "./config"

// const url = "https://www.qollie.com/graphql"

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     let str = request.company
//     if (str == "") {
//         arrReplaceString = ["股份有限公司", "有限公司", "工作室", "事務所", "補習班"]

//         if (str.includes("(") && str.includes(")")) {
//             var _i = str.indexOf("(")
//             var _ii = str.indexOf(")")
//             if (_i < _ii) {
//                 _ai = str.split("(")
//                 _aii = str.split(")")
//                 str = _ai[0] + _aii[1]
//             }
//         }

//         for (let i = 0; i < arrReplaceString.length; i++) {
//             var _i = str.indexOf(arrReplaceString[i])
//             if (_i > 0) {
//                 str = str.slice(0, _i)
//                 break
//             }
//         }

//         if (str.includes("_")) {
//             var _a = str.split("_")
//             str = _a[1]
//         }
//         var input = { kind: "company", keyword: str, page: 1, limit: 10 }
//         var refer = `https://www.qollie.com/search?keyword=${str}&kind=company&from=banner`

//         var option = {
//             method: 'POST',
//             mode: 'cors',
//             headers: {
//                 "Access-Control-Allow-Origin": "*",
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             data: JSON.stringify({ query, variables: input })
//         }
//         async function postqollie(url) {
//             return await fetch(url, option).then((data) => {
//                 console.log(data.clone().text())
//                 return data.clone().text()
//             })
//         }

//         let response = postqollie(url)
//         sendResponse({ item: response })
//         // $.ajax({
//         //     type: "POST",
//         //     url: url,
//         //     data: JSON.stringify({ query: query, variables: input }),
//         //     headers: {
//         //         'Access-Control-Allow-Origin': '*',
//         //         'Content-Type': 'application/json',
//         //         'Accept': '*/*',
//         //         'cache-control': 'no-cache'
//         //     },
//         //     dataType: "json",
//         //     contentType: "application/json",
//         //     success: (data) => {
//         //         console.log(data)
//         //         sendResponse({ item: data })
//         //     }
//         // });

//         return true
//     }
// })