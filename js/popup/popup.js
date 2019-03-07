// $("#range_slider_money").mouseup(()=>{
//     m = document.getElementById("range_slider_money").value
//     $(".moneyscore").text(m)
//     saveScore("money", m)
// })

// $("#range_slider_money").mousedown(()=>{
//     setInterval(()=>{
//         m = document.getElementById("range_slider_money").value
//         $(".moneyscore").text(m)
//     })
// })

// $("#range_slider_time").mouseup(()=>{
//     m = document.getElementById("range_slider_time").value
//     $(".timescore").text(m)
//     saveScore("time", m)
// })

// $("#range_slider_time").mousedown(()=>{
//     setInterval(()=>{
//         m = document.getElementById("range_slider_time").value
//         $(".timescore").text(m)
//     })
// })

// $("#range_slider_infra").mouseup(()=>{
//     m = document.getElementById("range_slider_infra").value
//     $(".infrascore").text(m)
//     saveScore("infra", m)
// })

// $("#range_slider_infra").mousedown(()=>{
//     setInterval(()=>{
//         m = document.getElementById("range_slider_infra").value
//         $(".infrascore").text(m)
//     })
// })


// $("#range_slider_entertain").mouseup(()=>{
//     m = document.getElementById("range_slider_entertain").value
//     $(".entertainscore").text(m)
//     saveScore("entertain", m)
// })

// $("#range_slider_entertain").mousedown(()=>{
//     setInterval(()=>{
//         m = document.getElementById("range_slider_entertain").value
//         $(".entertainscore").text(m)
//     })
// })


// $("#range_slider_grow").mouseup(()=>{
//     m = document.getElementById("range_slider_grow").value
//     $(".growscore").text(m)
//     saveScore("grow", m)
// })

// $("#range_slider_grow").mousedown(()=>{
//     setInterval(()=>{
//         m = document.getElementById("range_slider_grow").value
//         $(".growscore").text(m)
//     })
// })


// function initial() {
//     const m = "money"
//     const t = "time"
//     const i = "infra"
//     const e = "entertain"
//     const g = "grow"
    
//     initialScore(m)
//     initialScore(t)
//     initialScore(i)
//     initialScore(e)
//     initialScore(g)
// }

// function initialScore(m) {
//     const c = "." + m + "score"
//     const i = "range_slider_"+ m
//     chrome.storage.sync.get(m, function(el){
//         $(c).text(el[m])
//         document.getElementById(i).value = el[m]
//     })
// }

// initial()


// function saveScore(item, val) {
//     chrome.storage.sync.set({[item]: val}, function(){
//         chrome.storage.sync.get(item, function(el){
//             console.log(el)
//         })
//     })
// }


