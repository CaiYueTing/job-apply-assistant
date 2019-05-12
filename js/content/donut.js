class Donut {
    constructor(obj){
        this.domId = "donutchart",
        this.economic = obj.economic
        this.entertain = obj.entertain
        this.infra = obj.infra
        this.person = obj.person
        this.time = obj.time
    }
    init() {
        this.createDonut()
    }

    createDonut() {
        const template = this.getTemplate()
        const el = $(template)
        $("body").prepend(el)
    }
    
    getEl() {
        return $(`#${this.domId}`)
    }

    getElName() {
        return this.domId
    }

    getClose() {
        return $(`#${this.domId}_close`)
    }

    getListItem(arr) {
        s = "無"
        if (arr.length != 0){
            s = ""
            for (let i=0;i<arr.length;i++){
                if (i == arr.length-1){
                    s += `<span>${arr[i]}。</span>`
                }else{
                    s += `<span>${arr[i]}、</span>`
                }
            }
        }
        return s
    }

    getTemplate() {
        var e = this.getListItem(this.economic)
        var t = this.getListItem(this.time)
        var i = this.getListItem(this.infra)
        var en = this.getListItem(this.entertain)
        // var p = this.getListItem(this.person)

        s = `
            <div id="${this.domId}">
                <div id="donutborder">
                    <span id="${this.domId}_close">X</span>
                    <span class="welfareList">
                        <span class="class-economic">經濟類：${e}</span>
                        <br><span class="class-time">休假工時類：${t}</span>
                        <br><span class="class-infra">設施類：${i}</span>
                        <br><span class="class-entertain">娛樂類：${en}</span>
                        
                    </span>
                    <canvas id="${this.domId}myChart" class="donut_chart">
                </div>
            </div>
        `
        return s
    }
}