class NoteDocument {
    constructor(jsonObject) {
        this._jsonObject = jsonObject
        this._outlineHTML = undefined
        this._fullDocHTML = undefined
    }

    getDualViewPage() {
        const styleTags = "<style type = \"text/css\">h2 {font-family: \"arial\";} h3 {font-family: \"Avenir\";} p {font-family: \"Avenir\";}  .tab { margin-left: 40px; }</style>"
        let dualViewPage = "<head><title>" + this._jsonObject.location.file_path + ": " + this._jsonObject.location.file_name + "</title>" + styleTags
        dualViewPage += '<link rel="stylesheet" href="test_panes.css">' + "</head>"
        dualViewPage += "\n<body>"

        dualViewPage += '<div class="outline split_left left"><div class="centered"><h2>Outline View</h2>'
        dualViewPage += this.getOutlineHTML()
        dualViewPage += '</div></div>'
        dualViewPage += '<div class="document split_right right"><div class="centered"><h2>Document View</h2>'
        dualViewPage += this.getFullDocHTML()
        dualViewPage += '</div></div>'
        dualViewPage += "\n</body>"
        return dualViewPage
    }

    getOutlineHTML() {
        if (this._outlineHTML == null) {
            this.renderOutlineHTML() 
        }
        return this._outlineHTML
    }

    getFullDocHTML() {
        if (this._fullDocHTML == null) {
            this.renderFullDocHTML() 
        }
        return this._fullDocHTML
    }

    // Make private ??
    renderOutlineHTML() {
        this._outlineHTML = ''
        this.traverse(this._jsonObject['Notes'], 'Outline')
    }

    // Make private ??
    renderFullDocHTML() {
        this._fullDocHTML = ''
        this.traverse(this._jsonObject['Notes'], 'FullDoc')
    }

    process(key, value, docType) {
        console.log("Key: value: " + key + " : "+value);
        if (docType == 'Outline') {
            if (key == 'Label') {
                this._outlineHTML += '\n<p>' + value
                //console.log('outlineHTML: ' + this._outlineHTML)
            } else if (key == 'Summary') {
                this._outlineHTML += ': ' + value + '<p>'
                //console.log('outlineHTML: ' + this._outlineHTML)
            }

        } else if (docType == 'FullDoc') {
            if (key == 'Label') {
                this._fullDocHTML += '\n<p>' + value
                //console.log('outlineHTML: ' + this._outlineHTML)
            } else if (key == 'Summary') {
                this._fullDocHTML += ': ' + value + '<p>'
                //console.log('outlineHTML: ' + this._outlineHTML)
            } else if (key == 'Body' && docType == 'FullDoc') {
                value = value.replace(/\n/g, "<br/>")
                this._fullDocHTML += '\n<p>' + value + '<p>'
            }

        } else {
            console.log('ERROR')
            return
        }

    }

    traverse(o, docType) {
        for (var i in o) {
            this.process(i, o[i], docType);  
            if (o[i] !== null && typeof(o[i])=="object") {
                //going one step down in the object tree!!
                this.traverse(o[i], docType);
            }
        }
    }
}
