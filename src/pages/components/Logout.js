export default function Logout() {
    const ServerIP = window.location.host.split(":")[0];
    fetch(`http://${ServerIP}/php/logout.php`)
    .then((response) => {
        if (response.ok) {
            alert("You have Logged Out")
            window.location.href = "/"; 
        }
    })
}