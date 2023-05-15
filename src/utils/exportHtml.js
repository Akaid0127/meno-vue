import { saveAs } from 'file-saver';

// 导出html
function exportHtml(mode, htmlString) {
    let blob = new Blob([htmlString], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `testFile.${mode}`);
}

export default exportHtml