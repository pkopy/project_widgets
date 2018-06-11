(function () {
    /*===MODEL===*/
    let model = {
        /*init: function(){
           if (!myJSONfromFile) {
               //console.log(myJSONfromFile)
               myJSONfromFile = JSON.stringify([]);
            }
        },
        arrayWindows: function(){
            return JSON.parse(myJSONfromFile); 
        },
        add: function(obj){
            data = JSON.parse(myJSONfromFile);
            data.push(obj);
            myJSONfromFile = JSON.stringify(data);
        },
        change: function(windows){
            myJSONfromFile = JSON.stringify(windows);
            //console.log(myJSONfromFile)
           var xhr = new XMLHttpRequest();
            //console.log('UNSENT', xhr.readyState); // readyState will be 0
    
            xhr.open('POST', 'writeFile.php', true);
            //console.log('OPENED', xhr.readyState); // readyState will be 1
    
            xhr.onprogress = function () {
            // console.log('LOADING', xhr.readyState); // readyState will be 3
            };
    
            xhr.onload = function () {
             //   console.log('DONE', xhr.readyState); // readyState will be 4
            };
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            //console.log(myJSONfromFile)
            xhr.send("x=" + myJSONfromFile);
            //console.log(xhr.send("x=" + myJSONfromFile))*/
        init: function () {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        arrayWindows: function () {
            return JSON.parse(localStorage.notes);
        },
        add: function (obj) {
            let data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        change: function (windows) {
            localStorage.notes = JSON.stringify(windows);
        },
        head: {
            start: {
                r: 102,
                g: 187,
                b: 65
            },
            end: {
                r: 65,
                g: 104,
                b: 187
            }
        },
        h3Notes: {
            r: 102,
            g: 187,
            b: 65
        },
        projects: {
            r: 65,
            g: 104,
            b: 187
        },
        aboutMe: {
            r: 255,
            g: 192,
            b: 103
        },
        palette: {
            r: 65,
            g: 104,
            b: 187
        },
        white: {
            r: 255,
            g: 255,
            b: 255
        },
        red: {
            r: 245,
            g: 151,
            b: 151
        },
        blue: {
            r: 152,
            g: 152,
            b: 252
        },
        green: {
            r: 210,
            g: 248,
            b: 148
        },
        yellow: {
            r: 235,
            g: 253,
            b: 0
        },
        pink: {
            r: 255,
            g: 192,
            b: 103
        },
        timer: [],
        getTimerArray: function () {
            // console.log(this.timer)
            return this.timer;
        },
        //
        pushTimer: function (obj) {
            this.timer.push(obj)
        },

        clear: function () {
            this.timer.pop();
        }
    };
    /*===OCTO===*/
    let octo = {
        init: function () {
            model.init();
            view.init();
            octo.setPosInit();
            view.render();
            viewHead.init();
            //view.init();

        },
        newWindow: function (name = '', width = 330, height = 250) {
            windowNote = {};

            name = name + octo.getArrayLength();
            windowNote[name] = {
                id: name,
                timer: false,
                col: '',
                row: '',
                backgroundColor: { r: 255, g: 255, b: 255 },
                position: 'absolute',
                zIndex: 999,
                left: 0,
                top: 0,
                width: width,
                height: height,
                posX: 0,
                posY: 0,
                cursor: '',
                title: 'Notatka',
                content: '',
                date: octo.date(),
                timerH: 0,
                timerM: 0,
                timerS: 0,
                timerD: 0,
                timerMo: 0,
                timerY: 0,
                timerDelta: 0,
                timerType: '',

            };
            model.add(windowNote);

        },
        date: function () {
            date = new Date();
            day = ['Nd', 'Pon', 'Wto', 'Śr', 'Czw', 'Pt', 'So'];
            month = ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'];
            minutes = date.getMinutes();
            sec = date.getSeconds();
            function zero(number) {
                if (number < 10) {
                    number = '0' + number;
                } else {
                    number
                }
                return number;
            }

            return date.getHours() + ':' + zero(minutes) + ':' + zero(sec) + ' - ' +
                date.getDate() + ' ' + month[date.getMonth()] + ' ' + date.getFullYear()
        },
        createDiv: function (cls) {
            windows = model.arrayWindows();
            widgets = document.querySelectorAll('.widget');
            //console.log(windows)
            for (let windowNote of windows) {
                let flag = 0;
                let key = Object.keys(windowNote);
                //if any widget is not exist, make it
                for (let i = 0; i < widgets.length; i++) {
                    if (widgets[i].id === key[0]) {
                        flag++;
                    }
                }
                if (flag === 0) {

                    let noteDiv = document.createElement('div')
                    noteDiv.id = windowNote[key].id;

                    noteDiv.style.position = windowNote[key].position;
                    noteDiv.style.width = windowNote[key].width + 'px';
                    noteDiv.style.height = windowNote[key].height + 'px';
                    noteDiv.style.top = windowNote[key].top + 'px';
                    noteDiv.style.left = windowNote[key].left + 'px';
                    noteDiv.style.boxShadow = ' 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
                    noteDiv.style.backgroundColor = windowNote[key].backgroundColor;
                    noteDiv.className = 'widget';
                    if (cls) {
                        noteDiv.className += cls;
                    }

                    noteDiv.style.zIndex = 0;
                    // noteDiv.style.border = '1px solid #ffffff';
                    // noteDiv.style.borderRadius = '2px';
                    var helpDiv = document.createElement('div');
                    helpDiv.id = windowNote[key].id;
                    helpDiv.style.position = windowNote[key].position;
                    helpDiv.style.width = windowNote[key].width - 2 + 'px';
                    helpDiv.style.height = windowNote[key].height - 2 + 'px';
                    helpDiv.style.position = 'absolute'
                    helpDiv.style.top = '0px'
                    helpDiv.className = 'widgetHelp';
                    noteDiv.style.zIndex = 0;
                    let toolsDiv = document.createElement('div');
                    toolsDiv.style.position = 'absolute';
                    toolsDiv.className = 'tools'
                    toolsDiv.style.height = '40px';
                    toolsDiv.style.width = '100%';
                    toolsDiv.style.padding = '2px'
                    toolsDiv.style.bottom = '0px';
                    let icon1 = document.createElement('span');
                    icon1.className = 'material-icons md 36 icon xx';
                    icon1.innerHTML = 'palette'
                    icon1.style.opacity = '0.6'
                    icon1.id = windowNote[key].id
                    let icon2 = document.createElement('span');
                    icon2.className = 'material-icons md 36 icon xx1';
                    icon2.innerHTML = 'delete'
                    icon2.style.opacity = '0.6'
                    icon2.id = windowNote[key].id
                    toolsDiv.appendChild(icon1)
                    toolsDiv.appendChild(icon2)
                    let txt = document.createElement('h1');
                    txt.className = 'title'
                    txt.innerHTML = windowNote[key].title;
                    let dateTxt = document.createElement('p')
                    dateTxt.innerHTML = windowNote[key].date
                    dateTxt.className = 'date'
                    let contentTxt = document.createElement('p');
                    contentTxt.innerHTML = windowNote[key].content;
                    contentTxt.className = 'content'
                    noteDiv.appendChild(txt);
                    noteDiv.appendChild(dateTxt);
                    noteDiv.appendChild(contentTxt);
                    helpDiv.appendChild(toolsDiv)
                    noteDiv.appendChild(helpDiv)
                    document.getElementById('notes').appendChild(noteDiv)
                }

            }
        },
        createDivTimer: function () {
            let windows = model.arrayWindows();
            // console.log(windows)
            let last = windows.length - 1;
            let lastWindow = windows[last];
            // console.log(lastWindow)
            lastWindow[last].title = 'Timer';
            lastWindow[last].content = 'Tutaj dodasz swój timer';
            lastWindow[last].height = 250;
            lastWindow[last].timer = true;
            model.change(windows)

            octo.createDiv();

        },
        createDivPalette: function () {
            let palette = document.createElement('div');
            let white = document.createElement('div');
            let blue = document.createElement('div');
            let green = document.createElement('div');
            let red = document.createElement('div');
            let pink = document.createElement('div');
            let yellow = document.createElement('div');
            palette.id = 'palette';
            palette.style.position = 'absolute';
            white.id = 'white';
            white.className = 'colors';
            blue.id = 'blue';
            blue.className = 'colors';
            green.id = 'green';
            green.className = 'colors';
            red.id = 'red';
            red.className = 'colors';
            pink.id = 'pink';
            pink.className = 'colors';
            yellow.id = 'yellow';
            yellow.className = 'colors';
            palette.appendChild(white);
            palette.appendChild(blue);
            palette.appendChild(green);
            palette.appendChild(red);
            palette.appendChild(pink);
            palette.appendChild(yellow);
            document.getElementById('notes').appendChild(palette)
        },
        setPosInit: function () {
            let windows = model.arrayWindows();
            let sumWidth = 0;
            let row = 0;
            let pos = 0;
            let x = 0; //number columns
            const divRight = document.getElementById('notes');
            for (let i = 0; i < windows.length; i++) {
                let key = Object.keys(windows[i])[0];
                //let pos = windows[i][key].col;
                //console.log(windows[i][key].width)

                let windowWidth = windows[i][key].width;
                let windowHeight = windows[i][key].height;
                sumWidth += windowWidth + 100;
                if (sumWidth >= window.innerWidth) {
                    row++;
                    sumWidth = windowWidth + 100;
                    x = pos;
                    pos = 0;
                    //console.log(x)
                }
                if (row > 0) {
                    //let xxx = windows[pos][key].height
                    let ccc = windows[(row - 1 + pos) + (x - 1) * (row - 1)][(row - 1 + pos) + (x - 1) * (row - 1)].height +
                        windows[(row - 1 + pos) + (x - 1) * (row - 1)][(row - 1 + pos) + (x - 1) * (row - 1)].top - 50;
                    windows[i][key].top = 50 + (ccc) + 20;
                    //console.log(ccc)
                    windows[i][key].left = 20 + pos * windowWidth + 20 * pos;
                    windows[i][key].col = pos;
                    windows[i][key].row = row;
                    pos++;
                } else {
                    windows[i][key].top = 50 + row * windowHeight + 20 * row;
                    windows[i][key].left = 20 + pos * windowWidth + 20 * pos;
                    windows[i][key].col = pos;
                    windows[i][key].row = row;
                    pos++;
                }



            }
            divRight.style.height = (row + 1) * 500 + 100 + 'px';
            model.change(windows)
            // console.log(windows)
        },
        newSetPos: function () {
            let windows = model.arrayWindows();
            let arrHelpCol = [];
            let arrHelpRow = [];
            let row;
            let col;
            for (let windowNote of windows) {
                let idObj = Object.keys(windowNote)[0];
                arrHelpCol.push(windowNote[idObj].col);
                arrHelpRow.push(windowNote[idObj].row);
            }
            let maxRow = octo.max(arrHelpRow);
            let maxCol = octo.max(arrHelpCol);
            let pos = windows.length;
            col = pos - (maxRow * (maxCol + 1));

            // console.log(pos, arrHelpCol, col)
            model.change(windows);

        },
        setPos: function () {
            let windows = model.arrayWindows();
            let arrHelpCol = [];
            for (let windowNote of windows) {
                let idObj = Object.keys(windowNote)[0];
                arrHelpCol.push(windowNote[idObj].col);
            }
            let x = octo.max(arrHelpCol);
            for (let i = 0; i < windows.length; i++) {
                let key = Object.keys(windows[i])[0];
                let pos = windows[i][key].col;
                let row = windows[i][key].row;
                // console.log(row, pos, key)
                let objAboveId;

                for (let j = 0; j < windows.length; j++) {
                    // console.log(windows[j][j].row)
                    if (pos === windows[j][j].col && row === (windows[j][j].row + 1)) {
                        objAboveId = windows[j][j].id

                    }

                }
                // console.log("objekt: " + objAboveId)
                let windowWidth = windows[i][key].width;
                let windowHeight = windows[i][key].height;

                // if(row === 0){
                // ccc = 0;
                if (objAboveId) {
                    let ccc = windows[objAboveId][objAboveId].top + windows[objAboveId][objAboveId].height
                    windows[i][key].top = ccc + 20;
                    windows[i][key].left = 20 + pos * windowWidth + 20 * pos;
                    // console.log("window above: " + windows[objAboveId][objAboveId].id)
                    // console.log("windows:" + i + " Windows top: " + windows[i][key].top)

                } else {
                    windows[i][key].top = 50 + row * windowHeight + 20 * row;
                    windows[i][key].left = 20 + pos * windowWidth + 20 * pos;
                }

                //console.log(ccc)

                // }
                //  if(row > 0){
                //      let ccc = windows[objAboveId][objAboveId].top + windows[objAboveId][objAboveId].height//windows[(row - 1 + pos)+(x-1)*(row-1)][(row - 1 + pos)+(x-1)*(row-1)].height  +
                //windows[(row - 1 + pos)+(x-1)*(row-1)][(row - 1 + pos)+(x-1)*(row-1)].top - 50;
                //      windows[i][key].top = 20 +  (ccc);
                //       windows[i][key].left = 20 + pos * windowWidth + 20 * pos;
                //      console.log(ccc)

                //   }
                //
                // console.log(ccc)
                //// windows[i][key].left = 20 + pos * windowWidth + 20 * pos;
                //let xxx = windows[pos][key].height
                // windows[i][key].top = 50 + row * (windows[row-1 +pos][pos].height) + 20 * row;
                // console.log(windows[row-1][pos].height)
                // windows[i][key].left = 20 + pos * windowWidth + 20 * pos;
                // model.change(windows)



                // windows[i][key].col = pos;
                // windows[i][key].row = row;
            }
            model.change(windows)
        },
        move: function (event) {
            let windows = octo.getWindows();
            let objWindow;
            let id = event.target.id;
            let obj = event.target;

            let clickX;
            let clickY;
            let x = event.clientX;
            let y = event.clientY;
            let arrHelpCol = [];
            let arrHelpRow = [];
            for (let windowNote of windows) {
                let idObj = Object.keys(windowNote)[0];
                arrHelpCol.push(windowNote[idObj].col);
                arrHelpRow.push(windowNote[idObj].row);
                if (Object.keys(windowNote)[0] === id) {
                    objWindow = windowNote;
                }
            }
            let maxRow = octo.max(arrHelpRow);
            let maxCol = octo.max(arrHelpCol);
            let position = octo.findPosition(obj, maxCol);
            let allPos = [];
            for (let i = 0; i < windows.length; i++) {
                let x = windows[i][i]
                let pos = octo.findPosition(windows[i][i], maxCol)
                allPos.push({
                    id: x.id,
                    pos: pos
                });
            }
            let bod = document.documentElement
            let scroll = bod.scrollTop
            clickX = objWindow[id].posX;
            clickY = objWindow[id].posY;
            let body = document.getElementById(objWindow[id].id)
            let left = document.getElementById('left');
            body.style.left = x - clickX - 250 + 'px';
            body.style.top = y - clickY - 50 + scroll + 'px';
            let oldCol = windows[obj.id][obj.id].col
            let oldRow = windows[obj.id][obj.id].row
            let oldLeft = windows[obj.id][obj.id].left
            let oldTop = windows[obj.id][obj.id].top
            let windowWidth = windows[obj.id][obj.id].width;
            let windowHeight = windows[obj.id][obj.id].height;
            let left1 = obj.parentNode.style.left.slice(0, -2)
            let top = obj.parentNode.style.top.slice(0, -2)
            //moving to left
            for (let i = 0; i < maxCol; i++) {
                if (oldLeft - left1 > 0) {
                    if (left1 >= (20 - clickX + (i * windowWidth)) && left1 <= (windowWidth - clickX + (i * windowWidth)) && windows[obj.id][obj.id].col !== i) {
                        x = i;
                        windows[obj.id][obj.id].col = x;
                        let key = Object.keys(windows[obj.id])
                        let colStart = windows[key][key].col
                        let rowStart = windows[key][key].row
                        for (let allPo of allPos) {
                            if ((allPo.pos + 1) === position) {
                                windows[allPo.id][allPo.id].col = colStart + 1
                            }
                        }
                        model.change(windows)
                        octo.setPos();
                        view.render();
                    }
                }
            }
            //moving to right
            for (let i = 0; i < maxCol + 1; i++) {
                if (oldLeft - left1 < 0) {
                    if (left1 >= (20 + (i * windowWidth)) && left1 <= (windowWidth + (i * windowWidth)) && windows[obj.id][obj.id].col !== i) {
                        x = i;
                        windows[obj.id][obj.id].col = x;
                        let key = Object.keys(windows[obj.id])
                        let colStart = windows[key][key].col
                        let rowStart = windows[key][key].row
                        for (let allPo of allPos) {
                            if ((allPo.pos - 1) === position) {
                                windows[allPo.id][allPo.id].col = colStart - 1
                            }
                        }
                        model.change(windows)
                        octo.setPos();
                        view.render();
                    }
                }
            }
            //moving to up
            for (let i = 0; i < maxRow; i++) {
                if (oldTop - top > 0) {
                    if (top >= (50 - clickY + (i * windowHeight)) && top <= (windowHeight - clickY
                        + (i * windowHeight)) && windows[obj.id][obj.id].row !== i) {
                        x = i;
                        windows[obj.id][obj.id].row = x;
                        let key = Object.keys(windows[obj.id])
                        let colStart = windows[key][key].col
                        let rowStart = windows[key][key].row
                        //console.log(windows[key][key].row)
                        for (let allPo of allPos) {
                            if ((allPo.pos + maxCol + 1) === position) {
                                windows[allPo.id][allPo.id].row = rowStart + 1
                                windows[key][key].top = windows[allPo.id][allPo.id].top
                                // console.log(windows[allPo.id][allPo.id].row)
                                // console.log(windows[allPo.id][allPo.id].id)
                            }
                            //octo.setPos();
                        }
                        model.change(windows)
                        octo.setPos();
                        view.render();
                    }
                }
            }
            //moving to down
            for (let i = 0; i < maxRow + 1; i++) {
                if (oldTop - top < 0) {
                    if (top >= (50 - clickY + (i * windowHeight)) && top <= (windowHeight - clickY
                        + (i * windowHeight)) && windows[obj.id][obj.id].row !== i) {
                        x = i;
                        windows[obj.id][obj.id].row = x;
                        let key = Object.keys(windows[obj.id])
                        let colStart = windows[key][key].col
                        let rowStart = windows[key][key].row
                        for (let allPo of allPos) {
                            if ((allPo.pos - maxCol - 1) === position) {
                                windows[allPo.id][allPo.id].row = rowStart - 1
                                windows[allPo.id][allPo.id].top = windows[key][key].top
                            }
                            //octo.setPos();
                        }
                        model.change(windows)
                        octo.setPos();
                        view.render();
                    }
                }
            }
        },
        max: function (arr) {
            let maxCallback = (max, cur) => Math.max(max, cur);
            let maxCol = arr.reduce(maxCallback)
            return maxCol;
        },
        findPosition: function (obj, max) {
            let windows = octo.getWindows();
            let col = windows[obj.id][obj.id].col;
            let row = windows[obj.id][obj.id].row;
            let pos = (col + (row * (max + 1)))
            return pos;
        },
        mouseUpremove: function (obj) {
            obj.removeEventListener('mousemove', octo.move);
            octo.setPos()
            view.render();
        },
        mouseUp: function (obj) {
            obj.removeEventListener('mousemove', octo.move);
            let x;
            let windowCopy;
            let windows = octo.getWindows();
            let left = obj.style.left.slice(0, -2)
            view.render();
        },
        mouseDown: function (e) {

            let windows = octo.getWindows();
            let objWindow;
            let id = e.target.id;
            e.stopPropagation();
            for (let windowNote of windows) {
                if (Object.keys(windowNote)[0] === id) {
                    let body = document.getElementById(windowNote[id].id)
                    objWindow = windowNote;
                    windowNote[id].posX = e.offsetX;
                    windowNote[id].posY = e.offsetY;
                    windowNote[id].top = parseInt(body.style.top.slice(0, -2));
                    windowNote[id].left = parseInt(body.style.left.slice(0, -2));
                    model.change(windows)
                }
            }
            if (id !== '' && !isNaN(id)) {
                let widgets = document.querySelectorAll('.widget');
                for (let widget of widgets) {
                    widget.style.zIndex = '0';
                }
                let body = document.getElementById(objWindow[id].id);
                body.style.zIndex = '999'

                body.addEventListener('mousemove', octo.move);

            } else {
                return
            }
        },
        getWindows: () => model.arrayWindows(),
        getArrayLength: () => model.arrayWindows().length,
        changeColor1: function (start, end, elem) {
            let r = start.r;
            let g = start.g;
            let b = start.b;
            let absR = Math.abs(r - end.r)
            let absG = Math.abs(g - end.g)
            let absB = Math.abs(b - end.b)
            let max = Math.max(Math.max(absR, absG), absB);
            let rgb = model.head
            let id = setInterval(function () {
                r = octo.changeValue(r, end.r)
                g = octo.changeValue(g, end.g)
                b = octo.changeValue(b, end.b)
                max--;
                elem.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
                if (max <= 0) {
                    clearInterval(id)
                    let idx = elem.id;
                    let windows = octo.getWindows();
                    for (let windowNote of windows) {
                        if (Object.keys(windowNote)[0] === idx) {
                            let body = document.getElementById(windowNote[idx].id)
                            windowNote[idx].backgroundColor = end;
                            model.change(windows)
                        }
                    }
                }
            }, 1)
        },
        changeColor: function (start, end, elem) {
            let head = document.getElementById('head')
            let r = start.r;
            let g = start.g;
            let b = start.b;
            let text = elem.textContent.toUpperCase();
            let menuLeft = document.querySelectorAll('.menuText')
            for (let menu of menuLeft) {
                elem.removeEventListener('click', viewHead.renderHead)
            }
            let absR = Math.abs(r - end.r)
            let absG = Math.abs(g - end.g)
            let absB = Math.abs(b - end.b)
            let max = Math.max(Math.max(absR, absG), absB);
            let rgb = model.head
            let id = setInterval(function () {
                r = octo.changeValue(r, end.r)
                g = octo.changeValue(g, end.g)
                b = octo.changeValue(b, end.b)
                max--;
                head.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
                head.style.color = 'white';
                let textHead = document.getElementById('headText')
                textHead.firstChild.textContent = text;
                if (max <= 0) {
                    clearInterval(id)
                    octo.changeHead(rgb.start, end)
                    for (let menu of menuLeft) {
                        elem.addEventListener('click', viewHead.renderHead)
                    }
                }
            }, 1)
        },
        changeValue: function (value, end, x) {
            x = x || 1;
            if (value > end) {
                value -= x;
                return value
            } else {
                value += x;
                return value
            }
        },
        getHead: model.head,
        changeHead: function (start, end) {
            model.head.start.r = end.r
            model.head.start.g = end.g
            model.head.start.b = end.b
        },
        getColor: function (id) {
            return model[id];
        },
        changeColorNote: function (e) {
            let obj = e;
            // console.log(e)
            obj.target.removeEventListener('click', octo.changeColorNote)

            let endId = obj.target.id;
            let elem = obj.target.parentNode.parentNode.parentNode.parentNode.parentNode;
            let id = obj.target.parentNode.parentNode.parentNode.parentNode.id
            let start
            let windows = octo.getWindows();
            for (let windowNote of windows) {
                if (Object.keys(windowNote)[0] === id) {
                    let body = document.getElementById(windowNote[id].id)
                    start = windowNote[id].backgroundColor
                }
            }
            let end = octo.getColor(endId)
            if (e.target.className === 'colors') {
                octo.changeColor1(start, end, elem)

            }
        },
        delete: function (e) {
            let windows = octo.getWindows();
            let id = e.target.parentNode.parentNode.parentNode.id
            id = id * 1;
            let arrHelp = [];
            for (let i = 0; i < id; i++) {
                arrHelp.push(windows[i])
            }
            let widgets = document.querySelectorAll('.widget')
            for (let i = id; i < windows.length - 1; i++) {
                let copyWindow = windows[i]
                windowNote = {};
                windowNote[i] = {
                    id: i,
                    col: copyWindow[i].col,
                    row: copyWindow[i].row,
                    backgroundColor: windows[i + 1][i + 1].backgroundColor,
                    position: 'absolute',
                    zIndex: 999,
                    left: copyWindow[i].left,
                    top: copyWindow[i].top,
                    width: windows[i + 1][i + 1].width,
                    height: windows[i + 1][i + 1].height,
                    posX: 0,
                    posY: 0,
                    cursor: '',
                    title: windows[i + 1][i + 1].title,
                    content: windows[i + 1][i + 1].content,
                    date: windows[i + 1][i + 1].date

                };

                arrHelp.push(windowNote)
            }
            model.change(arrHelp);
            for (let widget of widgets) {
                widget.remove()
            }
            octo.createDivPalette()
            octo.init()
        },
        resizeWindow: function () {
            octo.setPosInit();
            view.render();
        },

        clickNote: function (e) {
            let windows = octo.getWindows();
            //console.log(windows)
            let id = e.target.parentNode.id
            let obj = windows[id]
            let body = document.getElementById(id);
            let container  = document.querySelector('.col-right');
            let body1 = document.documentElement
            let scroll = body1.scrollTop;
            body.removeEventListener('mousedown', octo.mouseDown)
            body.removeEventListener('mouseup', octo.mouseUp)
           body.removeEventListener('mouseup', octo.mouseUpremove)
            body.style.display = 'none'
            let divWrite = document.createElement('div')
            divWrite.style.width = '400px';
            divWrite.style.height = '300px';
            divWrite.style.position = 'fixed'
            divWrite.style.zIndex = '1002';
            divWrite.style.top = obj[id].top + 50 + 'px';
            divWrite.style.left = obj[id].left + 250 + 'px';
            //console.log('scroll:' + scroll)
            //console.log('start:' + obj[id].top)
            //function who slide elem
            function moveElem(elem, endLeft, endTop) {
                let start = Date.now();
                var x = Number(elem.style.left.slice(0, -2));
                var y = Number(elem.style.top.slice(0, -2));
                var id = setInterval(function () {
                    var timePassed = Date.now() - start;
                    var progress = timePassed / 150;
                    if (progress > 1) {
                        progress = 1;
                    }
                    elem.style.left = x + ((endLeft - x) * progress) + 'px';
                    elem.style.top = y - scroll + ((endTop - y + scroll) * progress) + 'px';
                    if (progress === 1) {
                        clearInterval(id);
                    }
                }, 10)

            }

            let endLeft = window.innerWidth / 2 - 200;
            let endTop = (window.innerHeight) / 2 - 250;
            moveElem(divWrite, endLeft, endTop)
            divWrite.style.border = '1px solid black'
            let r = windows[id][id].backgroundColor.r;
            let g = windows[id][id].backgroundColor.g;
            let b = windows[id][id].backgroundColor.b;
            let tytul = windows[id][id].title
            let content = windows[id][id].content
            divWrite.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
            let title = document.createElement('input')
            title.style.fontSize = '20px';

            title.placeholder = 'Wpisz tytuł...'
            title.value = tytul;

            title.style.padding = '20px 0px 10px 20px'
            title.style.border = 'none'
            title.style.outline = 'none'
            let dateTxt = document.createElement('p')
            dateTxt.innerHTML = windows[id][id].date
            dateTxt.className = 'date1'
            title.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
            let textContent = document.createElement('textarea')
            textContent.style.fontSize = '16px';
            textContent.placeholder = 'Tutaj wpisz swoją notatkę...'
            textContent.value = content;
            textContent.style.padding = '20px 0px 10px 20px'
            textContent.style.border = 'none'
            textContent.style.resize = 'none'
            textContent.style.outline = 'none'
            textContent.style.width = '380px'
            textContent.style.height = '200px';
            textContent.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
            let divBack = document.createElement('div')
            divBack.style.height = '100%';
            divBack.style.width = '110%';
            divBack.style.position = 'fixed'
            divBack.style.top = '0px';
            divBack.style.left = '0px';
            divBack.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            divBack.style.zIndex = '1001';
            divWrite.appendChild(title)
            divWrite.appendChild(dateTxt)
            divWrite.appendChild(textContent)
            document.getElementsByTagName('body')[0].appendChild(divBack)
            document.getElementsByTagName('body')[0].appendChild(divWrite)
            if (windows[id][id].timer) {
                title.value = title.value;
                viewTimer.init(divWrite, windows[id][id])

            }

            divBack.addEventListener('click', function () {
                windows[id][id].title = title.value;
                windows[id][id].content = textContent.value
                model.change(windows)
                body.style.display = 'inline-block';
                body.firstChild.innerHTML = windows[id][id].title
                body.childNodes[2].innerHTML = windows[id][id].content
                divBack.remove();
                divWrite.remove();
                viewTimer.stopRender();
                body.addEventListener('mousedown', octo.mouseDown)
                model.clear()

            })
        },
        /*---Timer---*/
        timeComponent: function (x, y, radius, line, u, unit, id) {
            let today = new Date();
            // console.log(id.timerY)
            let year = id.timerY;
            let month = id.timerMo;
            let day = id.timerD;
            let delta = id.timerDelta;
            let tommorow = new Date(year, month - 1, day, 13, 20, 0)
            let a = Number.parseInt((tommorow - today) / 1000)

            let color = 'rgb(148, 255, 49)'
            if (a < 0) {
                color = 'red'
            }
            s = Math.abs(a % 60);
            m = Number.parseInt(Math.abs(a / 60));
            h = Number.parseInt(Math.abs(a / 3600));
            d = Number.parseInt(Math.abs(h / 24))
            if (m >= 60) { m = m - 60 * h }
            if (h >= 24) { h = h - 24 * d }
            //console.log(s, m, h)


            if (unit === 0) { f = 60 - s };
            if (unit === 1) { f = 60 - m }
            if (unit === 2) { f = 24 - h };
            if (unit === 3) {
                f = d;
                u = -720 / delta
            }
            if (radius === 0) {
                let canvas = document.querySelectorAll('canvas')[0]
                let ctx = canvas.getContext("2d");
                ctx.beginPath();
                // ctx = myTimerArea.context;
                ctx.font = 50 + "px arial";
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                ctx.fillStyle = 'black'
                if (unit === 2) {
                    if (24 - f < 10) {
                        ctx.fillText(("0" + (24 - f + ':')).toString(), x, y)
                    } else {
                        ctx.fillText((24 - f + ':').toString(), x, y)
                    }
                } else if (unit === 1) {
                    ctx.fillText((60 - f + ':').toString(), x, y)
                } else if (unit === 3) {
                    ctx.fillText(f.toString(), x, y)
                } else {
                    ctx.fillText(60 - f.toString(), x, y)
                }
                ctx.beginPath();
                // ctx = myTimerArea.context;
                ctx.font = 30 + "px arial";
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                ctx.fillStyle = 'red'
                ctx.fillText(('D').toString(), x, y + 40)
                ctx.closePath()
            } else {
                let canvass = document.querySelectorAll('canvas')
                for (let canvas of canvass) {
                    let ctx = canvas.getContext("2d");
                    ctx.beginPath();
                    ctx.lineWidth = line - 2;
                    ctx.strokeStyle = 'rgb(228, 228, 228)';
                    ctx.arc(x, y, radius, 0, 2 * Math.PI);
                    ctx.stroke();
                    ctx.beginPath();
                    var grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
                    grd.addColorStop(0, "red");
                    grd.addColorStop(1, "white");
                    ctx.lineWidth = line;
                    ctx.strokeStyle = color;
                    ctx.arc(x, y, radius, (f * Math.PI / (360 / u)) - Math.PI / 2, -Math.PI / 2);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.font = 30 + "px arial";
                    ctx.textBaseline = "middle";
                    ctx.textAlign = "center";
                    if (unit === 2) {
                        ctx.fillText(24 - f.toString(), x, y)
                    } else if (unit === 1) {
                        ctx.fillText(60 - f.toString(), x, y)
                    } else if (unit === 3) {
                        ctx.fillText(f.toString(), x, y)
                    } else {
                        ctx.fillText(60 - f.toString(), x, y)
                    }
                }
            }
        },
        updateTimeArea: function () {
            octo.clear();
            octo.addTimerCircle(model.timer[0]);
        },
        clear: function () {

            let canvas = document.querySelectorAll('canvas')
            for (let canva of canvas) {
                //console.log(canva)
                canva.getContext("2d").clearRect(0, 0, canva.width, canva.height);
            }

        },
        objTimer: function (obj) {
            return obj;
        },
        addDate: function (id) {
            let windows = octo.getWindows();
            let today = new Date();
            // console.log(id.timerY);
            let arr = [15, 12, 2018]
            if (id.timerY === 0) {
                id.timerD = arr[0];
                id.timerMo = arr[1];
                id.timerY = arr[2];
                id.timerDelta = id.timerD - today.getDate();;
                id.timerType = octo.addTimerCircle
            }
            //input.value.split('-');

            //let now = 
            /*let sel = document.getElementById('sel')
            let type = sel.value;
            if(type === 'value2'){type = controler.addTimerCircle}
            if(type === 'value1'){type = controler.addTimerNumber}
            if(type === 'value3'){type = controler.x}*/


            model.change(windows)
            model.pushTimer(id)
            // console.log(model.getTimerArray())
            // if((!isNaN(date.day) && date.day) && (!isNaN(date.month) && date.month) && (!isNaN(date.year) && date.year)){
            //model.clear();
            octo.clear()
            let obj = octo.objTimer(id)
            // console.log(obj)
            //model.pushTimer(date);
            octo.addTimerCircle(id);
            //model.getSecComponent();
            viewTimer.render();
            //let a = model.getTimerArray();
            // console.log(a[0])
            //input.parentNode.removeChild(input)

            // }   
        },
        addTimerCircle: function (id) {
            // console.log(id)
            let secComponent = octo.timeComponent(290, 60, 30, 7, 12, 0, id);
            let minComponent = octo.timeComponent(210, 60, 30, 7, 12, 1, id)
            let hourComponent = octo.timeComponent(130, 60, 30, 7, 30, 2, id);
            let dayComponent = octo.timeComponent(50, 60, 30, 7, 1, 3, id);
        },
        addTimerNumber: function () {

            let secComponent = controler.timeComponent(290, 60, 0, 7, 12, 0);
            let minComponent = controler.timeComponent(210, 60, 0, 7, 12, 1)
            let hourComponent = controler.timeComponent(130, 60, 0, 7, 30, 2);
            let dayComponent = controler.timeComponent(50, 60, 0, 7, 1, 3);
        },
        typeTimer: function (func, id) {
            return func(id);
        },

    }


    /*===VIEW===*/
    let view = {
        init: function () {
            //octo.createDivPalette();
            octo.createDiv();

            //let body = document.getElementsByTagName('body')[0];
            window.addEventListener('resize', octo.resizeWindow);
            let newTimer = document.getElementById('newTimer');
            let newNote = document.getElementById('newNote');
            newNote.addEventListener('click', view.newNote);
            newTimer.addEventListener('click', view.newTimer);
            let windows = octo.getWindows();
            let container  = document.querySelector('.col-right');
            // container.addEventListener('mousedown', function(e){
            //     if(e.target.className === 'widgetHelp'){
            //         // e.target.addEventListener('mousedown', octo.mouseDown);
            //         // console.log(e.target)
            //         octo.mouseDown(e);
            //     }
            //     // console.log(e.target)
            // })

            // container.addEventListener('dblclick', function(e){
            //     if(e.target.className === 'widgetHelp'){
            //         // e.target.addEventListener('mousedown', octo.mouseDown);
            //         // console.log(e.target)
            //         octo.clickNote(e);
            //     }
            //     // console.log(e.target)
            // })

            // container.addEventListener('mouseover', function(e){
                
            //     if(e.target.className === 'widgetHelp' || e.target.className === 'tools'){
            //         // console.log(e)
            //         let tool = document.getElementById(e.target.id).childNodes[3].firstChild;
            //         // e.target.addEventListener('mousedown', octo.mouseDown);
            //         tool.className = 'tools1'
            //     }else if(e.target.className === 'col-right'){
            //         let tool = document.querySelectorAll('.tools1');
            //         // console.log(e.target.id)
                    
            //         // e.target.addEventListener('mousedown', octo.mouseDown);
            //         for(too of tool){
            //             too.className = 'tools'
            //         }
            //         octo.mouseUpremove(e.target)
            //     }
            //     // console.log(e.target)
            // })

            // container.addEventListener('mouseup', function (e){
            //     if(e.target.className === 'widgetHelp'){
            //         // console.log(e.target.parentNode)
            //         return octo.mouseUp(e.target.parentNode)

            //     }
            // })
            

            for (let windowNote of windows) {
                let key = Object.keys(windowNote)
                let elem = document.getElementById(windowNote[key].id)
                elem.style.left = windowNote[key].left + 'px';
                elem.style.top = windowNote[key].top + 'px';
                elem.style.backgroundColor = 'rgb(' + windowNote[key].backgroundColor.r + ',' + windowNote[key].backgroundColor.g + ',' + windowNote[key].backgroundColor.b + ')';
                elem.addEventListener('mousedown', octo.mouseDown);
                elem.addEventListener('dblclick', octo.clickNote);

                let tool = elem.childNodes[3].firstChild;
                let icon1 = tool.firstChild;
                elem.addEventListener('mouseover', function () {
                    tool.className = 'tools1'
                    //elem.className = 'widget1'
                })
                elem.addEventListener('mouseout', function () {
                    tool.className = 'tools'
                    octo.mouseUpremove(elem)
                })
                elem.addEventListener('mouseup', function () {
                    return octo.mouseUp(elem)
                })
            }
            let icons = document.querySelectorAll('.xx')
            for (let icon of icons) {
                icon.addEventListener('mouseover', function () {
                    let palette = document.getElementById('palette')
                    palette.style.position = 'absolute';
                    palette.style.left = '10px';
                    palette.style.bottom = '35px';
                    palette.style.display = 'block'
                    icon.style.opacity = 1;
                    let backColor = this.parentNode.parentNode.parentNode
                    icon.appendChild(palette)
                    icon.parentNode.parentNode.parentNode.removeEventListener('mousedown', octo.mouseDown);
                    palette.addEventListener('click', octo.changeColorNote)
                })
                icon.addEventListener('mouseout', function () {
                    let palette = document.getElementById('palette')

                    icon.style.opacity = '0.5'
                    palette.style.display = 'none'
                    icon.parentNode.parentNode.parentNode.addEventListener('mousedown', octo.mouseDown);
                    // document.getElementById('notes').appendChild(palette)
                })
            }
            let icons1 = document.querySelectorAll('.xx1')
            for (let icon of icons1) {
                let palette = document.getElementById('palette')
                icon.addEventListener('click', octo.delete)
                icon.addEventListener('mouseover', function () {
                    icon.style.opacity = '1'
                    icon.appendChild(palette)
                    icon.parentNode.parentNode.parentNode.removeEventListener('mousedown', octo.mouseDown);
                })
                icon.addEventListener('mouseout', function () {
                    let palette = document.getElementById('palette')
                    icon.style.opacity = '0.5'
                    palette.style.display = 'none'
                    icon.parentNode.parentNode.parentNode.addEventListener('mousedown', octo.mouseDown);
                })
            }


        },

        render: function () {
            let windows = octo.getWindows();
            for (let windowNote of windows) {
                let key = Object.keys(windowNote)
                let elem = document.getElementById(windowNote[key].id)
                let left = elem.style.left.slice(0, -2) * 1;
                let top = elem.style.top.slice(0, -2) * 1;
                let absLeft = Math.abs(left - windowNote[key].left)
                let id = setInterval(function () {

                    left = octo.changeValue(left, windowNote[key].left, 8)
                    if (left < windowNote[key].left) {
                        elem.style.left = left + 'px'
                        if (left + 10 > windowNote[key].left) {
                            clearInterval(id)
                            elem.style.left = windowNote[key].left + 'px';
                        }
                    } else {
                        elem.style.left = left + 'px'
                        if (left - 10 < windowNote[key].left) {
                            clearInterval(id)
                            elem.style.left = windowNote[key].left + 'px';
                        }
                    }
                }, 1)
                let id1 = setInterval(function () {

                    top = octo.changeValue(top, windowNote[key].top, 8)
                    if (top > windowNote[key].top) {
                        elem.style.top = top + 'px';
                        if (top - 10 <= windowNote[key].top) {
                            clearInterval(id1)
                            elem.style.top = windowNote[key].top + 'px';
                        }
                    } else {

                        elem.style.top = top + 'px'
                        if (top + 10 >= windowNote[key].top) {
                            clearInterval(id1)
                            elem.style.top = windowNote[key].top + 'px';
                        }
                    }
                }, 1)
            }
        },
        renderUp: function () {
            let windows = octo.getWindows();
            for (let windowNote of windows) {
                let key = Object.keys(windowNote)
                let elem = document.getElementById(windowNote[key].id)
                let left = elem.style.left.slice(0, -2) * 1;
                elem.style.left = windowNote[key].left + 'px';
                elem.style.top = windowNote[key].top + 'px';
            }
        },
        newNote: function () {
            octo.newWindow();
            octo.createDiv();
            octo.setPosInit()
            view.init();
            view.render();
            view.init();

        },
        newTimer: function () {
            octo.newWindow();
            octo.createDivTimer();
            octo.setPosInit()
            view.init();
            view.render();
            // console.log('Nowy timer')
        }

    };
    let viewHead = {
        init: function () {
            window.addEventListener('scroll', function () {
                let head = document.getElementById('head')
                let body = document.documentElement
                let scroll = body.scrollTop
                //console.log(scroll)
                //let resize = body.onresize = (x) => x + 1;
                head.className = 'head'
                if (scroll === 0) {
                    head.className = '';
                }
            })
            viewHead.render();
        },
        initBody: function () {
            window.addEventListener("resize", function () {
                octo.setPosInit();
                view.render();
            });
        },
        render: function () {
            let menus = document.getElementsByClassName('menuText')
            for (let i = 0; i < menus.length; i++) {
                menus[i].addEventListener('click', viewHead.renderHead)
            }

        },
        renderHead: function (e) {
            let elem = e.target;
            let endId = e.target.id
            let end = octo.getColor(endId)
            let start = model.head.start
            octo.changeColor(start, end, elem)
        }
    };
    let viewTimer = {
        init: function (note, obj) {
            let canvas = document.createElement('canvas');
            //canvas.id = 'canvas';
            note.appendChild(canvas)//, document.body.childNodes[0]);
            canvas.width = 350;
            canvas.height = 150;
            canvas.style.position = 'absolute';
            canvas.style.left = '20px'
            canvas.style.top = '100px'
            context = canvas.getContext("2d");

            octo.addDate(obj)

            //    console.log(note)
            /*let butt = document.getElementById('but');
            console.log(butt)
            butt.addEventListener('click', controler.addDate)*/
        },
        render: function () {
            interval = setInterval(octo.updateTimeArea, 1000)

        },
        stopRender: function () {
            interval = this.render()
            clearInterval(interval)
        }
    }
    octo.init();
})()
