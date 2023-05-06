function isVisibleInContainer(element: Element, container: Element) {
    const eleRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    if (eleRect.top < containerRect.top && eleRect.bottom < containerRect.top) {
        return false;
    }

    if (
        eleRect.top > containerRect.bottom &&
        eleRect.bottom > containerRect.bottom
    ) {
        return false;
    }

    if (
        eleRect.top <= containerRect.top &&
        eleRect.bottom >= containerRect.bottom
    ) {
        return true;
    }

    return (
        eleRect.top >= containerRect.top &&
        eleRect.bottom <= containerRect.bottom
    );
}

export { isVisibleInContainer };
