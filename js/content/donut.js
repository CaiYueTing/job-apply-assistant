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

    getTemplate() {
        return `
            <div id="${this.domId}">
                <div id="donutborder">
                    <span id="${this.domId}_close">X</span>
                    <canvas id="${this.domId}myChart" class="donut_chart">
                </div>
            </div>
        `
    }
}