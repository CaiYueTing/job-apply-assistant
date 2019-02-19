class Salarychart {
    constructor(category){
        this.data = {
            domId: "salarychart",
            category: category
        }
    }

    init() {
        this.createList()
    }

    createList() {
        const template = this.getTemplate()
        const el = $(template)
        $("body").prepend(el)
    }

    chart() {
        var ctx = document.querySelector(`${this.data.domId}`).getContext('2d')
        var myChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                
            }
        })
    
    }


    getTemplate() {
        return `
            <div id="${this.data.domId}">
                <canvas id="${this.data.domId}myChart">
                <button id="industrybtn">Industry</button>
                <button id="expbtn">Exp</button>
                <button id="districtbtn">District</button>
            </div>
        `
    }

}