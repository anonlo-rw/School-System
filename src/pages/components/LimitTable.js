export default function LimitTable() {
    var limit = parseInt(document.getElementById("entries").value);
    var tr = document.getElementById("table").getElementsByTagName("tr");
    var len = tr.length;

    for (var i = 1; i < len; i++) {
        tr[i].style.display = "none";
    }

    if (limit === 0) {
        limit = len;
    }
    for (var j = 0; j < limit + 1; j++) {
        if (j >= len) {
            break;
        
        } tr[j].style.display = "";
    }
}