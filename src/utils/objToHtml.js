import './json2html.min';
import svgArr from "@/components-unit/iconData";

function objToHtml(objData) {
    const jsonData = JSON.parse(JSON.stringify(objData)) // 消除响应式

    let comTemplateArr = [] // 组件模板数组
    let comTemplateRes = "" // 组件模板字符串

    jsonData.forEach(item => {
        if (item.component === "m-text") {
            let data = [{ "propValue": item.propValue, "className": `${item.component}-${item.key} child-center` },];
            let template = { '<>': 'div', 'html': '${propValue}', 'class': '${className}' };
            comTemplateArr.push(json2html.render(data, template))
        }
        else if (item.component === "m-button") {
            let data = [{ "propValue": item.propValue, "className": `${item.component}-${item.key}` },];
            let template = { '<>': 'button', 'html': '${propValue}', 'class': '${className}' };
            comTemplateArr.push(json2html.render(data, template))
        }
        else if (item.component === "m-input") {
            let data = [{ "propValue": "", "placeValue": item.propValue, "className": `${item.component}-${item.key}` },];
            let template = { '<>': 'input', 'html': 'propValue', 'placeholder': '${placeValue}', 'class': '${className}' };
            comTemplateArr.push(json2html.render(data, template))
        }
        else if (item.component === "m-rectangle") {
            let data = [{ "propValue": "", "className": `${item.component}-${item.key}` }];
            let template = { '<>': 'div', 'html': '${propValue}', 'class': '${className}' };
            comTemplateArr.push(json2html.render(data, template))
        }
        else if (item.component === "m-circular") {
            let data = [{ "propValue": "", "className": `${item.component}-${item.key} border-circle` }];
            let template = { '<>': 'div', 'html': '${propValue}', 'class': '${className}' };
            comTemplateArr.push(json2html.render(data, template))
        }
        else if (item.component === "m-image") {
            let data = [{ "propValue": "", "srcValue": `${item.propUrl}`, "className": `${item.component}-${item.key}` }];
            let template = { '<>': 'img', 'html': '${propValue}', 'src': '${srcValue}', 'class': '${className}' };
            comTemplateArr.push(json2html.render(data, template))
        }
        else if (item.component === "m-icon") {
            let data = [{ "propValue": `${svgArr[item.propIndex].svgValue}`, "className": `${item.component}-${item.key}` },];
            let template = { '<>': 'div', 'html': '${propValue}', 'class': '${className}' };
            comTemplateArr.push(json2html.render(data, template))
        }
    });

    comTemplateArr.forEach((item) => {
        comTemplateRes = comTemplateRes + item + "\n\t\t\t"
    })


    let comCssArr = [] // 组件样式数组
    let comCssRes = "" // 组件样式字符串

    const cssKeyTransform = (sourceString) => {
        const sourceLen = sourceString.length
        for (let i = 0; i < sourceLen; i++) {
            if (sourceString[i] === sourceString[i].toUpperCase()) {
                sourceString = sourceString.slice(0, i) + `-${sourceString[i].toLowerCase()}` + sourceString.slice(i + 1, sourceLen)
            }
        }
        return sourceString
    } // backgroundColor to background-color

    jsonData.forEach(item => {
        const keyArr = Object.keys(item.style)
        let cssStringArr = []
        keyArr.forEach((key) => {
            if (key === "width" || key === "height" || key === "top" || key === "left" ||
                key === "borderWidth" || key === "borderRadius" || key === "fontSize") {
                let cssString = `${cssKeyTransform(key)}:${item.style[key]}px;`
                cssStringArr.push(cssString)
            } else {
                let cssString = `${cssKeyTransform(key)}:${item.style[key]};`
                cssStringArr.push(cssString)
            }
        })
        let sentenceRes = ""
        cssStringArr.forEach((i) => {
            sentenceRes = sentenceRes + "\t\t" + i + "\n"
        })
        let comCssString = `.${item.component}-${item.key}{\n${sentenceRes}\t\tposition: absolute;\n\t}`
        comCssArr.push(comCssString)
    })

    comCssArr.forEach((item) => {
        comCssRes = comCssRes + item + "\n\n\t"
    })


    // HTML模板
    let htmlData = `<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<style>
	/* defaultStyle */
	.design-wrap {
		width: 100%;
	}

	.design-content {
		width: 1200px;
		height: 800px;
		margin: 0 auto;
		position: relative;
	}

	button {
		border: 0;
		outline: none;
		background-color: transparent;
	}

	input {
		padding-left: 2px;
		border: 0;
		outline: none;
		background-color: transparent;
	}

	.child-center{
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.border-circle{
		border-radius: 50%;
	}

	/* insert css start */
	/* insert css end */
	</style>
</head>

<body>
	<div class="design-wrap">
		<div class="design-content">
			<!-- insert components start-->
			<!-- insert components end-->
		</div>
	</div>
</body>

</html>`

    const insertComIndex = htmlData.indexOf("<!-- insert components end-->")
    htmlData = htmlData.slice(0, insertComIndex) + comTemplateRes + htmlData.slice(insertComIndex)

    const insertCssIndex = htmlData.indexOf("/* insert css end */")
    htmlData = htmlData.slice(0, insertCssIndex) + comCssRes + htmlData.slice(insertCssIndex)

    return htmlData
}

export default objToHtml