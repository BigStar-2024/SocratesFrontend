import { SKIN } from 'constants/avatar'

const COLOR_REGEX = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/;

export const hexToRgb = (hex: string, shade: boolean) => {
    if (hex !== null) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (result) {
            const r = parseInt(result[1], 16);
            const g = shade ? parseInt(result[2], 16) - 15 : parseInt(result[2], 16);
            const b = shade ? parseInt(result[3], 16) - 32 : parseInt(result[3], 16);
            return 'rgb(' + r + ',' + g + ',' + b + ')'
        }
    }
    return 'rgb(255,255,255)'
}

export const parseSVG = (svgString: string, skinTone: string) => {
    const svgArray = svgString.split(COLOR_REGEX);

    for (let i = 0; i < svgArray.length; i++) {
        if (i % 2 === 1) {
            // Replace hex colors with rgb color value
            if (isColorValid('#' + svgArray[i])) {
                if (svgArray[i] === SKIN.skin)
                    svgArray.splice(i, 1, hexToRgb(skinTone, false))
                else
                    if (svgArray[i] === SKIN.shadow)
                        svgArray.splice(i, 1, hexToRgb(skinTone, true))
                    else
                        svgArray.splice(i, 1, hexToRgb(svgArray[i], false))
            }
        }
    }
    return svgArray.join('')
};

export const isColorValid = (color: string) => {
    if (color) {
        if (color.trim() !== '') {
            if (color.match(COLOR_REGEX)) {
                return true;
            }
        }
        return false;
    }
    return false;
};


export const fetchFile = async (url: string) => {
    try {
        if (url) {
            const res = await fetch(url).then(r => r.text())
            return res;
        }
        else return ''
    } catch (e) {
        console.log(e)
        return ''
    }
}
