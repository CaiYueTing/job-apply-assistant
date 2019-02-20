class helperCard {
    constructor(cname, lawcount, welfare, salary, ddp, workhour){
        this.data = {
            domId: "applicant-helper",
            cname: cname,
            lawcount: lawcount,
            welfare: welfare,
            salary: salary,
            ddp: ddp,
            workhour: workhour
        }
    }

    init() {
        this.createCard()
    }

    createCard() {
        const template = this.getTemplate()
        const el = $(template)
        $("body").prepend(el)
        // this.getLawItem()
    }

    failCard() {
        const ftemp = this.getFailTemp()
        const el = $(ftemp)
        $("body").prepend(el)
    }

    getEl() {
        return $(`#${this.data.domId}`)
    }
    
    getLaw() {
        return $(`.card-law`)
    }
    
    getChart() {
        return $(`.card-salary`)
    }

    listener() {
        
        const el = this.getEl()
        
        let start = false
        let elStartPoint = {
            x: 0,
            y: 0
        }
        let pStartPoint = {
            x: 0,
            y: 0
        }
        
        el.mousedown(function(e) {
            elStartPoint.x = el.offset().left
            elStartPoint.y = el.offset().top
            pStartPoint.x = e.pageX
            pStartPoint.y = e.pageY
            start = true
        })

        $(window).mouseup(function() {
            start = false
        }).mousemove(function(e) {
            if (!start) {
                return
            }

            let offsetX = e.pageX - pStartPoint.x 
            let offsetY = e.pageY - pStartPoint.y - $(window).scrollTop()
            el.css({
                transform: 'none',
                transition: 'unset',
                right: 'unset',
                left: elStartPoint.x + offsetX,
                top: elStartPoint.y + offsetY
            })
        })

        el.find(".card-cantentiner").mousemove(function(e) {
            e.stopPropagation()
        })

        if (this.data.lawcount != null && this.data.lawcount.length > 0){
            $(".card-law").css({
                color: '#B20000'
            })
        }

    }

    getTemplate() {
        return `
            <div id="${this.data.domId}">
                <div class="card-container">
                    <div class="card-title">職位資訊</div>
                    <hr>
                        <div class="card-cantentiner">
                            <div class="card-company">${this.data.cname}</div>
                            <div class="card-law">曾經違反 ${this.data.lawcount.length} 筆勞基法</div>
                            <div class="card-welfare">本系統福利推薦分數：${this.data.welfare}</div>
                            <div class="card-welfaredd">佔整體第${this.data.ddp}分位</div>
                            <div class="card-salary">薪水為：${this.data.salary}</div>
                            <div class="card-hour">本職位業界平均工時為：${this.data.workhour}小時</div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    getFailTemp() {
        return `<div id="${this.data.domId}">
        <div class="card-container">
            <div class="card-title">職位資訊</div>
            <hr>
                <div class="card-cantentiner">
                    抱歉，伺服器沒有反應!
                </div>
            </div>
        </div>
    </div>`
    }
}
