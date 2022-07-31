import { post } from "jquery";

export default function EditRecord(id, name, phone, email, birthdate, grade, address, gender)
{
    const ServerIP = window.location.host.split(":")[0];
    var result = document.getElementById("editResult");

    result.style.color = "red";
    if (!/^([\w]{3,})+\s+([\w\s]{3,})+$/i.test(name)) {
        result.innerHTML = "Incorrect Format for Name (Example: John Smith)";
        return;
    
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone)) {
        result.innerHTML = "Incorrect Format for Phone Number (Example: 123-456-7890)";
        return;
    
    } else if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email)) {
        result.innerHTML = "Incorrect Format for Email (Example: johnsmith@gmail.com)";
        return;
    
    } else if (grade.length === 0 || grade < 0 || grade > 100) {
        result.innerHTML = "Incorrect Format for Grade (Range: 0-100)";
        return;
    
    } else if (address.length < 10 || address.length > 30) {
        result.innerHTML = "Incorrect Format for Address (Example: 1234 East St)";
        return;
    }

    post(`http://${ServerIP}/php/update.php?
        id=${id}&name=${name}&phone=${phone}&email=${email}
        &birthdate=${birthdate}&grade=${grade}&address=${address}
        &gender=${gender}`,

    function(response) {
        if (response !== "updated") {
            result.innerHTML = "Error Occured. Record has not been Updated.";
        
        } else {
            result.style.color = "green";
            result.innerHTML = "Student Record has been Updated";
        }
    });
}