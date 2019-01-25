class helperCard {
    constructor(cname, lawcount, welfare, salary, workhour){
        this.data = {
            domId: "applicant-helper",
            cname: cname,
            lawcount: lawcount,
            welfare: welfare,
            salary: salary,
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
    }

    getEl() {
        return $(`#${this.data.domId}`)
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

        el.find(".helper-cantentiner").mousemove(function(e) {
            e.stopPropagation()
        })

    }
    

    getTemplate() {
        return `
            <div id="${this.data.domId}">
                <div class="helper-container">
                    <div class="helper-title">職位資訊</div>
                    <hr>
                        <div class="helper-cantentiner">
                            <div class="helper-law">${this.data.cname}違反${this.data.lawcount}筆勞基法</div>
                            <div class="helper-welfare">${this.data.welfare}</div>
                            <div class="helper-law">${this.data.salary}</div>
                            <div class="helper-law">${this.data.workhour}</div>
                        </div>
                    </div>
                </div>
            </div>`
    }
}

var card = new helperCard("apple", "999", "87", "9", "8")
card.init()
card.listener()