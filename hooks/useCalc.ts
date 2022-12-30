type WidthType = "inner" | "outer" | "width" | "full";

/**
 * Gets the different types of width of an element.
 * @param el The {@link HTMLElement} to query the width for.
 * @param type The {@link WidthType} to query with.
 * @returns The element width of that type.
 */
export const getWidth = (el: HTMLElement, type: WidthType) => {
    if (type === 'inner') // .innerWidth()
        return el.clientWidth;
    else if (type === 'outer') // .outerWidth()
        return el.offsetWidth;
    let s = window.getComputedStyle(el, null);
    if (type === 'width') // .width()
        return el.clientWidth - parseInt(s.getPropertyValue('padding-left')) - parseInt(s.getPropertyValue('padding-right'));
    else if (type === 'full') // .outerWidth(includeMargins = true)
        return el.offsetWidth + parseInt(s.getPropertyValue('margin-left')) + parseInt(s.getPropertyValue('margin-right'));
    return null;
}