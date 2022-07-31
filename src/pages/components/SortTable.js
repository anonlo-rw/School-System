export default function SortTable(header) {
    let index = header.cellIndex
    let sortType = header.dataset.sortType
    let sortDirection = header.dataset.sortDir || "asc"
  
    let sorted = Array.prototype.slice.call(header.closest("table").rows).sort(
        sort(sortType, index, sortDirection)
    )
  
    for (let row of sorted) {
        let parent = row.parentNode;
        parent.removeChild(row);
        parent.appendChild(row);

        for (let header of header.parentNode.children) {
            header.classList.remove("currently-sorted")
            delete header.dataset.sortDir
        }
    }
    header.dataset.sortDir = sortDirection === "asc" ? "desc" : "asc"
    header.classList.add("currently-sorted")
}
  
function sort(sortType, index, sortDirection) {
    let direction = sortDirection === "asc" ? -1 : 1;
    switch (sortType)
    {
        case "text":
            return (a, b) => -1 * direction * a.children[index].textContent.localeCompare(
                b.children[index].textContent
            );

        case "numeric":
            return (a, b) => direction * (Number(a.children[index].textContent) - Number(
                b.children[index].textContent
            ));

        default:
            return (a, b) => -1 * direction * a.children[index].textContent.localeCompare(
                b.children[index].textContent
            );
    }
}